/**
 * Jayashakthi Tours & Travels - Centralized Authentication Configuration
 *
 * NOTE FOR OPERATORS / DEVELOPERS:
 * This temporary authentication system provides server-side credential verification
 * for development and staging environments prior to connecting Supabase Auth.
 *
 * HOW TO CHANGE CREDENTIALS:
 * Set the following environment variables in Vercel (Project Settings -> Environment Variables)
 * or in your local .env file:
 *   ADMIN_EMAIL=jayashakthitourstravels@gmail.com
 *   ADMIN_PASSWORD=YourSecurePasswordHere
 *
 * HOW TO REPLACE WITH SUPABASE AUTH:
 * 1. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.
 * 2. AuthContext automatically switches to Supabase Auth when credentials are detected.
 * 3. No UI components or dashboard pages need to be modified.
 */

export const ADMIN_AUTH_CONFIG = {
  // Official administrator email
  defaultEmail: 'jayashakthitourstravels@gmail.com',

  // Fallback credentials used in local development when environment variables are not set
  defaultPassword: 'Jaya@7267',
  fallbackPasswordAlternative: 'jaya@7267',

  // Session storage key (cleared on browser close or logout)
  sessionStorageKey: 'jst_admin_session_v1',

  // Role assigned to authorized admin
  defaultRole: 'admin',
  defaultFullName: 'Operations Admin',
};
