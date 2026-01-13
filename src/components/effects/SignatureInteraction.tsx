import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { useReducedMotion } from '../motion/useReducedMotion';

type InteractionType = 'text-reveal' | 'clip-reveal' | 'parallax' | 'marquee' | 'sticky-progress' | 'hover';

interface SignatureInteractionProps {
  children: React.ReactNode;
  type: InteractionType;
  className?: string;
  speed?: number;
}

export const SignatureInteraction: React.FC<SignatureInteractionProps> = ({ 
  children, 
  type, 
  className = "",
  speed = 0.4
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"]
  });

  // Parallax Effect
  const y = useTransform(scrollYProgress, [0, 1], [0, -100 * speed]);
  const parallaxY = useSpring(y, { stiffness: 100, damping: 30, restDelta: 0.001 });

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  if (type === 'parallax') {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <motion.div style={{ y: parallaxY }} className="h-full w-full">
          {children}
        </motion.div>
      </div>
    );
  }

  if (type === 'hover') {
    return (
      <motion.div 
        className={className}
        whileHover={{ y: -2, scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        {children}
      </motion.div>
    );
  }

  // Default pass-through
  return <div className={className}>{children}</div>;
};
