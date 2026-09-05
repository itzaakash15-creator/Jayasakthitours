import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  Calendar,
  Users,
  MapPin,
  Compass,
  Car,
  UserCheck,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  MessageCircle,
  Copy,
  Check,
  Sparkles,
  Phone,
  Mail,
  FileText,
  AlertCircle,
  Sliders,
  Edit3,
  Luggage,
  Loader2,
} from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import { tourPackagesData } from '../../data/packages';
import { createBooking } from '../../lib/supabase';
import { generateNextReferenceId } from '../../services/referenceIdService';

export interface BookingState {
  // Step 1: Trip Details
  travelDate: string;
  travelersCount: string;
  pickupLocation: string;
  destination: string;
  tripType: string;

  // Step 2: Service Selection
  selectedService: 'Tour Package' | 'Cab / Taxi' | 'Site Guide' | 'Custom Trip';
  packageChoice: string;
  cabType: string;
  guideLanguage: string;
  customTripNote: string;

  // Step 3: Travellers & Contact Info
  fullName: string;
  mobileNumber: string;
  email: string;
  adults: number;
  children: number;

  // Step 4: Preferences / Requirements
  preferredVehicle: string;
  accommodation: string;
  guideRequirement: string;
  specialRequests: string;
  additionalNotes: string;
}

export const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [transitionDirection, setTransitionDirection] = useState<'next' | 'prev'>('next');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [copied, setCopied] = useState(false);
  const [copiedRef, setCopiedRef] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const prefillPackage = searchParams.get('package');
  const prefillService = searchParams.get('service');
  const prefillDestination = searchParams.get('destination');

  const [formData, setFormData] = useState<BookingState>({
    // Step 1
    travelDate: '',
    travelersCount: '2 Travelers',
    pickupLocation: 'Chennai Airport / City',
    destination: prefillDestination || 'Tamil Nadu Temple Tour',
    tripType: 'Family Vacation',

    // Step 2
    selectedService: (prefillService?.includes('Cab')
      ? 'Cab / Taxi'
      : prefillService?.includes('Guide')
      ? 'Site Guide'
      : prefillPackage
      ? 'Tour Package'
      : 'Tour Package') as BookingState['selectedService'],
    packageChoice: prefillPackage || tourPackagesData[0]?.title || 'South India Explorer',
    cabType: 'Innova Crysta (6-7 Seater)',
    guideLanguage: 'English & Tamil',
    customTripNote: '',

    // Step 3
    fullName: '',
    mobileNumber: '',
    email: '',
    adults: 2,
    children: 0,

    // Step 4
    preferredVehicle: 'Innova Crysta (AC)',
    accommodation: 'Deluxe 4-Star / Heritage Stays',
    guideRequirement: 'Yes — Sightseeing & Temple Guide',
    specialRequests: '',
    additionalNotes: '',
  });

  // Handle URL params updates
  useEffect(() => {
    if (prefillPackage) {
      setFormData((prev) => ({
        ...prev,
        selectedService: 'Tour Package',
        packageChoice: prefillPackage,
      }));
    }
    if (prefillService?.toLowerCase().includes('cab')) {
      setFormData((prev) => ({
        ...prev,
        selectedService: 'Cab / Taxi',
      }));
    } else if (prefillService?.toLowerCase().includes('guide')) {
      setFormData((prev) => ({
        ...prev,
        selectedService: 'Site Guide',
      }));
    }
  }, [prefillPackage, prefillService]);

  const stepDetails = [
    {
      num: 1,
      title: 'Trip Details',
      label: 'Dates & Route',
      icon: MapPin,
      quote: 'Every great journey starts with a destination.',
    },
    {
      num: 2,
      title: 'Service',
      label: 'Package or Cab',
      icon: Car,
      quote: 'Choose the way you’d like to travel.',
    },
    {
      num: 3,
      title: 'Travellers',
      label: 'Contact Info',
      icon: Users,
      quote: 'Tell us who’s joining the journey.',
    },
    {
      num: 4,
      title: 'Preferences',
      label: 'Vehicles & Stays',
      icon: Sliders,
      quote: 'Make every detail feel like your own.',
    },
    {
      num: 5,
      title: 'Confirm',
      label: 'Review & Send',
      icon: CheckCircle2,
      quote: 'Your journey is ready to take shape.',
    },
  ];

  // Ambient cursor tracking for subtle background sheen on desktop
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    e.currentTarget.style.setProperty('--form-mouse-x', `${x}px`);
    e.currentTarget.style.setProperty('--form-mouse-y', `${y}px`);
  };

  // Validation per step
  const validateStep = (step: number) => {
    const newErrors: { [key: string]: string } = {};

    if (step === 1) {
      if (!formData.travelDate.trim()) {
        newErrors.travelDate = 'Please specify your travel date or month';
      }
      if (!formData.pickupLocation.trim()) {
        newErrors.pickupLocation = 'Please provide a pickup point (e.g. Airport, Hotel, City)';
      }
      if (!formData.destination.trim()) {
        newErrors.destination = 'Please choose or enter a destination';
      }
    } else if (step === 2) {
      if (!formData.selectedService) {
        newErrors.selectedService = 'Please choose a primary service';
      }
    } else if (step === 3) {
      if (!formData.fullName.trim()) {
        newErrors.fullName = 'Please enter your full name';
      }
      if (!formData.mobileNumber.trim()) {
        newErrors.mobileNumber = 'Please enter your mobile/WhatsApp number';
      } else if (formData.mobileNumber.replace(/\D/g, '').length < 8) {
        newErrors.mobileNumber = 'Please enter a valid phone number';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setTransitionDirection('next');
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 280, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrors({});
    setTransitionDirection('prev');
    setCurrentStep((prev) => Math.max(prev - 1, 1));
    window.scrollTo({ top: 280, behavior: 'smooth' });
  };

  const jumpToStep = (stepNum: number) => {
    setErrors({});
    setTransitionDirection(stepNum > currentStep ? 'next' : 'prev');
    setCurrentStep(stepNum);
    window.scrollTo({ top: 280, behavior: 'smooth' });
  };

  // Build clean WhatsApp message summary
  const generateBookingSummary = (refId: string) => {
    return [
      `*BOOKING ENQUIRY — JAYASHAKTHI TOURS & TRAVELS*`,
      `*Reference:* #${refId}`,
      ``,
      `*1. TRIP DETAILS:*`,
      `• Travel Date: ${formData.travelDate}`,
      `• Travelers: ${formData.travelersCount} (${formData.adults} Adults, ${formData.children} Children)`,
      `• Pickup Location: ${formData.pickupLocation}`,
      `• Destination: ${formData.destination}`,
      `• Trip Type: ${formData.tripType}`,
      ``,
      `*2. SERVICE SELECTED:*`,
      `• Service: ${formData.selectedService}`,
      formData.selectedService === 'Tour Package' ? `• Package: ${formData.packageChoice}` : '',
      formData.selectedService === 'Cab / Taxi' ? `• Cab / Vehicle: ${formData.cabType}` : '',
      formData.selectedService === 'Site Guide' ? `• Guide Language: ${formData.guideLanguage}` : '',
      formData.selectedService === 'Custom Trip' && formData.customTripNote
        ? `• Custom Requirements: ${formData.customTripNote}`
        : '',
      ``,
      `*3. TRAVELLER CONTACT:*`,
      `• Name: ${formData.fullName}`,
      `• Mobile / WhatsApp: ${formData.mobileNumber}`,
      formData.email ? `• Email: ${formData.email}` : '',
      ``,
      `*4. PREFERENCES & REQUIREMENTS:*`,
      `• Preferred Vehicle: ${formData.preferredVehicle}`,
      `• Accommodation: ${formData.accommodation}`,
      `• Guide Requirement: ${formData.guideRequirement}`,
      formData.specialRequests ? `• Special Requests: ${formData.specialRequests}` : '',
      formData.additionalNotes ? `• Additional Notes: ${formData.additionalNotes}` : '',
      ``,
      `Please review and provide confirmed availability and daily coordination details. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');
  };

  const handleConfirmBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      jumpToStep(3);
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    const newRef = generateNextReferenceId();

    try {
      // Persist complete booking information directly to Supabase bookings table
      const created = await createBooking({
        id: newRef,
        reference_id: newRef,
        full_name: formData.fullName || 'Anonymous Guest',
        phone: formData.mobileNumber,
        email: formData.email,
        pickup_location: formData.pickupLocation,
        destination: formData.destination,
        travel_date: formData.travelDate || 'Flexible / Upcoming Dates',
        trip_type: formData.tripType,
        service_type: formData.selectedService,
        tour_package:
          formData.selectedService === 'Tour Package'
            ? formData.packageChoice
            : formData.selectedService,
        adults: formData.adults,
        children: formData.children,
        total_travellers: formData.adults + formData.children,
        preferred_vehicle: formData.preferredVehicle,
        accommodation_preference: formData.accommodation,
        tour_guide_requirement: formData.guideRequirement,
        special_requests: formData.specialRequests,
        additional_notes: formData.additionalNotes,
        booking_status: 'New',
        admin_notes: '',
      });

      const confirmedRef = created?.id || newRef;
      setBookingRef(confirmedRef);
      setIsSubmitted(true);
      window.scrollTo({ top: 200, behavior: 'smooth' });

      // Open WhatsApp automatically with confirmed reference ID and summary
      const summary = generateBookingSummary(confirmedRef);
      const targetUrl = createWhatsAppUrl(summary);
      window.open(targetUrl, '_blank', 'noopener,noreferrer');
    } catch (err: any) {
      console.error('[BookingForm] Failed to save booking to Supabase:', err);
      setSubmitError(
        err.message ||
          'Unable to submit your journey enquiry to the database. Please check your connection and try again.'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopySummary = () => {
    const summary = generateBookingSummary(bookingRef);
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleCopyRefId = () => {
    navigator.clipboard.writeText(bookingRef);
    setCopiedRef(true);
    setTimeout(() => setCopiedRef(false), 2500);
  };

  // =========================================================================
  // 13. SUCCESS STATE EXPERIENCE
  // =========================================================================
  if (isSubmitted) {
    const summaryText = generateBookingSummary(bookingRef);
    const whatsappUrl = createWhatsAppUrl(summaryText);

    return (
      <div className="max-w-3xl mx-auto bg-white/95 rounded-3xl border border-slate-200/90 shadow-soft-xl p-6 sm:p-10 text-center space-y-6">
        <div className="relative inline-flex items-center justify-center">
          <span className="absolute -inset-2 rounded-full bg-emerald-400/25 animate-ping opacity-70" />
          <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center shadow-soft relative z-10">
            <CheckCircle2 className="w-9 h-9" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            ✦ Enquiry Received
          </span>
          <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-navy-950">
            Your Journey Enquiry Has Been Received
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto leading-relaxed">
            Our travel team will review your requirements and contact you shortly.
          </p>
        </div>

        {/* Prominently Displayed JST Reference ID Card */}
        <div className="p-6 sm:p-7 rounded-2xl bg-gradient-to-br from-brand-sky-50/70 via-white to-brand-teal-50/60 border border-brand-sky-200/90 shadow-soft text-center space-y-3 relative overflow-hidden">
          <div className="text-xs font-bold uppercase tracking-wider text-brand-sky-800">
            Your Reference ID
          </div>

          <div className="inline-flex items-center justify-center gap-3 px-6 py-2.5 rounded-2xl bg-white border border-brand-sky-200/90 shadow-2xs">
            <span className="font-mono text-2xl sm:text-3xl font-extrabold tracking-wider text-brand-navy-950 select-all">
              {bookingRef}
            </span>
          </div>

          <div className="pt-1 flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              type="button"
              onClick={handleCopyRefId}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-brand-sky-600 hover:bg-brand-sky-700 active:scale-98 text-white font-bold text-xs uppercase tracking-wider shadow-2xs transition-all cursor-pointer"
            >
              {copiedRef ? (
                <>
                  <Check className="w-4 h-4 text-white" />
                  <span>Reference ID Copied!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-white" />
                  <span>Copy Reference ID</span>
                </>
              )}
            </button>
          </div>

          <p className="text-xs text-slate-500 max-w-md mx-auto pt-1 leading-relaxed">
            Please save this Reference ID for future communication regarding your journey.
          </p>
        </div>

        {/* WhatsApp Dispatch Callout */}
        <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-emerald-50/80 via-white to-teal-50/80 border border-emerald-200/90 text-left space-y-3 shadow-2xs">
          <div className="flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5 shadow-2xs">
              <MessageCircle className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950">
                Continue Directly on WhatsApp
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5 leading-relaxed">
                Connect directly with our Chennai trip planners to finalize dates, vehicles, and hotel choices with instant confirmation.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs uppercase tracking-wider shadow-soft hover:shadow-soft-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Continue on WhatsApp (+91 98408 15556) →</span>
            </a>

            <button
              type="button"
              onClick={handleCopySummary}
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-slate-500" />
                  <span>Copy Summary</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Structured Summary Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200/80 pb-2.5">
            <span className="font-bold uppercase tracking-wider text-slate-500">
              Journey Specifications
            </span>
            <span className="font-mono font-bold text-brand-sky-700">#{bookingRef}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 text-slate-700">
            <div>
              <span className="text-slate-400 block font-medium">Service / Package:</span>
              <span className="font-bold text-brand-navy-950">{formData.selectedService}</span>
              {formData.selectedService === 'Tour Package' && (
                <span className="text-slate-500 block text-[11px]">{formData.packageChoice}</span>
              )}
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Travel Date:</span>
              <span className="font-bold text-brand-navy-950">{formData.travelDate}</span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Destination:</span>
              <span className="font-bold text-brand-navy-950">{formData.destination}</span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Travellers:</span>
              <span className="font-bold text-brand-navy-950">
                {formData.travelersCount} ({formData.adults} Adults, {formData.children} Children)
              </span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Pickup Point:</span>
              <span className="font-bold text-brand-navy-950">{formData.pickupLocation}</span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Lead Contact:</span>
              <span className="font-bold text-brand-navy-950">
                {formData.fullName} ({formData.mobileNumber})
              </span>
            </div>
          </div>
        </div>

        {/* Return Actions */}
        <div className="pt-3 flex flex-wrap items-center justify-center gap-5 text-xs">
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
            className="text-brand-sky-700 font-semibold hover:underline cursor-pointer"
          >
            ← Modify / Plan Another Trip
          </button>
          <span className="text-slate-300">•</span>
          <Link to="/" className="text-slate-600 font-semibold hover:text-brand-navy-950 hover:underline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  // =========================================================================
  // MAIN JOURNEY BUILDER (STEP PROGRESS TRACKER + 2-COLUMN LAYOUT)
  // =========================================================================
  return (
    <div className="space-y-8 sm:space-y-10">
      {/* ===================================================================== */}
      {/* 2. TRAVEL ROUTE STEP PROGRESS TRACKER                                 */}
      {/* ===================================================================== */}
      <div className="bg-white/95 rounded-3xl border border-slate-200/90 shadow-soft p-4 sm:p-6 overflow-x-auto scrollbar-none">
        <div className="flex items-center justify-between min-w-[580px] max-w-4xl mx-auto relative px-2">
          {stepDetails.map((step, idx) => {
            const isCompleted = currentStep > step.num;
            const isActive = currentStep === step.num;
            const StepIcon = step.icon;

            return (
              <React.Fragment key={step.num}>
                {/* Step Node */}
                <button
                  type="button"
                  onClick={() => {
                    if (step.num < currentStep) {
                      jumpToStep(step.num);
                    }
                  }}
                  disabled={step.num > currentStep}
                  className={`group relative flex flex-col items-center text-center transition-all focus:outline-none cursor-pointer ${
                    step.num > currentStep ? 'cursor-not-allowed opacity-60' : ''
                  }`}
                  aria-label={`Step ${step.num}: ${step.title}`}
                  aria-current={isActive ? 'step' : undefined}
                >
                  {/* Waypoint circle */}
                  <div className="relative">
                    {/* Glowing ping on active node */}
                    {isActive && (
                      <span className="absolute -inset-1 rounded-2xl bg-brand-sky-400/25 animate-ping opacity-60 pointer-events-none" />
                    )}

                    <div
                      className={`w-9 h-9 sm:w-11 sm:h-11 rounded-2xl flex items-center justify-center text-xs font-bold transition-all duration-300 ${
                        isActive
                          ? 'bg-gradient-to-br from-brand-sky-500 via-brand-sky-600 to-brand-teal-600 text-white shadow-soft ring-4 ring-brand-sky-100/90 scale-105'
                          : isCompleted
                          ? 'bg-emerald-600 text-white shadow-2xs hover:bg-emerald-700'
                          : 'bg-slate-100 text-slate-400 border border-slate-200/80'
                      }`}
                    >
                      {isCompleted ? (
                        <Check className="w-4 h-4 stroke-[2.5]" />
                      ) : (
                        <StepIcon className={`w-4 h-4 sm:w-5 sm:h-5 ${isActive ? 'stroke-[2.2]' : ''}`} />
                      )}
                    </div>
                  </div>

                  {/* Step Titles */}
                  <div className="mt-2 text-center">
                    <span
                      className={`block text-[11px] sm:text-xs font-bold tracking-tight transition-colors ${
                        isActive
                          ? 'text-brand-navy-950 font-extrabold'
                          : isCompleted
                          ? 'text-slate-700'
                          : 'text-slate-400'
                      }`}
                    >
                      {String(step.num).padStart(2, '0')} — {step.title}
                    </span>
                    <span className="hidden sm:block text-[10px] text-slate-400 font-normal">
                      {step.label}
                    </span>
                  </div>
                </button>

                {/* Connecting Route Segment */}
                {idx < stepDetails.length - 1 && (
                  <div
                    className="flex-1 mx-2 sm:mx-3 h-0.5 relative -top-3.5 sm:-top-4"
                    aria-hidden="true"
                  >
                    <div
                      className={`h-0.5 w-full transition-all duration-500 ${
                        currentStep > idx + 1
                          ? 'bg-gradient-to-r from-emerald-500 to-brand-sky-500'
                          : currentStep === idx + 1
                          ? 'bg-gradient-to-r from-brand-sky-400 to-slate-200'
                          : 'border-b border-dashed border-slate-200'
                      }`}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>

      {/* ===================================================================== */}
      {/* 3. MAIN TWO-COLUMN BOOKING LAYOUT (FORM + LIVE SUMMARY)               */}
      {/* ===================================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* =================================================================== */}
        {/* LEFT COLUMN: ACTIVE FORM CARD (65–70% width on desktop)            */}
        {/* =================================================================== */}
        <div
          onMouseMove={handleMouseMove}
          className="lg:col-span-8 bg-white/95 rounded-3xl border border-slate-200/90 shadow-soft-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden transition-all duration-300"
        >
          {/* Subtle Ambient Cursor Light Sheen (Desktop only) */}
          <div
            className="pointer-events-none absolute inset-0 rounded-3xl opacity-0 hover:opacity-100 transition-opacity duration-300"
            style={{
              background: `radial-gradient(400px circle at var(--form-mouse-x, 50%) var(--form-mouse-y, 50%), rgba(14, 165, 233, 0.035), rgba(20, 184, 166, 0.02), transparent 70%)`,
            }}
            aria-hidden="true"
          />

          {/* 4 & 11. STEP HEADING & CONTEXTUAL TRAVEL MESSAGE */}
          <div className="border-b border-slate-100 pb-5 mb-6">
            <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-sky-50 text-brand-sky-700 text-xs font-bold uppercase tracking-wider border border-brand-sky-200/60">
                <span>STEP {currentStep} OF 5</span>
              </span>

              {/* Contextual Travel Note */}
              <span className="text-xs font-mono text-brand-teal-700/80 tracking-wide hidden sm:inline-flex items-center gap-1">
                ✦ {stepDetails[currentStep - 1]?.quote}
              </span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-display font-extrabold text-brand-navy-950 tracking-tight">
              {currentStep === 1 && 'Trip Details & Schedule'}
              {currentStep === 2 && 'Choose Your Travel Service'}
              {currentStep === 3 && 'Traveller & Contact Details'}
              {currentStep === 4 && 'Preferences & Special Requirements'}
              {currentStep === 5 && 'Review & Confirm Your Journey'}
            </h2>
            <p className="text-xs sm:text-sm text-slate-500 mt-1">
              {currentStep === 1 && 'Tell us your intended dates, group size, and where you want to travel.'}
              {currentStep === 2 && 'Select whether you need a full tour package, a private cab, a certified guide, or a custom trip.'}
              {currentStep === 3 && 'Who will be traveling and where can our tour team reach you?'}
              {currentStep === 4 && 'Customize your vehicle style, accommodation comfort level, and any special requests.'}
              {currentStep === 5 && 'Verify your itinerary before dispatching your journey request to our planners.'}
            </p>
          </div>

          {/* ================================================================= */}
          {/* STEP 1: TRIP DETAILS                                              */}
          {/* ================================================================= */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Travel Date */}
                <div className="group/field">
                  <label
                    htmlFor="travelDate"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Travel Date / Month <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="travelDate"
                      type="text"
                      placeholder="e.g. 15th Nov 2026 or Dec 1st week"
                      value={formData.travelDate}
                      onChange={(e) => {
                        setFormData({ ...formData, travelDate: e.target.value });
                        if (errors.travelDate) setErrors({ ...errors, travelDate: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.travelDate
                          ? 'border-red-400 bg-red-50/30'
                          : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100 hover:border-slate-300'
                      }`}
                    />
                    <Calendar className="w-4 h-4 text-slate-400 group-focus-within/field:text-brand-sky-600 absolute right-3.5 top-3.5 pointer-events-none transition-colors" />
                  </div>
                  {errors.travelDate && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.travelDate}
                    </p>
                  )}
                </div>

                {/* Number of Travellers */}
                <div className="group/field">
                  <label
                    htmlFor="travelersCount"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Number of Travellers
                  </label>
                  <div className="relative">
                    <select
                      id="travelersCount"
                      value={formData.travelersCount}
                      onChange={(e) => setFormData({ ...formData, travelersCount: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 hover:border-slate-300 bg-white transition-all cursor-pointer"
                    >
                      <option value="1 Solo Traveler">1 Solo Traveler</option>
                      <option value="2 Travelers (Couple / Friends)">2 Travelers (Couple / Friends)</option>
                      <option value="3–5 Travelers (Family)">3–5 Travelers (Family)</option>
                      <option value="6–10 Travelers (Small Group)">6–10 Travelers (Small Group)</option>
                      <option value="10–16 Travelers (Tempo Group)">10–16 Travelers (Tempo Group)</option>
                      <option value="17+ Large Tour Group">17+ Large Tour Group</option>
                    </select>
                    <Users className="w-4 h-4 text-slate-400 group-focus-within/field:text-brand-teal-600 absolute right-3.5 top-3.5 pointer-events-none transition-colors" />
                  </div>
                </div>

                {/* Pickup Location */}
                <div className="group/field">
                  <label
                    htmlFor="pickupLocation"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Pickup Location <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="pickupLocation"
                      type="text"
                      placeholder="e.g. Chennai Airport, Madurai, Bangalore..."
                      value={formData.pickupLocation}
                      onChange={(e) => {
                        setFormData({ ...formData, pickupLocation: e.target.value });
                        if (errors.pickupLocation) setErrors({ ...errors, pickupLocation: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.pickupLocation
                          ? 'border-red-400 bg-red-50/30'
                          : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100 hover:border-slate-300'
                      }`}
                    />
                    <MapPin className="w-4 h-4 text-slate-400 group-focus-within/field:text-brand-sky-600 absolute right-3.5 top-3.5 pointer-events-none transition-colors" />
                  </div>
                  {errors.pickupLocation && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.pickupLocation}
                    </p>
                  )}
                </div>

                {/* Destination of Interest */}
                <div className="group/field">
                  <label
                    htmlFor="destination"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Destination of Interest <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="destination"
                      type="text"
                      placeholder="e.g. Tamil Nadu, Kerala, Golden Triangle..."
                      value={formData.destination}
                      onChange={(e) => {
                        setFormData({ ...formData, destination: e.target.value });
                        if (errors.destination) setErrors({ ...errors, destination: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.destination
                          ? 'border-red-400 bg-red-50/30'
                          : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100 hover:border-slate-300'
                      }`}
                    />
                    <Compass className="w-4 h-4 text-slate-400 group-focus-within/field:text-brand-teal-600 absolute right-3.5 top-3.5 pointer-events-none transition-colors" />
                  </div>
                  {errors.destination && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.destination}
                    </p>
                  )}
                </div>

                {/* Trip Type */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="tripType"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Trip Type / Travel Style
                  </label>
                  <select
                    id="tripType"
                    value={formData.tripType}
                    onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 bg-white hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <option value="Family Vacation">Family Vacation (Comfortable &amp; Relaxed Pacing)</option>
                    <option value="Temple & Spiritual Darshan">Temple &amp; Spiritual Darshan (Special Darshan Timings)</option>
                    <option value="Couple / Honeymoon Holiday">Couple / Leisure Holiday</option>
                    <option value="Group / Tempo Traveller Journey">Group Journey (Friends / Family Reunion)</option>
                    <option value="Heritage & Architecture Tour">Heritage &amp; Living Architecture Exploration</option>
                    <option value="Custom Multi-City India Tour">100% Tailor-Made Multi-City Route</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 2: SERVICE SELECTION                                         */}
          {/* ================================================================= */}
          {currentStep === 2 && (
            <div className="space-y-6">
              {/* 4 Core Service Options Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Option 1: Tour Package */}
                <div
                  onClick={() => setFormData({ ...formData, selectedService: 'Tour Package' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.selectedService === 'Tour Package'
                      ? 'border-brand-sky-600 bg-brand-sky-50/70 shadow-soft scale-[1.01]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-brand-sky-100 text-brand-sky-700 flex items-center justify-center">
                      <Compass className="w-5 h-5" />
                    </div>
                    <input
                      type="radio"
                      name="service"
                      checked={formData.selectedService === 'Tour Package'}
                      onChange={() => {}}
                      className="w-4 h-4 text-brand-sky-600 cursor-pointer"
                    />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy-950 mb-1">
                    Tour Package
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Complete end-to-end package with vehicle, handpicked stays, planned itinerary, and 24/7 support.
                  </p>
                </div>

                {/* Option 2: Cab / Taxi */}
                <div
                  onClick={() => setFormData({ ...formData, selectedService: 'Cab / Taxi' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.selectedService === 'Cab / Taxi'
                      ? 'border-brand-teal-600 bg-brand-teal-50/70 shadow-soft scale-[1.01]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-brand-teal-100 text-brand-teal-700 flex items-center justify-center">
                      <Car className="w-5 h-5" />
                    </div>
                    <input
                      type="radio"
                      name="service"
                      checked={formData.selectedService === 'Cab / Taxi'}
                      onChange={() => {}}
                      className="w-4 h-4 text-brand-teal-600 cursor-pointer"
                    />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy-950 mb-1">
                    Cab / Taxi Rental
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Dedicated air-conditioned sedan, Innova Crysta, or 12–17 seater luxury Tempo Traveller.
                  </p>
                </div>

                {/* Option 3: Site Guide */}
                <div
                  onClick={() => setFormData({ ...formData, selectedService: 'Site Guide' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.selectedService === 'Site Guide'
                      ? 'border-brand-gold-600 bg-amber-50/70 shadow-soft scale-[1.01]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-700 flex items-center justify-center">
                      <UserCheck className="w-5 h-5" />
                    </div>
                    <input
                      type="radio"
                      name="service"
                      checked={formData.selectedService === 'Site Guide'}
                      onChange={() => {}}
                      className="w-4 h-4 text-amber-600 cursor-pointer"
                    />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy-950 mb-1">
                    Site Guide Service
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Certified English or multilingual local guides for temples, forts, and historic monuments.
                  </p>
                </div>

                {/* Option 4: Custom Trip */}
                <div
                  onClick={() => setFormData({ ...formData, selectedService: 'Custom Trip' })}
                  className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-200 ${
                    formData.selectedService === 'Custom Trip'
                      ? 'border-indigo-600 bg-indigo-50/70 shadow-soft scale-[1.01]'
                      : 'border-slate-200 hover:border-slate-300 bg-white'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-10 h-10 rounded-xl bg-indigo-100 text-indigo-700 flex items-center justify-center">
                      <Sparkles className="w-5 h-5" />
                    </div>
                    <input
                      type="radio"
                      name="service"
                      checked={formData.selectedService === 'Custom Trip'}
                      onChange={() => {}}
                      className="w-4 h-4 text-indigo-600 cursor-pointer"
                    />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy-950 mb-1">
                    Custom Trip
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    Tell us your specific requirements and we’ll design a 100% personalized travel plan.
                  </p>
                </div>
              </div>

              {/* Sub-options based on selection */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-4">
                {formData.selectedService === 'Tour Package' && (
                  <div>
                    <label
                      htmlFor="packageChoice"
                      className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                    >
                      Select Preferred Tour Package
                    </label>
                    <select
                      id="packageChoice"
                      value={formData.packageChoice}
                      onChange={(e) => setFormData({ ...formData, packageChoice: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 bg-white cursor-pointer"
                    >
                      {tourPackagesData.map((pkg) => (
                        <option key={pkg.id} value={pkg.title}>
                          {pkg.title} ({pkg.duration}) — {pkg.destinations.slice(0, 3).join(', ')}
                        </option>
                      ))}
                      <option value="Custom Tour Package Route">Other / Custom Package Route</option>
                    </select>
                  </div>
                )}

                {formData.selectedService === 'Cab / Taxi' && (
                  <div>
                    <label
                      htmlFor="cabType"
                      className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                    >
                      Select Vehicle Class
                    </label>
                    <select
                      id="cabType"
                      value={formData.cabType}
                      onChange={(e) => setFormData({ ...formData, cabType: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 bg-white cursor-pointer"
                    >
                      <option value="Sedan (Etios / Dzire) — Up to 3-4 Pax">
                        Air-Conditioned Sedan (Etios / Dzire) — 3-4 Passengers
                      </option>
                      <option value="Innova Crysta — Up to 6-7 Pax">
                        Innova Crysta Premium SUV — 6-7 Passengers
                      </option>
                      <option value="Luxury Tempo Traveller — 12-14 Seater">
                        Luxury Tempo Traveller (Pushback Seats) — 12-14 Seater
                      </option>
                      <option value="Executive Tempo Traveller — 17 Seater">
                        Executive Tempo Traveller — 17 Seater
                      </option>
                      <option value="Mini Coach / Luxury Bus">
                        Mini Coach / Luxury Tour Bus (21+ Seater)
                      </option>
                    </select>
                  </div>
                )}

                {formData.selectedService === 'Site Guide' && (
                  <div>
                    <label
                      htmlFor="guideLanguage"
                      className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                    >
                      Preferred Guide Language &amp; Expertise
                    </label>
                    <select
                      id="guideLanguage"
                      value={formData.guideLanguage}
                      onChange={(e) => setFormData({ ...formData, guideLanguage: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 bg-white cursor-pointer"
                    >
                      <option value="English & Regional Language (Tamil / Hindi)">
                        English &amp; Regional Language (Tamil / Hindi)
                      </option>
                      <option value="French Speaking Guide">French Speaking Cultural Guide</option>
                      <option value="German Speaking Guide">German Speaking Guide</option>
                      <option value="Specialized Temple Archeology & Darshan Guide">
                        Specialized Temple Archeology &amp; Darshan Guide
                      </option>
                    </select>
                  </div>
                )}

                {formData.selectedService === 'Custom Trip' && (
                  <div>
                    <label
                      htmlFor="customTripNote"
                      className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                    >
                      Brief Notes on What You’d Like Us to Organize
                    </label>
                    <input
                      id="customTripNote"
                      type="text"
                      placeholder="e.g. 5 days in Madurai & Rameswaram, only transport and stays needed"
                      value={formData.customTripNote}
                      onChange={(e) => setFormData({ ...formData, customTripNote: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 bg-white"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 3: TRAVELLER DETAILS                                         */}
          {/* ================================================================= */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="sm:col-span-2 group/field">
                  <label
                    htmlFor="fullName"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    placeholder="e.g. Rajesh Kumar"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: '' });
                    }}
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                      errors.fullName
                        ? 'border-red-400 bg-red-50/30'
                        : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100 hover:border-slate-300'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Mobile / WhatsApp Number */}
                <div className="group/field">
                  <label
                    htmlFor="mobileNumber"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Mobile / WhatsApp Number <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="mobileNumber"
                      type="tel"
                      placeholder="e.g. +91 94447 96073"
                      value={formData.mobileNumber}
                      onChange={(e) => {
                        setFormData({ ...formData, mobileNumber: e.target.value });
                        if (errors.mobileNumber) setErrors({ ...errors, mobileNumber: '' });
                      }}
                      className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-all ${
                        errors.mobileNumber
                          ? 'border-red-400 bg-red-50/30'
                          : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-100 hover:border-slate-300'
                      }`}
                    />
                    <Phone className="w-4 h-4 text-slate-400 group-focus-within/field:text-brand-sky-600 absolute right-3.5 top-3.5 pointer-events-none transition-colors" />
                  </div>
                  {errors.mobileNumber && (
                    <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div className="group/field">
                  <label
                    htmlFor="email"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <div className="relative">
                    <input
                      id="email"
                      type="email"
                      placeholder="e.g. rajesh@example.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 hover:border-slate-300 transition-all"
                    />
                    <Mail className="w-4 h-4 text-slate-400 group-focus-within/field:text-brand-teal-600 absolute right-3.5 top-3.5 pointer-events-none transition-colors" />
                  </div>
                </div>

                {/* Number of Adults */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                    Adults (12+ Years)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, adults: Math.max(1, formData.adults - 1) })}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-brand-navy-950 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-brand-navy-950">
                      {formData.adults}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, adults: formData.adults + 1 })}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-brand-navy-950 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Number of Children */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                    Children (Under 12 Years)
                  </label>
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, children: Math.max(0, formData.children - 1) })}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-brand-navy-950 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
                    >
                      -
                    </button>
                    <span className="w-12 text-center text-sm font-bold text-brand-navy-950">
                      {formData.children}
                    </span>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, children: formData.children + 1 })}
                      className="w-10 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 active:scale-95 text-brand-navy-950 font-bold text-base flex items-center justify-center transition-colors cursor-pointer"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 4: PREFERENCES & REQUIREMENTS                                */}
          {/* ================================================================= */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Preferred Vehicle */}
                <div>
                  <label
                    htmlFor="preferredVehicle"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Preferred Vehicle
                  </label>
                  <select
                    id="preferredVehicle"
                    value={formData.preferredVehicle}
                    onChange={(e) => setFormData({ ...formData, preferredVehicle: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 bg-white hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <option value="Innova Crysta (AC)">Innova Crysta (AC) — Best for families &amp; small groups</option>
                    <option value="Sedan (Etios / Dzire AC)">Sedan (Etios / Dzire AC) — Couples &amp; Solo</option>
                    <option value="12-14 Seater Luxury Tempo Traveller">12–14 Seater Luxury Tempo (Pushback Seats)</option>
                    <option value="17 Seater Tempo Traveller">17 Seater Executive Tempo Traveller</option>
                    <option value="Arranging Own Vehicle">Arranging Own Vehicle (No vehicle needed)</option>
                  </select>
                </div>

                {/* Accommodation Requirement */}
                <div>
                  <label
                    htmlFor="accommodation"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Accommodation Preference
                  </label>
                  <select
                    id="accommodation"
                    value={formData.accommodation}
                    onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 bg-white hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <option value="Deluxe 4-Star / Heritage Stays">Deluxe 4-Star / Heritage Stays (Recommended)</option>
                    <option value="Comfort 3-Star Clean Hotels">Comfort 3-Star Clean &amp; Punctual Hotels</option>
                    <option value="Luxury 5-Star Palaces & Resorts">Luxury 5-Star Palaces &amp; Resorts</option>
                    <option value="Arranging Own Stays">Arranging Own Stays (Only Transport &amp; Guide Needed)</option>
                  </select>
                </div>

                {/* Guide Requirement */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="guideRequirement"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Tour Guide Requirement
                  </label>
                  <select
                    id="guideRequirement"
                    value={formData.guideRequirement}
                    onChange={(e) => setFormData({ ...formData, guideRequirement: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 bg-white hover:border-slate-300 transition-all cursor-pointer"
                  >
                    <option value="Yes — Sightseeing & Temple Guide">Yes — Certified Guide for Key Temples &amp; Monuments</option>
                    <option value="Only Chauffeur Guidance Needed">Only Chauffeur Road Guidance Needed</option>
                    <option value="No Guide Needed">No Guide Needed</option>
                  </select>
                </div>

                {/* Special Requests */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="specialRequests"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Special Requests <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <input
                    id="specialRequests"
                    type="text"
                    placeholder="e.g. Special Temple Darshan timings, elder ground-floor room, child car seat..."
                    value={formData.specialRequests}
                    onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 hover:border-slate-300 transition-all"
                  />
                </div>

                {/* Additional Notes */}
                <div className="sm:col-span-2">
                  <label
                    htmlFor="additionalNotes"
                    className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5"
                  >
                    Additional Notes / Ideas <span className="text-slate-400 font-normal lowercase">(optional)</span>
                  </label>
                  <textarea
                    id="additionalNotes"
                    rows={2}
                    placeholder="Any other specific cities, flight arrival times, or questions for our travel planners..."
                    value={formData.additionalNotes}
                    onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-100 hover:border-slate-300 transition-all"
                  />
                </div>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* STEP 5: REVIEW & FINAL CONFIRMATION                               */}
          {/* ================================================================= */}
          {currentStep === 5 && (
            <div className="space-y-6">
              {/* Connected Visual Journey Route Breakdown */}
              <div className="space-y-4">
                {/* 1. Trip & Route */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950 flex items-center gap-1.5">
                      <Compass className="w-4 h-4 text-brand-sky-600" />
                      <span>Trip &amp; Route</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => jumpToStep(1)}
                      className="text-xs text-brand-sky-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Pickup Point:</span>
                      <span className="font-bold text-brand-navy-950">{formData.pickupLocation}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Destination:</span>
                      <span className="font-bold text-brand-navy-950">{formData.destination}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Travel Date:</span>
                      <span className="font-bold text-brand-navy-950">{formData.travelDate || 'Flexible'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Trip Style:</span>
                      <span className="font-bold text-brand-navy-950">{formData.tripType}</span>
                    </div>
                  </div>
                </div>

                {/* 2. Service */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950 flex items-center gap-1.5">
                      <Car className="w-4 h-4 text-brand-teal-600" />
                      <span>Service Selected</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => jumpToStep(2)}
                      className="text-xs text-brand-sky-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="text-xs space-y-1">
                    <span className="font-bold text-brand-navy-950 text-sm block">{formData.selectedService}</span>
                    {formData.selectedService === 'Tour Package' && (
                      <span className="text-brand-sky-700 font-medium block">{formData.packageChoice}</span>
                    )}
                    {formData.selectedService === 'Cab / Taxi' && (
                      <span className="text-brand-teal-700 font-medium block">{formData.cabType}</span>
                    )}
                    {formData.selectedService === 'Site Guide' && (
                      <span className="text-amber-700 font-medium block">{formData.guideLanguage}</span>
                    )}
                  </div>
                </div>

                {/* 3. Travellers & Contact */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950 flex items-center gap-1.5">
                      <Users className="w-4 h-4 text-brand-sky-600" />
                      <span>Travellers &amp; Lead Contact</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => jumpToStep(3)}
                      className="text-xs text-brand-sky-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Lead Traveller:</span>
                      <span className="font-bold text-brand-navy-950">{formData.fullName || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Mobile / WhatsApp:</span>
                      <span className="font-bold text-brand-navy-950">{formData.mobileNumber || 'Not provided'}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Party Size:</span>
                      <span className="font-bold text-brand-navy-950">
                        {formData.travelersCount} ({formData.adults} Adults, {formData.children} Children)
                      </span>
                    </div>
                    {formData.email && (
                      <div>
                        <span className="text-slate-400 block font-medium">Email:</span>
                        <span className="font-bold text-brand-navy-950">{formData.email}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* 4. Preferences */}
                <div className="p-4 sm:p-5 rounded-2xl bg-slate-50/90 border border-slate-200/80">
                  <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950 flex items-center gap-1.5">
                      <FileText className="w-4 h-4 text-brand-teal-600" />
                      <span>Preferences &amp; Comfort</span>
                    </h3>
                    <button
                      type="button"
                      onClick={() => jumpToStep(4)}
                      className="text-xs text-brand-sky-700 font-bold hover:underline cursor-pointer flex items-center gap-1"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Edit</span>
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block font-medium">Vehicle Preference:</span>
                      <span className="font-bold text-brand-navy-950">{formData.preferredVehicle}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block font-medium">Stay Comfort:</span>
                      <span className="font-bold text-brand-navy-950">{formData.accommodation}</span>
                    </div>
                    {formData.specialRequests && (
                      <div className="sm:col-span-2">
                        <span className="text-slate-400 block font-medium">Special Requests:</span>
                        <span className="text-brand-navy-950">{formData.specialRequests}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Submission Error Banner */}
          {submitError && (
            <div className="mt-6 p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-3 shadow-2xs">
              <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
              <div className="flex-1 space-y-1">
                <span className="font-bold text-rose-950 block">Booking Submission Notice</span>
                <p className="leading-relaxed">{submitError}</p>
                <p className="text-[11px] text-rose-600">
                  You can also reach us directly via WhatsApp or phone at {business.phone} for immediate booking confirmation.
                </p>
              </div>
            </div>
          )}

          {/* ================================================================= */}
          {/* NAVIGATION BUTTONS (BACK / LIQUID GRADIENT CONTINUE / SUBMIT)     */}
          {/* ================================================================= */}
          <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
            {currentStep > 1 ? (
              <button
                type="button"
                onClick={handleBack}
                disabled={isSubmitting}
                className="px-5 py-3.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs hover:shadow-soft disabled:opacity-50"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </button>
            ) : (
              <div />
            )}

            {currentStep < 5 ? (
              /* 9. Premium Liquid Gradient Continue Button */
              <button
                type="button"
                onClick={handleNext}
                className="group relative overflow-hidden px-8 py-4 rounded-xl bg-gradient-to-r from-brand-sky-600 via-brand-teal-600 to-brand-sky-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-soft hover:shadow-soft-lg transition-all duration-500 flex items-center justify-center cursor-pointer"
              >
                {/* Left arrow sliding in on hover */}
                <span className="inline-flex items-center -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out mr-0 group-hover:mr-2">
                  <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
                </span>

                <span className="relative z-10 transition-transform duration-300">
                  CONTINUE
                </span>

                {/* Right arrow exiting to right on hover */}
                <span className="inline-flex items-center translate-x-0 opacity-100 group-hover:translate-x-3 group-hover:opacity-0 transition-all duration-300 ease-out ml-2 group-hover:ml-0">
                  <ArrowRight className="w-4 h-4 stroke-[2.2]" />
                </span>
              </button>
            ) : (
              /* 12. Final CTA with Liquid Gradient Interaction */
              <button
                type="button"
                onClick={handleConfirmBooking}
                disabled={isSubmitting}
                className={`group relative overflow-hidden px-8 sm:px-10 py-4 rounded-xl bg-gradient-to-r from-emerald-600 via-brand-teal-600 to-emerald-600 bg-[length:200%_auto] hover:bg-[position:right_center] text-white font-extrabold text-xs sm:text-sm uppercase tracking-wider shadow-soft hover:shadow-soft-lg transition-all duration-500 flex items-center justify-center gap-2 cursor-pointer ${
                  isSubmitting ? 'opacity-75 cursor-wait' : ''
                }`}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin stroke-[2.5]" />
                    <span>SAVING YOUR BOOKING...</span>
                  </>
                ) : (
                  <>
                    <span className="inline-flex items-center -translate-x-3 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300 ease-out mr-0 group-hover:mr-2">
                      <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
                    </span>

                    <span className="relative z-10">
                      SEND MY JOURNEY REQUEST
                    </span>

                    <span className="inline-flex items-center translate-x-0 opacity-100 group-hover:translate-x-3 group-hover:opacity-0 transition-all duration-300 ease-out ml-2 group-hover:ml-0">
                      <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                    </span>
                  </>
                )}
              </button>
            )}
          </div>
        </div>

        {/* =================================================================== */}
        {/* RIGHT COLUMN: 6, 7 & 8. LIVE "YOUR JOURNEY" SUMMARY PANEL          */}
        {/* (30–35% width on desktop, sticky position)                          */}
        {/* =================================================================== */}
        <div className="lg:col-span-4 lg:sticky lg:top-28 space-y-5">
          <div className="bg-white/95 rounded-3xl border border-slate-200/90 shadow-soft-lg p-6 lg:p-7 backdrop-blur-sm space-y-6 transition-all hover:shadow-soft-xl">
            {/* Panel Header */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
              <div>
                <span className="text-[10px] font-bold uppercase tracking-wider text-brand-sky-600 block">
                  ✦ Live Summary
                </span>
                <h3 className="text-lg font-display font-extrabold text-brand-navy-950 tracking-tight">
                  Your Journey
                </h3>
              </div>
              <span className="text-[11px] text-slate-400 font-medium">
                Step {currentStep} of 5
              </span>
            </div>

            {/* 7. Vertical Connected Travel Route */}
            <div className="space-y-4 text-xs relative before:absolute before:left-[15px] before:top-3 before:bottom-3 before:w-[2px] before:border-l-2 before:border-dashed before:border-slate-200">
              {/* Point 1: From */}
              <div className="relative flex items-start justify-between gap-3 pl-8">
                <div className="absolute left-1.5 top-0.5 w-5 h-5 rounded-full bg-brand-sky-50 text-brand-sky-600 border border-brand-sky-200 flex items-center justify-center">
                  <MapPin className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">From</span>
                  <strong className="text-brand-navy-950 font-bold block text-sm">
                    {formData.pickupLocation || 'Choose pickup location'}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToStep(1)}
                  className="text-slate-400 hover:text-brand-sky-600 text-[11px] font-semibold cursor-pointer shrink-0 mt-0.5"
                >
                  Edit ↗
                </button>
              </div>

              {/* Point 2: To (Destination) */}
              <div className="relative flex items-start justify-between gap-3 pl-8">
                <div className="absolute left-1.5 top-0.5 w-5 h-5 rounded-full bg-brand-teal-50 text-brand-teal-600 border border-brand-teal-200 flex items-center justify-center">
                  <Compass className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">To</span>
                  <strong className="text-brand-navy-950 font-bold block text-sm">
                    {formData.destination || 'Choose destination'}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToStep(1)}
                  className="text-slate-400 hover:text-brand-sky-600 text-[11px] font-semibold cursor-pointer shrink-0 mt-0.5"
                >
                  Edit ↗
                </button>
              </div>

              {/* Point 3: Travel Date */}
              <div className="relative flex items-start justify-between gap-3 pl-8">
                <div className="absolute left-1.5 top-0.5 w-5 h-5 rounded-full bg-brand-sky-50 text-brand-sky-600 border border-brand-sky-200 flex items-center justify-center">
                  <Calendar className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Travel Date</span>
                  <strong className="text-brand-navy-950 font-bold block text-xs">
                    {formData.travelDate || 'Not selected yet'}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToStep(1)}
                  className="text-slate-400 hover:text-brand-sky-600 text-[11px] font-semibold cursor-pointer shrink-0 mt-0.5"
                >
                  Edit ↗
                </button>
              </div>

              {/* Point 4: Travellers */}
              <div className="relative flex items-start justify-between gap-3 pl-8">
                <div className="absolute left-1.5 top-0.5 w-5 h-5 rounded-full bg-brand-teal-50 text-brand-teal-600 border border-brand-teal-200 flex items-center justify-center">
                  <Users className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Travellers</span>
                  <strong className="text-brand-navy-950 font-bold block text-xs">
                    {formData.travelersCount}
                  </strong>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToStep(currentStep >= 3 ? 3 : 1)}
                  className="text-slate-400 hover:text-brand-sky-600 text-[11px] font-semibold cursor-pointer shrink-0 mt-0.5"
                >
                  Edit ↗
                </button>
              </div>

              {/* Point 5: Service */}
              <div className="relative flex items-start justify-between gap-3 pl-8">
                <div className="absolute left-1.5 top-0.5 w-5 h-5 rounded-full bg-brand-sky-50 text-brand-sky-600 border border-brand-sky-200 flex items-center justify-center">
                  <Car className="w-3 h-3" />
                </div>
                <div>
                  <span className="text-slate-400 block text-[11px]">Service</span>
                  <strong className="text-brand-navy-950 font-bold block text-xs">
                    {formData.selectedService}
                  </strong>
                  <span className="text-slate-500 text-[11px] block truncate max-w-[150px]">
                    {formData.selectedService === 'Tour Package' && formData.packageChoice}
                    {formData.selectedService === 'Cab / Taxi' && formData.cabType}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => jumpToStep(2)}
                  className="text-slate-400 hover:text-brand-sky-600 text-[11px] font-semibold cursor-pointer shrink-0 mt-0.5"
                >
                  Edit ↗
                </button>
              </div>
            </div>

            {/* 8. Journey Panel Bottom Travel Visual Postcard */}
            <div className="relative rounded-2xl overflow-hidden shadow-soft border border-slate-200/80 group/card">
              <img
                src="https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?auto=format&fit=crop&w=800&q=80"
                alt="Scenic India Journey"
                className="w-full h-32 object-cover transition-transform duration-700 group-hover/card:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-navy-950/85 via-brand-navy-950/40 to-transparent flex flex-col justify-end p-3.5 text-white">
                <span className="text-[10px] uppercase font-mono tracking-wider text-brand-sky-300">
                  ✦ India Travel Guarantee
                </span>
                <p className="text-xs font-medium text-slate-100 leading-snug mt-0.5">
                  &ldquo;Not just trips, but experiences that stay with you.&rdquo;
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
