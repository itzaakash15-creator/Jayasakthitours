import React, { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  MessageSquarePlus,
  Star,
  Upload,
  CheckCircle2,
  ThumbsUp,
  User,
  Mail,
  Globe,
  Sparkles,
  ArrowRight,
} from 'lucide-react';
import { PageContainer } from '../components/layout/PageContainer';
import { StarRating } from '../components/reviews/StarRating';
import { Button } from '../components/common/Button';
import { reviewFormSchema, ReviewFormSchemaType } from '../utils/validation';
import { createReview } from '../lib/supabase';

export const SubmitReview: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [uploadedPhotoName, setUploadedPhotoName] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ReviewFormSchemaType>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      country: '',
      tripType: 'Family',
      overallRating: 5,
      transportRating: 5,
      hotelRating: 5,
      planningRating: 5,
      coordinationRating: 5,
      recommend: 'Yes',
      review: '',
      consent: true,
    },
  });

  const onSubmit = async (data: ReviewFormSchemaType) => {
    console.log('[DEBUG REVIEW] 1. SubmitReview: Submit button triggered');
    console.log('[DEBUG REVIEW] 2. SubmitReview: Validation passed, form data:', data);

    setIsSubmitting(true);
    setSubmitError(null);
    try {
      const payload = {
        customer_name: data.fullName,
        rating: data.overallRating || 5,
        review_text: data.review,
      };
      console.log('[DEBUG REVIEW] 3. SubmitReview: Calling createReview with payload:', payload);

      const result = await createReview(payload);
      console.log('[DEBUG REVIEW] 6. SubmitReview: Successfully submitted review:', result);
      setSubmitted(true);
    } catch (e: any) {
      console.error('[DEBUG REVIEW] 6. SubmitReview: Caught error during submission:', e);
      setSubmitError(e?.message || 'Unable to submit review right now. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setUploadedPhotoName(e.target.files[0].name);
    }
  };

  const tripTypeOptions = [
    'Family',
    'Group',
    'Solo',
    'Couple',
    'Customized',
    'Temple / Spiritual',
    'Other',
  ] as const;

  return (
    <PageContainer
      seo={{
        title: 'Submit Your Review | How Was Your Journey With Us?',
        description:
          'Share your travel review with Jayashakthi Tours & Travels. Rate your transportation, hotel stays, itinerary planning, and coordination.',
      }}
    >
      {/* Header Banner */}
      <section className="py-14 sm:py-20 bg-gradient-to-b from-brand-sky-50 via-white to-slate-50 border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-brand-sky-50 text-brand-sky-700 border border-brand-sky-200">
            <MessageSquarePlus className="w-3.5 h-3.5 text-brand-teal-600" />
            <span>Customer Feedback</span>
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-brand-navy-950 tracking-tight leading-tight">
            How Was Your Journey With Us?
          </h1>

          <p className="text-sm sm:text-base md:text-lg text-slate-600 leading-relaxed max-w-2xl mx-auto">
            Your feedback helps us continuously refine our itineraries, transport fleets, and driver hospitality. Thank you for traveling across India with Jayashakthi Tours & Travels.
          </p>
        </div>
      </section>

      {/* Review Form Section */}
      <section className="py-14 sm:py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {!submitted ? (
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="bg-white rounded-3xl shadow-soft-lg border border-slate-200/90 p-6 sm:p-10 space-y-8"
          >
            {/* Personal Details */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-brand-navy-950 pb-2 border-b border-slate-100 flex items-center gap-2">
                <User className="w-4 h-4 text-brand-sky-600" />
                <span>Personal & Trip Details</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="review_fullName" className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="review_fullName"
                    type="text"
                    placeholder="e.g. David Williams"
                    {...register('fullName')}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200"
                  />
                  {errors.fullName && (
                    <p className="text-xs text-rose-500 mt-1">{errors.fullName.message}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="review_email" className="block text-xs font-semibold text-slate-700 mb-1">
                    Email Address <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="review_email"
                    type="email"
                    placeholder="e.g. david@example.com"
                    {...register('email')}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200"
                  />
                  {errors.email && (
                    <p className="text-xs text-rose-500 mt-1">{errors.email.message}</p>
                  )}
                </div>

                {/* Country */}
                <div>
                  <label htmlFor="review_country" className="block text-xs font-semibold text-slate-700 mb-1">
                    Country <span className="text-rose-500">*</span>
                  </label>
                  <input
                    id="review_country"
                    type="text"
                    placeholder="e.g. Australia, France, USA..."
                    {...register('country')}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200"
                  />
                  {errors.country && (
                    <p className="text-xs text-rose-500 mt-1">{errors.country.message}</p>
                  )}
                </div>

                {/* Trip Type */}
                <div>
                  <label htmlFor="review_tripType" className="block text-xs font-semibold text-slate-700 mb-1">
                    Trip Type <span className="text-rose-500">*</span>
                  </label>
                  <select
                    id="review_tripType"
                    {...register('tripType')}
                    className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200"
                  >
                    {tripTypeOptions.map((type) => (
                      <option key={type} value={type}>
                        {type} Travel
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Separate Rating Questions */}
            <div className="space-y-4">
              <h3 className="text-base font-bold text-brand-navy-950 pb-2 border-b border-slate-100 flex items-center gap-2">
                <Star className="w-4 h-4 text-brand-gold-500 fill-brand-gold-400" />
                <span>Rate Your Experience</span>
              </h3>

              <div className="space-y-3.5 divide-y divide-slate-100">
                {/* 1. Overall Experience */}
                <div className="pt-2 flex items-center justify-between gap-4">
                  <span className="text-xs sm:text-sm font-semibold text-slate-800">
                    Overall Experience
                  </span>
                  <Controller
                    control={control}
                    name="overallRating"
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        interactive={true}
                        onChange={field.onChange}
                        size="md"
                      />
                    )}
                  />
                </div>

                {/* 2. Transportation */}
                <div className="pt-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                      Transportation & Chauffeur
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Vehicle cleanliness, driver courtesy & punctuality
                    </span>
                  </div>
                  <Controller
                    control={control}
                    name="transportRating"
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        interactive={true}
                        onChange={field.onChange}
                        size="md"
                      />
                    )}
                  />
                </div>

                {/* 3. Hotel Arrangements */}
                <div className="pt-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                      Hotel Arrangements
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Hygiene, location, room comfort & check-in ease
                    </span>
                  </div>
                  <Controller
                    control={control}
                    name="hotelRating"
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        interactive={true}
                        onChange={field.onChange}
                        size="md"
                      />
                    )}
                  />
                </div>

                {/* 4. Itinerary & Trip Planning */}
                <div className="pt-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                      Itinerary & Trip Planning
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Clarity of day-by-day agenda & pacing
                    </span>
                  </div>
                  <Controller
                    control={control}
                    name="planningRating"
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        interactive={true}
                        onChange={field.onChange}
                        size="md"
                      />
                    )}
                  />
                </div>

                {/* 5. Tour Coordination */}
                <div className="pt-3 flex items-center justify-between gap-4">
                  <div>
                    <span className="text-xs sm:text-sm font-semibold text-slate-800 block">
                      Tour Coordination
                    </span>
                    <span className="text-[11px] text-slate-400">
                      Communication, responsiveness & support
                    </span>
                  </div>
                  <Controller
                    control={control}
                    name="coordinationRating"
                    render={({ field }) => (
                      <StarRating
                        rating={field.value}
                        interactive={true}
                        onChange={field.onChange}
                        size="md"
                      />
                    )}
                  />
                </div>
              </div>
            </div>

            {/* Would You Recommend Us */}
            <div className="space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Would You Recommend Jayashakthi Tours & Travels?
              </label>
              <div className="grid grid-cols-3 gap-3">
                {(['Yes', 'Maybe', 'No'] as const).map((choice) => (
                  <label
                    key={choice}
                    className="flex items-center justify-center p-3 rounded-xl border border-slate-200 cursor-pointer hover:bg-slate-50 text-xs font-semibold text-slate-800 has-checked:border-brand-sky-500 has-checked:bg-brand-sky-50 has-checked:text-brand-sky-900 transition-all"
                  >
                    <input
                      type="radio"
                      value={choice}
                      {...register('recommend')}
                      className="sr-only"
                    />
                    <span>{choice}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Detailed Review Textarea */}
            <div>
              <label htmlFor="review_text" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                Your Review <span className="text-rose-500">*</span>
              </label>
              <textarea
                id="review_text"
                rows={4}
                placeholder="Share your experience: what did you like about the itinerary, destinations, driver, and travel coordination?"
                {...register('review')}
                className="w-full px-3.5 py-2.5 rounded-xl text-sm border border-slate-200 bg-white focus:outline-none focus:ring-2 focus:ring-brand-sky-200 text-slate-800"
              />
              {errors.review && (
                <p className="text-xs text-rose-500 mt-1">{errors.review.message}</p>
              )}
            </div>

            {/* Optional Photo Upload */}
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Optional Travel Photo Upload
              </label>
              <p className="text-xs text-slate-500">
                Share a photo of your trip, temple visit, or vehicle journey (optional).
              </p>
              <div className="flex items-center gap-3">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors">
                  <Upload className="w-3.5 h-3.5" />
                  <span>Choose Photo</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="sr-only"
                  />
                </label>
                {uploadedPhotoName && (
                  <span className="text-xs text-emerald-700 font-medium truncate max-w-xs">
                    ✓ {uploadedPhotoName}
                  </span>
                )}
              </div>
            </div>

            {/* Consent Checkbox */}
            <div>
              <label className="flex items-start gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  {...register('consent')}
                  className="mt-0.5 rounded border-slate-300 text-brand-sky-600 focus:ring-brand-sky-500 h-4 w-4"
                />
                <span className="text-xs text-slate-600 leading-relaxed">
                  I give permission for my submitted review and/or photo to be used on the Jayashakthi Tours & Travels website.
                </span>
              </label>
              {errors.consent && (
                <p className="text-xs text-rose-500 mt-1">{errors.consent.message}</p>
              )}
            </div>

            {submitError && (
              <div className="p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-xs flex items-center gap-2">
                <span>⚠️ {submitError}</span>
              </div>
            )}

            {/* Submit Button */}
            <div className="pt-2">
              <Button
                type="submit"
                variant="primary"
                size="lg"
                fullWidth
                disabled={isSubmitting}
                icon={<CheckCircle2 className="w-5 h-5" />}
                className="uppercase tracking-wider font-bold shadow-soft-lg py-3.5"
              >
                {isSubmitting ? 'SUBMITTING...' : 'SUBMIT REVIEW'}
              </Button>
            </div>
          </form>
        ) : (
          /* Polished Success State */
          <div className="bg-white rounded-3xl shadow-soft-xl border border-emerald-200 p-8 sm:p-12 text-center space-y-5 animate-fadeIn">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
              <CheckCircle2 className="w-9 h-9" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
                Thank You For Your Review
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy-950">
                Feedback Successfully Submitted!
              </h2>
              <p className="text-sm text-slate-600 max-w-md mx-auto leading-relaxed">
                We truly appreciate your time and kind feedback. Your review will be reviewed by our team and featured on our website.
              </p>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-3">
              <Button to="/reviews" variant="secondary" size="md">
                View Traveler Reviews
              </Button>
              <Button to="/" variant="outline" size="md">
                Return to Home
              </Button>
            </div>
          </div>
        )}
      </section>
    </PageContainer>
  );
};
