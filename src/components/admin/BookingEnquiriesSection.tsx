import React, { useState, useMemo } from 'react';
import {
  Search,
  Calendar,
  Users,
  MapPin,
  Car,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import { BookingRecord, BookingStatus } from '../../lib/supabase';
import { matchesReferenceSearch } from '../../services/referenceIdService';

export interface BookingEnquiriesSectionProps {
  enquiries: BookingRecord[];
  onSelectEnquiry: (enquiry: BookingRecord) => void;
  activeStatusFilter: string;
  setActiveStatusFilter: (status: string) => void;
}

export const BookingEnquiriesSection: React.FC<BookingEnquiriesSectionProps> = ({
  enquiries,
  onSelectEnquiry,
  activeStatusFilter,
  setActiveStatusFilter,
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const statusFilters = [
    'All',
    'New',
    'Contacted',
    'Quotation Sent',
    'Confirmed',
    'Completed',
    'Cancelled',
  ];

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter((item) => {
      // Filter by status
      if (activeStatusFilter !== 'All' && item.booking_status !== activeStatusFilter) {
        return false;
      }
      // Filter by search query
      if (!searchQuery.trim()) return true;
      const q = searchQuery.toLowerCase().trim();
      const refMatch =
        matchesReferenceSearch(searchQuery, item.id) ||
        (item.reference_id ? matchesReferenceSearch(searchQuery, item.reference_id) : false);

      return (
        refMatch ||
        item.full_name.toLowerCase().includes(q) ||
        item.phone.toLowerCase().includes(q) ||
        (item.whatsapp_number && item.whatsapp_number.toLowerCase().includes(q)) ||
        (item.email && item.email.toLowerCase().includes(q)) ||
        (item.pickup_location && item.pickup_location.toLowerCase().includes(q)) ||
        (item.destination && item.destination.toLowerCase().includes(q)) ||
        (item.tour_package && item.tour_package.toLowerCase().includes(q)) ||
        (item.service_type && item.service_type.toLowerCase().includes(q))
      );
    });
  }, [enquiries, activeStatusFilter, searchQuery]);

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

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-soft overflow-hidden">
      {/* Top Controls Bar */}
      <div className="p-4 sm:p-6 border-b border-slate-200/70 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-base sm:text-lg font-extrabold text-brand-navy-950 tracking-tight">
                Booking Enquiries (CRM)
              </h2>
              <span className="text-xs font-mono font-bold bg-slate-100 text-slate-600 px-2 py-0.5 rounded-full">
                {filteredEnquiries.length} leads
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Review visitor trip requests and coordinate custom travel across India.
            </p>
          </div>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search Reference ID (JST-26-0001), guest, route, email..."
              className="w-full pl-9 pr-3.5 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:bg-white focus:border-brand-sky-400 focus:outline-none focus:ring-2 focus:ring-brand-sky-100 transition-all placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* Status Filter Tabs & Reset */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
          <div className="flex flex-wrap items-center gap-1.5">
            {statusFilters.map((st) => {
              const isActive = activeStatusFilter === st;
              return (
                <button
                  key={st}
                  type="button"
                  onClick={() => setActiveStatusFilter(st)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 ${
                    isActive
                      ? 'bg-brand-navy-950 text-white shadow-2xs'
                      : 'bg-slate-100/80 hover:bg-slate-200/70 text-slate-600'
                  }`}
                >
                  {st}
                </button>
              );
            })}
          </div>

          {activeStatusFilter !== 'All' && (
            <button
              type="button"
              onClick={() => setActiveStatusFilter('All')}
              className="text-xs font-semibold text-brand-sky-700 hover:underline"
            >
              View All Enquiries
            </button>
          )}
        </div>
      </div>

      {/* Desktop Table Layout (Visible on md and up) */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-left text-xs border-collapse">
          <thead>
            <tr className="bg-slate-50/80 text-slate-400 font-bold uppercase tracking-wider border-b border-slate-200/70">
              <th className="py-3 px-4">Reference ID</th>
              <th className="py-3 px-4">Customer</th>
              <th className="py-3 px-4">Phone / WhatsApp</th>
              <th className="py-3 px-4">Travel Date</th>
              <th className="py-3 px-4">Route</th>
              <th className="py-3 px-4">Travellers</th>
              <th className="py-3 px-4">Service</th>
              <th className="py-3 px-4">Status</th>
              <th className="py-3 px-4 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 text-slate-700 font-medium">
            {filteredEnquiries.length === 0 ? (
              <tr>
                <td colSpan={9} className="py-12 text-center text-slate-400">
                  No booking enquiries match the selected filter.
                </td>
              </tr>
            ) : (
              filteredEnquiries.map((enquiry) => (
                <tr
                  key={enquiry.id}
                  className="hover:bg-brand-sky-50/30 transition-colors group cursor-pointer"
                  onClick={() => onSelectEnquiry(enquiry)}
                >
                  {/* Reference ID */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-brand-sky-50 text-brand-sky-900 border border-brand-sky-200/90 font-mono font-bold text-xs tracking-wide shadow-2xs">
                      {enquiry.id}
                    </span>
                  </td>

                  {/* Customer */}
                  <td className="py-3.5 px-4">
                    <div className="font-bold text-brand-navy-950">
                      {enquiry.full_name}
                    </div>
                    {enquiry.email && (
                      <div className="text-[10px] text-slate-400 truncate max-w-[160px]">
                        {enquiry.email}
                      </div>
                    )}
                  </td>

                  {/* Phone / WhatsApp */}
                  <td className="py-3.5 px-4 font-mono text-slate-600">
                    {enquiry.phone}
                  </td>

                  {/* Travel Date */}
                  <td className="py-3.5 px-4 text-slate-600">
                    <span className="truncate block max-w-[140px]" title={enquiry.travel_date}>
                      {enquiry.travel_date}
                    </span>
                  </td>

                  {/* Route */}
                  <td className="py-3.5 px-4 text-slate-600">
                    <div className="truncate max-w-[160px] font-medium text-slate-800" title={enquiry.destination}>
                      {enquiry.destination}
                    </div>
                    <div className="text-[10px] text-slate-400 truncate max-w-[160px]">
                      From {enquiry.pickup_location}
                    </div>
                  </td>

                  {/* Travellers */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span className="font-semibold text-slate-800">
                      {enquiry.adults}A
                      {enquiry.children > 0 && ` + ${enquiry.children}C`}
                    </span>
                  </td>

                  {/* Service */}
                  <td className="py-3.5 px-4">
                    <span
                      className="font-medium text-brand-sky-800 block truncate max-w-[130px]"
                      title={enquiry.tour_package || enquiry.service_type}
                    >
                      {enquiry.tour_package || enquiry.service_type}
                    </span>
                    <span className="text-[10px] text-slate-400 block">
                      {enquiry.service_type}
                    </span>
                  </td>

                  {/* Status */}
                  <td className="py-3.5 px-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${getStatusBadge(
                        enquiry.booking_status
                      )}`}
                    >
                      ● {enquiry.booking_status}
                    </span>
                  </td>

                  {/* Action */}
                  <td className="py-3.5 px-4 text-right whitespace-nowrap">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectEnquiry(enquiry);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1.5 rounded-xl bg-white hover:bg-brand-sky-50 text-brand-sky-700 hover:text-brand-sky-800 border border-slate-200/90 hover:border-brand-sky-300 font-bold text-xs shadow-2xs transition-all"
                    >
                      <span>View</span>
                      <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card Layout */}
      <div className="block md:hidden divide-y divide-slate-100">
        {filteredEnquiries.length === 0 ? (
          <div className="p-8 text-center text-xs text-slate-400">
            No booking enquiries match the selected filter.
          </div>
        ) : (
          filteredEnquiries.map((enquiry) => (
            <div
              key={enquiry.id}
              onClick={() => onSelectEnquiry(enquiry)}
              className="p-4 space-y-3 hover:bg-slate-50/70 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <div className="mb-1">
                    <span className="inline-flex items-center px-2 py-0.5 rounded-md bg-brand-sky-50 text-brand-sky-900 border border-brand-sky-200/90 font-mono font-bold text-xs tracking-wide">
                      {enquiry.id}
                    </span>
                  </div>
                  <h3 className="font-bold text-sm text-brand-navy-950">
                    {enquiry.full_name}
                  </h3>
                </div>
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-[11px] font-semibold border shrink-0 ${getStatusBadge(
                    enquiry.booking_status
                  )}`}
                >
                  ● {enquiry.booking_status}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-slate-600 bg-slate-50/80 p-2.5 rounded-xl border border-slate-100">
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Service</span>
                  <span className="font-semibold text-brand-navy-950 truncate block">
                    {enquiry.tour_package || enquiry.service_type}
                  </span>
                </div>
                <div>
                  <span className="text-[10px] text-slate-400 block font-medium">Travellers</span>
                  <span className="font-semibold text-brand-navy-950">
                    {enquiry.adults} Adults
                    {enquiry.children > 0 && `, ${enquiry.children} Kids`}
                  </span>
                </div>
                <div className="col-span-2 pt-1 border-t border-slate-200/50">
                  <span className="text-[10px] text-slate-400 block font-medium">Route</span>
                  <span className="font-medium text-slate-700 truncate block">
                    {enquiry.destination}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-xs font-mono text-slate-500">
                  {enquiry.phone}
                </span>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectEnquiry(enquiry);
                  }}
                  className="inline-flex items-center gap-1 text-xs font-bold text-brand-sky-700 hover:text-brand-sky-800"
                >
                  <span>View Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default BookingEnquiriesSection;
