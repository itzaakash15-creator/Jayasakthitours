import React from 'react';
import { UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { Building, Car, CalendarCheck2, Check } from 'lucide-react';
import { BookingFormData } from '../../utils/whatsapp';

interface PreferenceSelectProps {
  setValue: UseFormSetValue<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
}

const ACCOMMODATION_OPTIONS: Array<BookingFormData['accommodation']> = [
  'Budget',
  'Standard',
  'Premium',
  'Luxury',
  'Not Sure',
];

const TRANSPORT_OPTIONS: Array<BookingFormData['transportation']> = [
  'Car',
  'Tempo Traveller',
  'Bus',
  'Flight',
  'Not Sure',
];

export const PreferenceSelect: React.FC<PreferenceSelectProps> = ({ setValue, watch }) => {
  const currentAccommodation = watch('accommodation') || 'Premium';
  const currentTransport = watch('transportation') || 'Car';
  const wantItinerary = watch('wantItinerary') || 'Yes';

  return (
    <div className="space-y-6">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-brand-navy-950 flex items-center gap-2">
          <Building className="w-5 h-5 text-brand-teal-600" />
          <span>Section 5: Accommodation & Transportation Preferences</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Select your preferred travel style so we can tailor the hotel categories and vehicle fleet.
        </p>
      </div>

      {/* Accommodation selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
          Hotel / Accommodation Category
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {ACCOMMODATION_OPTIONS.map((opt) => {
            const isSelected = currentAccommodation === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setValue('accommodation', opt)}
                className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                  isSelected
                    ? 'bg-brand-sky-50 border-brand-sky-500 text-brand-sky-900 shadow-xs ring-1 ring-brand-sky-400'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Transportation selector */}
      <div>
        <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2.5">
          Preferred Transportation
        </label>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-2.5">
          {TRANSPORT_OPTIONS.map((opt) => {
            const isSelected = currentTransport === opt;
            return (
              <button
                key={opt}
                type="button"
                onClick={() => setValue('transportation', opt)}
                className={`py-3 px-3 rounded-2xl text-xs sm:text-sm font-semibold border transition-all text-center ${
                  isSelected
                    ? 'bg-brand-teal-50 border-brand-teal-500 text-brand-teal-950 shadow-xs ring-1 ring-brand-teal-400'
                    : 'bg-white border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>

      {/* Flagship Differentiator: Complete Day-by-Day Itinerary (Yes prominent) */}
      <div className="p-5 sm:p-6 rounded-3xl bg-gradient-to-br from-brand-sky-50/90 via-white to-brand-teal-50/90 border-2 border-brand-sky-300 shadow-soft">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-brand-sky-100 text-brand-sky-800 text-[11px] font-bold uppercase tracking-wider">
              <CalendarCheck2 className="w-3.5 h-3.5" />
              <span>Core Recommendation</span>
            </div>
            <h4 className="text-base sm:text-lg font-bold text-brand-navy-950">
              Would you like us to prepare a complete day-by-day itinerary?
            </h4>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              We will prepare an end-to-end breakdown showing daily driving times, monument visits, hotel check-ins, and rest windows before you arrive in India.
            </p>
          </div>
        </div>

        {/* Toggle choices */}
        <div className="mt-4 flex items-center gap-3">
          <button
            type="button"
            onClick={() => setValue('wantItinerary', 'Yes')}
            className={`flex-1 py-3 px-4 rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all ${
              wantItinerary === 'Yes'
                ? 'bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 text-white shadow-soft-lg scale-[1.01]'
                : 'bg-white border border-slate-300 text-slate-600 hover:bg-slate-50'
            }`}
          >
            {wantItinerary === 'Yes' && <Check className="w-4 h-4 stroke-[3]" />}
            <span>YES, PREPARE COMPLETE ITINERARY (Recommended)</span>
          </button>

          <button
            type="button"
            onClick={() => setValue('wantItinerary', 'No')}
            className={`py-3 px-5 rounded-xl text-sm font-medium border transition-all ${
              wantItinerary === 'No'
                ? 'bg-slate-800 text-white border-slate-800'
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-700'
            }`}
          >
            No / Just Basic Coordination
          </button>
        </div>
      </div>
    </div>
  );
};
