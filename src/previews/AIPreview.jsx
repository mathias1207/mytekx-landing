import React from 'react';
import './PreviewStyles.css';

export default function AIPreview() {
  return (
    <div className="preview-container ai-preview">
      <header className="preview-header">
        <div className="preview-logo">
          <span className="logo-icon">ΘΞ</span>
          <span className="logo-text">MyTekX Editor</span>
        </div>
        <div className="preview-nav">
          <a href="#" className="preview-nav-item">Documents</a>
          <a href="#" className="preview-nav-item active">Édition</a>
          <a href="#" className="preview-nav-item">Partage</a>
          <a href="#" className="preview-nav-item">Aide</a>
        </div>
        <div className="preview-user">
          <img src="https://randomuser.me/api/portraits/women/65.jpg" alt="User Avatar" className="preview-avatar" />
          <span>Emma B.</span>
        </div>
      </header>

      <div className="preview-main">
        <div className="ai-sidebar">
          <h3 className="section-title">Suggestions IA</h3>
          
          <div className="ai-suggestion">
            <div className="suggestion-type">
              <span>✨</span> Amélioration de clarté
            </div>
            <p className="suggestion-text">
              Considérer l'ajout d'une définition formelle du théorème de Cauchy avant d'expliquer son application.
            </p>
            <div className="suggestion-actions">
              <button className="suggestion-action">Appliquer</button>
              <button className="suggestion-action">Ignorer</button>
            </div>
            <div className="suggestion-feedback">
              <span>Cette suggestion est-elle utile?</span>
              <div className="feedback-buttons">
                <button className="feedback-button">👍</button>
                <button className="feedback-button">👎</button>
              </div>
            </div>
          </div>
          
          <div className="ai-suggestion">
            <div className="suggestion-type">
              <span>🔍</span> Référence manquante
            </div>
            <p className="suggestion-text">
              Une référence à l'article original de Green-Tao renforcerait votre argument sur les progressions arithmétiques.
            </p>
            <div className="suggestion-actions">
              <button className="suggestion-action">Ajouter référence</button>
              <button className="suggestion-action">Ignorer</button>
            </div>
            <div className="suggestion-feedback">
              <span>Cette suggestion est-elle utile?</span>
              <div className="feedback-buttons">
                <button className="feedback-button">👍</button>
                <button className="feedback-button">👎</button>
              </div>
            </div>
          </div>
          
          <h3 className="section-title">Équations détectées</h3>
          <div className="math-equations">
            <div className="equation-preview">
              <p>Intégrale de contour:</p>
              <div className="equation-image">
                {"$$\\oint_C f(z) \\, dz = 2\\pi i \\sum_{k=1}^n \\text{Res}(f, a_k)$$"}
              </div>
            </div>
            
            <div className="equation-preview">
              <p>Théorème de Stokes:</p>
              <div className="equation-image">
                {"$$\\iint_S \\nabla \\times \\vec{F} \\cdot d\\vec{S} = \\oint_{\\partial S} \\vec{F} \\cdot d\\vec{r}$$"}
              </div>
            </div>
          </div>
        </div>
        
        <div className="ai-editor">
          <h1 className="document-title">Applications du théorème de Cauchy en analyse complexe</h1>
          
          <div className="editor-toolbar">
            <button className="tool-button">B</button>
            <button className="tool-button">I</button>
            <button className="tool-button">U</button>
            <button className="tool-button">Σ</button>
            <button className="tool-button">≈</button>
            <button className="tool-button">⊂</button>
            <button className="tool-button">∫</button>
            <button className="tool-button">∑</button>
          </div>
          
          <div className="content-area">
            <div className="text-editor">
              <h2>1. Introduction</h2>
              <p>
                Le théorème de Cauchy est l'un des résultats fondamentaux de l'analyse complexe. Il établit que si une fonction est holomorphe à l'intérieur et sur une courbe fermée simple, alors l'intégrale de contour de cette fonction le long de cette courbe est égale à zéro.
              </p>
              <p>
                Dans ce document, nous explorerons diverses applications de ce théorème, notamment:
              </p>
              <ul>
                <li>Le calcul d'intégrales définies</li>
                <li>La formule intégrale de Cauchy</li>
                <li>Le théorème des résidus</li>
              </ul>
              
              <h2>2. Énoncé du théorème</h2>
              <p>
                Soit <em>f</em> une fonction holomorphe dans un domaine simplement connexe <em>D</em>. Alors, pour toute courbe fermée simple <em>C</em> contenue dans <em>D</em> et orientée positivement:
              </p>
              <p className="equation">
                {"$$\\oint_C f(z) \\, dz = 0$$"}
              </p>
              
              <h2>3. Applications en physique</h2>
              <p>
                En électromagnétisme, le théorème de Cauchy peut être utilisé pour calculer des champs électriques et magnétiques dans des situations où les symétries du problème permettent l'utilisation de variables complexes.
              </p>
              <p>
                Par exemple, considérons un conducteur infiniment long...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 