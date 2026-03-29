'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Lock, UserPlus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import AnimatedButton from '@/components/AnimatedButton';
import { useAuth } from '@/app/context/AuthContext';
import { useApp } from '@/app/context/AppContext';

export default function SignupPage() {
  const { signUp } = useAuth();
  const { showSnackbar } = useApp();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      showSnackbar('Passwords do not match', 'error');
      return;
    }

    setLoading(true);
    try {
      await signUp(formData.email, formData.password);
      showSnackbar('Account created! Please check your email.', 'success');
    } catch (error) {
      showSnackbar(error.message, 'error');
    } finally {
      setLoading(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-light dark:bg-gradient-dark p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-indigo-600/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse delay-500" />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="w-full max-w-md bg-card/50 backdrop-blur-xl border border-white/10 rounded-2xl p-8 shadow-2xl relative z-10"
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <h1 className="text-4xl font-bold gradient-text mb-2">Create Account</h1>
          <p className="text-muted-foreground">Join MedVoice and simplify your medical practice</p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2 text-foreground/80">Email Address</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="doctor@medical.com"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2 text-foreground/80">New Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                required
                value={formData.password}
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants}>
            <label className="block text-sm font-medium mb-2 text-foreground/80">Confirm Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input
                type="password"
                required
                value={formData.confirmPassword}
                onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                className="w-full pl-10 pr-4 py-3 rounded-xl bg-muted/50 border border-white/5 focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all outline-none"
                placeholder="••••••••"
              />
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="pt-2">
            <AnimatedButton
              type="submit"
              variant="primary"
              size="lg"
              className="w-full flex items-center justify-center gap-2 group"
              isLoading={loading}
              disabled={loading}
            >
              Create My Account
              <UserPlus className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </AnimatedButton>
          </motion.div>
        </form>

        <motion.div variants={itemVariants} className="mt-8 text-center">
          <p className="text-muted-foreground">
            Already have an account?{' '}
            <Link href="/login" className="text-primary hover:underline font-medium inline-flex items-center gap-1 group">
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Sign In Instead
            </Link>
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
}
