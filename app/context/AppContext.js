'use client';

import { createContext, useContext, useState, useCallback } from 'react';

const AppContext = createContext();

export function AppProvider({ children }) {
  const [patients, setPatients] = useState([]);
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', type: 'success' });
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const showSnackbar = useCallback((message, type = 'success') => {
    setSnackbar({ open: true, message, type });
    setTimeout(() => {
      setSnackbar({ open: false, message: '', type: 'success' });
    }, 3000);
  }, []);

  const value = {
    patients,
    setPatients,
    calls,
    setCalls,
    loading,
    setLoading,
    snackbar,
    showSnackbar,
    sidebarOpen,
    setSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within AppProvider');
  }
  return context;
}
