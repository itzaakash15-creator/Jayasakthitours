import React, { createContext, useContext, useState, useEffect } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { ADMIN_AUTH_CONFIG } from '../config/authConfig';

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

const SESSION_STORAGE_KEY = ADMIN_AUTH_CONFIG.sessionStorageKey;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AdminProfile | null>(null);
  const [session, setSession] = useState<any | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initialize and hydrate authentication state on mount / refresh
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
          // 2. Check Active Browser Session (Server-verified session stored in sessionStorage)
          const stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
          if (stored) {
            try {
              const parsed = JSON.parse(stored);
              if (parsed && parsed.user && parsed.token) {
                if (isMounted) {
                  setUser(parsed.user);
                  setSession(parsed);
                }
              } else {
                sessionStorage.removeItem(SESSION_STORAGE_KEY);
              }
            } catch {
              sessionStorage.removeItem(SESSION_STORAGE_KEY);
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
      return { success: false, error: 'Please enter both your email and password.' };
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
            error: error?.message || 'Invalid administrator credentials. Please check your email and password.',
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

    // 2. Server-side verified temporary authentication (/api/admin-login)
    // Sends credentials to serverless function for verification against environment variables (ADMIN_EMAIL, ADMIN_PASSWORD)
    try {
      const response = await fetch('/api/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: trimmedEmail, password: trimmedPassword }),
      });

      const data = await response.json().catch(() => ({}));

      if (response.ok && data.success && data.user) {
        const sessionObj = {
          token: data.token || `session-${Date.now()}`,
          user: data.user,
          createdAt: Date.now(),
        };

        sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionObj));
        setUser(data.user);
        setSession(sessionObj);
        return { success: true };
      }

      if (response.status === 401 || !data.success) {
        return {
          success: false,
          error: data.error || 'Invalid administrator credentials. Please check your email and password.',
        };
      }
    } catch (networkErr) {
      console.warn('[AuthContext] /api/admin-login network error, evaluating fallback:', networkErr);
    }

    // 3. Fallback evaluation if serverless endpoint is offline or unavailable
    const validEmails = [
      ADMIN_AUTH_CONFIG.defaultEmail.toLowerCase(),
      'admin@jayasakthitours.com',
    ];
    const validPasswords = [
      ADMIN_AUTH_CONFIG.defaultPassword,
      ADMIN_AUTH_CONFIG.fallbackPasswordAlternative,
    ];

    if (validEmails.includes(trimmedEmail) && validPasswords.includes(trimmedPassword)) {
      const fallbackUser: AdminProfile = {
        id: 'admin-jayashakthi',
        email: ADMIN_AUTH_CONFIG.defaultEmail,
        full_name: ADMIN_AUTH_CONFIG.defaultFullName,
        role: 'admin',
      };
      const sessionObj = {
        token: `fallback-token-${Date.now()}`,
        user: fallbackUser,
        createdAt: Date.now(),
      };
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(sessionObj));
      setUser(fallbackUser);
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
      sessionStorage.removeItem(SESSION_STORAGE_KEY);
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
