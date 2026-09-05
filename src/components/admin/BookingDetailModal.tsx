import React, { useState, useEffect } from 'react';
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
  Copy,
  Check,
  Clock,
  Sparkles,
  ChevronDown,
  FileText,
  Save,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { BookingRecord, BookingStatus } from '../../lib/supabase';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export interface BookingDetailModalProps {
  enquiry: BookingRecord | null;
  onClose: () => void;
  onUpdateStatus: (id: string, newStatus: BookingStatus) => void;
  onUpdateNotes: (id: string, notes: string) => void;
}

export const BookingDetailModal: React.FC<BookingDetailModalProps> = ({
  enquiry,
  onClose,
  onUpdateStatus,
  onUpdateNotes,
}) => {
  const [adminNotes, setAdminNotes] = useState('');
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [isSavingNotes, setIsSavingNotes] = useState(false);
  const [notesSavedSuccess, setNotesSavedSuccess] = useState(false);

  useEffect(() => {
    if (enquiry) {
      setAdminNotes(enquiry.admin_notes || '');
      setNotesSavedSuccess(false);
    }
  }, [enquiry]);

  if (!enquiry) return null;

  // Status visual behavior matching prompt specifications:
  // New → soft blue
  // Contacted → soft purple/teal
  // Quotation Sent → soft amber
  // Confirmed → soft green
  // Completed → muted green/blue
  // Cancelled → soft red/grey
  const getStatusBadge = (status: BookingStatus) => {
    switch (status) {
      case 'New':
        return 'bg-sky-50 text-sky-800 border-sky-200/90';
      case 'Contacted':
        return 'bg-indigo-50 text-indigo-800 border-indigo-200/90';
      case 'Quotation Sent':
        return 'bg-amber-50 text-amber-800 border-amber-200/90';
      case 'Confirmed':
        return 'bg-emerald-50 text-emerald-800 border-emerald-200/90';
      case 'Completed':
        return 'bg-teal-50 text-teal-800 border-teal-200/90';
      case 'Cancelled':
        return 'bg-rose-50 text-rose-700 border-rose-200/90';
      default:
        return 'bg-slate-100 text-slate-700 border-slate-200';
    }
  };

  const handleCopy = (text: string, fieldName: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleWhatsAppCustomer = () => {
    const rawNumber = enquiry.phone.replace(/[^0-9]/g, '');
    const message = `Hello ${enquiry.full_name}, this is Jayashakthi Tours & Travels regarding your booking enquiry (${enquiry.id}) for ${enquiry.tour_package || enquiry.destination}. We have prepared custom coordination details for your dates. How can we assist you?`;
    
    // Use target phone number if international format
    let targetUrl = createWhatsAppUrl(message);
    if (rawNumber && rawNumber.length >= 10) {
      targetUrl = `https://wa.me/${rawNumber}?text=${encodeURIComponent(message)}`;
    }
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCallCustomer = () => {
    window.location.href = `tel:${enquiry.phone.replace(/[^0-9+]/g, '')}`;
  };

  const handleSaveNotes = async () => {
    setIsSavingNotes(true);
    await onUpdateNotes(enquiry.id, adminNotes);
    setIsSavingNotes(false);
    setNotesSavedSuccess(true);
    setTimeout(() => setNotesSavedSuccess(false), 2500);
  };

  const formatDate = (isoString?: string) => {
    if (!isoString) return 'Just now';
    try {
      const d = new Date(isoString);
      return d.toLocaleDateString('en-IN', {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      });
    } catch {
      return isoString;
    }
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
            <div className="flex flex-wrap items-center gap-2 mb-1.5">
              <span className="font-mono text-xs font-bold text-slate-600 bg-slate-100 px-2.5 py-0.5 rounded-md">
                {enquiry.id}
              </span>
              <span
                className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${getStatusBadge(
                  enquiry.booking_status
                )}`}
              >
                ● {enquiry.booking_status}
              </span>
              <span className="text-xs text-slate-400">
                Created: {formatDate(enquiry.created_at)}
              </span>
            </div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950 tracking-tight">
              {enquiry.full_name}
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

        {/* Scrollable Body with 5 CRM Sections + Quick Actions */}
        <div className="flex-1 overflow-y-auto p-5 sm:p-6 space-y-5">
          {/* QUICK ACTIONS TOOLBAR */}
          <div className="p-4 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-3">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block">
              Quick CRM Actions
            </span>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
              <button
                type="button"
                onClick={handleCallCustomer}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-bold shadow-2xs transition-colors"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>Call Customer</span>
              </button>

              <button
                type="button"
                onClick={handleWhatsAppCustomer}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold shadow-2xs transition-colors"
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>WhatsApp</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(enquiry.phone, 'phone')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                {copiedField === 'phone' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedField === 'phone' ? 'Copied!' : 'Copy Phone'}</span>
              </button>

              <button
                type="button"
                onClick={() => handleCopy(enquiry.email, 'email')}
                className="inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
              >
                {copiedField === 'email' ? (
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
                <span>{copiedField === 'email' ? 'Copied!' : 'Copy Email'}</span>
              </button>
            </div>
          </div>

          {/* SECTION 1: TRIP & ROUTE */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-brand-sky-50 text-brand-sky-700 flex items-center justify-center">
                <MapPin className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950">
                Trip &amp; Route
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Pickup Location</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.pickup_location || 'Not Specified'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Destination</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.destination}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Travel Date / Month</span>
                <p className="font-semibold text-slate-800 mt-0.5 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-brand-teal-600 shrink-0" />
                  <span>{enquiry.travel_date}</span>
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Trip Type / Travel Style</span>
                <span className="inline-block mt-0.5 px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-700 font-semibold">
                  {enquiry.trip_type || 'Family Vacation'}
                </span>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Number of Travellers</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.total_travellers || enquiry.adults + enquiry.children} Total Travellers
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 2: SERVICE SELECTED */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-brand-teal-50 text-brand-teal-700 flex items-center justify-center">
                <Compass className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950">
                Service Selected
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Selected Service</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.service_type}
                </p>
              </div>

              {enquiry.tour_package && (
                <div>
                  <span className="text-slate-400 block font-medium">Tour Package Name</span>
                  <p className="font-bold text-brand-sky-700 mt-0.5">
                    {enquiry.tour_package}
                  </p>
                </div>
              )}

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

          {/* SECTION 3: TRAVELLERS & CONTACT */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-indigo-50 text-indigo-700 flex items-center justify-center">
                <Users className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950">
                Travellers &amp; Contact
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Full Name</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.full_name}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Mobile / WhatsApp Number</span>
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
                  {enquiry.email || 'None Provided'}
                </a>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Passenger Breakdown</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.adults} Adults
                  {enquiry.children > 0 ? `, ${enquiry.children} Children` : ' (No Children)'}
                </p>
              </div>
            </div>
          </div>

          {/* SECTION 4: PREFERENCES & REQUIREMENTS */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-amber-50 text-amber-700 flex items-center justify-center">
                <Car className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950">
                Preferences &amp; Requirements
              </h3>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block font-medium">Preferred Vehicle</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.preferred_vehicle || 'Standard Fleet'}
                </p>
              </div>

              <div>
                <span className="text-slate-400 block font-medium">Accommodation Preference</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.accommodation_preference || 'Standard'}
                </p>
              </div>

              <div className="sm:col-span-2">
                <span className="text-slate-400 block font-medium">Tour Guide Requirement</span>
                <p className="font-semibold text-slate-800 mt-0.5">
                  {enquiry.tour_guide_requirement || 'Chauffeur Guidance'}
                </p>
              </div>

              {enquiry.special_requests && (
                <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-500 font-bold block mb-1">
                    Special Requests
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {enquiry.special_requests}
                  </p>
                </div>
              )}

              {enquiry.additional_notes && (
                <div className="sm:col-span-2 p-3 rounded-xl bg-slate-50 border border-slate-200/70">
                  <span className="text-slate-500 font-bold block mb-1">
                    Additional Notes / Ideas
                  </span>
                  <p className="text-slate-700 leading-relaxed">
                    {enquiry.additional_notes}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SECTION 5: BOOKING MANAGEMENT & ADMIN NOTES */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/80 shadow-2xs space-y-4">
            <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
              <div className="w-7 h-7 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center">
                <ShieldCheck className="w-4 h-4" />
              </div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950">
                Booking Management (Internal)
              </h3>
            </div>

            {/* Status Change Dropdown */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-slate-600 block">
                Update Booking Status:
              </label>
              <div className="relative">
                <select
                  value={enquiry.booking_status}
                  onChange={(e) =>
                    onUpdateStatus(enquiry.id, e.target.value as BookingStatus)
                  }
                  className="w-full appearance-none text-xs font-bold bg-slate-50 hover:bg-slate-100 text-slate-800 border border-slate-300 rounded-xl px-3.5 py-2.5 pr-8 cursor-pointer focus:outline-none focus:ring-2 focus:ring-brand-sky-500 transition-colors"
                >
                  <option value="New">● New Enquiry (Requires Follow-up)</option>
                  <option value="Contacted">● Contacted (In Discussion)</option>
                  <option value="Quotation Sent">● Quotation Sent (Awaiting Confirmation)</option>
                  <option value="Confirmed">● Confirmed (Vehicle / Stay Assigned)</option>
                  <option value="Completed">● Completed (Trip Finished)</option>
                  <option value="Cancelled">● Cancelled</option>
                </select>
                <ChevronDown className="w-4 h-4 text-slate-500 absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none" />
              </div>
            </div>

            {/* Admin Notes Section */}
            <div className="space-y-2 pt-2">
              <div className="flex items-center justify-between">
                <label className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
                  <FileText className="w-3.5 h-3.5 text-slate-400" />
                  <span>Internal Admin Notes</span>
                </label>
                <span className="text-[10px] text-slate-400 font-medium">
                  Not visible on public website
                </span>
              </div>

              <textarea
                rows={3}
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                placeholder="Add confidential coordinator notes, assigned chauffeur name, payment details, or special arrangement notes..."
                className="w-full text-xs p-3 rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-sky-400 focus:ring-2 focus:ring-brand-sky-100 focus:outline-none transition-all placeholder:text-slate-400"
              />

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] text-slate-400">
                  Last Updated: {formatDate(enquiry.updated_at)}
                </span>

                <button
                  type="button"
                  onClick={handleSaveNotes}
                  disabled={isSavingNotes}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-brand-sky-600 hover:bg-brand-sky-700 disabled:opacity-50 text-white text-xs font-bold shadow-2xs transition-colors"
                >
                  {notesSavedSuccess ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-200" />
                      <span>Notes Saved!</span>
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      <span>{isSavingNotes ? 'Saving...' : 'Save Notes'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-white border-t border-slate-200/80 flex items-center justify-between gap-3 shrink-0">
          <span className="text-xs text-slate-400">
            Jayashakthi Tours &amp; Travels CRM
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

export default BookingDetailModal;
