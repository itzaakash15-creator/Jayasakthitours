import React from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import { MapPin, Check } from 'lucide-react';
import { BookingFormData } from '../../utils/whatsapp';

interface DestinationSelectProps {
  register: UseFormRegister<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

const DESTINATION_OPTIONS = [
  'Kerala',
  'Tamil Nadu',
  'Karnataka',
  'Rajasthan',
  'Delhi',
  'Agra',
  'Goa',
  'Varanasi',
  'Himachal Pradesh',
  'Kashmir',
  'Other',
];

export const DestinationSelect: React.FC<DestinationSelectProps> = ({
  register,
  setValue,
  watch,
  errors,
}) => {
  const selectedDestinations = watch('destinations') || [];
  const hasOther = selectedDestinations.includes('Other');

  const toggleDestination = (dest: string) => {
    let updated: string[];
    if (selectedDestinations.includes(dest)) {
      updated = selectedDestinations.filter((d) => d !== dest);
    } else {
      updated = [...selectedDestinations, dest];
    }
    setValue('destinations', updated, { shouldValidate: true });
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-brand-navy-950 flex items-center gap-2">
          <MapPin className="w-5 h-5 text-brand-sky-600" />
          <span>Section 4: Destinations of Interest</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Select one or multiple regions you would like to explore. We will connect them seamlessly.
        </p>
      </div>

      {/* Destination Pills */}
      <div className="flex flex-wrap gap-2.5">
        {DESTINATION_OPTIONS.map((dest) => {
          const isSelected = selectedDestinations.includes(dest);
          return (
            <button
              key={dest}
              type="button"
              onClick={() => toggleDestination(dest)}
              className={`px-4 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 flex items-center gap-2 border ${
                isSelected
                  ? 'bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 text-white shadow-soft border-transparent scale-[1.02]'
                  : 'bg-white hover:bg-slate-50 text-slate-700 border-slate-200/90 shadow-2xs'
              }`}
            >
              <div
                className={`w-4 h-4 rounded-md flex items-center justify-center text-[10px] ${
                  isSelected ? 'bg-white/20 text-white' : 'border border-slate-300'
                }`}
              >
                {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
              </div>
              <span>{dest}</span>
            </button>
          );
        })}
      </div>

      {errors.destinations && (
        <p className="text-xs text-rose-500 font-medium">{errors.destinations.message}</p>
      )}

      {/* Dynamic text input for "Other" */}
      {hasOther && (
        <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-1.5 animate-fadeIn">
          <label htmlFor="customDestination" className="block text-xs font-semibold text-slate-700">
            Please specify your custom destinations or special cities:
          </label>
          <input
            id="customDestination"
            type="text"
            placeholder="e.g. Madurai, Pondicherry, Hampi, Rameswaram, Mysore..."
            {...register('customDestination')}
            className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200"
          />
        </div>
      )}
    </div>
  );
};
