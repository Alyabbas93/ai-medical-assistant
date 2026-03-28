'use client';

import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { Users, Phone, CheckCircle2, Clock } from 'lucide-react';
import StatCard from '@/components/dashboard/StatCard';
import AnimatedCard from '@/components/AnimatedCard';
import AnimatedButton from '@/components/AnimatedButton';
import { useApp } from '@/app/context/AppContext';
import { patientsAPI, callsAPI } from '@/app/services/api';
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

export default function Dashboard() {
  const { patients, setPatients, calls, setCalls, setLoading, showSnackbar } = useApp();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      
      const [patientsRes, callsRes] = await Promise.all([
        patientsAPI.getAll(),
        callsAPI.getAll()
      ]);

      setPatients(patientsRes.data || []);
      setCalls(callsRes.data || []);
    } catch (error) {
      console.error('Failed to fetch data:', error);
      showSnackbar('Failed to connect to backend', 'error');
    } finally {
      setLoading(false);
    }
  };

  const stats = [
    {
      icon: Users,
      label: 'Total Patients',
      value: patients.length,
      trend: '+12%',
      glowColor: 'glow-indigo',
    },
    {
      icon: Phone,
      label: 'Total Calls',
      value: calls.length,
      trend: '+8%',
      glowColor: 'glow-purple',
    },
    {
      icon: CheckCircle2,
      label: 'Completed',
      value: calls.filter((c) => c.status === 'completed').length,
      trend: '+15%',
      glowColor: 'glow-cyan',
    },
    {
      icon: Clock,
      label: 'Avg Duration',
      value: calls.length > 0 ? Math.round(calls.reduce((acc, c) => acc + c.duration, 0) / calls.length) : 0,
      trend: '+3%',
      glowColor: 'glow-indigo',
    },
  ];

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
          <h1 className="text-4xl font-bold gradient-text mb-2">Welcome Back</h1>
          <p className="text-muted-foreground">Monitor your medical voice calls in real-time</p>
        </motion.div>

        {/* Stats Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        >
          {stats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))}
        </motion.div>

        {/* Recent Activity Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Calls */}
          <motion.div variants={itemVariants} className="lg:col-span-2">
            <AnimatedCard className="h-full">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Recent Calls</h2>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="w-3 h-3 rounded-full bg-green-500 pulse-status"
                />
              </div>

              {calls.length > 0 ? (
                <div className="space-y-3">
                  {calls.slice(0, 5).map((call, index) => (
                    <motion.div
                      key={call.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      whileHover={{ x: 4 }}
                      className="p-4 rounded-lg bg-muted/30 border border-white/5 hover:border-primary/30 transition-all"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1">
                          <p className="font-medium text-foreground">{call.patientName}</p>
                          <p className="text-xs text-muted-foreground">{call.timestamp}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-green-500">{call.duration}s</p>
                          <p className="text-xs text-muted-foreground uppercase tracking-wide">Completed</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              ) : (
                <div className="flex items-center justify-center py-8">
                  <p className="text-muted-foreground">No calls yet</p>
                </div>
              )}
            </AnimatedCard>
          </motion.div>

          {/* Quick Actions */}
          <motion.div variants={itemVariants}>
            <AnimatedCard>
              <h2 className="text-xl font-bold mb-6">Quick Actions</h2>
              <div className="space-y-3">
                <Link href="/patients" className="block">
                  <AnimatedButton variant="primary" size="lg" className="w-full">
                    Start New Call
                  </AnimatedButton>
                </Link>
                <Link href="/patients" className="block">
                  <AnimatedButton variant="secondary" size="lg" className="w-full">
                    Add Patient
                  </AnimatedButton>
                </Link>
                <Link href="/calls" className="block">
                  <AnimatedButton variant="secondary" size="lg" className="w-full">
                    View Reports
                  </AnimatedButton>
                </Link>
              </div>

              {/* Activity Stats */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <h3 className="text-sm font-semibold mb-4">Activity This Week</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Calls Made</p>
                    <p className="font-bold">{calls.length}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Patients Reached</p>
                    <p className="font-bold">{patients.length}</p>
                  </div>
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="font-bold text-green-500">98%</p>
                  </div>
                </div>
              </div>
            </AnimatedCard>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
