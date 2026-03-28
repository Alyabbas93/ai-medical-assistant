'use client';

import { motion } from 'framer-motion';
import { Phone, Clock, CheckCircle2, Calendar } from 'lucide-react';
import AnimatedCard from '@/components/AnimatedCard';
import { useApp } from '@/app/context/AppContext';
import Link from 'next/link';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5 },
  },
};

export default function CallsPage() {
  const { calls } = useApp();

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const sortedCalls = [...calls].sort(
    (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
  );

  return (
    <div className="min-h-screen bg-gradient-dark dark:bg-gradient-dark p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Call History</h1>
          <p className="text-muted-foreground">View and manage all medical voice calls</p>
        </motion.div>

        {/* Call Timeline Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 gap-4"
        >
          {sortedCalls.length > 0 ? (
            sortedCalls.map((call, index) => (
              <motion.div key={call.id} variants={itemVariants}>
                <Link href={`/calls/${call.id}`}>
                  <AnimatedCard
                    className="cursor-pointer hover:shadow-lg hover:shadow-purple-500/20"
                    delay={index * 0.05}
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      {/* Call Info */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <motion.div
                            animate={{ rotate: [0, 10, -10, 0] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="p-2 rounded-lg bg-green-600/20 border border-green-500/30"
                          >
                            <Phone className="w-5 h-5 text-green-400" />
                          </motion.div>
                          <div>
                            <h3 className="text-lg font-bold text-foreground">{call.patientName}</h3>
                            <p className="text-sm text-muted-foreground flex items-center gap-2">
                              <Calendar className="w-4 h-4" />
                              {new Date(call.timestamp).toLocaleDateString()} at{' '}
                              {new Date(call.timestamp).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Call Details */}
                      <div className="flex flex-col md:flex-row gap-6 md:items-center">
                        {/* Duration */}
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <Clock className="w-4 h-4 text-blue-400" />
                            <span className="text-sm text-muted-foreground">Duration</span>
                          </div>
                          <p className="text-2xl font-bold text-blue-400">{formatDuration(call.duration)}</p>
                        </div>

                        {/* Status */}
                        <div className="text-center">
                          <div className="flex items-center justify-center gap-2 mb-1">
                            <CheckCircle2 className="w-4 h-4 text-green-400" />
                            <span className="text-sm text-muted-foreground">Status</span>
                          </div>
                          <motion.span
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-green-600/20 text-green-400 border border-green-500/30"
                          >
                            {call.status.charAt(0).toUpperCase() + call.status.slice(1)}
                          </motion.span>
                        </div>
                      </div>

                      {/* Arrow */}
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                        className="text-muted-foreground hidden md:block"
                      >
                        →
                      </motion.div>
                    </div>
                  </AnimatedCard>
                </Link>
              </motion.div>
            ))
          ) : (
            <motion.div variants={itemVariants}>
              <AnimatedCard className="text-center py-12">
                <motion.div
                  animate={{ y: [0, -5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="mb-4"
                >
                  <Phone className="w-12 h-12 text-muted-foreground mx-auto opacity-50" />
                </motion.div>
                <p className="text-muted-foreground text-lg">No calls yet</p>
                <p className="text-muted-foreground text-sm mt-2">
                  Start making calls to see them appear here
                </p>
              </AnimatedCard>
            </motion.div>
          )}
        </motion.div>
      </motion.div>
    </div>
  );
}
