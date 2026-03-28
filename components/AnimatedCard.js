'use client';

import { motion } from 'framer-motion';

export default function AnimatedCard({ children, className = '', delay = 0, glowColor = 'glow-indigo' }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ scale: 1.02 }}
      className={`p-6 rounded-2xl bg-card border border-white/10 hover:border-primary/50 transition-all duration-300 ${glowColor} ${className}`}
    >
      {children}
    </motion.div>
  );
}
