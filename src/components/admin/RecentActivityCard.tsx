import React from 'react';
import {
  Sparkles,
  PhoneCall,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  FileCheck2,
} from 'lucide-react';
import { AdminActivity } from '../../data/mockAdminData';

export interface RecentActivityCardProps {
  activities: AdminActivity[];
  onSelectBookingId?: (bookingId: string) => void;
}

export const RecentActivityCard: React.FC<RecentActivityCardProps> = ({
  activities,
  onSelectBookingId,
}) => {
  const getActivityIcon = (type: AdminActivity['type']) => {
    switch (type) {
      case 'enquiry_received':
        return {
          icon: Sparkles,
          color: 'text-amber-700 bg-amber-50 border-amber-200/80',
        };
      case 'customer_contacted':
        return {
          icon: PhoneCall,
          color: 'text-brand-sky-700 bg-brand-sky-50 border-brand-sky-200/80',
        };
      case 'trip_confirmed':
        return {
          icon: CheckCircle2,
          color: 'text-emerald-700 bg-emerald-50 border-emerald-200/80',
        };
      case 'status_changed':
        return {
          icon: FileCheck2,
          color: 'text-teal-700 bg-teal-50 border-teal-200/80',
        };
      default:
        return {
          icon: Clock,
          color: 'text-slate-600 bg-slate-100 border-slate-200',
        };
    }
  };

  return (
    <div className="bg-white rounded-2xl sm:rounded-3xl border border-slate-200/80 shadow-soft p-5 sm:p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm sm:text-base font-extrabold text-brand-navy-950 tracking-tight">
            Recent Coordinator Activity
          </h3>
          <p className="text-xs text-slate-500">
            Real-time feed of booking changes and team coordination.
          </p>
        </div>

        <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 border border-emerald-200/70 px-2 py-0.5 rounded-full">
          Live Feed
        </span>
      </div>

      <div className="divide-y divide-slate-100">
        {activities.map((act) => {
          const { icon: Icon, color } = getActivityIcon(act.type);
          return (
            <div
              key={act.id}
              className="py-3.5 first:pt-1 last:pb-0 flex items-start gap-3 group"
            >
              <div
                className={`w-8 h-8 rounded-xl border flex items-center justify-center shrink-0 mt-0.5 ${color}`}
              >
                <Icon className="w-4 h-4" />
              </div>

              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-2">
                  <h4 className="text-xs font-bold text-brand-navy-950 truncate">
                    {act.title}
                  </h4>
                  <span className="text-[11px] text-slate-400 shrink-0 font-medium">
                    {act.timestamp}
                  </span>
                </div>
                <p className="text-xs text-slate-600 leading-relaxed mt-0.5">
                  {act.description}
                </p>

                <div className="flex items-center gap-3 mt-1.5 text-[11px]">
                  {act.booking_id && (
                    <button
                      type="button"
                      onClick={() => onSelectBookingId?.(act.booking_id!)}
                      className="font-mono text-brand-sky-700 hover:underline font-semibold"
                    >
                      {act.booking_id}
                    </button>
                  )}
                  {act.user && (
                    <span className="text-slate-400">
                      by <strong className="text-slate-600 font-semibold">{act.user}</strong>
                    </span>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
