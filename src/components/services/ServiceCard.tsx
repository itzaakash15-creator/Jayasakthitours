import React from 'react';
import {
  Plane,
  Building2,
  Car,
  Bus,
  FileCheck2,
  Compass,
  Map,
  CalendarDays,
  PlaneLanding,
  Users,
  UserCheck,
  Flame,
  UtensilsCrossed,
  Sparkles,
  Route,
  Globe2,
  ArrowRight,
} from 'lucide-react';
import { ServiceItem } from '../../data/services';
import { Button } from '../common/Button';

// Dynamic icon mapper for Lucide icons
const iconMap: Record<string, React.ReactNode> = {
  Plane: <Plane className="w-6 h-6 text-brand-sky-600" />,
  Building2: <Building2 className="w-6 h-6 text-brand-teal-600" />,
  Car: <Car className="w-6 h-6 text-brand-sky-700" />,
  Bus: <Bus className="w-6 h-6 text-brand-teal-700" />,
  FileCheck2: <FileCheck2 className="w-6 h-6 text-brand-gold-600" />,
  Compass: <Compass className="w-6 h-6 text-brand-sky-600" />,
  Map: <Map className="w-6 h-6 text-brand-teal-600" />,
  CalendarDays: <CalendarDays className="w-6 h-6 text-brand-sky-600" />,
  PlaneLanding: <PlaneLanding className="w-6 h-6 text-brand-teal-600" />,
  Users: <Users className="w-6 h-6 text-brand-sky-600" />,
  UserCheck: <UserCheck className="w-6 h-6 text-brand-teal-600" />,
  Flame: <Flame className="w-6 h-6 text-brand-gold-600" />,
  UtensilsCrossed: <UtensilsCrossed className="w-6 h-6 text-amber-600" />,
  Sparkles: <Sparkles className="w-6 h-6 text-brand-gold-600" />,
  Route: <Route className="w-6 h-6 text-brand-sky-700" />,
  Globe2: <Globe2 className="w-6 h-6 text-brand-teal-600" />,
};

interface ServiceCardProps {
  service: ServiceItem;
  showFullDetails?: boolean;
}

export const ServiceCard: React.FC<ServiceCardProps> = ({ service, showFullDetails = false }) => {
  const icon = iconMap[service.iconName] || <Compass className="w-6 h-6 text-brand-sky-600" />;

  return (
    <div className="group relative rounded-2xl bg-white p-6 sm:p-7 shadow-soft hover:shadow-soft-xl border border-slate-100 hover:border-brand-sky-200 transition-all duration-300 flex flex-col justify-between">
      <div>
        {/* Icon & Category */}
        <div className="flex items-center justify-between mb-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-brand-sky-50 to-brand-teal-50 border border-brand-sky-100/80 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            {icon}
          </div>
          <span className="text-[11px] font-semibold tracking-wider uppercase text-slate-400">
            {service.category}
          </span>
        </div>

        {/* Title */}
        <h3 className="text-lg font-bold text-brand-navy-950 group-hover:text-brand-sky-700 transition-colors mb-2">
          {service.title}
        </h3>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed mb-4">
          {showFullDetails ? service.fullDesc : service.shortDesc}
        </p>

        {/* Highlights */}
        {service.highlights && (
          <ul className="space-y-1.5 mb-5 pt-2 border-t border-slate-100/80 text-xs text-slate-600">
            {service.highlights.map((highlight, idx) => (
              <li key={idx} className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-brand-teal-500 shrink-0" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Card Action */}
      <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
        <Button
          to={`/booking?service=${encodeURIComponent(service.title)}`}
          variant="ghost"
          size="sm"
          className="!p-0 !text-xs font-bold text-brand-sky-700 hover:text-brand-sky-800 hover:bg-transparent group-hover:translate-x-1 transition-transform"
          icon={<ArrowRight className="w-3.5 h-3.5" />}
          iconPosition="right"
        >
          Enquire About This Service
        </Button>
      </div>
    </div>
  );
};
