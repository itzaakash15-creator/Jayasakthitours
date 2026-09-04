import React, { useEffect } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import { Calendar, Moon, Sun } from 'lucide-react';
import { BookingFormData } from '../../utils/whatsapp';

interface TravelDetailsProps {
  register: UseFormRegister<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

export const TravelDetails: React.FC<TravelDetailsProps> = ({
  register,
  setValue,
  watch,
  errors,
}) => {
  const startDate = watch('startDate');
  const endDate = watch('endDate');
  const totalDays = watch('totalDays');
  const totalNights = watch('totalNights');

  // Automatically calculate total days and nights when dates are selected
  useEffect(() => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const diffTime = end.getTime() - start.getTime();

      if (diffTime >= 0) {
        const calculatedNights = Math.round(diffTime / (1000 * 60 * 60 * 24));
        const calculatedDays = calculatedNights + 1;

        setValue('totalNights', calculatedNights);
        setValue('totalDays', calculatedDays);
      }
    }
  }, [startDate, endDate, setValue]);

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-brand-navy-950 flex items-center gap-2">
          <Calendar className="w-5 h-5 text-brand-teal-600" />
          <span>Section 2: Travel Dates & Duration</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Select your intended trip schedule. Dates can be adjusted during coordination.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {/* Start Date */}
        <div>
          <label htmlFor="startDate" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Arrival / Start Date <span className="text-rose-500">*</span>
          </label>
          <input
            id="startDate"
            type="date"
            {...register('startDate')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-colors ${
              errors.startDate
                ? 'border-rose-400 focus:ring-rose-200'
                : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100'
            }`}
          />
          {errors.startDate && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.startDate.message}</p>
          )}
        </div>

        {/* End Date */}
        <div>
          <label htmlFor="endDate" className="block text-xs font-semibold text-slate-700 mb-1.5">
            Departure / End Date <span className="text-rose-500">*</span>
          </label>
          <input
            id="endDate"
            type="date"
            {...register('endDate')}
            className={`w-full px-3.5 py-2.5 rounded-xl text-sm border bg-white focus:outline-none focus:ring-2 transition-colors ${
              errors.endDate
                ? 'border-rose-400 focus:ring-rose-200'
                : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100'
            }`}
          />
          {errors.endDate && (
            <p className="text-xs text-rose-500 mt-1 font-medium">{errors.endDate.message}</p>
          )}
        </div>
      </div>

      {/* Auto-calculated Days & Nights Banner */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        <div className="p-3.5 rounded-xl bg-brand-sky-50/70 border border-brand-sky-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sun className="w-4 h-4 text-brand-sky-600" />
            <span className="text-xs font-semibold text-brand-sky-900">Total Days:</span>
          </div>
          <span className="font-mono text-sm font-bold text-brand-sky-800">
            {totalDays ? `${totalDays} Days` : 'Auto-calculated'}
          </span>
        </div>

        <div className="p-3.5 rounded-xl bg-brand-teal-50/70 border border-brand-teal-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Moon className="w-4 h-4 text-brand-teal-600" />
            <span className="text-xs font-semibold text-brand-teal-900">Total Nights:</span>
          </div>
          <span className="font-mono text-sm font-bold text-brand-teal-800">
            {totalNights !== undefined ? `${totalNights} Nights` : 'Auto-calculated'}
          </span>
        </div>
      </div>
    </div>
  );
};
