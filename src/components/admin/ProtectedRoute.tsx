import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { business } from '../../config/business';
import { ShieldCheck, Loader2 } from 'lucide-react';

export interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, isLoading } = useAuth();
  const location = useLocation();

  // 1. While hydrating authentication session, show a calm branded loader (never flash admin data)
  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#fcfaf7] flex flex-col items-center justify-center p-4 select-none">
        <div className="text-center space-y-4 animate-fadeIn">
          <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200/90 flex items-center justify-center p-2.5 mx-auto shadow-soft">
            <img
              src={business.logo}
              alt="Jayashakthi Tours"
              className="h-full w-auto object-contain"
            />
          </div>

          <div className="space-y-1.5">
            <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-navy-950">
              <ShieldCheck className="w-4 h-4 text-brand-teal-600" />
              <span>Admin Security Verification</span>
            </div>
            <p className="text-xs text-slate-400">
              Validating authorized administrative session...
            </p>
          </div>

          <div className="pt-2 flex justify-center">
            <Loader2 className="w-5 h-5 text-brand-sky-600 animate-spin" />
          </div>
        </div>
      </div>
    );
  }

  // 2. If not authenticated or session invalid, redirect immediately to /admin/login
  if (!user) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // 3. Render authenticated admin content
  return <>{children}</>;
};

export default ProtectedRoute;
