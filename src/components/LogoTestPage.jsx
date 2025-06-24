import React, { useState } from 'react';
import MyTekXLogo from './MyTekXLogo';
import { useTheme } from '../contexts/ThemeContext';
import './LogoTestPage.css';

const LogoTestPage = () => {
  const { isDarkMode, toggleTheme } = useTheme();
  const [logoKey, setLogoKey] = useState(0);

  const restartAnimation = () => {
    setLogoKey(prev => prev + 1);
  };

  return (
    <div className="logo-test-page">
      <div className="test-header">
        <h1>Logo MyTekX - Version Moderne</h1>
        <p className="test-description">
          Logo vectoriel animé avec Framer Motion - Θ qui cligne et Ξ qui se dessine
        </p>
        <div className="test-controls">
          <button onClick={toggleTheme} className="theme-toggle-btn">
            {isDarkMode ? '☀️' : '🌙'} {isDarkMode ? 'Mode Clair' : 'Mode Sombre'}
          </button>
          <button onClick={restartAnimation} className="restart-btn">
            🔄 Relancer l'animation
          </button>
        </div>
      </div>

      <div className="logo-showcase">
        {/* Variantes d'animation */}
        <div className="showcase-section">
          <h2>🔄 Animation Automatique</h2>
          <div className="logo-container">
            <MyTekXLogo key={`auto-${logoKey}`} variant="auto" size="normal" />
          </div>
          <p className="variant-description">
            Θ cligne toutes les 3s, Ξ se redessine toutes les 4s
          </p>
        </div>

        <div className="showcase-section">
          <h2>👆 Animation au Hover</h2>
          <div className="logo-container">
            <MyTekXLogo key={`hover-${logoKey}`} variant="hover" size="normal" />
          </div>
          <p className="variant-description">
            Survolez le logo pour voir l'animation
          </p>
        </div>

        <div className="showcase-section">
          <h2>⏸️ Version Statique</h2>
          <div className="logo-container">
            <MyTekXLogo key={`static-${logoKey}`} variant="static" size="normal" />
          </div>
          <p className="variant-description">
            Aucune animation, version fixe
          </p>
        </div>

        {/* Tailles */}
        <div className="showcase-section">
          <h2>📏 Taille Petite</h2>
          <div className="logo-container">
            <MyTekXLogo key={`small-${logoKey}`} variant="auto" size="small" />
          </div>
        </div>

        <div className="showcase-section">
          <h2>📏 Taille Grande</h2>
          <div className="logo-container">
            <MyTekXLogo key={`large-${logoKey}`} variant="auto" size="large" />
          </div>
        </div>

        {/* Cas d'usage */}
        <div className="showcase-section full-width">
          <h2>🎯 Cas d'Usage</h2>
          <div className="usage-examples">
            <div className="usage-example">
              <h4>Navigation</h4>
              <div className="nav-example">
                <MyTekXLogo variant="hover" size="small" />
                <span>Accueil</span>
                <span>Produits</span>
                <span>Contact</span>
              </div>
            </div>
            
            <div className="usage-example">
              <h4>Hero Section</h4>
              <div className="hero-example">
                <MyTekXLogo variant="auto" size="large" />
                <h3>Transformez vos documents avec l'IA</h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="animation-info">
        <h3>Spécifications Techniques</h3>
        
        <div className="tech-grid">
          <div className="tech-card">
            <h4>🎯 Symbole Θ (Theta)</h4>
            <ul>
              <li><strong>Animation :</strong> Clignement d'œil (scaleY: 1 → 0.2 → 1)</li>
              <li><strong>Durée :</strong> 0.3s avec pause de 3s</li>
              <li><strong>Easing :</strong> easeInOut pour naturel</li>
              <li><strong>Couleur :</strong> Violet technologique #7c3aed</li>
              <li><strong>Effet :</strong> Drop-shadow subtil</li>
            </ul>
          </div>

          <div className="tech-card">
            <h4>📝 Symbole Ξ (Xi)</h4>
            <ul>
              <li><strong>Animation :</strong> Barres qui se dessinent une par une</li>
              <li><strong>Délai :</strong> 0.2s entre chaque barre</li>
              <li><strong>Durée :</strong> 0.6s par barre avec easeOut</li>
              <li><strong>Contexte :</strong> Encadré dans une page de document</li>
              <li><strong>Origine :</strong> Transformation depuis la gauche</li>
            </ul>
          </div>

          <div className="tech-card">
            <h4>🔤 Texte MyTekX</h4>
            <ul>
              <li><strong>Police :</strong> Inter (moderne sans-serif)</li>
              <li><strong>My :</strong> Gris foncé #1f2937</li>
              <li><strong>Tek :</strong> Violet #7c3aed</li>
              <li><strong>X :</strong> Dégradé violet avec effet brillance</li>
              <li><strong>Animation :</strong> Fade-in avec slide depuis la gauche</li>
            </ul>
          </div>

          <div className="tech-card">
            <h4>⚡ Performance</h4>
            <ul>
              <li><strong>Format :</strong> SVG vectoriel pur</li>
              <li><strong>Responsive :</strong> Adaptatif toutes tailles</li>
              <li><strong>Accessibilité :</strong> Respect prefers-reduced-motion</li>
              <li><strong>Optimisation :</strong> will-change pour GPU</li>
              <li><strong>Variants :</strong> Auto, Hover, Static</li>
            </ul>
          </div>
        </div>

        <div className="code-example">
          <h4>💻 Utilisation</h4>
          <pre><code>{`// Animation automatique (défaut)
<MyTekXLogo />

// Animation au hover uniquement
<MyTekXLogo variant="hover" />

// Version statique
<MyTekXLogo variant="static" />

// Tailles personnalisées
<MyTekXLogo size="small" />
<MyTekXLogo size="large" />

// Classe CSS personnalisée
<MyTekXLogo className="custom-logo" />`}</code></pre>
        </div>
      </div>
    </div>
  );
};

export default LogoTestPage; 