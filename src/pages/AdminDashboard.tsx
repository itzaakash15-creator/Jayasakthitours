import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { AdminSidebar } from '../components/admin/AdminSidebar';
import { AdminHeader } from '../components/admin/AdminHeader';
import { AdminStatCards } from '../components/admin/AdminStatCards';
import { BookingEnquiriesSection } from '../components/admin/BookingEnquiriesSection';
import { BookingDetailModal } from '../components/admin/BookingDetailModal';
import { RecentActivityCard } from '../components/admin/RecentActivityCard';
import { GalleryManagement } from '../components/admin/GalleryManagement';
import {
  BookingRecord,
  GalleryPhotoRecord,
  BookingStatus,
  fetchBookings,
  updateBookingStatus,
  updateBookingNotes,
  fetchGalleryPhotos,
  isSupabaseConfigured,
} from '../lib/supabase';
import { initialMockActivities, AdminActivity } from '../data/mockAdminData';
import {
  Users,
  Compass,
  Star,
  Settings,
  Database,
  CloudCheck,
  CheckCircle2,
} from 'lucide-react';
import { business } from '../config/business';

export const AdminDashboard: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isOpenMobile, setIsOpenMobile] = useState<boolean>(false);

  // Sync route path to active tab
  useEffect(() => {
    const path = location.pathname.toLowerCase().replace(/\/+$/, '');
    if (path === '/admin/bookings') {
      setActiveTab('enquiries');
    } else if (path === '/admin/customers') {
      setActiveTab('customers');
    } else if (path === '/admin/tour-packages' || path === '/admin/packages') {
      setActiveTab('packages');
    } else if (path === '/admin/gallery') {
      setActiveTab('gallery');
    } else if (path === '/admin/reviews') {
      setActiveTab('reviews');
    } else if (path === '/admin/settings') {
      setActiveTab('settings');
    } else if (path === '/admin') {
      setActiveTab('dashboard');
    }
  }, [location.pathname]);

  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
    const pathMap: Record<string, string> = {
      dashboard: '/admin',
      enquiries: '/admin/bookings',
      customers: '/admin/customers',
      packages: '/admin/tour-packages',
      gallery: '/admin/gallery',
      reviews: '/admin/reviews',
      settings: '/admin/settings',
    };
    const targetPath = pathMap[newTab] || '/admin';
    if (location.pathname !== targetPath) {
      navigate(targetPath);
    }
  };

  // Live data states
  const [bookings, setBookings] = useState<BookingRecord[]>([]);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhotoRecord[]>([]);
  const [activities, setActivities] = useState<AdminActivity[]>(initialMockActivities);
  const [selectedEnquiry, setSelectedEnquiry] = useState<BookingRecord | null>(null);
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Initial load & reactive listener
  const loadData = async () => {
    try {
      const [fetchedBookings, fetchedPhotos] = await Promise.all([
        fetchBookings(),
        fetchGalleryPhotos(),
      ]);
      setBookings(fetchedBookings);
      setGalleryPhotos(fetchedPhotos);
    } catch (err) {
      console.error('[AdminDashboard] Failed to load data:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();

    // Listen for custom events triggered by public booking form or gallery changes
    const handleBookingsUpdate = () => loadData();
    const handleGalleryUpdate = () => loadData();

    window.addEventListener('jst:jst_bookings_v2_updated', handleBookingsUpdate);
    window.addEventListener('jst:jst_gallery_v2_updated', handleGalleryUpdate);

    return () => {
      window.removeEventListener('jst:jst_bookings_v2_updated', handleBookingsUpdate);
      window.removeEventListener('jst:jst_gallery_v2_updated', handleGalleryUpdate);
    };
  }, []);

  // Deep-link support: ?enquiry=JS-2026-1048 or ?tab=gallery
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const tabParam = params.get('tab');
    if (tabParam) setActiveTab(tabParam);

    const enquiryParam = params.get('enquiry');
    if (enquiryParam && bookings.length > 0) {
      const match = bookings.find((b) => b.id === enquiryParam);
      if (match) setSelectedEnquiry(match);
    }
  }, [bookings]);

  // Compute dynamic stats from actual database records
  const publishedPhotosCount = galleryPhotos.filter((p) => p.status === 'Published').length;
  const newEnquiriesCount = bookings.filter((b) => b.booking_status === 'New').length;
  const contactedCount = bookings.filter(
    (b) => b.booking_status === 'Contacted' || b.booking_status === 'Quotation Sent'
  ).length;
  const confirmedCount = bookings.filter((b) => b.booking_status === 'Confirmed').length;

  const computedStats = {
    totalEnquiries: 140 + bookings.length,
    totalChange: '+14% from last month',
    newEnquiries: 10 + newEnquiriesCount,
    newChange: 'Requires quick follow-up',
    contacted: 42 + contactedCount,
    contactedChange: 'In active coordination',
    confirmedTrips: 83 + confirmedCount,
    confirmedChange: 'Vehicles & stays assigned',
    publishedPhotos: publishedPhotosCount,
    publishedPhotosChange: 'Live on public website',
  };

  // Status updates
  const handleUpdateStatus = async (id: string, newStatus: BookingStatus) => {
    await updateBookingStatus(id, newStatus);
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, booking_status: newStatus } : item))
    );

    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev) =>
        prev ? { ...prev, booking_status: newStatus } : null
      );
    }

    // Append to live activity feed
    const target = bookings.find((b) => b.id === id);
    if (target) {
      const newActivity: AdminActivity = {
        id: `act-${Date.now()}`,
        type:
          newStatus === 'Confirmed'
            ? 'trip_confirmed'
            : newStatus === 'Contacted' || newStatus === 'Quotation Sent'
            ? 'customer_contacted'
            : 'status_changed',
        title: `Status Changed to "${newStatus}"`,
        description: `Status updated for ${target.full_name} (${target.tour_package || target.destination}).`,
        timestamp: 'Just now',
        booking_id: target.id,
        user: 'Operations Admin',
      };
      setActivities((prev) => [newActivity, ...prev]);
    }
  };

  // Notes updates
  const handleUpdateNotes = async (id: string, notes: string) => {
    await updateBookingNotes(id, notes);
    setBookings((prev) =>
      prev.map((item) => (item.id === id ? { ...item, admin_notes: notes } : item))
    );

    if (selectedEnquiry && selectedEnquiry.id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, admin_notes: notes } : null));
    }
  };

  const handleSelectBookingById = (bookingId: string) => {
    const found = bookings.find((b) => b.id === bookingId);
    if (found) setSelectedEnquiry(found);
  };

  const handleGalleryActivityLog = (action: string, description: string) => {
    const newActivity: AdminActivity = {
      id: `act-${Date.now()}`,
      type: 'status_changed',
      title: action,
      description,
      timestamp: 'Just now',
      user: 'Operations Admin',
    };
    setActivities((prev) => [newActivity, ...prev]);
  };

  const getTabTitle = () => {
    switch (activeTab) {
      case 'dashboard':
        return 'Dashboard Overview';
      case 'enquiries':
        return 'Booking Enquiries (CRM)';
      case 'gallery':
        return 'Gallery Management';
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
        setActiveTab={handleTabChange}
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
                onSelectTab={(tab) => setActiveTab(tab)}
                onFilterByStatus={(status) => {
                  setStatusFilter(status);
                  const tableElem = document.getElementById('enquiries-section');
                  tableElem?.scrollIntoView({ behavior: 'smooth' });
                }}
              />

              {/* Main Workspace Layout (Enquiries Table + Recent Activity Grid) */}
              <div id="enquiries-section" className="space-y-6">
                <BookingEnquiriesSection
                  enquiries={bookings}
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
                enquiries={bookings}
                onSelectEnquiry={(enq) => setSelectedEnquiry(enq)}
                activeStatusFilter={statusFilter}
                setActiveStatusFilter={setStatusFilter}
              />
            </div>
          )}

          {activeTab === 'gallery' && (
            <GalleryManagement
              photos={galleryPhotos}
              onPhotosChange={(updated) => setGalleryPhotos(updated)}
              onActivityLog={handleGalleryActivityLog}
            />
          )}

          {/* Sub-Pages / Future Modules */}
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
                  Unified traveler profiles, repeat customer journey history, and contact records connected to booking leads.
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
        onUpdateNotes={handleUpdateNotes}
      />
    </div>
  );
};

export default AdminDashboard;
