'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search } from 'lucide-react';
import AnimatedCard from '@/components/AnimatedCard';
import AnimatedButton from '@/components/AnimatedButton';
import PatientForm from '@/components/patients/PatientForm';
import PatientTable from '@/components/patients/PatientTable';
import { useApp } from '@/app/context/AppContext';
import { useAuth } from '@/app/context/AuthContext';
import { patientsAPI, callsAPI } from '@/app/services/api';

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

export default function PatientsPage() {
  const { patients, setPatients, showSnackbar, setLoading } = useApp();
  const { user, loading: authLoading } = useAuth();
  const [formOpen, setFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (user && !authLoading && patients.length === 0) {
      fetchPatients();
    }
  }, [user, authLoading]);

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await patientsAPI.getAll();
      setPatients(res.data || []);
    } catch (err) {
      console.error('Failed to fetch patients:', err);
    } finally {
      setLoading(false);
    }
  };

  const filteredPatients = patients.filter((patient) =>
    patient.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    patient.phone.includes(searchTerm) ||
    (patient.email && patient.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleAddPatient = async (formData) => {
    try {
      const res = await patientsAPI.create(formData);
      setPatients((prev) => [res.data, ...prev]);
    } catch (err) {
      const errorMsg = err.response?.data?.details || err.response?.data?.error || 'Failed to add patient';
      showSnackbar(errorMsg, 'error');
      throw err; // Re-throw for the Form component's catch block
    }
  };

  const handleStartCall = async (patient) => {
    showSnackbar(`Dialing ${patient.name}...`, 'info');
    try {
      await callsAPI.startCall(patient.id);
      setPatients(prev => prev.map(p => p.id === patient.id ? { ...p, status: 'called' } : p));
      showSnackbar(`Twilio is calling ${patient.name}!`, 'success');
    } catch (err) {
      showSnackbar('Failed to start call', 'error');
    }
  };

  const handleDeletePatient = async (patientId) => {
    try {
      await patientsAPI.delete(patientId);
      setPatients((prev) => prev.filter((p) => p.id !== patientId));
      showSnackbar('Patient deleted successfully', 'success');
    } catch (err) {
      showSnackbar('Failed to delete patient', 'error');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-light dark:bg-gradient-dark p-6 md:p-8">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold gradient-text mb-2">Patients</h1>
              <p className="text-muted-foreground">Manage and track patient information</p>
            </div>
            <AnimatedButton
              variant="primary"
              size="lg"
              onClick={() => setFormOpen(true)}
              className="flex items-center justify-center gap-2"
            >
              <Plus className="w-5 h-5" />
              Add Patient
            </AnimatedButton>
          </div>
        </motion.div>

        {/* Search Bar */}
        <motion.div variants={itemVariants} className="mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <motion.input
              whileFocus={{ scale: 1.02 }}
              type="text"
              placeholder="Search by name, phone, or email..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg bg-card border border-border text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary transition-all duration-300 shadow-sm"
            />
          </div>
        </motion.div>

        {/* Patients Table */}
        <motion.div variants={itemVariants}>
          <AnimatedCard className="overflow-hidden">
            <PatientTable
              patients={filteredPatients}
              onStartCall={handleStartCall}
              onDelete={handleDeletePatient}
            />
          </AnimatedCard>
        </motion.div>

        {/* Patient Form Modal */}
        <PatientForm
          open={formOpen}
          onClose={() => setFormOpen(false)}
          onSubmit={handleAddPatient}
        />
      </motion.div>
    </div>
  );
}
