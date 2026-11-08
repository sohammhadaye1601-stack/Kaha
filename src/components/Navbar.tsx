import React, { useState } from 'react';
import { Phone, MessageSquare, Shield, Menu, X } from 'lucide-react';
import { CompanyInfo } from '../types';

interface NavbarProps {
  companyInfo: CompanyInfo;
  onRequestQuote: () => void;
  onOpenAdmin: () => void;
  isAdminLoggedIn: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({
  companyInfo,
  onRequestQuote,
  onOpenAdmin,
  isAdminLoggedIn,
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Products', href: '#products' },
    { label: 'Why Into Wellness', href: '#why-us' },
    { label: 'Customization', href: '#customization' },
    { label: 'Installations', href: '#installations' },
    { label: 'History', href: '#timeline' },
    { label: 'Resources', href: '#blogs' },
    { label: 'Contact', href: '#contact' },
  ];

  return (
    <>
      {/* Top micro-bar for B2B Trust and Direct Contact */}
      <div className="bg-neutral-900 text-neutral-300 text-xs border-b border-neutral-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-2 flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 text-neutral-400">
            <span>Official Technical Collaboration with Realleader USA</span>
            <span className="hidden sm:inline" aria-hidden="true">·</span>
            <span className="hidden sm:inline">Chakan Pune Manufacturing Facility</span>
            <span className="hidden md:inline" aria-hidden="true">·</span>
            <span className="hidden md:inline">ZED Silver Certified</span>
          </div>
          <div className="flex items-center gap-5">
            <a
              href={`tel:${companyInfo.contacts.salesWestSouth.replace(/[^0-9+]/g, '')}`}
              className="flex items-center gap-1.5 hover:text-white transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-red-500" />
              <span className="hidden sm:inline text-neutral-400">Sales:</span>
              <span className="font-semibold text-neutral-200">{companyInfo.contacts.salesWestSouth}</span>
            </a>
            <a
              href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=Hello%20Into%20Wellness,%20I%20am%20interested%20in%20commercial%20fitness%20equipment.`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 transition-colors"
            >
              <MessageSquare className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">WhatsApp</span>
            </a>
          </div>
        </div>
      </div>

      {/* Main Top Bar strictly obeying 3-Zone Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Brand Wordmark (Single clean line) */}
          <a href="#" className="flex items-center gap-2 group shrink-0">
            <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-display text-white font-bold text-lg tracking-wider">
              IW
            </div>
            <div className="flex flex-col">
              <span className="font-display text-xl sm:text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-red-600 transition-colors">
                INTO WELLNESS
              </span>
              <span className="text-[10px] tracking-widest text-neutral-500 uppercase -mt-1 font-semibold">
                Fitness Equipment
              </span>
            </div>
          </a>

          {/* Zone 2: 4-7 Clean single-line nav links */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-semibold text-neutral-700">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="whitespace-nowrap shrink-0 hover:text-red-600 transition-colors py-1"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1 Primary CTA Button + Admin Mode Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={onOpenAdmin}
              aria-label="Admin CMS Portal"
              title="Open Manual Admin Editing System"
              className={`p-2 rounded border text-xs font-medium transition-colors flex items-center gap-1.5 ${
                isAdminLoggedIn
                  ? 'bg-red-50 text-red-700 border-red-300'
                  : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200 border-neutral-300'
              }`}
            >
              <Shield className="w-4 h-4 text-red-600" />
              <span className="hidden sm:inline">Admin CMS</span>
            </button>

            <button
              onClick={onRequestQuote}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold tracking-wide uppercase text-white bg-red-600 hover:bg-red-700 active:bg-red-800 rounded transition-colors whitespace-nowrap shadow-sm hover:shadow"
            >
              Request a Quote
            </button>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-neutral-700 hover:text-neutral-900 focus:outline-none"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden bg-white border-b border-neutral-200 px-4 pt-3 pb-6 space-y-3 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-2 pb-3 border-b border-neutral-100">
              {navLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 rounded"
                >
                  {link.label}
                </a>
              ))}
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onRequestQuote();
                }}
                className="w-full py-3 text-center text-sm font-bold tracking-wide uppercase text-white bg-red-600 hover:bg-red-700 rounded shadow-sm"
              >
                Request a Quote
              </button>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenAdmin();
                }}
                className="w-full py-2.5 text-center text-xs font-semibold text-neutral-700 bg-neutral-100 hover:bg-neutral-200 rounded border border-neutral-300 flex items-center justify-center gap-2"
              >
                <Shield className="w-4 h-4 text-red-600" />
                Admin CMS Dashboard
              </button>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
