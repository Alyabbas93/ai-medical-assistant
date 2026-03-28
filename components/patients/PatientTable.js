'use client';

import { motion } from 'framer-motion';
import { Phone, Eye, Trash2 } from 'lucide-react';
import AnimatedButton from '@/components/AnimatedButton';
import Link from 'next/link';

const statusStyles = {
  pending: 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30 glow-yellow',
  called: 'bg-blue-500/20 text-blue-400 border border-blue-500/30 glow-blue',
  completed: 'bg-green-500/20 text-green-400 border border-green-500/30 glow-green',
};

const statusIcons = {
  pending: '◯',
  called: '◐',
  completed: '●',
};

export default function PatientTable({ patients, onStartCall, onDelete }) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.05,
      },
    },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="overflow-x-auto">
      <motion.table
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full"
      >
        <thead>
          <tr className="border-b border-white/10 sticky top-0 bg-card/50 backdrop-blur">
            <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Name</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Phone</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Email</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Status</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Last Call</th>
            <th className="text-left px-4 py-3 text-sm font-semibold text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {patients.length > 0 ? (
            patients.map((patient, index) => (
              <motion.tr
                key={patient.id}
                variants={rowVariants}
                whileHover={{
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  transition: { duration: 0.2 },
                }}
                className="border-b border-white/5 hover:bg-muted/30 transition-colors"
              >
                <td className="px-4 py-4">
                  <p className="font-medium text-foreground">{patient.name}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-muted-foreground">{patient.phone}</p>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-muted-foreground">{patient.email || '—'}</p>
                </td>
                <td className="px-4 py-4">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: index * 0.05 + 0.1 }}
                    className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold ${statusStyles[patient.status]}`}
                  >
                    <span className="pulse-status w-2 h-2 bg-current">{statusIcons[patient.status]}</span>
                    {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
                  </motion.span>
                </td>
                <td className="px-4 py-4">
                  <p className="text-sm text-muted-foreground">{patient.lastCall || '—'}</p>
                </td>
                <td className="px-4 py-4">
                  <div className="flex items-center gap-2">
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onStartCall(patient)}
                      className="p-2 rounded-lg bg-green-600/20 text-green-400 border border-green-500/30 hover:bg-green-600/30 transition-all duration-300"
                      title="Start Call"
                    >
                      <Phone className="w-4 h-4" />
                    </motion.button>
                    <Link href={`/calls/${patient.id}`}>
                      <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        className="p-2 rounded-lg bg-blue-600/20 text-blue-400 border border-blue-500/30 hover:bg-blue-600/30 transition-all duration-300"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </motion.button>
                    </Link>
                    <motion.button
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onDelete(patient.id)}
                      className="p-2 rounded-lg bg-red-600/20 text-red-400 border border-red-500/30 hover:bg-red-600/30 transition-all duration-300"
                      title="Delete"
                    >
                      <Trash2 className="w-4 h-4" />
                    </motion.button>
                  </div>
                </td>
              </motion.tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-12 text-center">
                <p className="text-muted-foreground">No patients yet. Add your first patient to get started!</p>
              </td>
            </tr>
          )}
        </tbody>
      </motion.table>
    </div>
  );
}
