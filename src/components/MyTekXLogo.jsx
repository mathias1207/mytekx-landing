import { motion } from "framer-motion";
import './MyTekXLogo.css';

const MyTekXLogo = ({ 
  size = "normal", 
  variant = "auto", // "auto" (loop), "hover", "static"
  className = "" 
}) => {
  const dimensions = {
    small: { scale: 0.7, fontSize: "1.4rem" },
    normal: { scale: 1, fontSize: "1.8rem" },
    large: { scale: 1.3, fontSize: "2.4rem" }
  };

  const { scale, fontSize } = dimensions[size] || dimensions.normal;

  // Animations pour Θ (clignement d'œil)
  const thetaBlinkAnimation = variant === "auto" ? {
    scaleY: [1, 0.2, 1],
    transition: {
      duration: 0.3,
      times: [0, 0.5, 1],
      repeat: Infinity,
      repeatDelay: 3,
      ease: "easeInOut"
    }
  } : variant === "hover" ? {} : { scaleY: 1 };

  // Animations pour les barres Ξ
  const xiBarVariants = {
    hidden: { 
      scaleX: 0, 
      opacity: 0.3,
      originX: 0
    },
    visible: (i) => ({
      scaleX: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        delay: i * 0.2,
        ease: "easeOut",
        repeat: variant === "auto" ? Infinity : 0,
        repeatDelay: variant === "auto" ? 4 : 0
      }
    })
  };

  // Animation du texte
  const textAnimation = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        delay: 1,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.div 
      className={`mytekx-logo ${className}`}
      style={{ 
        fontSize, 
        transform: `scale(${scale})`,
        transformOrigin: "left center"
      }}
      initial="hidden"
      animate="visible"
      whileHover={variant === "hover" ? "hover" : undefined}
      variants={{
        hover: {
          scale: scale * 1.05,
          transition: { duration: 0.2 }
        }
      }}
    >
      {/* Symbole Θ (Theta) - Œil qui cligne */}
      <div className="logo-symbol theta-symbol">
        <svg width="40" height="40" viewBox="0 0 40 40" className="theta-svg">
          {/* Cercle extérieur */}
          <circle
            cx="20"
            cy="20"
            r="16"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            className="theta-circle"
          />
          
          {/* Ligne horizontale qui cligne */}
          <motion.ellipse
            cx="20"
            cy="20"
            rx="10"
            ry="1.5"
            fill="currentColor"
            className="theta-line"
            animate={thetaBlinkAnimation}
            whileHover={variant === "hover" ? { scaleY: 0.2 } : undefined}
          />
        </svg>
      </div>

      {/* Symbole Ξ (Xi) - Barres qui se dessinent */}
      <div className="logo-symbol xi-symbol">
        {/* Cadre de page (optionnel) */}
        <div className="document-frame">
          <svg width="50" height="40" viewBox="0 0 50 40" className="xi-svg">
            {/* Fond de page subtil */}
            <rect
              x="2"
              y="2"
              width="46"
              height="36"
              rx="2"
              fill="currentColor"
              opacity="0.05"
              className="page-background"
            />
            
            {/* Bordure de page */}
            <rect
              x="2"
              y="2"
              width="46"
              height="36"
              rx="2"
              fill="none"
              stroke="currentColor"
              strokeWidth="0.5"
              opacity="0.2"
              className="page-border"
            />

            {/* Trois barres du Ξ qui apparaissent une par une */}
            {[0, 1, 2].map((i) => (
              <motion.line
                key={i}
                x1="12"
                y1={15 + i * 5}
                x2="38"
                y2={15 + i * 5}
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                className="xi-bar"
                custom={i}
                variants={xiBarVariants}
                initial="hidden"
                animate="visible"
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Texte MyTekX */}
      <motion.div 
        className="logo-text"
        variants={textAnimation}
        initial="hidden"
        animate="visible"
      >
        <span className="text-my">My</span>
        <span className="text-tek">Tek</span>
        <span className="text-x">X</span>
      </motion.div>
    </motion.div>
  );
};

export default MyTekXLogo; 