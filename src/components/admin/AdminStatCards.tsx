import React from 'react';
import {
  CalendarCheck2,
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Images,
  ArrowUpRight,
} from 'lucide-react';
import { DashboardStats } from '../../data/mockAdminData';

export interface AdminStatCardsProps {
  stats: DashboardStats;
  onFilterByStatus?: (status: string) => void;
  onSelectTab?: (tab: string) => void;
}

export const AdminStatCards: React.FC<AdminStatCardsProps> = ({
  stats,
  onFilterByStatus,
  onSelectTab,
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
      iconColor: 'text-indigo-700',
      iconBg: 'bg-indigo-50 border-indigo-100',
      badgeColor: 'text-indigo-800 bg-indigo-100/80',
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
    {
      id: 'gallery',
      title: 'Published Photos',
      value: stats.publishedPhotos,
      subtext: stats.publishedPhotosChange,
      isGallery: true,
      icon: Images,
      iconColor: 'text-brand-teal-700',
      iconBg: 'bg-brand-teal-50 border-brand-teal-100',
      badgeColor: 'text-brand-teal-800 bg-brand-teal-100/80',
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
      {cards.map((card) => {
        const Icon = card.icon;
        return (
          <div
            key={card.id}
            onClick={() => {
              if (card.isGallery) {
                onSelectTab?.('gallery');
              } else if (card.statusKey) {
                onFilterByStatus?.(card.statusKey);
              }
            }}
            className="group relative bg-white rounded-2xl p-5 border border-slate-200/80 shadow-soft hover:shadow-soft-lg hover:border-brand-sky-300 transition-all duration-300 cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between gap-3 mb-3">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500">
                  {card.title}
                </span>
                <div
                  className={`w-9 h-9 rounded-xl border flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 ${card.iconBg} ${card.iconColor}`}
                >
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl sm:text-3xl font-extrabold text-brand-navy-950 tracking-tight font-display">
                  {card.value}
                </span>
                <span className="text-[11px] text-slate-400 font-medium">
                  {card.isGallery ? 'photos' : 'leads'}
                </span>
              </div>
            </div>

            <div className="mt-3 pt-2.5 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500">
              <span className="truncate">{card.subtext}</span>
              <ArrowUpRight className="w-3 h-3 text-slate-400 group-hover:text-brand-sky-600 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default AdminStatCards;
