import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, Globe, MapPin, Send, CheckCircle2, Heart, RotateCcw, AlertCircle } from 'lucide-react';
import { Button } from '../common/Button';
import { supabase, supabaseUrl, supabaseAnonKey } from '../../lib/supabase';

interface RatingCategory {
  key: 'cleanliness' | 'accommodation' | 'guiding' | 'transportation' | 'overall';
  label: string;
  question: string;
}

const RATING_CATEGORIES: RatingCategory[] = [
  {
    key: 'cleanliness',
    label: 'Cleanliness',
    question: 'How satisfied were you with the cleanliness?',
  },
  {
    key: 'accommodation',
    label: 'Accommodation',
    question: 'How satisfied were you with the accommodation?',
  },
  {
    key: 'guiding',
    label: 'Tour Guiding',
    question: 'How satisfied were you with the tour guide / guiding service?',
  },
  {
    key: 'transportation',
    label: 'Travel & Transportation',
    question: 'How satisfied were you with the transportation and travel arrangements?',
  },
  {
    key: 'overall',
    label: 'Overall Experience',
    question: 'How satisfied were you with your overall Jayashakthi Tours experience?',
  },
];

const RATING_SCORE_LABELS: Record<number, string> = {
  1: 'Poor',
  2: 'Fair',
  3: 'Good',
  4: 'Very Good',
  5: 'Exceptional',
};

export const LeaveReviewBox: React.FC = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [ratings, setRatings] = useState<Record<string, number>>({
    cleanliness: 0,
    accommodation: 0,
    guiding: 0,
    transportation: 0,
    overall: 0,
  });
  const [hoverRatings, setHoverRatings] = useState<Record<string, number>>({
    cleanliness: 0,
    accommodation: 0,
    guiding: 0,
    transportation: 0,
    overall: 0,
  });
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submissionError, setSubmissionError] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    location?: string;
    review?: string;
    ratings?: string;
  }>({});

  const validate = () => {
    const errs: typeof errors = {};

    if (!name.trim()) {
      errs.name = 'Please enter your name';
    }

    if (!location.trim()) {
      errs.location = 'Please enter your city/country';
    }

    if (ratings.overall === 0) {
      errs.ratings = 'Please provide an overall experience rating';
    }

    if (!review.trim()) {
      errs.review = 'Please share a few words about your journey';
    } else if (review.trim().length < 10) {
      errs.review = 'Please write at least 10 characters';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // [DEBUG REVIEW] Submit clicked
    console.log('[DEBUG REVIEW] Submit clicked', { name, ratings, reviewLength: review.length });

    const isValid = validate();
    if (!isValid) {
      console.warn('[DEBUG REVIEW] Error: Form validation failed', errors);
      return;
    }

    setIsSubmitting(true);
    setSubmissionError(null);

    const payload = {
      customer_name: name.trim(),
      rating: Math.min(5, Math.max(1, Math.round(ratings.overall || 5))),
      review_text: review.trim(),
      approved: false, // strictly pending approval by default
    };

    // [DEBUG REVIEW] Sending to Supabase
    console.log('[DEBUG REVIEW] Sending to Supabase', payload);

    try {
      const { data, error } = await supabase
        .from('reviews')
        .insert({
          customer_name: payload.customer_name,
          rating: payload.rating,
          review_text: payload.review_text,
          approved: false,
        })
        .select();

      // [DEBUG REVIEW] Supabase response
      console.log('[DEBUG REVIEW] Supabase response', { data, error });

      if (error) {
        // [DEBUG REVIEW] Error
        console.error('[DEBUG REVIEW] Error', error);
        setSubmitted(false);
        setSubmissionError(
          `Database error (${error.code || 'RLS'}): ${error.message || 'Row Level Security policy blocked review submission.'}`
        );
        return;
      }

      if (!data || data.length === 0) {
        // [DEBUG REVIEW] Error
        console.error('[DEBUG REVIEW] Error', 'No data returned from insert');
        setSubmitted(false);
        setSubmissionError('Database returned no confirmed row. Review was not saved.');
        return;
      }

      console.log('[DEBUG REVIEW] Review insert verified successful:', data[0]);
      setSubmissionError(null);
      setSubmitted(true);

      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('jst:reviews_updated'));
      }
    } catch (err: any) {
      // [DEBUG REVIEW] Error
      console.error('[DEBUG REVIEW] Error', err);
      setSubmitted(false);
      setSubmissionError(err?.message || 'Unexpected network error submitting review. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setName('');
    setLocation('');
    setDestination('');
    setRatings({
      cleanliness: 0,
      accommodation: 0,
      guiding: 0,
      transportation: 0,
      overall: 0,
    });
    setHoverRatings({
      cleanliness: 0,
      accommodation: 0,
      guiding: 0,
      transportation: 0,
      overall: 0,
    });
    setReview('');
    setErrors({});
    setSubmitted(false);
  };

  return (
    <div id="leave-review" className="relative scroll-mt-28">
      <div className="rounded-3xl bg-white border border-slate-200/90 shadow-soft hover:shadow-soft-lg transition-shadow duration-300 overflow-hidden">
        {/* Box Top Header */}
        <div className="bg-gradient-to-r from-brand-sky-50 via-white to-brand-teal-50 px-6 sm:px-10 py-6 sm:py-8 border-b border-slate-100">
          <div className="max-w-2xl">
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-sky-100/70 text-brand-sky-800 mb-2">
              <Heart className="w-3.5 h-3.5 text-brand-sky-600 fill-brand-sky-600/30" />
              Direct Customer Feedback
            </span>
            <h3 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-brand-navy-950 tracking-tight">
              Share Your Experience
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 mt-1.5 leading-relaxed">
              Have you traveled across India with Jayashakthi Tours &amp; Travels? We'd love to hear about your journey, chauffeur support, and accommodations.
            </p>
          </div>
        </div>

        {/* Form Body or Success Confirmation */}
        <div className="p-6 sm:p-10">
          <AnimatePresence mode="wait">
            {submitted ? (
              <motion.div
                key="success"
                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.3 }}
                className="py-10 text-center max-w-lg mx-auto space-y-4"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-600 flex items-center justify-center mx-auto shadow-soft">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.2]" />
                </div>

                <h4 className="text-xl sm:text-2xl font-bold text-brand-navy-950">
                  Thank you for sharing your travel experience with us! ❤️
                </h4>

                <p className="text-sm text-slate-600 leading-relaxed">
                  Your feedback means the world to our team and helps future travelers plan their India journeys with confidence.
                </p>

                <div className="pt-4">
                  <button
                    type="button"
                    onClick={handleReset}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:bg-slate-50 font-semibold text-xs sm:text-sm transition-colors cursor-pointer shadow-xs"
                  >
                    <RotateCcw className="w-4 h-4 text-slate-500" />
                    <span>Submit Another Review</span>
                  </button>
                </div>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="space-y-6"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                  {/* Name Input */}
                  <div>
                    <label className="block text-xs font-bold text-brand-navy-900 uppercase tracking-wider mb-2">
                      Your Name <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={name}
                        onChange={(e) => {
                          setName(e.target.value);
                          if (errors.name) setErrors({ ...errors, name: undefined });
                        }}
                        placeholder="e.g. Arun Kumar / Michael Evans"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-brand-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.name
                            ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                            : 'border-slate-200 focus:border-brand-sky-400 focus:ring-brand-sky-100 bg-white'
                        }`}
                      />
                    </div>
                    {errors.name && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.name}</p>
                    )}
                  </div>

                  {/* Country / City Input */}
                  <div>
                    <label className="block text-xs font-bold text-brand-navy-900 uppercase tracking-wider mb-2">
                      Country / City <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <Globe className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={location}
                        onChange={(e) => {
                          setLocation(e.target.value);
                          if (errors.location) setErrors({ ...errors, location: undefined });
                        }}
                        placeholder="e.g. Singapore / London, UK / Chennai"
                        className={`w-full pl-10 pr-4 py-3 rounded-xl border text-sm text-brand-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all ${
                          errors.location
                            ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                            : 'border-slate-200 focus:border-brand-sky-400 focus:ring-brand-sky-100 bg-white'
                        }`}
                      />
                    </div>
                    {errors.location && (
                      <p className="text-xs text-rose-600 mt-1 font-medium">{errors.location}</p>
                    )}
                  </div>

                  {/* Trip / Destination Input (Optional) */}
                  <div>
                    <label className="block text-xs font-bold text-brand-navy-900 uppercase tracking-wider mb-2">
                      Trip / Destination <span className="text-slate-400 text-[11px] font-normal lowercase">(optional)</span>
                    </label>
                    <div className="relative">
                      <MapPin className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                      <input
                        type="text"
                        value={destination}
                        onChange={(e) => setDestination(e.target.value)}
                        placeholder="e.g. South India Temple Trail / Kerala"
                        className="w-full pl-10 pr-4 py-3 rounded-xl border border-slate-200 text-sm text-brand-navy-950 placeholder-slate-400 focus:border-brand-sky-400 focus:ring-2 focus:ring-brand-sky-100 bg-white focus:outline-none transition-all"
                      />
                    </div>
                  </div>
                </div>

                {/* 5 Rating Categories */}
                <div className="pt-2 space-y-3">
                  <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                    <label className="block text-xs font-bold text-brand-navy-900 uppercase tracking-wider">
                      Rate Your Experience <span className="text-rose-500">*</span>
                    </label>
                    <span className="text-[11px] text-slate-500">
                      1 to 5 Stars per category
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {RATING_CATEGORIES.map((cat, idx) => {
                      const selectedVal = ratings[cat.key] || 0;
                      const hoverVal = hoverRatings[cat.key] || 0;
                      const activeVal = hoverVal || selectedVal;

                      return (
                        <div
                          key={cat.key}
                          className="p-3 sm:p-3.5 rounded-2xl bg-slate-50/80 border border-slate-200/70 hover:border-brand-sky-200 hover:bg-slate-50 transition-colors flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5 sm:gap-4"
                        >
                          <div className="min-w-0 flex-1">
                            <span className="text-xs sm:text-sm font-bold text-brand-navy-950 block">
                              {idx + 1}. {cat.label}
                            </span>
                            <p className="text-[11px] sm:text-xs text-slate-500 mt-0.5 leading-snug">
                              {cat.question}
                            </p>
                          </div>

                          <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0">
                            {/* Interactive Star Buttons */}
                            <div
                              className="flex items-center gap-1 p-1 sm:p-1.5 rounded-xl bg-white border border-slate-200/80 shadow-2xs"
                              onMouseLeave={() =>
                                setHoverRatings((prev) => ({ ...prev, [cat.key]: 0 }))
                              }
                            >
                              {[1, 2, 3, 4, 5].map((star) => {
                                const isFilled = star <= activeVal;
                                return (
                                  <button
                                    key={star}
                                    type="button"
                                    onClick={() => {
                                      setRatings((prev) => ({ ...prev, [cat.key]: star }));
                                      if (errors.ratings) {
                                        setErrors((prev) => ({ ...prev, ratings: undefined }));
                                      }
                                    }}
                                    onMouseEnter={() =>
                                      setHoverRatings((prev) => ({ ...prev, [cat.key]: star }))
                                    }
                                    className="p-1 sm:p-1.5 rounded-lg focus:outline-none transition-transform hover:scale-125 active:scale-95 cursor-pointer touch-manipulation"
                                    aria-label={`${cat.label}: Rate ${star} star${star > 1 ? 's' : ''}`}
                                  >
                                    <Star
                                      className={`w-5 h-5 sm:w-5.5 sm:h-5.5 transition-colors duration-150 ${
                                        isFilled
                                          ? 'text-brand-gold-500 fill-brand-gold-400 drop-shadow-2xs'
                                          : 'text-slate-300 hover:text-brand-gold-300'
                                      }`}
                                    />
                                  </button>
                                );
                              })}
                            </div>

                            {/* Score Preview Badge */}
                            <div className="w-24 text-right">
                              {activeVal > 0 ? (
                                <span className="inline-flex items-center gap-1 text-xs font-bold text-brand-navy-900">
                                  <span className="text-brand-gold-600 font-extrabold">{activeVal}/5</span>
                                  <span className="text-[11px] font-medium text-slate-500 truncate">
                                    {RATING_SCORE_LABELS[activeVal]}
                                  </span>
                                </span>
                              ) : (
                                <span className="text-[11px] text-slate-400 italic">Tap to rate</span>
                              )}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  {errors.ratings && (
                    <p className="text-xs text-rose-600 font-medium">{errors.ratings}</p>
                  )}
                </div>

                {/* Review Textarea */}
                <div>
                  <label className="block text-xs font-bold text-brand-navy-900 uppercase tracking-wider mb-2">
                    Your Experience <span className="text-rose-500">*</span>
                  </label>
                  <textarea
                    rows={4}
                    value={review}
                    onChange={(e) => {
                      setReview(e.target.value);
                      if (errors.review) setErrors({ ...errors, review: undefined });
                    }}
                    placeholder="Tell other travelers about your journey — how was the vehicle condition, chauffeur support, hotel arrangements, or daily itinerary timing?"
                    className={`w-full p-4 rounded-2xl border text-sm text-brand-navy-950 placeholder-slate-400 focus:outline-none focus:ring-2 transition-all leading-relaxed ${
                      errors.review
                        ? 'border-rose-300 focus:ring-rose-200 bg-rose-50/20'
                        : 'border-slate-200 focus:border-brand-sky-400 focus:ring-brand-sky-100 bg-white'
                    }`}
                  />
                  {errors.review && (
                    <p className="text-xs text-rose-600 mt-1 font-medium">{errors.review}</p>
                  )}
                </div>

                {/* Submission Error Banner */}
                {submissionError && (
                  <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 animate-fadeIn">
                    <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
                    <div>
                      <span className="font-bold block text-sm mb-0.5">Review Submission Failed</span>
                      <span className="leading-relaxed block">{submissionError}</span>
                    </div>
                  </div>
                )}

                {/* Submit Action */}
                <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <p className="text-xs text-slate-500 order-2 sm:order-1">
                    Your feedback will be kept safe and directly reviewed by Jayashakthi Tours.
                  </p>

                  <Button
                    type="submit"
                    variant="primary"
                    size="md"
                    disabled={isSubmitting}
                    icon={<Send className="w-4 h-4" />}
                    className="w-full sm:w-auto uppercase tracking-wider font-bold shadow-soft order-1 sm:order-2"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};
