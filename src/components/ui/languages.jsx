'use client';
import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

const pathVariants = {
  normal: { opacity: 1, pathLength: 1, pathOffset: 0 },
  animate: (custom) => ({
    opacity: [0, 1],
    pathLength: [0, 1],
    pathOffset: [1, 0],
    transition: {
      opacity: { duration: 0.01, delay: custom * 0.1 },
      pathLength: {
        type: 'spring',
        duration: 0.5,
        bounce: 0,
        delay: custom * 0.1,
      },
    },
  }),
};

const svgVariants = {
  normal: { opacity: 1 },
  animate: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const LanguagesIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const svgControls = useAnimation();
  const pathControls = useAnimation();

  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => {
        svgControls.start('animate');
        pathControls.start('animate');
      },
      stopAnimation: () => {
        svgControls.start('normal');
        pathControls.start('normal');
      },
    };
  });

  const handleMouseEnter = useCallback((e) => {
    if (!isControlledRef.current) {
      svgControls.start('animate');
      pathControls.start('animate');
    } else {
      onMouseEnter?.(e);
    }
  }, [onMouseEnter, pathControls, svgControls]);

  const handleMouseLeave = useCallback((e) => {
    if (!isControlledRef.current) {
      svgControls.start('normal');
      pathControls.start('normal');
    } else {
      onMouseLeave?.(e);
    }
  }, [svgControls, pathControls, onMouseLeave]);

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}>
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        variants={svgVariants}
        animate={svgControls}>
        <motion.path d="m5 8 6 6" variants={pathVariants} custom={3} animate={pathControls} />
        <motion.path
          d="m4 14 6-6 3-3"
          variants={pathVariants}
          custom={2}
          animate={pathControls} />
        <motion.path d="M2 5h12" variants={pathVariants} custom={1} animate={pathControls} />
        <motion.path d="M7 2h1" variants={pathVariants} custom={0} animate={pathControls} />
        <motion.path
          d="m22 22-5-10-5 10"
          variants={pathVariants}
          custom={3}
          animate={pathControls} />
        <motion.path d="M14 18h6" variants={pathVariants} custom={3} animate={pathControls} />
      </motion.svg>
    </div>
  );
});

LanguagesIcon.displayName = 'LanguagesIcon';

export { LanguagesIcon };
