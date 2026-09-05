import React from 'react';
import { PageContainer } from '../components/layout/PageContainer';
import { ReviewCarousel } from '../components/reviews/ReviewCarousel';
import { LeaveReviewBox } from '../components/reviews/LeaveReviewBox';
import { Sparkles, MessageCircle, CalendarCheck } from 'lucide-react';
import { Button } from '../components/common/Button';
import { createWhatsAppUrl } from '../utils/whatsapp';

export const Reviews: React.FC = () => {
  const whatsappUrl = createWhatsAppUrl(
    'Hello Jayashakthi Tours & Travels, I saw your traveler reviews and would like to plan a tour across India.'
  );

  return (
    <PageContainer
      seo={{
        title: 'Traveler Experiences & Reviews',
        description:
          'Read authentic traveler experiences and feedback from families and international visitors who toured India with Jayashakthi Tours & Travels.',
      }}
    >
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
            <Sparkles className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>Stories & Perspectives</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            Traveler Experiences
          </h1>

          <p className="text-lg sm:text-xl font-medium text-brand-teal-800">
            Every journey tells a story.
          </p>

          <p className="text-sm sm:text-base text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Discover how foreign visitors and families value having their day-by-day itinerary, private transport, and boutique stays organized seamlessly across India.
          </p>
        </div>
      </section>

      {/* Reviews Showcase Section */}
      <section className="py-14 sm:py-18 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Animated Moving Marquee Section */}
        <div className="mb-14 sm:mb-18">
          <div className="text-center max-w-2xl mx-auto mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-brand-navy-950">
              Live Traveler Experiences
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              Hover or touch any card to pause and read
            </p>
          </div>

          <ReviewCarousel showActions={true} showSecondaryAction={false} />
        </div>

        {/* On-Page Customer Review Box (Replaces the static duplicate review section) */}
        <div className="max-w-4xl mx-auto">
          <LeaveReviewBox />
        </div>

        {/* High-Impact CTA Strip */}
        <div className="mt-16 sm:mt-20 p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-brand-sky-50 via-white to-brand-teal-50 border border-brand-sky-200/90 shadow-soft text-center space-y-4">
          <h3 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-950 tracking-tight">
            Ready to Experience India With Us?
          </h3>
          <p className="text-sm sm:text-base text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Let our local specialists craft a tailored day-by-day itinerary with dedicated chauffeur transport and verified stays.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-4">
            <Button
              to="/booking"
              variant="primary"
              size="lg"
              icon={<CalendarCheck className="w-4 h-4" />}
              className="uppercase tracking-wider font-bold shadow-soft"
            >
              PLAN MY TRIP
            </Button>
            <Button
              href={whatsappUrl}
              external
              variant="whatsapp"
              size="lg"
              icon={<MessageCircle className="w-4 h-4 fill-white/20" />}
              className="shadow-soft"
            >
              WHATSAPP US
            </Button>
          </div>
        </div>
      </section>
    </PageContainer>
  );
};
