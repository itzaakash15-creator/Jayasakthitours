import React from 'react';
import { Menu, Bell, Search, Sparkles, ExternalLink, Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export interface AdminHeaderProps {
  onToggleMobileMenu: () => void;
  activeTabTitle: string;
}

export const AdminHeader: React.FC<AdminHeaderProps> = ({
  onToggleMobileMenu,
  activeTabTitle,
}) => {
  return (
    <header className="sticky top-0 z-20 bg-white/85 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 transition-all">
      <div className="flex items-center justify-between gap-4">
        {/* Left Side: Mobile Toggle & Breadcrumb / Greeting */}
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            onClick={onToggleMobileMenu}
            className="lg:hidden p-2 rounded-xl text-slate-600 hover:text-brand-navy-950 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Open sidebar menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2">
              <h1 className="text-base sm:text-lg font-extrabold text-brand-navy-950 tracking-tight truncate">
                {activeTabTitle}
              </h1>
              <span className="hidden sm:inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-brand-teal-700 bg-brand-teal-50 border border-brand-teal-200/80 px-2 py-0.5 rounded-full">
                <Sparkles className="w-2.5 h-2.5" />
                Live Demo
              </span>
            </div>
            <p className="text-xs text-slate-500 truncate hidden sm:block">
              Good morning, Admin — Here is today’s journey enquiry overview.
            </p>
          </div>
        </div>

        {/* Right Side: Quick Site Link, Notification Bell, Admin Pill */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100/80 hover:bg-brand-sky-50 text-slate-600 hover:text-brand-sky-700 text-xs font-semibold border border-slate-200/80 hover:border-brand-sky-200 transition-all shadow-2xs"
          >
            <span>Live Website</span>
            <ExternalLink className="w-3 h-3 text-slate-400" />
          </Link>

          {/* Notifications */}
          <div className="relative">
            <button
              type="button"
              title="Notifications"
              className="relative p-2 rounded-xl text-slate-500 hover:text-brand-navy-950 hover:bg-slate-100/90 border border-transparent hover:border-slate-200 transition-colors"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-brand-sky-500 rounded-full ring-2 ring-white animate-pulse" />
            </button>
          </div>

          {/* Admin Avatar Pill */}
          <div className="flex items-center gap-2 pl-2 border-l border-slate-200">
            <div className="w-8 h-8 rounded-xl bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200 flex items-center justify-center font-bold text-xs shadow-2xs">
              AK
            </div>
            <div className="hidden xl:block text-left">
              <div className="text-xs font-bold text-brand-navy-950 leading-tight">
                Operations
              </div>
              <div className="text-[10px] text-slate-400 font-medium leading-none">
                Chennai HQ
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
