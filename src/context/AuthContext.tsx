import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

export interface AdminProfile {
  id: string;
  email: string;
  full_name: string;
  role: 'admin' | 'staff';
}

export interface AuthContextType {
  user: AdminProfile | null;
  session: any | null;
  isLoading: boolean;
  isAdmin: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const LOCAL_SESSION_KEY = 'jst_admin_session_v1';

// Default initial authorized administrative account for local execution
const DEFAULT_LOCAL_ADMIN: AdminProfile = {
  id: 'admin-001',
  email: 'admin@jayasakthitours.com',
  full_name: 'Aakash K',
  role: 'admin',
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminProfile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and hydrate authentication state
  useEffect(() => {
    let isMounted = true;

    const initializeAuth = async () => {
      try {
        if (isSupabaseConfigured && supabase) {
          // 1. Check Supabase Auth Session
          const { data: { session: currentSession } } = await supabase.auth.getSession();

          if (currentSession?.user) {
            // Verify admin authorization from admin_users table
            const { data: profile, error } = await supabase
              .from('admin_users')
              .select('*')
              .eq('id', currentSession.user.id)
              .single();

            if (!error && profile && (profile.role === 'admin' || profile.role === 'staff')) {
              if (isMounted) {
                setUser({
                  id: profile.id,
                  email: profile.email || currentSession.user.email || '',
                  full_name: profile.full_name || 'Administrator',
                  role: profile.role,
                });
                setSession(currentSession);
              }
            } else {
              // User exists in auth but lacks admin role authorization
              await supabase.auth.signOut();
              if (isMounted) {
                setUser(null);
                setSession(null);
              }
            }
          }
        } else {
          // 2. Check Local Fallback Session (Development & Offline)
          const stored = localStorage.getItem(LOCAL_SESSION_KEY);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed && parsed.user && parsed.expiresAt > Date.now()) {
                if (isMounted) {
                  setUser(parsed.user);
                  setSession(parsed.session || { token: 'mock-token' });
                }
              } else {
                localStorage.removeItem(LOCAL_SESSION_KEY);
              }
            } catch {
              localStorage.removeItem(LOCAL_SESSION_KEY);
            }
          }
        }
      } catch (err) {
        console.warn('[AuthContext] Initialization error:', err);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    initializeAuth();

    // Listen for Supabase auth state changes
    if (isSupabaseConfigured && supabase) {
      const client = supabase;
      const { data: { subscription } } = client.auth.onAuthStateChange(
        async (event, newSession) => {
          if (event === 'SIGNED_OUT' || !newSession) {
            setUser(null);
            setSession(null);
          } else if (newSession?.user) {
            const { data: profile } = await client
              .from('admin_users')
              .select('*')
              .eq('id', newSession.user.id)
              .single();

            if (profile && (profile.role === 'admin' || profile.role === 'staff')) {
              setUser({
                id: profile.id,
                email: profile.email,
                full_name: profile.full_name,
                role: profile.role,
              });
              setSession(newSession);
            }
          }
        }
      );

      return () => {
        isMounted = false;
        subscription.unsubscribe();
      };
    }

    return () => {
      isMounted = false;
    };
  }, []);

  const login = async (
    emailInput: string,
    passwordInput: string
  ): Promise<{ success: boolean; error?: string }> => {
    const trimmedEmail = emailInput.trim().toLowerCase();
    const trimmedPassword = passwordInput.trim();

    if (!trimmedEmail || !trimmedPassword) {
      return { success: false, error: 'Please enter both email and password.' };
    }

    // 1. If Supabase is configured, use Supabase Auth
    if (isSupabaseConfigured && supabase) {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email: trimmedEmail,
          password: trimmedPassword,
        });

        if (error || !data.user) {
          return {
            success: false,
            error: error?.message || 'Invalid email or password.',
          };
        }

        // Verify authorization in admin_users table
        const { data: profile, error: profileErr } = await supabase
          .from('admin_users')
          .select('*')
          .eq('id', data.user.id)
          .single();

        if (profileErr || !profile || (profile.role !== 'admin' && profile.role !== 'staff')) {
          await supabase.auth.signOut();
          return {
            success: false,
            error: 'Access restricted. This account does not have administrator privileges.',
          };
        }

        const adminProfile: AdminProfile = {
          id: profile.id,
          email: profile.email,
          full_name: profile.full_name || 'Administrator',
          role: profile.role,
        };

        setUser(adminProfile);
        setSession(data.session);
        return { success: true };
      } catch (err: any) {
        return {
          success: false,
          error: err.message || 'Authentication service error. Please try again.',
        };
      }
    }

    // 2. Development fallback authentication
    // Validates against authorized administrator email
    const authorizedEmails = [
      'admin@jayasakthitours.com',
      'jayashakthitourstravels@gmail.com',
    ];

    if (
      authorizedEmails.includes(trimmedEmail) &&
      (trimmedPassword === 'Admin@Jayashakthi2026' || trimmedPassword === 'admin123' || trimmedPassword === 'jayashakthi2026')
    ) {
      const adminProfile: AdminProfile = {
        id: 'admin-001',
        email: trimmedEmail,
        full_name: 'Aakash K',
        role: 'admin',
      };

      const sessionObj = {
        token: `mock-session-${Date.now()}`,
        user: adminProfile,
        expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
      };

      localStorage.setItem(LOCAL_SESSION_KEY, JSON.stringify(sessionObj));
      setUser(adminProfile);
      setSession(sessionObj);
      return { success: true };
    }

    return {
      success: false,
      error: 'Invalid administrator credentials. Please check your email and password.',
    };
  };

  const logout = async (): Promise<void> => {
    try {
      if (isSupabaseConfigured && supabase) {
        await supabase.auth.signOut();
      }
    } catch (err) {
      console.warn('[AuthContext] Sign out error:', err);
    } finally {
      localStorage.removeItem(LOCAL_SESSION_KEY);
      setUser(null);
      setSession(null);
    }
  };

  const isAdmin = user?.role === 'admin';

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        isLoading,
        isAdmin,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
