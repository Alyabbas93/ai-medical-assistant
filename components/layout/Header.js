'use client';

import { motion } from 'framer-motion';
import { Menu, Phone } from 'lucide-react';
import ThemeToggle from '@/components/ThemeToggle';
import { useApp } from '@/app/context/AppContext';

export default function Header() {
  const { setSidebarOpen, sidebarOpen } = useApp();

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="sticky top-0 z-40 bg-card/80 backdrop-blur-md border-b border-border"
    >
      <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 hover:bg-muted rounded-lg transition-colors duration-300 md:hidden"
          >
            <Menu className="w-5 h-5" />
          </button>

          <motion.div className="flex items-center gap-2">
            <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600">
              <Phone className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold gradient-text">MedVoice</h1>
              <p className="text-xs text-muted-foreground">AI Medical Voice Scheduler</p>
            </div>
          </motion.div>
        </div>

        <div className="flex items-center gap-3">
          <ThemeToggle />
        </div>
      </div>
    </motion.header>
  );
}
