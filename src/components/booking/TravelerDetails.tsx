import React from 'react';
import { UseFormRegister, FieldErrors } from 'react-hook-form';
import { User, Mail, Phone, Globe } from 'lucide-react';
import { BookingFormData } from '../../utils/whatsapp';

interface TravelerDetailsProps {
  register: UseFormRegister<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

export const TravelerDetails: React.FC<TravelerDetailsProps> = ({ register, errors }) => {
  return (
    <div className="space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-brand-navy-950 flex items-center gap-2">
          <User className="w-5 h-5 text-brand-sky-600" />
          <span>Section 1: Traveler Details</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Please provide your primary contact information for coordination.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Full Name */}
        <div>
          <label htmlFor="fullName" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Full Name <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="fullName"
              type="text"
              placeholder="e.g. John Miller"
              {...register('fullName')}
              className={`w-full px-3.5 py-2.5 pl-10 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-colors ${
                errors.fullName
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100'
              }`}
            />
            <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
          {errors.fullName && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.fullName.message}</p>
          )}
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Email Address <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="email"
              type="email"
              placeholder="e.g. john@example.com"
              {...register('email')}
              className={`w-full px-3.5 py-2.5 pl-10 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-colors ${
                errors.email
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100'
              }`}
            />
            <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
          {errors.email && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.email.message}</p>
          )}
        </div>

        {/* WhatsApp Number */}
        <div>
          <label htmlFor="whatsappNumber" className="block text-xs font-semibold text-slate-700 mb-1.5">
            WhatsApp Number (with Country Code) <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="whatsappNumber"
              type="tel"
              placeholder="e.g. +44 7911 123456 or +1 415 555 2671"
              {...register('whatsappNumber')}
              className={`w-full px-3.5 py-2.5 pl-10 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-colors ${
                errors.whatsappNumber
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100'
              }`}
            />
            <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
          <p className="text-[11px] text-slate-400 mt-1">
            Our trip planner coordinates updates and itineraries directly on WhatsApp.
          </p>
          {errors.whatsappNumber && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.whatsappNumber.message}</p>
          )}
        </div>

        {/* Country */}
        <div>
          <label htmlFor="country" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Home Country / Residence <span className="text-rose-500">*</span>
          </label>
          <div className="relative">
            <input
              id="country"
              type="text"
              placeholder="e.g. United Kingdom, Singapore, USA, France..."
              {...register('country')}
              className={`w-full px-3.5 py-2.5 pl-10 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-colors ${
                errors.country
                  ? 'border-rose-400 focus:ring-rose-200'
                  : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100'
              }`}
            />
            <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
          </div>
          {errors.country && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.country.message}</p>
          )}
        </div>
      </div>
    </div>
  );
};
