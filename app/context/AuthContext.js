'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { useRouter, usePathname } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    // Check initial session
    const checkSession = async () => {
      try {
        // Use getUser instead of getSession to force a backend check
        const { data: { user: supabaseUser }, error } = await supabase.auth.getUser();
        
        if (error) {
          console.warn('Auth check returned error (likely backend unreachable):', error.message);
          setUser(null);
          if (pathname !== '/login' && pathname !== '/signup') {
            router.push('/login');
          }
          return;
        }

        setUser(supabaseUser ?? null);
        if (!supabaseUser && pathname !== '/login' && pathname !== '/signup') {
          router.push('/login');
        }
      } catch (err) {
        console.error('Fatal auth check failed:', err);
        setUser(null);
        if (pathname !== '/login' && pathname !== '/signup') {
          router.push('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    checkSession();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
      setLoading(false);
      
      if (!session && pathname !== '/login' && pathname !== '/signup') {
        router.push('/login');
      }
      if (session && (pathname === '/login' || pathname === '/signup')) {
        router.push('/');
      }
    });

    return () => {
      subscription?.unsubscribe();
    };
  }, [pathname, router]);

  const signIn = async (email, password) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signUp = async (email, password) => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });
    if (error) throw error;
    return data;
  };

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) throw error;
    router.push('/login');
  };

  const value = {
    user,
    loading,
    signIn,
    signUp,
    signOut,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
