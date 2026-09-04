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
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }, [pathname]);

  useEffect(() => {
    if (seo) {
      updatePageSeo(seo);
    }
  }, [seo]);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Navbar />
      <main className="flex-grow pt-16 sm:pt-20 pb-20 md:pb-0">
        {children}
      </main>
      <Footer />
      <FloatingWhatsApp />
      <MobileStickyBar />
    </div>
  );
};
