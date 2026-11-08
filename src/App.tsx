/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { CMSData, Product } from './types';
import { loadCMSData, onCMSUpdate } from './utils/cmsStore';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { AboutSection } from './components/AboutSection';
import { ProductCatalog } from './components/ProductCatalog';
import { WhyIntoWellness } from './components/WhyIntoWellness';
import { CustomizationStudio } from './components/CustomizationStudio';
import { InstallationsGallery } from './components/InstallationsGallery';
import { HistoryTimeline } from './components/HistoryTimeline';
import { BlogSection } from './components/BlogSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { QuoteModal } from './components/QuoteModal';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { MessageSquare, FileText } from 'lucide-react';

export default function App() {
  const [cmsData, setCMSData] = useState<CMSData>(loadCMSData());
  const [isQuoteModalOpen, setIsQuoteModalOpen] = useState(false);
  const [isAdminOpen, setIsAdminOpen] = useState(false);

  // Quote configuration context
  const [quoteProduct, setQuoteProduct] = useState<Product | null>(null);
  const [customFrame, setCustomFrame] = useState<string | undefined>(undefined);
  const [customUpholstery, setCustomUpholstery] = useState<string | undefined>(undefined);

  // Subscribe to real-time storage/event changes so admin edits propagate everywhere
  useEffect(() => {
    const unsubscribe = onCMSUpdate((newData) => {
      setCMSData(newData);
    });
    return () => unsubscribe();
  }, []);

  const handleOpenQuoteWithProduct = (product: Product) => {
    setQuoteProduct(product);
    setCustomFrame(undefined);
    setCustomUpholstery(undefined);
    setIsQuoteModalOpen(true);
  };

  const handleOpenQuoteWithCustomColors = (frameColor: string, upholsteryColor: string) => {
    setQuoteProduct(null);
    setCustomFrame(frameColor);
    setCustomUpholstery(upholsteryColor);
    setIsQuoteModalOpen(true);
  };

  const handleGeneralQuoteOpen = () => {
    setQuoteProduct(null);
    setCustomFrame(undefined);
    setCustomUpholstery(undefined);
    setIsQuoteModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-white text-neutral-900 selection:bg-red-600 selection:text-white">
      {/* Top Navbar */}
      <Navbar
        companyInfo={cmsData.companyInfo}
        onRequestQuote={handleGeneralQuoteOpen}
        onOpenAdmin={() => setIsAdminOpen(true)}
        isAdminLoggedIn={isAdminOpen}
      />

      <main>
        {/* Cinematic Hero */}
        <Hero
          settings={cmsData.homepage}
          onRequestQuote={handleGeneralQuoteOpen}
          onExploreProducts={() => {
            const el = document.getElementById('products');
            el?.scrollIntoView({ behavior: 'smooth' });
          }}
        />

        {/* About & Leadership */}
        {cmsData.homepage.sectionVisibility.about && (
          <AboutSection companyInfo={cmsData.companyInfo} />
        )}

        {/* Complete Product Catalogue */}
        {cmsData.homepage.sectionVisibility.products && (
          <ProductCatalog
            products={cmsData.products}
            seriesList={cmsData.seriesList}
            colors={cmsData.colors}
            onRequestQuoteForProduct={handleOpenQuoteWithProduct}
          />
        )}

        {/* Why Into Wellness: 6 Engineering Pillars */}
        {cmsData.homepage.sectionVisibility.whyUs && (
          <WhyIntoWellness onRequestQuote={handleGeneralQuoteOpen} />
        )}

        {/* 1,200+ Customization Studio with Interactive Machine Visualizer */}
        {cmsData.homepage.sectionVisibility.customization && (
          <CustomizationStudio
            colors={cmsData.colors}
            onRequestCustomQuote={handleOpenQuoteWithCustomColors}
          />
        )}

        {/* Gym Installations Portfolio */}
        {cmsData.homepage.sectionVisibility.installations && (
          <InstallationsGallery
            installations={cmsData.installations}
            onRequestQuote={handleGeneralQuoteOpen}
          />
        )}

        {/* Company History & Milestones (2015 to 2025) */}
        {cmsData.homepage.sectionVisibility.timeline && (
          <HistoryTimeline milestones={cmsData.milestones} />
        )}

        {/* Blogs & Resources */}
        {cmsData.homepage.sectionVisibility.blogs && (
          <BlogSection blogs={cmsData.blogs} />
        )}

        {/* Contact & Regional Helplines */}
        {cmsData.homepage.sectionVisibility.contact && (
          <ContactSection
            companyInfo={cmsData.companyInfo}
            onRequestQuote={handleGeneralQuoteOpen}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        companyInfo={cmsData.companyInfo}
        onOpenAdmin={() => setIsAdminOpen(true)}
        onRequestQuote={handleGeneralQuoteOpen}
      />

      {/* Persistent Floating Quick-Action Bar */}
      <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end gap-2.5">
        <a
          href={`https://wa.me/${cmsData.companyInfo.contacts.whatsapp}?text=Hello%20Into%20Wellness,%20I%20would%20like%20to%20inquire%20about%20commercial%20fitness%20equipment.`}
          target="_blank"
          rel="noopener noreferrer"
          title="Direct WhatsApp Helpdesk"
          className="w-12 h-12 bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white rounded-full flex items-center justify-center shadow-xl hover:scale-105 transition-all duration-200"
        >
          <MessageSquare className="w-6 h-6" />
        </a>

        <button
          onClick={handleGeneralQuoteOpen}
          className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white rounded-full text-xs font-bold uppercase tracking-wider shadow-xl hover:scale-102 transition-all duration-200"
        >
          <FileText className="w-4 h-4" />
          <span>Quick Quote</span>
        </button>
      </div>

      {/* Quote Request Modal */}
      <QuoteModal
        isOpen={isQuoteModalOpen}
        onClose={() => setIsQuoteModalOpen(false)}
        preselectedProduct={quoteProduct}
        seriesList={cmsData.seriesList}
        customFrameColor={customFrame}
        customUpholsteryColor={customUpholstery}
      />

      {/* Manual Admin Editing System */}
      <AdminDashboard
        cmsData={cmsData}
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        onDataUpdated={(updated) => setCMSData(updated)}
      />
    </div>
  );
}
