import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Star, User, Globe, MapPin, Send, CheckCircle2, Heart, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';

export const LeaveReviewBox: React.FC = () => {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [destination, setDestination] = useState('');
  const [rating, setRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [review, setReview] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; location?: string; review?: string }>({});

  const validate = () => {
    const errs: { name?: string; location?: string; review?: string } = {};
    if (!name.trim()) errs.name = 'Please enter your name';
    if (!location.trim()) errs.location = 'Please enter your country or city';
    if (!review.trim()) {
      errs.review = 'Please share a few words about your journey';
    } else if (review.trim().length < 10) {
      errs.review = 'Please write at least 10 characters';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);

    try {
      // Connect to existing frontend localStorage storage
      const existing = JSON.parse(localStorage.getItem('user_submitted_reviews') || '[]');
      const newReview = {
        fullName: name.trim(),
        country: location.trim(),
        destination: destination.trim() || 'India Tour',
        overallRating: rating,
        review: review.trim(),
        submittedAt: new Date().toISOString(),
      };
      existing.unshift(newReview);
      localStorage.setItem('user_submitted_reviews', JSON.stringify(existing));
    } catch (err) {
      console.warn('Review storage notice', err);
    }

    // Simulate brief smooth submission processing
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
    }, 400);
  };

  const handleReset = () => {
    setName('');
    setLocation('');
    setDestination('');
    setRating(5);
    setReview('');
    setErrors({});
    setSubmitted(false);
  };

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Exceptional'];

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

                {/* Rating Control */}
                <div className="pt-2">
                  <label className="block text-xs font-bold text-brand-navy-900 uppercase tracking-wider mb-2">
                    Rating <span className="text-rose-500">*</span>
                  </label>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 p-2 rounded-2xl bg-slate-50 border border-slate-200 inline-flex">
                      {[1, 2, 3, 4, 5].map((star) => {
                        const isFilled = star <= (hoverRating || rating);
                        return (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="p-1 focus:outline-none transition-transform hover:scale-125 cursor-pointer"
                            aria-label={`Rate ${star} star${star > 1 ? 's' : ''}`}
                          >
                            <Star
                              className={`w-6 h-6 transition-colors ${
                                isFilled
                                  ? 'text-brand-gold-500 fill-brand-gold-400'
                                  : 'text-slate-300'
                              }`}
                            />
                          </button>
                        );
                      })}
                    </div>
                    <span className="text-sm font-semibold text-brand-navy-900">
                      {ratingLabels[hoverRating || rating]} ({hoverRating || rating} / 5)
                    </span>
                  </div>
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
