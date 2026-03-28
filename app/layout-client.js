'use client';

import { AppProvider } from '@/app/context/AppContext';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Snackbar from '@/components/Snackbar';

export default function RootLayoutClient({ children }) {
  return (
    <AppProvider>
      <div className="flex h-screen overflow-hidden">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
      <Snackbar />
    </AppProvider>
  );
}
