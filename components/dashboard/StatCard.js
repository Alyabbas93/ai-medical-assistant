'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function StatCard({ icon: Icon, label, value, trend, glowColor = 'glow-indigo' }) {
  const [animatedValue, setAnimatedValue] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = parseInt(value) || 0;
    const duration = 1500;
    const increment = end / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setAnimatedValue(end);
        clearInterval(timer);
      } else {
        setAnimatedValue(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [value]);

  const isTrendPositive = trend && trend.startsWith('+');

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      whileHover={{ scale: 1.05, y: -5 }}
      className={`p-6 rounded-2xl bg-card border border-border shadow-sm hover:border-primary/50 transition-all duration-300 ${glowColor}`}
    >
      <div className="flex items-start justify-between mb-4">
        <motion.div
          initial={{ rotate: -20, scale: 0 }}
          animate={{ rotate: 0, scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="p-3 rounded-lg bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30"
        >
          <Icon className="w-6 h-6 text-indigo-400" />
        </motion.div>
        {trend && (
          <motion.span
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
            className={`text-sm font-semibold ${isTrendPositive ? 'text-green-500' : 'text-red-500'}`}
          >
            {trend}
          </motion.span>
        )}
      </div>

      <h3 className="text-muted-foreground text-sm font-medium mb-1">{label}</h3>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        className="text-3xl font-bold gradient-text"
      >
        {animatedValue}
      </motion.p>
    </motion.div>
  );
}
