import React, { useState } from 'react';
import { CalendarCheck, ChevronDown, ChevronUp, Sparkles, Map } from 'lucide-react';
import { sampleItineraries } from '../../data/itineraries';
import { ItineraryDay } from './ItineraryDay';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

interface ItineraryTimelineProps {
  showIntroHeading?: boolean;
  limitDays?: number;
}

export const ItineraryTimeline: React.FC<ItineraryTimelineProps> = ({
  showIntroHeading = true,
  limitDays,
}) => {
  const itinerary = sampleItineraries[0];
  // Default first 2 days open for immediate engagement
  const [openDays, setOpenDays] = useState<number[]>([1, 2]);

  const toggleDay = (dayNum: number) => {
    setOpenDays((prev) =>
      prev.includes(dayNum) ? prev.filter((d) => d !== dayNum) : [...prev, dayNum]
    );
  };

  const daysToDisplay = limitDays ? itinerary.days.slice(0, limitDays) : itinerary.days;

  const expandAll = () => {
    setOpenDays(daysToDisplay.map((d) => d.dayNumber));
  };

  const collapseAll = () => {
    setOpenDays([]);
  };

  return (
    <section className="py-16 lg:py-24 bg-gradient-to-b from-slate-50 to-white relative">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {showIntroHeading && (
          <SectionHeading
            eyebrow="Core Feature & Differentiator"
            title="Know Your Journey Before You Begin."
            description="We create a clear day-by-day travel plan so you know where you will go, what you will see, how you will travel and how your journey flows from one destination to the next."
          />
        )}

        {/* Itinerary Title Header Card */}
        <div className="mb-6 p-5 sm:p-6 rounded-2xl bg-white shadow-soft border border-slate-200/90 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brand-sky-700 mb-1">
              <Sparkles className="w-4 h-4 text-brand-teal-600" />
              <span>Sample Coordinated Route</span>
              <span>•</span>
              <span className="text-slate-500 font-medium">{itinerary.duration}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-bold text-brand-navy-950">
              {itinerary.name}
            </h3>
            <p className="text-xs sm:text-sm text-slate-500 mt-1 flex items-center gap-1.5">
              <Map className="w-3.5 h-3.5 text-brand-teal-600" />
              <span>{itinerary.destinationsCovered}</span>
            </p>
          </div>

          {/* Quick expand/collapse controls */}
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={expandAll}
              className="text-xs font-semibold text-brand-sky-700 hover:text-brand-sky-800 bg-brand-sky-50 px-3 py-1.5 rounded-lg border border-brand-sky-100 flex items-center gap-1 transition-colors"
            >
              <ChevronDown className="w-3.5 h-3.5" />
              Expand All
            </button>
            <button
              type="button"
              onClick={collapseAll}
              className="text-xs font-semibold text-slate-600 hover:text-slate-800 bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 flex items-center gap-1 transition-colors"
            >
              <ChevronUp className="w-3.5 h-3.5" />
              Collapse All
            </button>
          </div>
        </div>

        {/* Timeline List of Days */}
        <div className="space-y-3.5">
          {daysToDisplay.map((day) => (
            <ItineraryDay
              key={day.dayNumber}
              day={day}
              isOpen={openDays.includes(day.dayNumber)}
              onToggle={() => toggleDay(day.dayNumber)}
            />
          ))}
        </div>

        {/* Action Callout & CREATE MY ITINERARY CTA */}
        <div className="mt-12 text-center p-8 rounded-3xl bg-gradient-to-r from-brand-sky-50 via-white to-brand-teal-50 border border-brand-sky-200 shadow-soft-lg">
          <h4 className="text-xl sm:text-2xl font-bold text-brand-navy-950 mb-2">
            Want a Custom Day-by-Day Itinerary for Your India Trip?
          </h4>
          <p className="text-sm text-slate-600 max-w-2xl mx-auto mb-6">
            Tell us your travel dates, preferred destinations, and family requirements. We'll design a customized day-by-day itinerary tailored completely around your schedule.
          </p>

          <Button
            to="/booking?itinerary=yes"
            variant="primary"
            size="lg"
            icon={<CalendarCheck className="w-5 h-5" />}
            className="uppercase tracking-wider font-bold px-8 py-3.5 shadow-soft-lg"
          >
            CREATE MY ITINERARY
          </Button>
        </div>
      </div>
    </section>
  );
};
