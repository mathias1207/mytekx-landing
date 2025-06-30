import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

const bulbVariants = {
  normal: {
    opacity: 1,
    pathLength: 1,
    transition: {
      duration: 0.3,
      opacity: { duration: 0.1 },
    },
  },
  animate: {
    opacity: [0, 1],
    pathLength: [0, 1],
    transition: {
      duration: 0.5,
      opacity: { duration: 0.2 },
    },
  },
};

const PrecisionLightbulbIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;
      return {
        startAnimation: () => controls.start('animate'),
        stopAnimation: () => controls.start('normal'),
      };
    });

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start('animate');
        } else {
          onMouseEnter?.(e);
        }
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) {
          controls.start('normal');
        } else {
          onMouseLeave?.(e);
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={className}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={size}
          height={size}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Bulb outline */}
          <motion.path
            variants={bulbVariants}
            initial="normal"
            animate={controls}
            d="M12 2a7 7 0 0 0-7 7c0 3.21 2.12 5.91 5 6.71V18a1 1 0 0 0 1 1h2a1 1 0 0 0 1-1v-2.29c2.88-.8 5-3.5 5-6.71a7 7 0 0 0-7-7z"
          />
          {/* Filament */}
          <motion.path
            variants={bulbVariants}
            initial="normal"
            animate={controls}
            d="M12 11v3"
          />
          {/* Base lines */}
          <motion.line
            variants={bulbVariants}
            initial="normal"
            animate={controls}
            x1="9"
            y1="21"
            x2="15"
            y2="21"
          />
          <motion.line
            variants={bulbVariants}
            initial="normal"
            animate={controls}
            x1="10"
            y1="17"
            x2="14"
            y2="17"
          />
        </svg>
      </div>
    );
  }
);

PrecisionLightbulbIcon.displayName = 'PrecisionLightbulbIcon';

export { PrecisionLightbulbIcon }; 