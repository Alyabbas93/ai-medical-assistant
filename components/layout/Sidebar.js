'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { LayoutDashboard, Users, Phone, X } from 'lucide-react';
import { useApp } from '@/app/context/AppContext';

const navItems = [
  { href: '/', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/patients', label: 'Patients', icon: Users },
  { href: '/calls', label: 'Calls', icon: Phone },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, setSidebarOpen } = useApp();

  const sidebarVariants = {
    open: { x: 0, opacity: 1 },
    closed: { x: -280, opacity: 0 },
  };

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/50 z-30 md:hidden"
        />
      )}

      {/* Sidebar */}
      <motion.aside
        variants={sidebarVariants}
        initial={sidebarOpen ? 'open' : 'closed'}
        animate={sidebarOpen ? 'open' : 'closed'}
        transition={{ duration: 0.3, type: 'tween' }}
        className="fixed left-0 top-0 h-screen w-64 bg-card border-r border-white/10 z-40 flex flex-col pt-20 md:relative md:translate-x-0 md:z-10 md:pt-0"
      >
        <button
          onClick={() => setSidebarOpen(false)}
          className="absolute top-6 right-4 p-2 hover:bg-muted rounded-lg md:hidden"
        >
          <X className="w-5 h-5" />
        </button>

        <nav className="flex-1 px-4 py-6 space-y-2">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;

            return (
              <Link key={item.href} href={item.href}>
                <motion.div
                  whileHover={{ x: 4 }}
                  className={`relative flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-300 cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg shadow-purple-500/30'
                      : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  <Icon className="w-5 h-5" />
                  <span className="font-medium text-sm">{item.label}</span>
                  {isActive && (
                    <motion.div
                      layoutId="sidebar-indicator"
                      className="absolute left-0 top-0 bottom-0 w-1 bg-white rounded-r-lg"
                      initial={false}
                      transition={{ duration: 0.3 }}
                    />
                  )}
                </motion.div>
              </Link>
            );
          })}
        </nav>

        {/* Sidebar Footer */}
        <div className="px-4 py-6 border-t border-white/10">
          <motion.div
            whileHover={{ scale: 1.02 }}
            className="p-4 rounded-lg bg-gradient-to-r from-indigo-600/20 to-purple-600/20 border border-indigo-500/30 text-center"
          >
            <p className="text-xs font-semibold text-muted-foreground">Beta Version</p>
            <p className="text-xs text-muted-foreground mt-1">AI Medical Voice Scheduler</p>
          </motion.div>
        </div>
      </motion.aside>
    </>
  );
}
