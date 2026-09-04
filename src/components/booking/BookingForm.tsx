import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import {
  Calendar,
  Users,
  MapPin,
  Compass,
  Car,
  UserCheck,
  Building,
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
  ShieldCheck,
  Clock,
} from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';
import { tourPackagesData } from '../../data/packages';

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

  // Step 3: Traveller Details
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
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [bookingRef, setBookingRef] = useState('');
  const [copied, setCopied] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

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
    selectedService: (prefillService?.includes('Cab') ? 'Cab / Taxi' : prefillService?.includes('Guide') ? 'Site Guide' : prefillPackage ? 'Tour Package' : 'Tour Package') as BookingState['selectedService'],
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

  const stepTitles = [
    { num: 1, title: 'Trip Details', label: 'Dates & Route' },
    { num: 2, title: 'Service', label: 'Package or Cab' },
    { num: 3, title: 'Travellers', label: 'Contact Info' },
    { num: 4, title: 'Preferences', label: 'Vehicles & Stays' },
    { num: 5, title: 'Confirm', label: 'Review & Send' },
  ];

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
      setCurrentStep((prev) => Math.min(prev + 1, 5));
      window.scrollTo({ top: 280, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrors({});
    setCurrentStep((prev) => Math.max(prev - 1, 1));
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
      formData.selectedService === 'Custom Trip' && formData.customTripNote ? `• Custom Requirements: ${formData.customTripNote}` : '',
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

  const handleConfirmBooking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep(3)) {
      setCurrentStep(3);
      return;
    }

    const newRef = `JT-${Date.now().toString().slice(-6)}`;
    setBookingRef(newRef);
    setIsSubmitted(true);
    window.scrollTo({ top: 200, behavior: 'smooth' });

    // Open WhatsApp automatically with formatted message
    const summary = generateBookingSummary(newRef);
    const targetUrl = createWhatsAppUrl(summary);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCopySummary = () => {
    const summary = generateBookingSummary(bookingRef);
    navigator.clipboard.writeText(summary);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  // =========================================================================
  // SUBMISSION CONFIRMATION SCREEN
  // =========================================================================
  if (isSubmitted) {
    const summaryText = generateBookingSummary(bookingRef);
    const whatsappUrl = createWhatsAppUrl(summaryText);

    return (
      <div className="max-w-3xl mx-auto bg-white rounded-3xl border border-slate-200/90 shadow-soft-xl p-6 sm:p-10 text-center space-y-6">
        <div className="w-16 h-16 rounded-3xl bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto shadow-soft">
          <CheckCircle2 className="w-9 h-9" />
        </div>

        <div className="space-y-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold uppercase tracking-wider border border-emerald-200">
            Booking Details Prepared Successfully
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy-950">
            Thank You, {formData.fullName}!
          </h2>
          <p className="text-slate-600 text-xs sm:text-sm max-w-lg mx-auto">
            Your booking reference is <strong className="text-brand-navy-950 font-bold">#{bookingRef}</strong>. Our travel coordinator is ready to finalize your itinerary.
          </p>
        </div>

        {/* WhatsApp Dispatch CTA */}
        <div className="p-5 sm:p-6 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 text-left space-y-3">
          <div className="flex items-start gap-3">
            <div className="p-2 rounded-xl bg-emerald-600 text-white shrink-0 mt-0.5">
              <MessageCircle className="w-5 h-5 fill-white/20" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-emerald-950">
                Connect Directly via WhatsApp
              </h4>
              <p className="text-xs text-emerald-800 mt-0.5">
                Click below to send your structured booking details straight to Jayashakthi Tours (+91 98408 15556) for instant response.
              </p>
            </div>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-sm shadow-soft transition-all flex items-center justify-center gap-2"
            >
              <MessageCircle className="w-4 h-4 fill-white/20" />
              <span>Send Booking to WhatsApp (+91 98408 15556)</span>
            </a>

            <button
              type="button"
              onClick={handleCopySummary}
              className="w-full sm:w-auto px-4 py-3.5 rounded-xl bg-white hover:bg-slate-100 text-slate-700 border border-slate-200 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-bold">Copied!</span>
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

        {/* Clean Summary Card */}
        <div className="p-5 sm:p-6 rounded-2xl bg-slate-50 border border-slate-200/80 text-left text-xs space-y-3">
          <div className="flex items-center justify-between border-b border-slate-200 pb-2">
            <span className="font-bold uppercase tracking-wider text-slate-400">
              Booking Summary
            </span>
            <span className="font-mono font-bold text-brand-sky-700">#{bookingRef}</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-slate-700">
            <div>
              <span className="text-slate-400 block font-medium">Service:</span>
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
              <span className="font-bold text-brand-navy-950">{formData.travelersCount} ({formData.adults}A, {formData.children}C)</span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Pickup Point:</span>
              <span className="font-bold text-brand-navy-950">{formData.pickupLocation}</span>
            </div>

            <div>
              <span className="text-slate-400 block font-medium">Contact:</span>
              <span className="font-bold text-brand-navy-950">{formData.mobileNumber}</span>
            </div>
          </div>
        </div>

        {/* Secondary Navigation */}
        <div className="pt-2 flex items-center justify-center gap-4 text-xs">
          <button
            type="button"
            onClick={() => {
              setIsSubmitted(false);
              setCurrentStep(1);
            }}
            className="text-brand-sky-700 font-semibold hover:underline"
          >
            ← Modify / Plan Another Trip
          </button>
        </div>
      </div>
    );
  }

  // =========================================================================
  // 5-STEP BOOKING WIZARD FORM
  // =========================================================================
  return (
    <div className="max-w-4xl mx-auto">
      {/* 5-STEP PROGRESS INDICATOR */}
      <div className="mb-8 sm:mb-10">
        <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/90 shadow-soft p-3 sm:p-4">
          <div className="grid grid-cols-5 gap-1 sm:gap-2">
            {stepTitles.map((step) => {
              const isCompleted = currentStep > step.num;
              const isActive = currentStep === step.num;

              return (
                <button
                  key={step.num}
                  type="button"
                  onClick={() => {
                    if (step.num < currentStep) {
                      setCurrentStep(step.num);
                    }
                  }}
                  disabled={step.num > currentStep}
                  className={`flex flex-col items-center text-center p-1.5 sm:p-2.5 rounded-xl transition-all ${
                    isActive
                      ? 'bg-brand-sky-50 text-brand-sky-800 border border-brand-sky-200 shadow-2xs'
                      : isCompleted
                      ? 'text-emerald-700 hover:bg-slate-50 cursor-pointer'
                      : 'text-slate-400 cursor-not-allowed'
                  }`}
                >
                  <div
                    className={`w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center text-xs font-bold mb-1 transition-colors ${
                      isActive
                        ? 'bg-brand-sky-600 text-white'
                        : isCompleted
                        ? 'bg-emerald-600 text-white'
                        : 'bg-slate-100 text-slate-500'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5" /> : step.num}
                  </div>
                  <span className="text-[10px] sm:text-xs font-bold tracking-tight truncate w-full">
                    {step.title}
                  </span>
                  <span className="hidden md:block text-[9px] text-slate-400 font-normal truncate">
                    {step.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* FORM CARD */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
        {/* =================================================================== */}
        {/* STEP 1: TRIP DETAILS                                                */}
        {/* =================================================================== */}
        {currentStep === 1 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-sky-600 block mb-1">
                Step 1 of 5
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950 tracking-tight">
                Trip Details &amp; Schedule
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Tell us your intended dates, group size, and where you want to travel.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Travel Date */}
              <div>
                <label htmlFor="travelDate" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
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
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
                      errors.travelDate ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-200'
                    }`}
                  />
                  <Calendar className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {errors.travelDate && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.travelDate}
                  </p>
                )}
              </div>

              {/* Number of Travellers */}
              <div>
                <label htmlFor="travelersCount" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Number of Travellers
                </label>
                <div className="relative">
                  <select
                    id="travelersCount"
                    value={formData.travelersCount}
                    onChange={(e) => setFormData({ ...formData, travelersCount: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
                  >
                    <option value="1 Solo Traveler">1 Solo Traveler</option>
                    <option value="2 Travelers (Couple / Friends)">2 Travelers (Couple / Friends)</option>
                    <option value="3–5 Travelers (Family)">3–5 Travelers (Family)</option>
                    <option value="6–10 Travelers (Small Group)">6–10 Travelers (Small Group)</option>
                    <option value="10–16 Travelers (Tempo Group)">10–16 Travelers (Tempo Group)</option>
                    <option value="17+ Large Tour Group">17+ Large Tour Group</option>
                  </select>
                  <Users className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Pickup Location */}
              <div>
                <label htmlFor="pickupLocation" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
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
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
                      errors.pickupLocation ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-200'
                    }`}
                  />
                  <MapPin className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {errors.pickupLocation && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.pickupLocation}
                  </p>
                )}
              </div>

              {/* Destination */}
              <div>
                <label htmlFor="destination" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
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
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
                      errors.destination ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-200'
                    }`}
                  />
                  <Compass className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {errors.destination && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.destination}
                  </p>
                )}
              </div>

              {/* Trip Type */}
              <div className="sm:col-span-2">
                <label htmlFor="tripType" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Trip Type / Travel Style
                </label>
                <select
                  id="tripType"
                  value={formData.tripType}
                  onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
                >
                  <option value="Family Vacation">Family Vacation (Comfortable & Relaxed Pacing)</option>
                  <option value="Temple & Spiritual Darshan">Temple & Spiritual Darshan (Special Darshan Timings)</option>
                  <option value="Couple / Honeymoon Holiday">Couple / Leisure Holiday</option>
                  <option value="Group / Tempo Traveller Journey">Group Journey (Friends / Family Reunion)</option>
                  <option value="Heritage & Architecture Tour">Heritage & Living Architecture Exploration</option>
                  <option value="Custom Multi-City India Tour">100% Tailor-Made Multi-City Route</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 2: SERVICE SELECTION                                           */}
        {/* =================================================================== */}
        {currentStep === 2 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-sky-600 block mb-1">
                Step 2 of 5
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950 tracking-tight">
                Choose Your Service
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Select whether you need a full tour package, a private chauffeured cab, a certified guide, or a custom trip.
              </p>
            </div>

            {/* 4 Core Service Options Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Option 1: Tour Package */}
              <div
                onClick={() => setFormData({ ...formData, selectedService: 'Tour Package' })}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.selectedService === 'Tour Package'
                    ? 'border-brand-sky-600 bg-brand-sky-50/60 shadow-soft'
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
                    className="w-4 h-4 text-brand-sky-600"
                  />
                </div>
                <h3 className="text-base font-bold text-brand-navy-950 mb-1">
                  Tour Package
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  Complete end-to-end package with vehicle, handpicked stays, planned itinerary, and support.
                </p>
              </div>

              {/* Option 2: Cab / Taxi */}
              <div
                onClick={() => setFormData({ ...formData, selectedService: 'Cab / Taxi' })}
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.selectedService === 'Cab / Taxi'
                    ? 'border-brand-teal-600 bg-brand-teal-50/60 shadow-soft'
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
                    className="w-4 h-4 text-brand-teal-600"
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
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.selectedService === 'Site Guide'
                    ? 'border-brand-gold-600 bg-amber-50/60 shadow-soft'
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
                    className="w-4 h-4 text-amber-600"
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
                className={`p-5 rounded-2xl border-2 cursor-pointer transition-all ${
                  formData.selectedService === 'Custom Trip'
                    ? 'border-indigo-600 bg-indigo-50/60 shadow-soft'
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
                    className="w-4 h-4 text-indigo-600"
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
            <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80">
              {formData.selectedService === 'Tour Package' && (
                <div>
                  <label htmlFor="packageChoice" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                    Select Preferred Tour Package
                  </label>
                  <select
                    id="packageChoice"
                    value={formData.packageChoice}
                    onChange={(e) => setFormData({ ...formData, packageChoice: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
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
                  <label htmlFor="cabType" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                    Select Vehicle Class
                  </label>
                  <select
                    id="cabType"
                    value={formData.cabType}
                    onChange={(e) => setFormData({ ...formData, cabType: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
                  >
                    <option value="Sedan (Etios / Dzire) — Up to 3-4 Pax">Air-Conditioned Sedan (Etios / Dzire) — 3-4 Passengers</option>
                    <option value="Innova Crysta — Up to 6-7 Pax">Innova Crysta Premium SUV — 6-7 Passengers</option>
                    <option value="Luxury Tempo Traveller — 12-14 Seater">Luxury Tempo Traveller (Pushback Seats) — 12-14 Seater</option>
                    <option value="Executive Tempo Traveller — 17 Seater">Executive Tempo Traveller — 17 Seater</option>
                    <option value="Mini Coach / Luxury Bus">Mini Coach / Luxury Tour Bus (21+ Seater)</option>
                  </select>
                </div>
              )}

              {formData.selectedService === 'Site Guide' && (
                <div>
                  <label htmlFor="guideLanguage" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                    Preferred Guide Language &amp; Expertise
                  </label>
                  <select
                    id="guideLanguage"
                    value={formData.guideLanguage}
                    onChange={(e) => setFormData({ ...formData, guideLanguage: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
                  >
                    <option value="English & Regional Language (Tamil / Hindi)">English &amp; Regional Language (Tamil / Hindi)</option>
                    <option value="French Speaking Guide">French Speaking Cultural Guide</option>
                    <option value="German Speaking Guide">German Speaking Guide</option>
                    <option value="Specialized Temple Archeology & Darshan Guide">Specialized Temple Archeology &amp; Darshan Guide</option>
                  </select>
                </div>
              )}

              {formData.selectedService === 'Custom Trip' && (
                <div>
                  <label htmlFor="customTripNote" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                    Brief Notes on What You’d Like Us to Organize
                  </label>
                  <input
                    id="customTripNote"
                    type="text"
                    placeholder="e.g. 5 days in Madurai & Rameswaram, only transport and stays needed"
                    value={formData.customTripNote}
                    onChange={(e) => setFormData({ ...formData, customTripNote: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
                  />
                </div>
              )}
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 3: TRAVELLER DETAILS                                           */}
        {/* =================================================================== */}
        {currentStep === 3 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-sky-600 block mb-1">
                Step 3 of 5
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950 tracking-tight">
                Traveller Details &amp; Contact Info
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Who will be traveling and where can our tour team reach you?
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Full Name */}
              <div className="sm:col-span-2">
                <label htmlFor="fullName" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
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
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
                    errors.fullName ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-200'
                  }`}
                />
                {errors.fullName && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.fullName}
                  </p>
                )}
              </div>

              {/* Mobile / WhatsApp Number */}
              <div>
                <label htmlFor="mobileNumber" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
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
                    className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
                      errors.mobileNumber ? 'border-red-400 bg-red-50/30' : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-200'
                    }`}
                  />
                  <Phone className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
                {errors.mobileNumber && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.mobileNumber}
                  </p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Email Address <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <div className="relative">
                  <input
                    id="email"
                    type="email"
                    placeholder="e.g. rajesh@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute right-3.5 top-3.5 pointer-events-none" />
                </div>
              </div>

              {/* Number of Adults */}
              <div>
                <label htmlFor="adults" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
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
                <label htmlFor="children" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
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

        {/* =================================================================== */}
        {/* STEP 4: PREFERENCES & REQUIREMENTS                                  */}
        {/* =================================================================== */}
        {currentStep === 4 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-sky-600 block mb-1">
                Step 4 of 5
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950 tracking-tight">
                Preferences &amp; Special Requirements
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Customize your vehicle style, accommodation comfort level, and any special requests.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Preferred Vehicle */}
              <div>
                <label htmlFor="preferredVehicle" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Preferred Vehicle
                </label>
                <select
                  id="preferredVehicle"
                  value={formData.preferredVehicle}
                  onChange={(e) => setFormData({ ...formData, preferredVehicle: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
                >
                  <option value="Innova Crysta (AC)">Innova Crysta (AC) — Best for families & small groups</option>
                  <option value="Sedan (Etios / Dzire AC)">Sedan (Etios / Dzire AC) — Couples & Solo</option>
                  <option value="12-14 Seater Luxury Tempo Traveller">12–14 Seater Luxury Tempo (Pushback Seats)</option>
                  <option value="17 Seater Tempo Traveller">17 Seater Executive Tempo Traveller</option>
                  <option value="Arranging Own Vehicle">Arranging Own Vehicle (No vehicle needed)</option>
                </select>
              </div>

              {/* Accommodation Requirement */}
              <div>
                <label htmlFor="accommodation" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Accommodation Preference
                </label>
                <select
                  id="accommodation"
                  value={formData.accommodation}
                  onChange={(e) => setFormData({ ...formData, accommodation: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
                >
                  <option value="Deluxe 4-Star / Heritage Stays">Deluxe 4-Star / Heritage Stays (Recommended)</option>
                  <option value="Comfort 3-Star Clean Hotels">Comfort 3-Star Clean &amp; Punctual Hotels</option>
                  <option value="Luxury 5-Star Palaces & Resorts">Luxury 5-Star Palaces &amp; Resorts</option>
                  <option value="Arranging Own Stays">Arranging Own Stays (Only Transport & Guide Needed)</option>
                </select>
              </div>

              {/* Guide Requirement */}
              <div className="sm:col-span-2">
                <label htmlFor="guideRequirement" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Tour Guide Requirement
                </label>
                <select
                  id="guideRequirement"
                  value={formData.guideRequirement}
                  onChange={(e) => setFormData({ ...formData, guideRequirement: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
                >
                  <option value="Yes — Sightseeing & Temple Guide">Yes — Certified Guide for Key Temples &amp; Monuments</option>
                  <option value="Only Chauffeur Guidance Needed">Only Chauffeur Road Guidance Needed</option>
                  <option value="No Guide Needed">No Guide Needed</option>
                </select>
              </div>

              {/* Special Requests */}
              <div className="sm:col-span-2">
                <label htmlFor="specialRequests" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Special Requests <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <input
                  id="specialRequests"
                  type="text"
                  placeholder="e.g. Special Temple Darshan timings, elder ground-floor room, child car seat..."
                  value={formData.specialRequests}
                  onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200"
                />
              </div>

              {/* Additional Notes */}
              <div className="sm:col-span-2">
                <label htmlFor="additionalNotes" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Additional Notes / Ideas <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  id="additionalNotes"
                  rows={2}
                  placeholder="Any other specific cities, flight arrival times, or questions for our travel planners..."
                  value={formData.additionalNotes}
                  onChange={(e) => setFormData({ ...formData, additionalNotes: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200"
                />
              </div>
            </div>
          </div>
        )}

        {/* =================================================================== */}
        {/* STEP 5: REVIEW & CONFIRM                                            */}
        {/* =================================================================== */}
        {currentStep === 5 && (
          <div className="space-y-6">
            <div className="border-b border-slate-100 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-brand-sky-600 block mb-1">
                Step 5 of 5
              </span>
              <h2 className="text-xl sm:text-2xl font-extrabold text-brand-navy-950 tracking-tight">
                Review &amp; Confirm Your Booking
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
                Please review the details entered. When confirmed, your booking summary is prepared with direct WhatsApp dispatch.
              </p>
            </div>

            {/* Structured Summary Grid */}
            <div className="space-y-4">
              {/* Box 1: Trip & Service */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950 flex items-center gap-1.5">
                    <Compass className="w-4 h-4 text-brand-sky-600" />
                    <span>Trip &amp; Service Selection</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(1)}
                    className="text-xs text-brand-sky-700 font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Selected Service:</span>
                    <span className="font-bold text-brand-navy-950 text-sm">{formData.selectedService}</span>
                    {formData.selectedService === 'Tour Package' && (
                      <span className="text-brand-sky-700 font-medium block text-xs mt-0.5">{formData.packageChoice}</span>
                    )}
                    {formData.selectedService === 'Cab / Taxi' && (
                      <span className="text-brand-teal-700 font-medium block text-xs mt-0.5">{formData.cabType}</span>
                    )}
                    {formData.selectedService === 'Site Guide' && (
                      <span className="text-amber-700 font-medium block text-xs mt-0.5">{formData.guideLanguage}</span>
                    )}
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Destination:</span>
                    <span className="font-bold text-brand-navy-950 text-sm">{formData.destination}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Travel Date:</span>
                    <span className="font-bold text-brand-navy-950">{formData.travelDate || 'Flexible'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Pickup Point:</span>
                    <span className="font-bold text-brand-navy-950">{formData.pickupLocation}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Travellers:</span>
                    <span className="font-bold text-brand-navy-950">{formData.travelersCount} ({formData.adults} Adults, {formData.children} Children)</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Trip Style:</span>
                    <span className="font-bold text-brand-navy-950">{formData.tripType}</span>
                  </div>
                </div>
              </div>

              {/* Box 2: Traveller Info */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950 flex items-center gap-1.5">
                    <Users className="w-4 h-4 text-brand-teal-600" />
                    <span>Traveller Contact Details</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(3)}
                    className="text-xs text-brand-sky-700 font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Full Name:</span>
                    <span className="font-bold text-brand-navy-950">{formData.fullName || 'Not provided'}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Mobile / WhatsApp:</span>
                    <span className="font-bold text-brand-navy-950">{formData.mobileNumber || 'Not provided'}</span>
                  </div>

                  {formData.email && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block font-medium">Email:</span>
                      <span className="font-bold text-brand-navy-950">{formData.email}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Box 3: Preferences & Requests */}
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-50 border border-slate-200/80">
                <div className="flex items-center justify-between mb-3 border-b border-slate-200 pb-2">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-brand-navy-950 flex items-center gap-1.5">
                    <FileText className="w-4 h-4 text-brand-gold-600" />
                    <span>Preferences &amp; Requests</span>
                  </h3>
                  <button
                    type="button"
                    onClick={() => setCurrentStep(4)}
                    className="text-xs text-brand-sky-700 font-bold hover:underline"
                  >
                    Edit
                  </button>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div>
                    <span className="text-slate-400 block font-medium">Preferred Vehicle:</span>
                    <span className="font-bold text-brand-navy-950">{formData.preferredVehicle}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Accommodation:</span>
                    <span className="font-bold text-brand-navy-950">{formData.accommodation}</span>
                  </div>

                  <div>
                    <span className="text-slate-400 block font-medium">Guide:</span>
                    <span className="font-bold text-brand-navy-950">{formData.guideRequirement}</span>
                  </div>

                  {formData.specialRequests && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block font-medium">Special Requests:</span>
                      <span className="text-brand-navy-950">{formData.specialRequests}</span>
                    </div>
                  )}

                  {formData.additionalNotes && (
                    <div className="sm:col-span-2">
                      <span className="text-slate-400 block font-medium">Notes:</span>
                      <span className="text-brand-navy-950">{formData.additionalNotes}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NAVIGATION BUTTONS (BACK / NEXT / CONFIRM) */}
        <div className="mt-8 pt-6 border-t border-slate-100 flex items-center justify-between gap-3">
          {currentStep > 1 ? (
            <button
              type="button"
              onClick={handleBack}
              className="px-5 py-3 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </button>
          ) : (
            <div />
          )}

          {currentStep < 5 ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-sky-600 to-brand-teal-600 hover:from-brand-sky-500 hover:to-brand-teal-500 active:scale-98 text-white font-bold text-xs uppercase tracking-wider shadow-soft hover:shadow-soft-md transition-all flex items-center gap-2 cursor-pointer"
            >
              <span>Next: {stepTitles[currentStep]?.title || 'Continue'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              type="button"
              onClick={handleConfirmBooking}
              className="px-8 py-4 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm uppercase tracking-wider shadow-soft hover:shadow-soft-lg transition-all flex items-center gap-2 cursor-pointer"
            >
              <CheckCircle2 className="w-5 h-5" />
              <span>CONFIRM BOOKING</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
