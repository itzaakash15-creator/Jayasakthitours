import React, { useState } from 'react';
import { MessageCircle, X } from 'lucide-react';
import { business } from '../../config/business';
import { createWhatsAppUrl } from '../../utils/whatsapp';

export const FloatingWhatsApp: React.FC = () => {
  const [showTooltip, setShowTooltip] = useState(true);

  const whatsappUrl = createWhatsAppUrl(business.defaultWhatsAppMessage);

  return (
    <aside aria-label="WhatsApp quick chat" className="fixed bottom-6 right-6 z-40 hidden md:flex flex-col items-end group">
      {/* Desktop Tooltip / Mini banner */}
      {showTooltip && (
        <div className="mb-2 hidden sm:flex items-center gap-2 bg-white text-slate-800 px-3 py-1.5 rounded-full shadow-lg border border-slate-100 text-xs font-medium animate-bounce">
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
          <span>Chat with us on WhatsApp</span>
          <button
            type="button"
            onClick={(e) => {
              e.preventDefault();
              setShowTooltip(false);
            }}
            className="text-slate-400 hover:text-slate-600 p-0.5 rounded-full focus:outline-none"
            aria-label="Close tooltip"
          >
            <X className="w-3 h-3" />
          </button>
        </div>
      )}

      {/* Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Jayashakthi Tours on WhatsApp"
        className="relative flex items-center justify-center w-14 h-14 rounded-full bg-[#25D366] text-white shadow-xl hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-[#25D366]/40"
      >
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-gold-500 border-2 border-white rounded-full animate-ping opacity-75" />
        <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-brand-gold-500 border-2 border-white rounded-full" />
        <MessageCircle className="w-7 h-7 fill-white/20 stroke-[2.2]" />
      </a>
    </aside>
  );
};
