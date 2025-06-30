import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';

const cameraVariants = {
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

const PrecisionCameraIcon = forwardRef(
  ({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);

    useImperativeHandle(ref, () => ({
      startAnimation: () => {
        isControlledRef.current = true;
        controls.start('animate');
      },
      stopAnimation: () => controls.start('normal'),
    }));

    const handleMouseEnter = useCallback(
      (e) => {
        if (!isControlledRef.current) controls.start('animate');
        else onMouseEnter?.(e);
      },
      [controls, onMouseEnter]
    );

    const handleMouseLeave = useCallback(
      (e) => {
        if (!isControlledRef.current) controls.start('normal');
        else onMouseLeave?.(e);
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
          {/* Body */}
          <motion.rect
            variants={cameraVariants}
            initial="normal"
            animate={controls}
            x="3"
            y="5"
            width="18"
            height="14"
            rx="2"
          />
          {/* Lens */}
          <motion.circle
            variants={cameraVariants}
            initial="normal"
            animate={controls}
            cx="12"
            cy="12"
            r="4"
          />
          {/* Shutter button */}
          <motion.circle
            variants={cameraVariants}
            initial="normal"
            animate={controls}
            cx="18"
            cy="8"
            r="1"
          />
          {/* Flash hump */}
          <motion.rect
            variants={cameraVariants}
            initial="normal"
            animate={controls}
            x="6"
            y="4"
            width="4"
            height="2"
            rx="1"
          />
        </svg>
      </div>
    );
  }
);

PrecisionCameraIcon.displayName = 'PrecisionCameraIcon';

export { PrecisionCameraIcon }; 