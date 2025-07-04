'use client';
import { motion, useAnimation } from 'framer-motion';
import { forwardRef, useCallback, useImperativeHandle, useRef } from 'react';
import { cn } from '@/lib/utils';

const pathVariants = {
  normal: { opacity: 1 },
  animate: (i) => ({
    opacity: [0, 1],
    transition: { delay: i * 0.1, duration: 0.3 },
  }),
};

const SunMediumIcon = forwardRef(({ onMouseEnter, onMouseLeave, className, size = 28, ...props }, ref) => {
  const controls = useAnimation();
  const isControlledRef = useRef(false);

  useImperativeHandle(ref, () => {
    isControlledRef.current = true;

    return {
      startAnimation: () => controls.start('animate'),
      stopAnimation: () => controls.start('normal'),
    };
  });

  const handleMouseEnter = useCallback((e) => {
    if (!isControlledRef.current) {
      controls.start('animate');
    } else {
      onMouseEnter?.(e);
    }
  }, [controls, onMouseEnter]);

  const handleMouseLeave = useCallback((e) => {
    if (!isControlledRef.current) {
      controls.start('normal');
    } else {
      onMouseLeave?.(e);
    }
  }, [controls, onMouseLeave]);

  return (
    <div
      className={cn(className)}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round">
        <circle cx="12" cy="12" r="4" />
        {[
          'M12 3v1',
          'M12 20v1',
          'M3 12h1',
          'M20 12h1',
          'm18.364 5.636-.707.707',
          'm6.343 17.657-.707.707',
          'm5.636 5.636.707.707',
          'm17.657 17.657.707.707',
        ].map((d, index) => (
          <motion.path
            key={d}
            d={d}
            animate={controls}
            variants={pathVariants}
            custom={index + 1} />
        ))}
      </svg>
    </div>
  );
});

SunMediumIcon.displayName = 'SunMediumIcon';

export { SunMediumIcon };
