import React from 'react';
import {
  CalendarCheck2,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  TrendingUp,
  ArrowUpRight,
} from 'lucide-react';
import { DashboardStats } from '../../data/mockAdminData';

export interface AdminStatCardsProps {
  stats: DashboardStats;
  onFilterByStatus?: (status: string) => void;
}

export const AdminStatCards: React.FC<AdminStatCardsProps> = ({
  stats,
  onFilterByStatus,
}) => {
  const cards = [
    {
      id: 'total',
      title: 'Total Enquiries',
      value: stats.totalEnquiries,
      subtext: stats.totalChange,
      statusKey: 'All',
      icon: CalendarCheck2,
      iconColor: 'text-brand-sky-700',
      iconBg: 'bg-brand-sky-50 border-brand-sky-100',
      badgeColor: 'text-brand-sky-700 bg-brand-sky-50/80',
    },
    {
      id: 'new',
      title: 'New Enquiries',
      value: stats.newEnquiries,
      subtext: stats.newChange,
      statusKey: 'New',
      icon: Sparkles,
      iconColor: 'text-amber-700',
      iconBg: 'bg-amber-50 border-amber-200/80',
      badgeColor: 'text-amber-800 bg-amber-100/80',
    },
    {
      id: 'contacted',
      title: 'Contacted',
      value: stats.contacted,
      subtext: stats.contactedChange,
      statusKey: 'Contacted',
      icon: PhoneCall,
      iconColor: 'text-brand-teal-700',
      iconBg: 'bg-brand-teal-50 border-brand-teal-100',
      badgeColor: 'text-brand-teal-800 bg-brand-teal-100/80',
    },
    {
      id: 'confirmed',
      title: 'Confirmed Trips',
      value: stats.confirmedTrips,
      subtext: stats.confirmedChange,
      statusKey: 'Confirmed',
      icon: CheckCircle2,
      iconColor: 'text-emerald-700',
      iconBg: 'bg-emerald-50 border-emerald-100',
      badgeColor: 'text-emerald-800 bg-emerald-100/80',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-5">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => onFilterByStatus?.(card.statusKey)}
            className="group relative bg-white rounded-2xl sm:rounded-3xl p-5 sm:p-6 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-brand-sky-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                  {card.title}
                </span>
                <div
                  className={`w-10 h-10 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${card.iconBg} ${card.iconColor}`}
                >
                  <Icon className="w-5 h-5" />
                </div>
              </div>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl sm:text-4xl font-extrabold text-brand-navy-950 tracking-tight font-display">
                  {card.value}
                </span>
                <span className="text-xs text-slate-400 font-medium">leads</span>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span className="truncate">{card.subtext}</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-brand-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
};
