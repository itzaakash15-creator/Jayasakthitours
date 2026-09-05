import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { business } from '../config/business';
import {
  Lock,
  Mail,
  Eye,
  EyeOff,
  ShieldCheck,
  AlertCircle,
  Loader2,
  ArrowRight,
  Compass,
} from 'lucide-react';
import {
  HeritageArchitectureSketch,
  PalmClusterSketch,
} from '../components/common/TravelDecorations';

export const AdminLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { user, login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect destination after successful login (default to /admin)
  const from = (location.state as any)?.from?.pathname || '/admin';

  // If already authenticated, redirect to /admin immediately
  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!email.trim() || !password.trim()) {
      setErrorMessage('Please enter both your email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const result = await login(email, password);

      if (result.success) {
        navigate(from, { replace: true });
      } else {
        setErrorMessage(result.error || 'Invalid credentials. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage(err.message || 'An unexpected error occurred during login.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full max-w-full bg-[#fcfaf7] flex flex-col justify-center py-8 sm:py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden select-none">
      {/* Strictly Clipped Ambient Background Decorations */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-10 -right-10 w-72 sm:w-96 h-72 sm:h-96 opacity-15">
          <HeritageArchitectureSketch className="w-full h-full text-brand-sky-400" />
        </div>
        <div className="absolute -bottom-10 -left-10 w-60 sm:w-80 h-60 sm:h-80 opacity-15">
          <PalmClusterSketch className="w-full h-full text-brand-teal-400" />
        </div>
        <div className="hidden sm:block absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-gradient-to-br from-brand-sky-100/40 via-brand-teal-50/30 to-transparent rounded-full blur-3xl" />
      </div>

      {/* Main Content Container */}
      <div className="w-full max-w-md min-w-0 mx-auto relative z-10">
        {/* Brand & Logo Header */}
        <div className="text-center space-y-3 mb-6 sm:mb-8">
          <Link
            to="/"
            className="inline-flex items-center justify-center p-2 rounded-2xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-all group"
          >
            <img
              src={business.logo}
              alt="Jayashakthi Tours Logo"
              className="h-12 sm:h-14 w-auto object-contain group-hover:scale-105 transition-transform duration-300"
            />
          </Link>

          <div>
            <div className="flex items-center justify-center gap-1.5 mt-2">
              <h1 className="font-display font-extrabold text-2xl tracking-tight text-brand-navy-950">
                JAYASHAKTHI
              </h1>
              <span className="text-[10px] font-bold uppercase tracking-wider bg-brand-teal-50 text-brand-teal-700 border border-brand-teal-200 px-2 py-0.5 rounded">
                Admin
              </span>
            </div>
            <p className="text-xs font-semibold tracking-widest text-slate-400 uppercase mt-0.5">
              Tours &amp; Travels Portal
            </p>
          </div>
        </div>

        {/* Login Card */}
        <div className="w-full min-w-0 bg-white/95 backdrop-blur-sm py-7 sm:py-8 px-5 sm:px-8 rounded-3xl border border-slate-200/90 shadow-soft-xl space-y-5 sm:space-y-6">
          <div className="text-center space-y-1 pb-2 border-b border-slate-100">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-slate-100 text-slate-600 text-[11px] font-semibold">
              <ShieldCheck className="w-3.5 h-3.5 text-brand-teal-600" />
              <span>Protected Administrator Access</span>
            </div>
            <h2 className="text-lg font-bold text-brand-navy-950 pt-1">
              Sign In to Admin Portal
            </h2>
            <p className="text-xs text-slate-500 max-w-xs mx-auto leading-relaxed">
              Enter your authorized administrative credentials to manage enquiries and gallery.
            </p>
          </div>

          {/* Error Message Alert */}
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-start gap-2.5 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span className="leading-relaxed font-medium">{errorMessage}</span>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-email"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Administrator Email
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-email"
                  type="email"
                  autoComplete="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="jayashakthitourstravels@gmail.com"
                  disabled={isLoading}
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all font-medium placeholder:text-slate-400 text-slate-900"
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1.5">
              <label
                htmlFor="admin-password"
                className="block text-xs font-bold text-slate-700 uppercase tracking-wider"
              >
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••••••"
                  disabled={isLoading}
                  className="w-full pl-10 pr-11 py-2.5 text-xs sm:text-sm rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all font-medium placeholder:text-slate-400 text-slate-900"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  disabled={isLoading}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-1 text-slate-400 hover:text-slate-600 transition-colors"
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-4 h-4" />
                  ) : (
                    <Eye className="w-4 h-4" />
                  )}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 hover:from-brand-sky-500 hover:to-brand-teal-500 disabled:opacity-60 text-white font-bold text-xs sm:text-sm shadow-soft hover:shadow-soft-lg active:scale-[0.98] transition-all cursor-pointer"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Signing in to portal...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In to Admin Portal</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </form>

          {/* Security Notice Footer */}
          <div className="pt-4 border-t border-slate-100 text-center space-y-2">
            <p className="text-[11px] text-slate-400 max-w-xs mx-auto leading-relaxed">
              Access restricted to authorized personnel. All administrative activities are logged.
            </p>
            <div className="text-[11px]">
              <Link
                to="/"
                className="text-brand-sky-700 hover:underline font-semibold"
              >
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
