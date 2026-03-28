'use client';

import { motion } from 'framer-motion';

export default function Loader({ size = 'md', text = 'Loading...' }) {
  const sizeClasses = {
    sm: 'w-8 h-8',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
  };

  const containerVariants = {
    animate: {
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const dotVariants = {
    animate: {
      y: [0, -10, 0],
      transition: {
        duration: 0.8,
        repeat: Infinity,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <motion.div
        variants={containerVariants}
        animate="animate"
        className="flex gap-2"
      >
        {[0, 1, 2].map((i) => (
          <motion.div
            key={i}
            variants={dotVariants}
            className="w-3 h-3 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500"
          />
        ))}
      </motion.div>
      {text && <p className="text-muted-foreground text-sm animate-pulse">{text}</p>}
    </div>
  );
}
