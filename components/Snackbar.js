'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, AlertCircle, Info, X } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';

export default function Snackbar() {
  const { snackbar } = useApp();

  const icons = {
    success: <CheckCircle2 className="w-5 h-5 text-green-500" />,
    error: <AlertCircle className="w-5 h-5 text-red-500" />,
    info: <Info className="w-5 h-5 text-blue-500" />,
  };

  const bgColors = {
    success: 'bg-green-600 border-green-500',
    error: 'bg-red-600 border-red-500',
    info: 'bg-blue-600 border-blue-500',
  };

  return (
    <AnimatePresence>
      {snackbar.open && (
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.3 }}
          className={`fixed bottom-6 right-6 flex items-center gap-3 px-4 py-3 rounded-lg border ${bgColors[snackbar.type]} text-white shadow-lg`}
        >
          {icons[snackbar.type]}
          <span className="text-sm font-medium">{snackbar.message}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
