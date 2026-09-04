import React, { useState } from 'react';
import { ChevronDown, Phone, MessageCircle } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import { CompassRoseSketch, WindingRouteSketch } from '../common/TravelDecorations';

interface FaqItem {
  question: string;
  answer: string;
}

const faqs: FaqItem[] = [
  {
    question: 'How can I enquire about a tour package or travel plan?',
    answer:
      'You can enquire directly by calling our primary line at 9444796073 or messaging us on WhatsApp at +91 98408 15556. Simply share your destination of interest, dates, and number of travelers, and we will prepare a personalized itinerary with complete coordination details.',
  },
  {
    question: 'Can I customize my trip itinerary?',
    answer:
      'Yes, absolutely. Every tour we organize is customized around your schedule, preferred travel pace, hotel comfort preferences, and sightseeing interests. We do not force rigid schedules—your journey is designed around you.',
  },
  {
    question: 'How do I contact Jayashakthi Tours & Travels?',
    answer:
      'You can call us directly on 9444796073, connect with our travel team via WhatsApp on +91 98408 15556, or visit our office at Plot No. 14, V.O.C. 2nd Street, Kannan Nagar, Madipakkam, Chennai - 600 091, Tamil Nadu.',
  },
  {
    question: 'How can I plan a family or senior-friendly trip?',
    answer:
      'For family and elder travel, we ensure comfortable, spacious air-conditioned vehicles (like Innova Crysta or luxury Tempo Travellers), select hotels with step-free or elevator access, and design gentle daily pacing with sufficient rest periods.',
  },
  {
    question: 'What travel coordination services do you provide?',
    answer:
      'We coordinate complete end-to-end travel arrangements across India, including private chauffeur-driven vehicles, hotel and heritage stay reservations, airport pickups and transfers, guided sightseeing, temple darshan coordination, and 24/7 on-trip support.',
  },
  {
    question: 'How far in advance should I book my journey?',
    answer:
      'We recommend reaching out at least 2 to 4 weeks before your desired travel date, particularly for peak travel periods such as winter and festival seasons. However, we also do our best to accommodate short-notice travel whenever vehicles and stays are available.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  const toggleFaq = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--faq-mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--faq-mouse-y', `${y}px`);
  };

  return (
    <section
      id="faq"
      className="relative py-16 lg:py-24 bg-gradient-to-b from-[#F2F5F8] via-[#F5F8FA] to-[#EFF3F6] border-t border-slate-200/60 scroll-mt-20 overflow-hidden"
    >
      {/* Very light cool blue-grey & subtle misty atmosphere */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-white/75 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -top-24 right-10 w-[600px] h-[500px] bg-brand-sky-100/20 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute -bottom-24 left-10 w-[600px] h-[500px] bg-slate-200/20 rounded-full blur-3xl pointer-events-none -z-10" />

      {/* Minimal Travel Line-Art: Compass Rose & Journey Route */}
      <CompassRoseSketch className="absolute top-10 left-4 sm:left-12 w-28 sm:w-36 text-brand-sky-800" opacity="opacity-[0.05]" />
      <WindingRouteSketch className="absolute bottom-6 right-4 sm:right-12 w-64 sm:w-96 text-brand-teal-800" opacity="opacity-[0.04]" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          eyebrow="Help & Answers"
          title="Frequently Asked Questions"
          description="Everything you need to know about planning, booking, and traveling across India with Jayashakthi Tours & Travels."
        />

        {/* Question Journey Timeline Accordion */}
        <div className="mt-10 relative">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            const itemNumber = String(index + 1).padStart(2, '0');
            const isNearActive = isOpen || openIndex === index + 1 || (index > 0 && openIndex === index - 1);

            return (
              <React.Fragment key={index}>
                <div
                  onMouseMove={handleMouseMove}
                  className={`group relative rounded-2xl border transition-all duration-300 ease-out overflow-hidden ${
                    isOpen
                      ? 'bg-white border-brand-sky-300/90 shadow-soft-lg -translate-y-0.5'
                      : 'bg-white/85 hover:bg-white border-slate-200/85 hover:border-brand-sky-200/90 hover:shadow-soft hover:-translate-y-0.5'
                  }`}
                >
                  {/* Subtle Active Accent Line (Left edge indicator) */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[3px] rounded-l-2xl transition-all duration-300 ${
                      isOpen
                        ? 'bg-gradient-to-b from-brand-sky-500 via-brand-teal-500 to-brand-sky-400 opacity-100'
                        : 'opacity-0'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Internal Journey Route Spine (Runs directly behind progressive number) */}
                  <div
                    className={`absolute left-[29px] sm:left-[39px] top-0 bottom-0 w-[2px] pointer-events-none transition-colors duration-300 ${
                      isOpen
                        ? 'bg-gradient-to-b from-brand-sky-400/80 via-brand-teal-400/80 to-brand-sky-300/40'
                        : 'border-l-2 border-dashed border-slate-200/70 group-hover:border-brand-sky-200/70'
                    }`}
                    aria-hidden="true"
                  />

                  {/* Subtle Cursor Radial Highlight Sheen */}
                  <div
                    className="pointer-events-none absolute inset-0 rounded-2xl transition-opacity duration-300 opacity-0 group-hover:opacity-100"
                    style={{
                      background: `radial-gradient(360px circle at var(--faq-mouse-x, 50%) var(--faq-mouse-y, 50%), rgba(14, 165, 233, 0.045), rgba(20, 184, 166, 0.025), transparent 70%)`,
                    }}
                    aria-hidden="true"
                  />

                  {/* Question Button Header */}
                  <button
                    type="button"
                    id={`faq-question-${index}`}
                    aria-controls={`faq-answer-${index}`}
                    aria-expanded={isOpen}
                    onClick={() => toggleFaq(index)}
                    className="w-full text-left px-4 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-sky-500/50 focus-visible:ring-inset rounded-2xl cursor-pointer relative z-10"
                  >
                    <div className="flex items-center gap-3.5 sm:gap-4 min-w-0 pr-2">
                      {/* Progressive Question Number Node */}
                      <div className="relative shrink-0">
                        {/* Soft Waypoint Beacon Glow when Active */}
                        {isOpen && (
                          <span
                            className="absolute -inset-1 rounded-xl bg-brand-sky-400/25 animate-ping opacity-40 pointer-events-none"
                            style={{ animationDuration: '3.2s' }}
                            aria-hidden="true"
                          />
                        )}
                        <div
                          className={`w-7 h-7 sm:w-8 sm:h-8 rounded-xl flex items-center justify-center text-[11px] sm:text-xs font-mono transition-all duration-300 ${
                            isOpen
                              ? 'bg-gradient-to-br from-brand-sky-500 via-brand-sky-600 to-brand-teal-600 text-white font-bold shadow-soft ring-2 ring-brand-sky-200/80 scale-105'
                              : 'bg-slate-50/95 text-slate-500 font-semibold border border-slate-200/90 shadow-2xs group-hover:border-brand-sky-300/80 group-hover:text-brand-sky-700 group-hover:bg-brand-sky-50/50 group-hover:scale-102'
                          }`}
                        >
                          {itemNumber}
                        </div>
                      </div>

                      {/* Question Text */}
                      <span
                        className={`text-sm sm:text-base font-bold transition-colors duration-200 ${
                          isOpen
                            ? 'text-brand-navy-950'
                            : 'text-brand-navy-900 group-hover:text-brand-navy-950'
                        }`}
                      >
                        {faq.question}
                      </span>
                    </div>

                    {/* Arrow Container with Smooth 180deg Rotation */}
                    <div
                      className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 transition-all duration-300 ${
                        isOpen
                          ? 'bg-brand-sky-50 text-brand-sky-600 ring-1 ring-brand-sky-200/70 rotate-180'
                          : 'bg-slate-100/70 text-slate-400 group-hover:bg-brand-sky-50/80 group-hover:text-brand-sky-600 group-hover:translate-y-0.5'
                      }`}
                      aria-hidden="true"
                    >
                      <ChevronDown className="w-4 h-4 transition-transform duration-300" />
                    </div>
                  </button>

                  {/* Accordion Answer Body with CSS Grid Height Transition & Reveal */}
                  <div
                    id={`faq-answer-${index}`}
                    role="region"
                    aria-labelledby={`faq-question-${index}`}
                    className={`grid transition-[grid-template-rows] duration-350 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                      isOpen ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <div
                        className={`pl-[3.25rem] sm:pl-[4.25rem] pr-5 sm:pr-8 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100/90 transition-all duration-300 relative z-10 ${
                          isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-1'
                        }`}
                      >
                        <p className="max-w-2xl">{faq.answer}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inter-Card Journey Connector Route Segment */}
                {index < faqs.length - 1 && (
                  <div className="relative h-3.5 sm:h-4 my-0.5 flex items-center" aria-hidden="true">
                    {/* Vertical Connector Path */}
                    <div
                      className={`absolute left-[29px] sm:left-[39px] -top-1 -bottom-1 w-[2px] transition-all duration-300 ${
                        isOpen || openIndex === index + 1
                          ? 'bg-gradient-to-b from-brand-sky-400 to-brand-teal-400 opacity-90'
                          : isNearActive
                          ? 'border-l-2 border-dashed border-brand-sky-200/70'
                          : 'border-l-2 border-dashed border-slate-200/80'
                      }`}
                    />
                    {/* Route Waypoint Dot */}
                    <div
                      className={`absolute left-[28px] sm:left-[38px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isOpen || openIndex === index + 1
                          ? 'bg-brand-sky-500 ring-2 ring-brand-sky-200/80 scale-125'
                          : 'bg-slate-300/80'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-12 p-5 sm:p-6 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left transition-all hover:shadow-soft">
          <div>
            <h4 className="text-sm font-bold text-brand-navy-950">Have a specific question about your trip?</h4>
            <p className="text-xs text-slate-600 mt-0.5">Our tour team is available via direct phone or WhatsApp.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-soft transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={business.phoneCallUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy-950 text-xs font-semibold transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-brand-sky-600" />
              <span>Call {business.phone}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

