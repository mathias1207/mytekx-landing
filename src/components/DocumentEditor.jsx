import React, { useState, useEffect } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Table from '@tiptap/extension-table';
import TableRow from '@tiptap/extension-table-row';
import TableHeader from '@tiptap/extension-table-header';
import TableCell from '@tiptap/extension-table-cell';
import Highlight from '@tiptap/extension-highlight';
import CodeBlockLowlight from '@tiptap/extension-code-block-lowlight';
import { createLowlight } from 'lowlight';
import { FaTimes, FaSave, FaDownload, FaBold, FaItalic, FaUnderline, FaListUl, FaListOl, FaTable, FaCode, FaHighlighter } from 'react-icons/fa';
import { useLanguage } from '../contexts/LanguageContext';
import './DocumentEditor.css';

// Créer une instance lowlight
const lowlight = createLowlight();

const DocumentEditor = ({ onClose, latexContent, documentTitle }) => {
  const { t } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [htmlContent, setHtmlContent] = useState('');
  const [actualLatexContent, setActualLatexContent] = useState(latexContent || '');

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        // Désactiver codeBlock dans StarterKit pour éviter les conflits
        codeBlock: false,
      }),
      Table.configure({
        resizable: true,
      }),
      TableRow,
      TableHeader,
      TableCell,
      Highlight,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],
    content: '<p>Chargement...</p>',
  });

  // Récupérer le contenu LaTeX si pas disponible
  useEffect(() => {
    const fetchLatexContent = async () => {
      console.log('🔍 Vérification du contenu LaTeX...');
      console.log('📄 latexContent prop:', !!latexContent, 'taille:', latexContent?.length || 0);
      console.log('📄 window.lastGeneratedLatex:', !!window.lastGeneratedLatex, 'taille:', window.lastGeneratedLatex?.length || 0);
      
      // Si on a déjà du contenu, l'utiliser
      if (latexContent && latexContent.trim().length > 0) {
        console.log('✅ Utilisation du contenu LaTeX fourni via props');
        setActualLatexContent(latexContent);
        return;
      }
      
      // Sinon, essayer window.lastGeneratedLatex
      if (window.lastGeneratedLatex && window.lastGeneratedLatex.trim().length > 0) {
        console.log('✅ Utilisation de window.lastGeneratedLatex');
        setActualLatexContent(window.lastGeneratedLatex);
        return;
      }
      
      // Sinon, essayer de récupérer via l'API si on a un file_id
      const currentFileId = window.currentFileId || localStorage.getItem('lastFileId');
      console.log('🔍 Tentative de récupération via API, file_id:', currentFileId);
      
      if (currentFileId) {
        try {
          console.log('🌐 Appel de l\'API pour récupérer le contenu LaTeX...');
          const response = await fetch(`http://localhost:8000/get-latex-content/${currentFileId}`);
          if (response.ok) {
            const data = await response.json();
            console.log('✅ Contenu LaTeX récupéré via API:', data.latex_content?.length || 0, 'caractères');
            setActualLatexContent(data.latex_content || '');
            window.lastGeneratedLatex = data.latex_content; // Mettre en cache pour la prochaine fois
          } else {
            console.error('❌ Erreur API lors de la récupération du contenu LaTeX:', response.status);
            setActualLatexContent('% Erreur: Impossible de récupérer le contenu LaTeX');
          }
        } catch (error) {
          console.error('💥 Erreur lors de la récupération du contenu LaTeX:', error);
          setActualLatexContent('% Erreur: Impossible de récupérer le contenu LaTeX');
        }
      } else {
        console.warn('⚠️ Aucun file_id disponible pour récupérer le contenu LaTeX');
        setActualLatexContent('% Aucun contenu LaTeX disponible');
      }
    };

    fetchLatexContent();
  }, [latexContent]);

  // Convertir LaTeX vers HTML
  useEffect(() => {
    const convertLatexToHtml = async () => {
      try {
        setIsLoading(true);
        
        console.log('🔄 Début de la conversion LaTeX vers HTML...');
        console.log('📄 Taille du contenu LaTeX:', actualLatexContent?.length || 0, 'caractères');
        console.log('🔍 Aperçu du contenu LaTeX (premiers 200 caractères):', actualLatexContent?.substring(0, 200) || 'AUCUN CONTENU');
        
        // Vérifier si on a vraiment du contenu
        if (!actualLatexContent || actualLatexContent.trim().length === 0) {
          console.error('❌ Aucun contenu LaTeX à convertir !');
          const errorHtml = `<h1>${documentTitle || 'Document'}</h1><p style="color: red;">❌ Aucun contenu LaTeX trouvé pour la conversion.</p>`;
          setHtmlContent(errorHtml);
          if (editor) {
            editor.commands.setContent(errorHtml);
          }
          return;
        }
        
        console.log('🌐 Appel de l\'endpoint de conversion...');
        
        // Créer un AbortController pour timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => {
          console.error('⏱️ TIMEOUT: La conversion prend trop de temps (>5s) - passage en mode fallback');
          controller.abort();
        }, 5000); // Réduire le timeout à 5 secondes
        
        // Appeler le backend pour convertir LaTeX vers HTML
        const response = await fetch('http://localhost:8000/convert-latex-to-html', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            latex_content: actualLatexContent,
          }),
          signal: controller.signal
        });

        clearTimeout(timeoutId);
        console.log('📡 Réponse reçue du serveur:', response.status, response.statusText);

        if (response.ok) {
          const data = await response.json();
          console.log('✅ Conversion réussie:', data.success);
          console.log('📄 Taille du HTML généré:', data.html_content?.length || 0, 'caractères');
          if (data.warning) {
            console.warn('⚠️ Avertissement:', data.warning);
          }
          setHtmlContent(data.html_content);
          if (editor) {
            editor.commands.setContent(data.html_content);
          }
        } else {
          console.error('❌ Erreur HTTP lors de la conversion:', response.status, response.statusText);
          const errorText = await response.text();
          console.error('📄 Détails de l\'erreur:', errorText);
          // Fallback en cas d'erreur
          const fallbackHtml = `
            <h1>${documentTitle || 'Document'}</h1>
            <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #ffc107;">
              <p style="color: #856404; font-weight: bold;">⚠️ Problème de conversion - Contenu LaTeX brut :</p>
              <p style="color: #856404; font-size: 14px; margin-top: 5px;">
                ${errorText}
              </p>
            </div>
            <pre style="background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; font-family: 'Courier New', monospace; max-height: 400px; overflow-y: auto;"><code>${actualLatexContent || 'Aucun contenu LaTeX disponible'}</code></pre>
          `;
          setHtmlContent(fallbackHtml);
          if (editor) {
            editor.commands.setContent(fallbackHtml);
          }
        }
      } catch (error) {
        if (error.name === 'AbortError') {
          console.error('⏱️ Timeout: La conversion a pris trop de temps');
        } else {
          console.error('💥 Erreur de conversion:', error);
        }
        // Fallback en cas d'erreur
        const fallbackHtml = `
          <h1>${documentTitle || 'Document'}</h1>
          <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 10px 0; border-left: 4px solid #ffc107;">
            <p style="color: #856404; font-weight: bold;">⚠️ Problème de conversion - Contenu LaTeX brut :</p>
            <p style="color: #856404; font-size: 14px; margin-top: 5px;">
              ${error.name === 'AbortError' ? 'Timeout de conversion' : 'Erreur de réseau'}
            </p>
          </div>
          <pre style="background: #2d2d2d; color: #f8f8f2; padding: 15px; border-radius: 8px; overflow-x: auto; white-space: pre-wrap; font-family: 'Courier New', monospace; max-height: 400px; overflow-y: auto;"><code>${actualLatexContent || 'Aucun contenu LaTeX disponible'}</code></pre>
        `;
        setHtmlContent(fallbackHtml);
        if (editor) {
          editor.commands.setContent(fallbackHtml);
        }
      } finally {
        setIsLoading(false);
        console.log('🏁 Fin du processus de conversion');
      }
    };

    console.log('🎯 useEffect déclenché - actualLatexContent présent:', !!actualLatexContent, 'editor présent:', !!editor);
    if (actualLatexContent && editor) {
      convertLatexToHtml();
    } else {
      console.warn('⚠️ Conditions non remplies - actualLatexContent:', !!actualLatexContent, 'editor:', !!editor);
      // Si pas de contenu LaTeX, afficher un message d'erreur
      if (editor && !actualLatexContent) {
        setIsLoading(false);
        const noContentHtml = `<h1>${documentTitle || 'Document'}</h1><p style="color: orange;">⚠️ En attente du contenu LaTeX...</p>`;
        setHtmlContent(noContentHtml);
        editor.commands.setContent(noContentHtml);
      }
    }
  }, [actualLatexContent, editor, documentTitle]);

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Ici vous pourriez sauvegarder le contenu modifié
      const htmlContent = editor.getHTML();
      console.log('Contenu sauvegardé:', htmlContent);
      
      // Simuler une sauvegarde
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      alert('Document sauvegardé avec succès !');
    } catch (error) {
      console.error('Erreur lors de la sauvegarde:', error);
      alert('Erreur lors de la sauvegarde');
    } finally {
      setIsSaving(false);
    }
  };

  const handleExport = () => {
    const htmlContent = editor.getHTML();
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${documentTitle || 'document'}_modifie.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  if (!editor) {
    return null;
  }

  return (
    <div className="document-editor-overlay">
      <div className="document-editor-container">
        {/* Header */}
        <div className="editor-header">
          <h2>{t('documentEditor')}</h2>
          <button
            className="close-editor-btn"
            onClick={onClose}
            aria-label={t('closeEditor')}
          >
            <FaTimes />
          </button>
        </div>

        {/* Toolbar */}
        <div className="editor-toolbar">
          <div className="toolbar-group">
            <button
              onClick={() => editor.chain().focus().toggleBold().run()}
              className={editor.isActive('bold') ? 'active' : ''}
              title="Gras"
            >
              <FaBold />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleItalic().run()}
              className={editor.isActive('italic') ? 'active' : ''}
              title="Italique"
            >
              <FaItalic />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleHighlight().run()}
              className={editor.isActive('highlight') ? 'active' : ''}
              title="Surligner"
            >
              <FaHighlighter />
            </button>
          </div>

          <div className="toolbar-group">
            <button
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              className={editor.isActive('bulletList') ? 'active' : ''}
              title="Liste à puces"
            >
              <FaListUl />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              className={editor.isActive('orderedList') ? 'active' : ''}
              title="Liste numérotée"
            >
              <FaListOl />
            </button>
            <button
              onClick={() => editor.chain().focus().toggleCodeBlock().run()}
              className={editor.isActive('codeBlock') ? 'active' : ''}
              title="Bloc de code"
            >
              <FaCode />
            </button>
          </div>

          <div className="toolbar-group">
            <select
              onChange={(e) => {
                const level = parseInt(e.target.value);
                if (level === 0) {
                  editor.chain().focus().setParagraph().run();
                } else {
                  editor.chain().focus().toggleHeading({ level }).run();
                }
              }}
              value={
                editor.isActive('heading', { level: 1 }) ? 1 :
                editor.isActive('heading', { level: 2 }) ? 2 :
                editor.isActive('heading', { level: 3 }) ? 3 : 0
              }
            >
              <option value={0}>Paragraphe</option>
              <option value={1}>Titre 1</option>
              <option value={2}>Titre 2</option>
              <option value={3}>Titre 3</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="editor-content">
          {isLoading ? (
            <div className="editor-loading">
              <div className="loading-spinner"></div>
              <p>Conversion du document en cours...</p>
            </div>
          ) : (
            <EditorContent editor={editor} />
          )}
        </div>

        {/* Footer */}
        <div className="editor-footer">
          <button
            className="save-btn"
            onClick={handleSave}
            disabled={isSaving}
          >
            <FaSave />
            {isSaving ? 'Sauvegarde...' : 'Sauvegarder'}
          </button>
          <button
            className="export-btn"
            onClick={handleExport}
            disabled={isLoading}
          >
            <FaDownload />
            Exporter HTML
          </button>
        </div>
      </div>
    </div>
  );
};

export default DocumentEditor; 