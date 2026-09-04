import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export const MobileStickyBar: React.FC = () => {
  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  return (
    <aside
      aria-label="Mobile quick contact actions"
      className="fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-slate-200/90 py-2 px-3 sm:px-4 md:hidden shadow-[0_-4px_12px_rgba(0,0,0,0.06)] pb-[calc(env(safe-area-inset-bottom,0px)+0.5rem)]"
    >
      <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
        {/* Call Action */}
        <a
          href={business.phoneCallUrl}
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-slate-900 hover:bg-slate-800 active:scale-98 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-sm"
        >
          <Phone className="w-4 h-4 text-brand-sky-400 shrink-0" />
          <span className="truncate">Call {business.phone}</span>
        </a>

        {/* WhatsApp Action */}
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-bold text-xs tracking-wider uppercase transition-all shadow-sm"
        >
          <MessageCircle className="w-4 h-4 fill-white/20 shrink-0" />
          <span className="truncate">WhatsApp Us</span>
        </a>
      </div>
    </aside>
  );
};
