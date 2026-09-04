import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Phone, MessageCircle } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';

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

  return (
    <section id="faq" className="py-16 lg:py-24 bg-slate-50/70 border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Help & Answers"
          title="Frequently Asked Questions"
          description="Everything you need to know about planning, booking, and traveling across India with Jayashakthi Tours & Travels."
        />

        <div className="space-y-3.5 mt-8">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-brand-sky-300 shadow-soft'
                    : 'bg-white/80 hover:bg-white border-slate-200/80 hover:border-slate-300'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFaq(index)}
                  className="w-full text-left px-5 sm:px-6 py-4 sm:py-5 flex items-center justify-between gap-4 focus:outline-none cursor-pointer"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-brand-navy-950 flex items-center gap-2.5">
                    <HelpCircle className={`w-4 h-4 shrink-0 ${isOpen ? 'text-brand-sky-600' : 'text-slate-400'}`} />
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180 text-brand-sky-600' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Support Callout */}
        <div className="mt-10 p-5 rounded-2xl bg-white border border-slate-200/90 shadow-2xs flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div>
            <h4 className="text-sm font-bold text-brand-navy-950">Have a specific question about your trip?</h4>
            <p className="text-xs text-slate-600 mt-0.5">Our tour team is available via direct phone or WhatsApp.</p>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold shadow-soft transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 fill-white/20" />
              <span>WhatsApp Us</span>
            </a>
            <a
              href={business.phoneCallUrl}
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-brand-navy-950 text-xs font-semibold transition-colors"
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
