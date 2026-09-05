import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  LayoutDashboard,
  CalendarCheck2,
  Users,
  Compass,
  Images,
  Star,
  Settings,
  LogOut,
  ExternalLink,
  X,
  ShieldCheck,
} from 'lucide-react';
import { business } from '../../config/business';
import { useAuth } from '../../context/AuthContext';

export interface AdminSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isOpenMobile: boolean;
  setIsOpenMobile: (open: boolean) => void;
}

interface NavItem {
  id: string;
  label: string;
  icon: React.ElementType;
  badge?: string | number;
}

export const AdminSidebar: React.FC<AdminSidebarProps> = ({
  activeTab,
  setActiveTab,
  isOpenMobile,
  setIsOpenMobile,
}) => {
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'enquiries', label: 'Booking Enquiries', icon: CalendarCheck2, badge: 'Live' },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'packages', label: 'Tour Packages', icon: Compass },
    { id: 'gallery', label: 'Gallery Management', icon: Images, badge: 'New' },
    { id: 'reviews', label: 'Reviews', icon: Star },
    { id: 'settings', label: 'Website Settings', icon: Settings },
  ];

  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
    navigate('/admin/login', { replace: true });
  };

  const handleNavClick = (id: string) => {
    setActiveTab(id);
    setIsOpenMobile(false);
  };

  const displayName = user?.full_name || 'Aakash K';
  const displayRole = user?.role === 'admin' ? 'Operations Admin' : 'Staff Member';
  const initials = displayName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase() || 'AK';

  const sidebarContent = (
    <div className="flex flex-col h-full bg-[#fcfcfb] border-r border-slate-200/90 select-none">
      {/* Brand & Logo Header */}
      <div className="px-5 py-5 border-b border-slate-200/80 bg-white/70">
        <div className="flex items-center justify-between">
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 group"
            title="View live website"
          >
            <div className="w-10 h-10 rounded-xl bg-brand-sky-50/80 border border-brand-sky-100 flex items-center justify-center p-1 shadow-2xs group-hover:border-brand-sky-300 transition-colors">
              <img
                src={business.logo}
                alt="Jayashakthi Tours Logo"
                className="h-8 w-auto object-contain"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="font-display font-extrabold text-sm tracking-tight text-brand-navy-950 group-hover:text-brand-sky-700 transition-colors">
                  JAYASHAKTHI
                </span>
                <span className="text-[9px] font-bold uppercase tracking-wider bg-brand-teal-50 text-brand-teal-700 border border-brand-teal-200/70 px-1.5 py-0.5 rounded">
                  Admin
                </span>
              </div>
              <p className="text-[10px] font-semibold tracking-widest text-slate-400 uppercase">
                Tours &amp; Travels Portal
              </p>
            </div>
          </Link>

          {/* Mobile close button */}
          <button
            onClick={() => setIsOpenMobile(false)}
            className="lg:hidden p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
            aria-label="Close navigation"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Navigation List */}
      <div className="flex-1 py-4 px-3 space-y-1 overflow-y-auto">
        <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Management
        </div>

        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => handleNavClick(item.id)}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-semibold transition-all duration-200 group text-left ${
                isActive
                  ? 'bg-brand-sky-50/90 text-brand-navy-950 font-bold shadow-2xs border border-brand-sky-200/70'
                  : 'text-slate-600 hover:text-brand-navy-950 hover:bg-slate-100/70'
              }`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center transition-colors ${
                    isActive
                      ? 'bg-brand-sky-600 text-white shadow-2xs'
                      : 'text-slate-400 group-hover:text-brand-navy-950 group-hover:bg-white'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                </div>
                <span>{item.label}</span>
              </div>

              {item.badge && (
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                    isActive
                      ? 'bg-brand-sky-600 text-white'
                      : item.badge === 'New'
                      ? 'bg-amber-100 text-amber-800'
                      : 'bg-slate-200/70 text-slate-700'
                  }`}
                >
                  {item.badge}
                </span>
              )}
            </button>
          );
        })}

        {/* Live Website Quick Action */}
        <div className="pt-4 mt-4 border-t border-slate-200/70">
          <div className="px-3 pb-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            Public Website
          </div>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium text-slate-600 hover:text-brand-sky-700 hover:bg-brand-sky-50/60 transition-colors group"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-sky-600" />
              <span>Visit Website</span>
            </span>
            <span className="text-[10px] text-slate-400 font-mono">↗</span>
          </Link>
        </div>
      </div>

      {/* Admin Profile & Logout Section */}
      <div className="p-3 border-t border-slate-200/80 bg-white/80">
        <div className="p-2.5 rounded-2xl bg-slate-50 border border-slate-200/70 flex items-center justify-between gap-2 shadow-2xs">
          <div className="flex items-center gap-2.5 min-w-0">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-sky-600 to-brand-teal-600 text-white font-bold text-xs flex items-center justify-center shrink-0 shadow-2xs">
              {initials}
            </div>
            <div className="min-w-0">
              <div className="text-xs font-bold text-brand-navy-950 truncate flex items-center gap-1">
                <span>{displayName}</span>
                <ShieldCheck className="w-3.5 h-3.5 text-brand-teal-600 shrink-0" />
              </div>
              <p className="text-[10px] text-slate-500 truncate">{displayRole}</p>
            </div>
          </div>

          <button
            type="button"
            title="Sign out of Admin Portal"
            onClick={handleLogout}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Fixed Sidebar */}
      <aside className="hidden lg:block fixed inset-y-0 left-0 w-64 z-30 shadow-2xs">
        {sidebarContent}
      </aside>

      {/* Mobile Slide-Out Drawer */}
      {isOpenMobile && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity"
            onClick={() => setIsOpenMobile(false)}
          />

          {/* Drawer Panel */}
          <div className="relative w-72 max-w-[85vw] h-full shadow-2xl z-10 animate-slideRight">
            {sidebarContent}
          </div>
        </div>
      )}
    </>
  );
};
