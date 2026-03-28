'use client';

import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, description, action }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="flex flex-col items-center justify-center py-12"
    >
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
        className="mb-4"
      >
        <Icon className="w-12 h-12 text-muted-foreground opacity-50" />
      </motion.div>
      <h3 className="text-lg font-semibold text-foreground mb-2">{title}</h3>
      <p className="text-muted-foreground text-sm mb-6 text-center max-w-sm">{description}</p>
      {action && <motion.div whileHover={{ scale: 1.05 }}>{action}</motion.div>}
    </motion.div>
  );
}
