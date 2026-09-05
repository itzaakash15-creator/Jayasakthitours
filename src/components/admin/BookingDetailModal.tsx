import React from 'react';
import {
  X,
  MapPin,
  Calendar,
  Compass,
  Car,
  Users,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  CheckCircle,
  Hotel,
  Clock,
  Sparkles,
  ArrowRight,
  ExternalLink,
  ChevronDown,
} from 'lucide-react';
import { BookingEnquiry, BookingStatus } from '../../data/mockAdminData';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export interface BookingDetailModalProps {
  enquiry: BookingEnquiry | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: BookingStatus) => void;
}

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  enquiry,
  onClose,
  onUpdateStatus,
}) => {
  if (!enquiry) return null;

  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'New':
        return 'bg-amber-50 text-amber-800 border-amber-200/80';
      case 'Contacted':
        return 'bg-sky-50 text-sky-800 border-sky-200/80';
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/80';
      case 'Completed':
        return 'bg-teal-50 text-teal-800 border-teal-200/80';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200/80';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleWhatsAppCustomer = () => {
    const message = `Hello ${enquiry.customer_name}, this is Jayashakthi Tours & Travels regarding your enquiry for ${enquiry.package_name}. How can we assist with your travel dates?`;
    window.open(createWhatsAppUrl(message), '_blank', 'noopener,noreferrer');
  };

  const handleCallCustomer = () => {
    window.location.href = `tel:${enquiry.phone.replace(/[^0-9+]/g, '')}`;
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Slide-over Container (Full width on mobile, max-w-2xl on desktop) */}
      <div className="relative w-full max-w-2xl bg-[#fcfcfb] h-full shadow-2xl z-10 flex flex-col overflow-hidden animate-slideLeft border-l border-slate-200/90">
        {/* Header */}
        <div className="px-6 py-5 bg-white border-b border-slate-200/80 flex items-start justify-between gap-4 shrink-0">
          <div>
            <div className="flex items-center gap-2.5 mb-1">
              <span className="font-mono text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                {enquiry.id}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                  enquiry.status
                )}`}
              >
                ● {enquiry.status}
              </span>
              <span className="text-xs text-slate-400">
                Received {enquiry.created_at}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950 tracking-tight">
              {enquiry.customer_name}
            </h2>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors shrink-0"
            aria-label="Close enquiry detail"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Body with Cards */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* Quick Management Toolbar */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs flex flex-wrap items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                Update Status:
              </span>
              <div className="relative">
                <select
                  value={enquiry.status}
                  onChange={(e) =>
                    onUpdateStatus(enquiry.id, e.target.value as BookingStatus)
                  }
                  className="appearance-none text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl px-3 py-2 pr-7 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-sky-500 transition-colors"
                >
                  <option value="New">New Enquiry</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Confirmed">Confirmed</option>
                  <option value="Completed">Completed</option>
                  <option value="Cancelled">Cancelled</option>
                </select>
                <ChevronDown className="w-3.5 h-3.5 text-slate-500 absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            <div className="flex items-center gap-2 w-full sm:w-auto">
              <button
                type="button"
                onClick={handleWhatsAppCustomer}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp Customer</span>
              </button>
              <button
                type="button"
                onClick={handleCallCustomer}
                className="flex-1 sm:flex-none inline-flex items-center justify-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-2xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Directly</span>
              </button>
            </div>
          </div>

          {/* Section 1: Trip & Route */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-brand-sky-50 text-brand-sky-700 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950">
                Trip &amp; Route Details
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Pickup Location</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.pickup_location}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Destination Route</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.destination}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Travel Dates</span>
                <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-teal-600" />
                  <span>{enquiry.travel_date}</span>
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Travel Style</span>
                <span className="inline-block mt-0.5 px-2 py-0.5 rounded bg-slate-100 text-slate-700 font-semibold">
                  {enquiry.travel_style}
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Service & Package */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950">
                Service &amp; Package
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Selected Service</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.service_type}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Package / Circuit</span>
                <p className="font-bold text-brand-sky-700 mt-0.5">
                  {enquiry.package_name}
                </p>
              </div>

              {enquiry.estimated_budget && (
                <div>
                  <span className="text-slate-400 block font-medium">Estimated Budget</span>
                  <p className="font-mono font-bold text-emerald-700 mt-0.5">
                    {enquiry.estimated_budget}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Section 3: Travellers & Contact Info */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950">
                Travellers &amp; Contact Info
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Lead Traveller Name</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.customer_name}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Phone / WhatsApp</span>
                <a
                  href={`tel:${enquiry.phone}`}
                  className="font-mono font-semibold text-brand-sky-700 hover:underline mt-0.5 block"
                >
                  {enquiry.phone}
                </a>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Email Address</span>
                <a
                  href={`mailto:${enquiry.email}`}
                  className="font-mono text-slate-700 hover:underline mt-0.5 block truncate"
                >
                  {enquiry.email}
                </a>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Group Composition</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.adults_count} Adults
                  {enquiry.children_count > 0 && `, ${enquiry.children_count} Children`}
                </p>
              </div>
            </div>
          </div>

          {/* Section 4: Preferences & Logistics */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950">
                Preferences &amp; Customizations
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Preferred Fleet</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.preferred_vehicle}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Stay Category</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.accommodation_preference}
                </p>
              </div>

              <div className="sm:col-span-2">
                <span className="text-slate-400 block font-medium">Tour Guide Requirement</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.guide_requirement}
                </p>
              </div>

              {enquiry.special_requests && (
                <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-500 font-bold block mb-1">
                    Special Requests &amp; Notes
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {enquiry.special_requests}
                  </p>
                </div>
              )}

              {enquiry.notes && (
                <div className="sm:col-span-2 p-3 rounded-xl bg-brand-sky-50/60 border border-brand-sky-100">
                  <span className="text-brand-sky-800 font-bold block mb-1">
                    Internal Operations Note
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {enquiry.notes}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200/80 flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-400">
            Jayashakthi Tours &amp; Travels Operations
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
          >
            Close Panel
          </button>
        </div>
      </div>
    </div>
  );
};
