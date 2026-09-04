import React from 'react';
import { motion } from 'framer-motion';
import {
  MessageSquare,
  CalendarCheck2,
  CheckCircle2,
  PlaneLanding,
  Compass,
  Headphones,
  Home,
  ArrowRight,
} from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { Button } from '../common/Button';

interface JourneyStep {
  stepNumber: string;
  name: string;
  subtitle: string;
  desc: string;
  icon: React.ReactNode;
}

export const JourneyFlow: React.FC = () => {
  const steps: JourneyStep[] = [
    {
      stepNumber: '01',
      name: 'PLAN',
      subtitle: 'Share Your Idea',
      desc: 'Tell us your dates, group size, preferred destinations, and style.',
      icon: <MessageSquare className="w-5 h-5 text-brand-sky-600" />,
    },
    {
      stepNumber: '02',
      name: 'ITINERARY',
      subtitle: 'Custom Daily Plan',
      desc: 'We prepare a clear day-by-day itinerary before you begin.',
      icon: <CalendarCheck2 className="w-5 h-5 text-brand-teal-600" />,
    },
    {
      stepNumber: '03',
      name: 'BOOK',
      subtitle: 'Everything Reserved',
      desc: 'Hotels, chauffeur vehicles, flights & guides booked together.',
      icon: <CheckCircle2 className="w-5 h-5 text-brand-sky-700" />,
    },
    {
      stepNumber: '04',
      name: 'ARRIVE',
      subtitle: 'Warm Welcome',
      desc: 'Punctual airport reception with name board & luggage support.',
      icon: <PlaneLanding className="w-5 h-5 text-brand-teal-700" />,
    },
    {
      stepNumber: '05',
      name: 'EXPLORE',
      subtitle: 'Immersive Travel',
      desc: 'Travel comfortably between temples, heritage monuments & nature.',
      icon: <Compass className="w-5 h-5 text-brand-gold-600" />,
    },
    {
      stepNumber: '06',
      name: 'SUPPORT',
      subtitle: 'Always Coordinated',
      desc: 'Active assistance and schedule coordination throughout.',
      icon: <Headphones className="w-5 h-5 text-brand-sky-600" />,
    },
    {
      stepNumber: '07',
      name: 'RETURN',
      subtitle: 'Smooth Departure',
      desc: 'Punctual transfer to airport for your memorable journey home.',
      icon: <Home className="w-5 h-5 text-brand-teal-600" />,
    },
  ];

  return (
    <section className="py-16 lg:py-24 bg-white border-y border-slate-100 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Complete Trip Coordination"
          title="One Trip. One Team. Everything Taken Care Of."
          description="You don’t have to piece together individual cab drivers, hotel portals, entry passes, and train tickets. We coordinate your entire India journey as a single, harmonious experience."
        />

        {/* Desktop Horizontal Journey Timeline */}
        <div className="hidden xl:block relative mt-12 mb-12">
          {/* Connecting Track Line */}
          <div className="absolute top-1/2 left-10 right-10 h-0.5 bg-gradient-to-r from-brand-sky-200 via-brand-teal-200 to-brand-gold-200 -translate-y-12 -z-0" />

          <div className="grid grid-cols-7 gap-3 relative z-10">
            {steps.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.1 }}
                className="flex flex-col items-center text-center group"
              >
                {/* Step Circle with Icon */}
                <div className="relative mb-4">
                  <div className="w-14 h-14 rounded-2xl bg-white shadow-soft group-hover:shadow-soft-lg border-2 border-brand-sky-100 group-hover:border-brand-sky-400 flex items-center justify-center transition-all duration-300 transform group-hover:-translate-y-1">
                    {step.icon}
                  </div>
                  <span className="absolute -bottom-2 -right-2 px-1.5 py-0.5 rounded-md bg-slate-900 text-white text-[10px] font-bold font-mono">
                    {step.stepNumber}
                  </span>
                </div>

                {/* Step Title */}
                <h4 className="font-display font-extrabold text-sm tracking-wider text-brand-navy-950 uppercase group-hover:text-brand-sky-700 transition-colors">
                  {step.name}
                </h4>
                <div className="text-xs font-semibold text-brand-teal-700 mb-1.5">
                  {step.subtitle}
                </div>
                <p className="text-[11px] text-slate-500 leading-snug max-w-[130px]">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Tablet / Mobile Vertical Journey Timeline */}
        <div className="block xl:hidden mt-8 space-y-4">
          <div className="relative pl-6 border-l-2 border-brand-sky-200 ml-4 space-y-6">
            {steps.map((step, idx) => (
              <motion.div
                key={step.stepNumber}
                initial={{ opacity: 0, x: -10 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: idx * 0.05 }}
                className="relative bg-slate-50/80 rounded-2xl p-4 sm:p-5 border border-slate-200/80"
              >
                {/* Timeline node */}
                <div className="absolute -left-[35px] top-4 w-7 h-7 rounded-full bg-white border-2 border-brand-sky-600 flex items-center justify-center text-[10px] font-bold text-brand-sky-700 shadow-xs">
                  {idx + 1}
                </div>

                <div className="flex items-start gap-3.5">
                  <div className="w-10 h-10 rounded-xl bg-white shadow-2xs border border-slate-200 flex items-center justify-center shrink-0">
                    {step.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-display font-extrabold text-sm tracking-wider text-brand-navy-950 uppercase">
                        {step.name}
                      </span>
                      <span className="text-xs font-medium text-brand-teal-700">
                        • {step.subtitle}
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-600 mt-1 leading-relaxed">
                      {step.desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Journey Bottom Action */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-4 rounded-2xl bg-gradient-to-r from-brand-sky-50 via-white to-brand-teal-50 border border-brand-sky-100 shadow-soft">
            <p className="text-sm text-slate-700 font-medium">
              Ready to see what your journey looks like?
            </p>
            <Button
              to="/booking"
              variant="primary"
              size="sm"
              icon={<ArrowRight className="w-4 h-4" />}
              iconPosition="right"
              className="uppercase tracking-wider font-bold"
            >
              Start Planning With Our Team
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};
