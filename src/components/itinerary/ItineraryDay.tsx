import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, MapPin, Clock, Car, Sun, CloudSun, Moon, CheckCircle2 } from 'lucide-react';
import { ItineraryDayItem } from '../../data/itineraries';

interface ItineraryDayProps {
  day: ItineraryDayItem;
  isOpen: boolean;
  onToggle: () => void;
}

export const ItineraryDay: React.FC<ItineraryDayProps> = ({ day, isOpen, onToggle }) => {
  return (
    <div
      className={`rounded-2xl transition-all duration-300 border ${
        isOpen
          ? 'bg-white shadow-soft-lg border-brand-sky-300 ring-1 ring-brand-sky-200'
          : 'bg-white/80 hover:bg-white shadow-soft border-slate-200/80 hover:border-brand-sky-200'
      }`}
    >
      {/* Header / Clickable Toggle */}
      <button
        type="button"
        onClick={onToggle}
        className="w-full p-5 sm:p-6 text-left flex items-start sm:items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky-500 rounded-2xl"
        aria-expanded={isOpen}
      >
        <div className="flex items-start sm:items-center gap-3.5 sm:gap-4 flex-grow">
          {/* Day Number Pill */}
          <div
            className={`w-12 h-12 rounded-xl flex flex-col items-center justify-center shrink-0 transition-colors font-mono ${
              isOpen
                ? 'bg-gradient-to-br from-brand-sky-600 to-brand-teal-600 text-white shadow-sm'
                : 'bg-brand-sky-50 text-brand-sky-800 border border-brand-sky-200'
            }`}
          >
            <span className="text-[10px] uppercase font-bold tracking-wider leading-none">Day</span>
            <span className="text-lg font-extrabold leading-none mt-0.5">{day.dayNumber}</span>
          </div>

          <div className="flex-grow">
            <div className="flex flex-wrap items-center gap-2 mb-1">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-teal-700">
                {day.stayLocation}
              </span>
              {day.distanceTime && (
                <span className="inline-flex items-center gap-1 text-[11px] text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">
                  <Clock className="w-3 h-3 text-slate-400" />
                  {day.distanceTime}
                </span>
              )}
            </div>
            <h4 className="text-base sm:text-lg font-bold text-brand-navy-950">
              {day.title}
            </h4>
            <p className="text-xs sm:text-sm text-slate-500 mt-0.5 hidden sm:block">
              {day.route}
            </p>
          </div>
        </div>

        {/* Expand Icon */}
        <div
          className={`p-2 rounded-xl transition-all duration-200 shrink-0 ${
            isOpen ? 'bg-brand-sky-50 text-brand-sky-700 rotate-180' : 'text-slate-400 hover:text-slate-600 bg-slate-50'
          }`}
        >
          <ChevronDown className="w-5 h-5" />
        </div>
      </button>

      {/* Expandable Body */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="overflow-hidden"
          >
            <div className="px-5 pb-6 sm:px-6 pt-1 border-t border-slate-100">
              {/* Highlights Pill Row */}
              <div className="mb-4">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2">
                  Key Day Highlights:
                </span>
                <div className="flex flex-wrap gap-2">
                  {day.highlights.map((item, idx) => (
                    <span
                      key={idx}
                      className="inline-flex items-center gap-1.5 text-xs bg-slate-50 border border-slate-200/80 px-2.5 py-1 rounded-lg text-slate-700"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-brand-teal-600" />
                      {item}
                    </span>
                  ))}
                </div>
              </div>

              {/* Schedule Grid: Morning, Afternoon, Evening */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 mt-4 pt-3 border-t border-slate-100">
                <div className="p-3.5 rounded-xl bg-amber-50/60 border border-amber-100/80">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-amber-800 mb-1.5">
                    <Sun className="w-4 h-4 text-amber-600" />
                    <span>Morning</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {day.schedule.morning}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-brand-sky-50/60 border border-brand-sky-100/80">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-brand-sky-800 mb-1.5">
                    <CloudSun className="w-4 h-4 text-brand-sky-600" />
                    <span>Afternoon</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {day.schedule.afternoon}
                  </p>
                </div>

                <div className="p-3.5 rounded-xl bg-indigo-50/60 border border-indigo-100/80">
                  <div className="flex items-center gap-2 text-xs font-bold uppercase text-indigo-900 mb-1.5">
                    <Moon className="w-4 h-4 text-indigo-600" />
                    <span>Evening</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {day.schedule.evening}
                  </p>
                </div>
              </div>

              {/* Logistics bar */}
              <div className="mt-4 pt-3 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-500 border-t border-slate-100/80">
                <div className="flex items-center gap-1.5">
                  <Car className="w-3.5 h-3.5 text-brand-teal-600" />
                  <span className="font-medium text-slate-700">Transportation:</span> {day.transportMode}
                </div>
                <div className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-brand-sky-600" />
                  <span className="font-medium text-slate-700">Overnight Stay:</span> {day.stayLocation}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
