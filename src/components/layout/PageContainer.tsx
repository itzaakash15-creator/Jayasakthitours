import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { FloatingWhatsApp } from '../common/FloatingWhatsApp';
import { MobileStickyBar } from './MobileStickyBar';
import { updatePageSeo, SeoConfig } from '../../utils/seo';

interface PageContainerProps {
  children: React.ReactNode;
  seo?: SeoConfig;
}

export const PageContainer: React.FC<PageContainerProps> = ({ children, seo }) => {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (hash) {
      const timer = setTimeout(() => {
        const id = hash.replace('#', '');
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
      return () => clearTimeout(timer);
    } else {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [pathname, hash]);

  useEffect(() => {
    if (seo) {
      updatePageSeo(seo);
    }
  }, [seo]);

  return (
    <div className="min-h-screen flex flex-col bg-[#FAF9F5] text-slate-900 relative selection:bg-brand-sky-100 selection:text-brand-sky-900">
      {/* Subtle website-wide atmospheric paper texture (2-3% opacity) */}
      <div
        className="fixed inset-0 pointer-events-none z-30 opacity-[0.025] mix-blend-multiply"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
        aria-hidden="true"
      />
      <Navbar />
      <main className="flex-grow pt-28 lg:pt-20 pb-20 md:pb-0 relative z-10">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </div>
  );
};
