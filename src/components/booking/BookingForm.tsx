import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useSearchParams } from 'react-router-dom';
import {
  MessageCircle,
  Mail,
  Copy,
  Check,
  Send,
  ArrowRight,
  ArrowLeft,
  CalendarCheck,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { bookingFormSchema, BookingFormSchemaType } from '../../utils/validation';
import { formatBookingEnquiry, openWhatsApp, createWhatsAppUrl, BookingFormData } from '../../utils/whatsapp';
import { business } from '../../config/business';
import { TravelerDetails } from './TravelerDetails';
import { TravelDetails } from './TravelDetails';
import { TravelersCount } from './TravelersCount';
import { DestinationSelect } from './DestinationSelect';
import { PreferenceSelect } from './PreferenceSelect';
import { SpecialRequests } from './SpecialRequests';
import { Button } from '../common/Button';

export const BookingForm: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [submittedData, setSubmittedData] = useState<BookingFormSchemaType | null>(null);
  const [copied, setCopied] = useState(false);

  // Prepopulate from search params if user came from package/service/itinerary card
  const prefillPackage = searchParams.get('package');
  const prefillService = searchParams.get('service');
  const prefillDestination = searchParams.get('destination');
  const prefillItinerary = searchParams.get('itinerary');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    trigger,
    formState: { errors },
  } = useForm<BookingFormSchemaType>({
    resolver: zodResolver(bookingFormSchema),
    defaultValues: {
      fullName: '',
      email: '',
      whatsappNumber: '',
      country: '',
      startDate: '',
      endDate: '',
      totalDays: '',
      totalNights: '',
      adults: 2,
      children: 0,
      childAges: [],
      destinations: prefillDestination ? [prefillDestination] : ['Tamil Nadu'],
      customDestination: '',
      accommodation: 'Premium',
      transportation: 'Car',
      wantItinerary: prefillItinerary === 'yes' ? 'Yes' : 'Yes',
      templeRequirements: '',
      additionalRequirements: prefillPackage
        ? `Interested in the "${prefillPackage}" package.`
        : prefillService
        ? `Enquiring specifically about ${prefillService}.`
        : '',
    },
    mode: 'onTouched',
  });

  // Step definition
  const steps = [
    { number: 1, title: 'Traveler Details', subtitle: 'Name & WhatsApp' },
    { number: 2, title: 'Trip Dates & Group', subtitle: 'Dates & Travelers' },
    { number: 3, title: 'Preferences', subtitle: 'Stays & Itinerary' },
    { number: 4, title: 'Review & Send', subtitle: 'WhatsApp Enquiry' },
  ];

  // Validation before advancing to next step
  const handleNextStep = async () => {
    let isValid = false;
    if (currentStep === 1) {
      isValid = await trigger(['fullName', 'email', 'whatsappNumber', 'country']);
    } else if (currentStep === 2) {
      isValid = await trigger(['startDate', 'endDate', 'adults', 'children']);
    } else if (currentStep === 3) {
      isValid = await trigger(['destinations', 'accommodation', 'transportation', 'wantItinerary']);
    }

    if (isValid) {
      setCurrentStep((prev) => Math.min(prev + 1, 4));
      window.scrollTo({ top: 300, behavior: 'smooth' });
    }
  };

  const handlePrevStep = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 1));
  };

  // Submission handler: format WhatsApp message and open WhatsApp
  const onSubmit = (data: BookingFormSchemaType) => {
    setSubmittedData(data);
    const message = formatBookingEnquiry(data);
    openWhatsApp(message);
  };

  const formattedWhatsAppMessage = submittedData ? formatBookingEnquiry(submittedData) : '';
  const reOpenUrl = submittedData ? createWhatsAppUrl(formattedWhatsAppMessage) : '';

  const handleCopyMessage = () => {
    if (formattedWhatsAppMessage) {
      navigator.clipboard.writeText(formattedWhatsAppMessage);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  // Direct Mailto Alternative
  const mailtoUrl = submittedData
    ? `mailto:${business.email}?subject=${encodeURIComponent(
        `New India Tour Enquiry — ${submittedData.fullName} (${submittedData.country})`
      )}&body=${encodeURIComponent(formattedWhatsAppMessage)}`
    : '';

  return (
    <div className="max-w-4xl mx-auto">
      {/* Progress Indicator */}
      <nav aria-label="Booking Progress" className="mb-8 sm:mb-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 sm:gap-3">
          {steps.map((step) => {
            const isCompleted = currentStep > step.number;
            const isCurrent = currentStep === step.number;

            return (
              <div
                key={step.number}
                className={`p-3 rounded-2xl border transition-all ${
                  isCurrent
                    ? 'bg-brand-sky-50/90 border-brand-sky-400 ring-2 ring-brand-sky-100'
                    : isCompleted
                    ? 'bg-brand-teal-50/60 border-brand-teal-200'
                    : 'bg-white border-slate-200/80 opacity-60'
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <div
                    className={`w-6 h-6 rounded-full text-xs font-bold flex items-center justify-center ${
                      isCompleted
                        ? 'bg-brand-teal-600 text-white'
                        : isCurrent
                        ? 'bg-brand-sky-600 text-white'
                        : 'bg-slate-200 text-slate-600'
                    }`}
                  >
                    {isCompleted ? <Check className="w-3.5 h-3.5 stroke-[3]" /> : step.number}
                  </div>
                  <span
                    className={`text-xs font-bold tracking-tight ${
                      isCurrent ? 'text-brand-sky-900' : 'text-slate-700'
                    }`}
                  >
                    {step.title}
                  </span>
                </div>
                <div className="text-[11px] text-slate-500 hidden sm:block truncate pl-8">
                  {step.subtitle}
                </div>
              </div>
            );
          })}
        </div>
      </nav>

      {/* Main Form Container */}
      {!submittedData ? (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white rounded-3xl shadow-soft-lg border border-slate-200/90 p-6 sm:p-8 lg:p-10 space-y-8"
        >
          {/* STEP 1: Traveler Details */}
          {currentStep === 1 && (
            <div className="space-y-6 animate-fadeIn">
              <TravelerDetails register={register} errors={errors} />
              <div className="pt-4 flex justify-end">
                <Button
                  type="button"
                  onClick={handleNextStep}
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="px-6 uppercase tracking-wider font-bold"
                >
                  Continue to Dates & Travelers
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Travel Dates & Travelers */}
          {currentStep === 2 && (
            <div className="space-y-8 animate-fadeIn">
              <TravelDetails
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <TravelersCount
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <div className="pt-4 flex items-center justify-between">
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  variant="outline"
                  size="md"
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleNextStep}
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="px-6 uppercase tracking-wider font-bold"
                >
                  Continue to Preferences
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Destinations & Preferences */}
          {currentStep === 3 && (
            <div className="space-y-8 animate-fadeIn">
              <DestinationSelect
                register={register}
                setValue={setValue}
                watch={watch}
                errors={errors}
              />
              <PreferenceSelect setValue={setValue} watch={watch} />
              <div className="pt-4 flex items-center justify-between">
                <Button
                  type="button"
                  onClick={handlePrevStep}
                  variant="outline"
                  size="md"
                  icon={<ArrowLeft className="w-4 h-4" />}
                >
                  Back
                </Button>
                <Button
                  type="button"
                  onClick={handleNextStep}
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                  iconPosition="right"
                  className="px-6 uppercase tracking-wider font-bold"
                >
                  Continue to Final Review
                </Button>
              </div>
            </div>
          )}

          {/* STEP 4: Special Requests & Review */}
          {currentStep === 4 && (
            <div className="space-y-8 animate-fadeIn">
              <SpecialRequests register={register} />

              {/* Quick Summary Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200/90 space-y-3">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Enquiry Preview Summary
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-slate-700">
                  <div>
                    <span className="font-semibold text-slate-900">Traveler:</span>{' '}
                    {watch('fullName') || '—'} ({watch('country') || '—'})
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">WhatsApp:</span>{' '}
                    {watch('whatsappNumber') || '—'}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Travel Window:</span>{' '}
                    {watch('startDate') || 'Flexible'} to {watch('endDate') || 'Flexible'} (
                    {watch('totalDays') || '—'} Days)
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Travelers:</span>{' '}
                    {watch('adults')} Adults, {watch('children')} Children
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Destinations:</span>{' '}
                    {watch('destinations')?.join(', ') || 'None selected'}
                  </div>
                  <div>
                    <span className="font-semibold text-slate-900">Day-by-Day Itinerary:</span>{' '}
                    <span className="font-bold text-brand-sky-700">{watch('wantItinerary')}</span>
                  </div>
                </div>
              </div>

              {/* Conversion Submission Action */}
              <div className="p-6 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-brand-teal-500/10 to-brand-sky-500/10 border border-emerald-300 text-center space-y-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
                  <MessageCircle className="w-3.5 h-3.5 fill-emerald-700 text-transparent" />
                  <span>Direct WhatsApp Coordination</span>
                </div>
                <h4 className="text-lg font-bold text-brand-navy-950">
                  Ready to Dispatch Your Enquiry to WhatsApp
                </h4>
                <p className="text-xs sm:text-sm text-slate-600 max-w-xl mx-auto">
                  Submitting will format your complete travel requirements into a structured WhatsApp message and open a direct chat with our Chennai coordination team.
                </p>

                <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
                  <Button
                    type="button"
                    onClick={handlePrevStep}
                    variant="outline"
                    size="md"
                    icon={<ArrowLeft className="w-4 h-4" />}
                  >
                    Back
                  </Button>

                  <Button
                    type="submit"
                    variant="whatsapp"
                    size="lg"
                    icon={<Send className="w-5 h-5" />}
                    className="w-full sm:w-auto px-8 py-3.5 uppercase tracking-wider font-bold shadow-soft-lg"
                  >
                    SUBMIT & OPEN WHATSAPP (+91 98408 15556)
                  </Button>
                </div>
              </div>
            </div>
          )}
        </form>
      ) : (
        /* SUBMISSION CONFIRMATION STATE (Per prompt instructions) */
        <div className="bg-white rounded-3xl shadow-soft-xl border-2 border-emerald-200 p-6 sm:p-10 text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 rounded-3xl bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-soft">
            <MessageCircle className="w-9 h-9 fill-emerald-600/20 stroke-[2.2]" />
          </div>

          <div className="space-y-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
              Enquiry Formatted Successfully
            </span>
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-navy-950">
              Your enquiry is ready in WhatsApp.
            </h3>
            <p className="text-sm text-slate-600 max-w-xl mx-auto leading-relaxed">
              We have opened WhatsApp on your device with all your trip details formatted for our travel planners. Please click <span className="font-semibold text-emerald-700">"Send"</span> in WhatsApp to deliver the message to our team.
            </p>
          </div>

          {/* Action Buttons to Re-open or Copy */}
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 max-w-lg mx-auto space-y-3">
            <p className="text-xs text-slate-500">
              Did WhatsApp not launch automatically? Use the direct actions below:
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-2.5">
              <Button
                href={reOpenUrl}
                external
                variant="whatsapp"
                size="md"
                icon={<ExternalLink className="w-4 h-4" />}
                className="w-full sm:w-auto text-xs uppercase tracking-wider font-bold"
              >
                Re-open WhatsApp
              </Button>

              <button
                type="button"
                onClick={handleCopyMessage}
                className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors"
              >
                {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
                <span>{copied ? 'Copied to Clipboard!' : 'Copy Enquiry Text'}</span>
              </button>
            </div>

            {/* Mailto alternative */}
            <div className="pt-2 border-t border-slate-200">
              <a
                href={mailtoUrl}
                className="inline-flex items-center gap-1.5 text-xs text-brand-sky-700 hover:text-brand-sky-800 font-semibold"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Or email your enquiry to {business.email}</span>
              </a>
            </div>
          </div>

          {/* Reset / Plan another */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => {
                setSubmittedData(null);
                setCurrentStep(1);
              }}
              className="text-xs text-slate-500 hover:text-brand-sky-700 underline"
            >
              Modify details or submit another journey plan
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
