import React, { useState } from 'react';
import { Send, Phone, MessageCircle, Sparkles, AlertCircle } from 'lucide-react';
import { SectionHeading } from '../common/SectionHeading';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export const QuickEnquirySection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    destination: '',
    travelDate: '',
    travelers: '2 Travelers',
    tripType: 'Family Vacation',
    message: '',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validate = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name.trim()) {
      newErrors.name = 'Please enter your name';
    }
    if (!formData.destination.trim()) {
      newErrors.destination = 'Please enter or select a destination';
    }
    if (!formData.travelDate.trim()) {
      newErrors.travelDate = 'Please specify your travel date or month';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const messageText = [
      `*Tour Enquiry — Jayashakthi Tours & Travels*`,
      `• *Name:* ${formData.name.trim()}`,
      `• *Destination:* ${formData.destination.trim()}`,
      `• *Travel Date:* ${formData.travelDate.trim()}`,
      `• *Travelers:* ${formData.travelers}`,
      `• *Trip Type:* ${formData.tripType}`,
      formData.message.trim() ? `• *Message / Preferences:* ${formData.message.trim()}` : '',
      `\nPlease let me know the available packages and itinerary details. Thank you!`,
    ]
      .filter(Boolean)
      .join('\n');

    const targetUrl = createWhatsAppUrl(messageText);
    window.open(targetUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section id="enquiry" className="py-16 lg:py-24 bg-gradient-to-b from-white via-slate-50/80 to-white border-t border-slate-200/80 scroll-mt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          eyebrow="Direct Travel Assistance"
          title="Plan Your Next Journey"
          description="Tell us where you want to go and how you like to travel. We will organize your complete day-by-day travel plan."
        />

        <div className="mt-10 bg-white rounded-3xl border border-slate-200/90 shadow-soft-xl p-6 sm:p-8 lg:p-10 relative overflow-hidden">
          {/* Subtle decorative accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-sky-100/40 rounded-full blur-3xl pointer-events-none -z-0" />

          <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              {/* Name */}
              <div>
                <label htmlFor="enquiry-name" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Your Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="enquiry-name"
                  type="text"
                  placeholder="e.g. Anand Kumar"
                  value={formData.name}
                  onChange={(e) => {
                    setFormData({ ...formData, name: e.target.value });
                    if (errors.name) setErrors({ ...errors, name: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
                    errors.name ? 'border-red-400 focus:ring-red-300 bg-red-50/30' : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-200'
                  }`}
                />
                {errors.name && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.name}
                  </p>
                )}
              </div>

              {/* Destination */}
              <div>
                <label htmlFor="enquiry-destination" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Destination / Route <span className="text-red-500">*</span>
                </label>
                <input
                  id="enquiry-destination"
                  type="text"
                  placeholder="e.g. Tamil Nadu Temple Tour, Kerala, Rajasthan..."
                  value={formData.destination}
                  onChange={(e) => {
                    setFormData({ ...formData, destination: e.target.value });
                    if (errors.destination) setErrors({ ...errors, destination: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
                    errors.destination ? 'border-red-400 focus:ring-red-300 bg-red-50/30' : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-200'
                  }`}
                />
                {errors.destination && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.destination}
                  </p>
                )}
              </div>

              {/* Travel Date */}
              <div>
                <label htmlFor="enquiry-date" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Travel Date / Month <span className="text-red-500">*</span>
                </label>
                <input
                  id="enquiry-date"
                  type="text"
                  placeholder="e.g. Mid November 2026 or 15–22 Dec"
                  value={formData.travelDate}
                  onChange={(e) => {
                    setFormData({ ...formData, travelDate: e.target.value });
                    if (errors.travelDate) setErrors({ ...errors, travelDate: '' });
                  }}
                  className={`w-full px-4 py-3 rounded-xl border text-sm focus:outline-none focus:ring-2 transition-colors ${
                    errors.travelDate ? 'border-red-400 focus:ring-red-300 bg-red-50/30' : 'border-slate-200 focus:border-brand-sky-500 focus:ring-brand-sky-200'
                  }`}
                />
                {errors.travelDate && (
                  <p className="text-xs text-red-600 mt-1 flex items-center gap-1">
                    <AlertCircle className="w-3 h-3" /> {errors.travelDate}
                  </p>
                )}
              </div>

              {/* Number of Travelers */}
              <div>
                <label htmlFor="enquiry-travelers" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Number of Travelers
                </label>
                <select
                  id="enquiry-travelers"
                  value={formData.travelers}
                  onChange={(e) => setFormData({ ...formData, travelers: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
                >
                  <option value="1 Solo Traveler">1 Solo Traveler</option>
                  <option value="2 Travelers (Couple / Friends)">2 Travelers (Couple / Friends)</option>
                  <option value="3–5 Travelers (Family / Small Group)">3–5 Travelers (Family / Small Group)</option>
                  <option value="6–10 Travelers (Extended Group)">6–10 Travelers (Extended Group)</option>
                  <option value="10+ Travelers (Large Group / Corporate)">10+ Travelers (Large Group / Corporate)</option>
                </select>
              </div>

              {/* Trip Type */}
              <div className="sm:col-span-2">
                <label htmlFor="enquiry-trip-type" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Trip Type
                </label>
                <select
                  id="enquiry-trip-type"
                  value={formData.tripType}
                  onChange={(e) => setFormData({ ...formData, tripType: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200 bg-white"
                >
                  <option value="Family Vacation">Family Vacation (Comfortable & Kid/Elder Friendly)</option>
                  <option value="Temple / Spiritual Tour">Temple & Spiritual Darshan Tour</option>
                  <option value="Couple / Leisure Holiday">Couple / Leisure Holiday</option>
                  <option value="Heritage & Culture Exploration">Heritage & Culture Exploration</option>
                  <option value="Group / Tempo Traveller Journey">Group / Tempo Traveller Journey</option>
                  <option value="100% Customized Route">100% Custom Travel Itinerary</option>
                </select>
              </div>

              {/* Message */}
              <div className="sm:col-span-2">
                <label htmlFor="enquiry-message" className="block text-xs font-bold uppercase tracking-wider text-brand-navy-950 mb-1.5">
                  Message / Special Requests <span className="text-slate-400 font-normal lowercase">(optional)</span>
                </label>
                <textarea
                  id="enquiry-message"
                  rows={3}
                  placeholder="Tell us any specific temples, hotel preferences, or requests you have in mind..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-slate-200 text-sm focus:outline-none focus:ring-2 focus:border-brand-sky-500 focus:ring-brand-sky-200"
                />
              </div>
            </div>

            {/* Submit & Call options */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4 border-t border-slate-100">
              <button
                type="submit"
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm tracking-wide shadow-soft flex items-center justify-center gap-2 transition-colors cursor-pointer"
              >
                <MessageCircle className="w-4 h-4 fill-white/20" />
                <span>Send Enquiry via WhatsApp</span>
              </button>

              <div className="flex items-center gap-2 text-xs text-slate-600">
                <span>Or call directly:</span>
                <a
                  href={business.phoneCallUrl}
                  className="font-bold text-brand-navy-950 hover:text-brand-sky-700 flex items-center gap-1 underline underline-offset-2"
                >
                  <Phone className="w-3.5 h-3.5 text-brand-sky-600" />
                  <span>{business.phone}</span>
                </a>
              </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};
