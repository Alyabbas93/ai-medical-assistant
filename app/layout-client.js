'use client';

import { AppProvider } from '@/app/context/AppContext';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { ThemeProvider } from '@/components/theme-provider';
import Header from '@/components/layout/Header';
import Sidebar from '@/components/layout/Sidebar';
import Snackbar from '@/components/Snackbar';
import { usePathname } from 'next/navigation';

function LayoutContent({ children }) {
  const { user, loading } = useAuth();
  const pathname = usePathname();
  const isAuthPage = pathname === '/login' || pathname === '/signup';

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (isAuthPage) {
    return <>{children}</>;
  }

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <Header />
        <main className="flex-1 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}

export default function RootLayoutClient({ children }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <AuthProvider>
        <AppProvider>
          <LayoutContent>{children}</LayoutContent>
          <Snackbar />
        </AppProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
