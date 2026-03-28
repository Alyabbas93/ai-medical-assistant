'use client';

import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { Phone, Download, Copy, ArrowLeft } from 'lucide-react';
import AnimatedCard from '@/components/AnimatedCard';
import AnimatedButton from '@/components/AnimatedButton';
import { useApp } from '@/app/context/AppContext';
import { callsAPI } from '@/app/services/api';
import Link from 'next/link';
import { useParams } from 'next/navigation';

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

const messageVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3 },
  },
};

export default function CallDetailsPage() {
  const params = useParams();
  const callId = params.id;
  const { calls, showSnackbar } = useApp();
  const [callData, setCallData] = useState(null);
  const [messages, setMessages] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const fetchCallDetails = async () => {
      try {
        const res = await callsAPI.get(callId);
        if (res.data) {
          setCallData(res.data);
          setMessages(res.data.messages || []);
        }
      } catch (err) {
        showSnackbar('Failed to load call transcript', 'error');
      }
    };
    if (callId) fetchCallDetails();
  }, [callId, showSnackbar]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!callData) {
    return (
      <div className="min-h-screen bg-gradient-dark dark:bg-gradient-dark p-6 md:p-8 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Call not found</p>
          <Link href="/calls">
            <AnimatedButton variant="primary" className="mt-4">
              Back to Calls
            </AnimatedButton>
          </Link>
        </div>
      </div>
    );
  }

  const formatDuration = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const handleCopyTranscript = () => {
    const transcript = messages.map((m) => `${m.sender === 'ai' ? 'AI' : 'User'}: ${m.text}`).join('\n');
    navigator.clipboard.writeText(transcript);
    showSnackbar('Transcript copied to clipboard', 'success');
  };

  return (
    <div className="min-h-screen bg-gradient-dark dark:bg-gradient-dark p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl mx-auto"
      >
        {/* Back Button */}
        <motion.div variants={itemVariants} className="mb-6">
          <Link href="/calls" className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Calls
          </Link>
        </motion.div>

        {/* Call Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <AnimatedCard>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <motion.div
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="p-3 rounded-lg bg-gradient-to-r from-green-600/20 to-emerald-600/20 border border-green-500/30"
                  >
                    <Phone className="w-6 h-6 text-green-400" />
                  </motion.div>
                  <div>
                    <h1 className="text-3xl font-bold text-foreground">{callData.patientName}</h1>
                    <p className="text-muted-foreground">
                      {new Date().toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/30 border border-white/5">
                  <p className="text-sm text-muted-foreground mb-2">Duration</p>
                  <p className="text-2xl font-bold text-blue-400">{formatDuration(callData.duration)}</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/30 border border-white/5">
                  <p className="text-sm text-muted-foreground mb-2">Status</p>
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="inline-block px-3 py-1 rounded-full text-sm font-semibold bg-green-600/20 text-green-400 border border-green-500/30"
                  >
                    {callData.status.charAt(0).toUpperCase() + callData.status.slice(1)}
                  </motion.span>
                </div>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Conversation */}
        <motion.div variants={itemVariants} className="mb-8">
          <AnimatedCard className="h-96 overflow-y-auto flex flex-col">
            <h2 className="text-lg font-bold mb-4 sticky top-0 bg-card pb-4 border-b border-white/10">
              Conversation
            </h2>

            <div className="flex-1 space-y-4 p-4">
              {messages.map((message, index) => (
                <motion.div
                  key={message.id}
                  variants={messageVariants}
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: index * 0.1 }}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${
                      message.sender === 'user'
                        ? 'bg-indigo-600/30 text-indigo-100 border border-indigo-500/30'
                        : 'bg-muted/50 text-muted-foreground border border-white/10'
                    }`}
                  >
                    <p className="text-sm">{message.text}</p>
                    <p className="text-xs mt-1 opacity-70">
                      {message.timestamp}
                    </p>
                  </div>
                </motion.div>
              ))}
              <div ref={messagesEndRef} />
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Call Metadata */}
        <motion.div variants={itemVariants} className="mb-8">
          <AnimatedCard>
            <h2 className="text-lg font-bold mb-4">Call Details</h2>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="p-4 rounded-lg bg-muted/30 border border-white/5">
                <p className="text-xs text-muted-foreground mb-2">Call ID</p>
                <p className="font-mono text-sm break-all">CALL-{callData.id}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-white/5">
                <p className="text-xs text-muted-foreground mb-2">Duration</p>
                <p className="font-semibold">{formatDuration(callData.duration)}</p>
              </div>
              <div className="p-4 rounded-lg bg-muted/30 border border-white/5">
                <p className="text-xs text-muted-foreground mb-2">Status</p>
                <p className="font-semibold capitalize">{callData.status}</p>
              </div>
            </div>
          </AnimatedCard>
        </motion.div>

        {/* Actions */}
        <motion.div variants={itemVariants} className="flex gap-3">
          <AnimatedButton variant="primary" size="lg" className="flex-1 flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Download Transcript
          </AnimatedButton>
          <AnimatedButton
            variant="secondary"
            size="lg"
            onClick={handleCopyTranscript}
            className="flex-1 flex items-center justify-center gap-2"
          >
            <Copy className="w-5 h-5" />
            Copy Transcript
          </AnimatedButton>
        </motion.div>
      </motion.div>
    </div>
  );
}
