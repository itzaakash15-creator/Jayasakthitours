import React from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch, FieldErrors } from 'react-hook-form';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, UserPlus, Minus, Plus } from 'lucide-react';
import { BookingFormData } from '../../utils/whatsapp';

interface TravelersCountProps {
  register: UseFormRegister<BookingFormData>;
  setValue: UseFormSetValue<BookingFormData>;
  watch: UseFormWatch<BookingFormData>;
  errors: FieldErrors<BookingFormData>;
}

export const TravelersCount: React.FC<TravelersCountProps> = ({
  register,
  setValue,
  watch,
  errors,
}) => {
  const adults = watch('adults') || 1;
  const children = watch('children') || 0;

  const handleAdultsChange = (val: number) => {
    setValue('adults', Math.max(1, val));
  };

  const handleChildrenChange = (val: number) => {
    setValue('children', Math.max(0, val));
  };

  return (
    <div className="space-y-5">
      <div className="border-b border-slate-100 pb-3">
        <h3 className="text-lg font-bold text-brand-navy-950 flex items-center gap-2">
          <Users className="w-5 h-5 text-brand-sky-700" />
          <span>Section 3: Travelers & Group Size</span>
        </h3>
        <p className="text-xs text-slate-500 mt-0.5">
          Specify the number of adults and children so we can size the right vehicle and hotel rooms.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
        {/* Adults Counter */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Travelers
            </span>
            <span className="text-sm font-bold text-brand-navy-900">Adults (12+ yrs)</span>
            <span className="text-rose-500 text-xs ml-0.5">*</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleAdultsChange(adults - 1)}
              disabled={adults <= 1}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
              aria-label="Decrease adults"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-mono font-bold text-base text-brand-navy-950">
              {adults}
            </span>
            <button
              type="button"
              onClick={() => handleAdultsChange(adults + 1)}
              className="w-9 h-9 rounded-xl bg-brand-sky-50 hover:bg-brand-sky-100 text-brand-sky-700 flex items-center justify-center transition-colors"
              aria-label="Increase adults"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Children Counter */}
        <div className="p-4 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex items-center justify-between">
          <div>
            <span className="block text-xs font-bold uppercase tracking-wider text-slate-400">
              Travelers
            </span>
            <span className="text-sm font-bold text-brand-navy-900">Children (0–11 yrs)</span>
          </div>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleChildrenChange(children - 1)}
              disabled={children <= 0}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-slate-100 flex items-center justify-center text-slate-700 transition-colors"
              aria-label="Decrease children"
            >
              <Minus className="w-4 h-4" />
            </button>
            <span className="w-8 text-center font-mono font-bold text-base text-brand-navy-950">
              {children}
            </span>
            <button
              type="button"
              onClick={() => handleChildrenChange(children + 1)}
              className="w-9 h-9 rounded-xl bg-brand-teal-50 hover:bg-brand-teal-100 text-brand-teal-700 flex items-center justify-center transition-colors"
              aria-label="Increase children"
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Dynamic Children Age Fields with Framer Motion */}
      <AnimatePresence>
        {children > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="p-5 rounded-2xl bg-brand-sky-50/60 border border-brand-sky-100/90 space-y-3"
          >
            <div className="flex items-center gap-2">
              <UserPlus className="w-4 h-4 text-brand-sky-600" />
              <h4 className="text-xs font-bold uppercase tracking-wider text-brand-sky-900">
                Children's Ages (Needed for hotel bed configuration & sightseeing entry)
              </h4>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
              {Array.from({ length: children }).map((_, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.2, delay: idx * 0.05 }}
                >
                  <label
                    htmlFor={`childAge_${idx}`}
                    className="block text-xs font-semibold text-slate-700 mb-1"
                  >
                    Child {idx + 1} Age
                  </label>
                  <input
                    id={`childAge_${idx}`}
                    type="text"
                    placeholder="e.g. 6 yrs"
                    {...register(`childAges.${idx}` as const)}
                    className="w-full px-3 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200"
                  />
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
