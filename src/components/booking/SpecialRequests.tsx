import React from 'react';
import { UseFormRegister } from 'react-hook-form';
import { Flame, HeartHandshake } from 'lucide-react';
import { BookingFormData } from '../../utils/whatsapp';

interface SpecialRequestsProps {
  register: UseFormRegister<BookingFormData>;
}

export const SpecialRequests: React.FC<SpecialRequestsProps> = ({ register }) => {
  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-brand-navy-950 flex items-center gap-2">
          <Flame className="w-5 h-5 text-brand-gold-600" />
          <span>Section 6: Spiritual & Special Requirements</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Tell us about special prayer visits, dietary guidelines, or accessibility preferences.
        </p>
      </div>

      {/* Temple / Spiritual Requirements */}
      <div>
        <label htmlFor="templeRequirements" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
          <Flame className="w-3.5 h-3.5 text-brand-gold-600" />
          <span>Temple / Prayer Requirements (Optional)</span>
        </label>
        <textarea
          id="templeRequirements"
          rows={3}
          placeholder="Tell us about any temples, special prayers, spiritual visits or religious requirements you would like included."
          {...register('templeRequirements')}
          className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200 text-slate-800 placeholder:text-slate-400"
        />
        <p className="text-[11px] text-slate-400 mt-1">
          e.g. Special darshan tickets, pooja archana, Navagraha temple route, or specific spiritual gurus.
        </p>
      </div>

      {/* Additional Requirements */}
      <div>
        <label htmlFor="additionalRequirements" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 flex items-center gap-1.5">
          <HeartHandshake className="w-3.5 h-3.5 text-brand-teal-600" />
          <span>Additional Requirements & Preferences (Optional)</span>
        </label>
        <textarea
          id="additionalRequirements"
          rows={3}
          placeholder="Tell us anything else that would help us plan your journey."
          {...register('additionalRequirements')}
          className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200 text-slate-800 placeholder:text-slate-400"
        />
        <p className="text-[11px] text-slate-400 mt-1">
          e.g. Pure vegetarian food, senior citizen mobility assistance, child car seats, anniversary celebration, or room requests.
        </p>
      </div>
    </div>
  );
};
