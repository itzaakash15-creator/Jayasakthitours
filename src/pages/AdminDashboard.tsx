import React, { useState, useEffect } from 'react';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminStatCards } from '../components/admin/AdminStatCards';
import { BookingEnquiriesSection } from '../components/admin/BookingEnquiriesSection';
import { BookingDetailModal } from '../components/admin/BookingDetailModal';
import { RecentActivityCard } from '../components/admin/RecentActivityCard';
import {
  initialMockEnquiries,
  initialMockActivities,
  initialDashboardStats,
  BookingEnquiry,
  BookingStatus,
  AdminActivity,
} from '../data/mockAdminData';
import {
  Users,
  Compass,
  Star,
  Settings,
  Database,
  ShieldCheck,
  CheckCircle2,
  CalendarCheck2,
} from 'lucide-react';
import { business } from '../config/business';

export const AdminDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);
  const [enquiries, setEnquiries] = useState<BookingEnquiry[]>(initialMockEnquiries);
  const [activities, setActivities] = useState<AdminActivity[]>(initialMockActivities);
  const [selectedEnquiry, setSelectedEnquiry] = useState<BookingEnquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');

  // Deep-link support: ?enquiry=JS-2026-1048
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const enquiryParam = params.get('enquiry');
    if (enquiryParam) {
      const match = enquiries.find((e) => e.id === enquiryParam);
      if (match) {
        setSelectedEnquiry(match);
      }
    }
  }, [enquiries]);

  // Compute dynamic stats based on current enquiries state with realistic agency totals
  const baseNew = enquiries.filter((e) => e.status === 'New').length;
  const baseContacted = enquiries.filter((e) => e.status === 'Contacted').length;
  const baseConfirmed = enquiries.filter((e) => e.status === 'Confirmed').length;

  const computedStats = {
    totalEnquiries: initialDashboardStats.totalEnquiries + (enquiries.length - initialMockEnquiries.length),
    totalChange: '+14% from last month',
    newEnquiries: 11 + baseNew,
    newChange: 'Requires quick follow-up',
    contacted: 43 + baseContacted,
    contactedChange: 'In active coordination',
    confirmedTrips: 84 + baseConfirmed,
    confirmedChange: 'Vehicles & stays assigned',
  };

  // Handle status update from side panel or row
  const handleUpdateStatus = (id: string, newStatus: BookingStatus) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, status: newStatus } : item))
    );

    // Update selected enquiry in modal
    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status: newStatus } : null));
    }

    // Append to live activity feed
    const targetEnquiry = enquiries.find((e) => e.id === id);
    if (targetEnquiry) {
      const newActivity: AdminActivity = {
        id: `act-${Date.now()}`,
        type:
          newStatus === 'Confirmed'
            ? 'trip_confirmed'
            : newStatus === 'Contacted'
            ? 'customer_contacted'
            : 'status_changed',
        title: `Booking Status Changed to "${newStatus}"`,
        description: `Status updated for ${targetEnquiry.customer_name} (${targetEnquiry.package_name}).`,
        timestamp: 'Just now',
        booking_id: targetEnquiry.id,
        user: 'Aakash K',
      };
      setActivities((prev) => [newActivity, ...prev]);
    }
  };

  const handleSelectBookingById = (bookingId: string) => {
    const found = enquiries.find((e) => e.id === bookingId);
    if (found) {
      setSelectedEnquiry(found);
    }
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'enquiries':
        return 'Booking Enquiries';
      case 'customers':
        return 'Customer Directory';
      case 'packages':
        return 'Tour Packages Management';
      case 'reviews':
        return 'Customer Reviews';
      case 'settings':
        return 'Website & Business Settings';
      default:
        return 'Admin Portal';
    }
  };

  return (
    <div className="min-h-screen bg-[#fcfaf7] text-brand-navy-900 font-sans antialiased selection:bg-brand-sky-100 selection:text-brand-sky-900">
      {/* Sidebar (Desktop fixed + Mobile slide-out) */}
      <AdminSidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        isOpenMobile={isOpenMobile}
        setIsOpenMobile={setIsOpenMobile}
      />

      {/* Main Content Area (offset on lg by sidebar width w-64) */}
      <div className="lg:pl-64 flex flex-col min-h-screen">
        {/* Top Header Bar */}
        <AdminHeader
          activeTabTitle={getTabTitle()}
          onToggleMobileMenu={() => setIsOpenMobile(true)}
        />

        {/* Dynamic Main Workspace Content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8 space-y-6 max-w-7xl w-full mx-auto">
          {activeTab === 'dashboard' && (
            <>
              {/* Statistic Cards */}
              <AdminStatCards
                stats={computedStats}
                onFilterByStatus={(status) => {
                  setStatusFilter(status);
                  // smooth scroll down to enquiries table
                  const tableElem = document.getElementById('enquiries-section');
                  tableElem?.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* Main Workspace Layout (Enquiries Table + Recent Activity Grid) */}
              <div id="enquiries-section" className="space-y-6">
                <BookingEnquiriesSection
                  enquiries={enquiries}
                  onSelectEnquiry={(enq) => setSelectedEnquiry(enq)}
                  activeStatusFilter={statusFilter}
                  setActiveStatusFilter={setStatusFilter}
                />

                <RecentActivityCard
                  activities={activities}
                  onSelectBookingId={handleSelectBookingById}
                />
              </div>
            </>
          )}

          {activeTab === 'enquiries' && (
            <div className="space-y-6">
              <BookingEnquiriesSection
                enquiries={enquiries}
                onSelectEnquiry={(enq) => setSelectedEnquiry(enq)}
                activeStatusFilter={statusFilter}
                setActiveStatusFilter={setStatusFilter}
              />
            </div>
          )}

          {/* Sub-Pages / Future Supabase Modules (Clean, Ready Placeholders) */}
          {activeTab === 'customers' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-indigo-50 text-indigo-700 flex items-center justify-center mx-auto shadow-2xs">
                <Users className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy-950">
                  Customer Directory Module
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  Unified traveler profiles, repeat customer journey history, and contact records will connect directly to Supabase customer tables.
                </p>
              </div>
              <div className="pt-2 flex justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-indigo-50 text-indigo-700 border border-indigo-200">
                  <Database className="w-3.5 h-3.5" />
                  <span>Ready for Supabase schema binding</span>
                </span>
              </div>
            </div>
          )}

          {activeTab === 'packages' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center mx-auto shadow-2xs">
                <Compass className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy-950">
                  Tour Packages &amp; Pricing Management
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  Live management for Tamil Nadu Temple Tour, South India Explorer, Kerala Houseboat &amp; Hills, and Golden Triangle circuits.
                </p>
              </div>
              <div className="pt-2 flex justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-teal-50 text-brand-teal-700 border border-brand-teal-200">
                  <Database className="w-3.5 h-3.5" />
                  <span>Configured with current website package catalogue</span>
                </span>
              </div>
            </div>
          )}

          {activeTab === 'reviews' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-8 text-center space-y-4">
              <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-700 flex items-center justify-center mx-auto shadow-2xs">
                <Star className="w-7 h-7" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-brand-navy-950">
                  Traveler Reviews Moderation
                </h3>
                <p className="text-xs text-slate-500 max-w-md mx-auto mt-1 leading-relaxed">
                  Approve and publish customer submissions from `/submit-review` and in-vehicle QR code scans at `/review`.
                </p>
              </div>
              <div className="pt-2 flex justify-center">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-700 border border-amber-200">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Synced with public reviews feed</span>
                </span>
              </div>
            </div>
          )}

          {activeTab === 'settings' && (
            <div className="bg-white rounded-3xl border border-slate-200/80 shadow-soft p-6 sm:p-8 space-y-6">
              <div>
                <h3 className="text-lg font-bold text-brand-navy-950">
                  Website &amp; Agency Settings
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Official contact parameters configured across the Jayashakthi Tours portal.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-400 block font-medium">Business Calling Line</span>
                  <p className="font-bold text-slate-900 mt-1">{business.phone}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-400 block font-medium">Official WhatsApp</span>
                  <p className="font-bold text-emerald-700 mt-1">{business.whatsappFormatted}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-400 block font-medium">Official Business Email</span>
                  <p className="font-mono font-bold text-slate-900 mt-1">{business.email}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-400 block font-medium">Official Instagram</span>
                  <p className="font-mono font-bold text-brand-sky-700 mt-1">{business.instagramHandle}</p>
                </div>
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/70 sm:col-span-2">
                  <span className="text-slate-400 block font-medium">Head Office Location</span>
                  <p className="font-bold text-slate-900 mt-1">
                    Plot No. 14, V.O.C. 2nd Street, Kannan Nagar, Madipakkam, Chennai, Tamil Nadu - 600091
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Slide-over Enquiry Detail Panel */}
      <BookingDetailModal
        enquiry={selectedEnquiry}
        onClose={() => setSelectedEnquiry(null)}
        onUpdateStatus={handleUpdateStatus}
      />
    </div>
  );
};

export default AdminDashboard;
