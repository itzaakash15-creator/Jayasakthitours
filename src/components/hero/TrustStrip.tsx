import React from 'react';
import { Shield, CalendarCheck, Map, Users } from 'lucide-react';

export const TrustStrip: React.FC = () => {
  const trustItems = [
    {
      title: 'Complete Travel Assistance',
      desc: 'From terminal arrival to journey back home',
      icon: <Shield className="w-5 h-5 text-brand-sky-600" />,
    },
    {
      title: 'Customized Itineraries',
      desc: 'Tailored to your dates, pace and interests',
      icon: <CalendarCheck className="w-5 h-5 text-brand-teal-600" />,
    },
    {
      title: 'India-wide Travel Support',
      desc: 'Seamless coordination across all destinations',
      icon: <Map className="w-5 h-5 text-brand-gold-600" />,
    },
    {
      title: 'Personalized Travel Planning',
      desc: 'Individual, family and group travel designed for you',
      icon: <Users className="w-5 h-5 text-brand-sky-700" />,
    },
  ];

  return (
    <section className="relative z-10 -mt-6 sm:-mt-8 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-2xl shadow-soft border border-slate-200/80 p-5 sm:p-6 lg:p-7">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-100">
          {trustItems.map((item, idx) => (
            <div
              key={item.title}
              className={`flex items-center gap-3.5 ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-6 lg:pl-8' : ''}`}
            >
              <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center shrink-0 shadow-2xs">
                {item.icon}
              </div>
              <div>
                <h4 className="text-sm font-bold text-brand-navy-900 leading-tight">
                  {item.title}
                </h4>
                <p className="text-xs text-slate-500 mt-1 leading-normal">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
