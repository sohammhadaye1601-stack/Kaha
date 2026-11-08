import React from 'react';
import { CompanyInfo } from '../types';
import { Phone, Mail, MapPin, Shield } from 'lucide-react';

interface FooterProps {
  companyInfo: CompanyInfo;
  onOpenAdmin: () => void;
  onRequestQuote: () => void;
}

export const Footer: React.FC<FooterProps> = ({ companyInfo, onOpenAdmin, onRequestQuote }) => {
  return (
    <footer className="bg-neutral-950 text-neutral-400 text-xs border-t border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded bg-red-600 flex items-center justify-center font-display text-white font-bold text-lg">
                IW
              </div>
              <span className="font-display text-xl font-bold tracking-tight text-white uppercase">
                INTO WELLNESS
              </span>
            </div>

            <p className="text-neutral-400 text-xs leading-relaxed max-w-sm">
              Premier Indian commercial fitness equipment manufacturer in technical collaboration with
              Realleader USA. Engineering biomechanically sound, high-durability strength and cardio equipment in Chakan, Pune.
            </p>

            <div className="space-y-1 text-neutral-400 text-[11px]">
              <div>ZED Silver Certified · Government of India</div>
              <div>Stanford Seed Transformation Program · Class of 2026</div>
            </div>
          </div>

          {/* Quick Nav */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Company
            </h4>
            <ul className="space-y-2">
              <li><a href="#about" className="hover:text-white transition-colors">About Into Wellness</a></li>
              <li><a href="#why-us" className="hover:text-white transition-colors">Why Choose Us</a></li>
              <li><a href="#installations" className="hover:text-white transition-colors">Gym Installations</a></li>
              <li><a href="#timeline" className="hover:text-white transition-colors">History & Achievements</a></li>
              <li><a href="#blogs" className="hover:text-white transition-colors">Blog & Resources</a></li>
              <li><a href="#contact" className="hover:text-white transition-colors">Contact Headquarters</a></li>
            </ul>
          </div>

          {/* Equipment Series */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Equipment Lines
            </h4>
            <ul className="space-y-2">
              <li><a href="#products" className="hover:text-white transition-colors">HS Pro Series (Plate Loaded)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">M7 Dual Series (Pin Loaded)</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">M2 Single Stations</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">FM 8-Stack Multi-Jungles</a></li>
              <li><a href="#products" className="hover:text-white transition-colors">Cardio Air Bikes & Rowers</a></li>
              <li><a href="#customization" className="hover:text-white transition-colors">1,200+ Custom Colorways</a></li>
            </ul>
          </div>

          {/* Regional Sales */}
          <div className="space-y-3">
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Sales Helpdesks
            </h4>
            <ul className="space-y-2 text-[11px]">
              <li><span className="text-neutral-500">West & South:</span> {companyInfo.contacts.salesWestSouth}</li>
              <li><span className="text-neutral-500">North:</span> {companyInfo.contacts.salesNorth}</li>
              <li><span className="text-neutral-500">East:</span> {companyInfo.contacts.salesEast}</li>
              <li><span className="text-neutral-500">Export:</span> {companyInfo.contacts.salesExport}</li>
              <li><span className="text-neutral-500">Email:</span> {companyInfo.contacts.email}</li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 border-t border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px]">
          <div>
            © {new Date().getFullYear()} {companyInfo.legalName}. All Rights Reserved. Engineered in Pune, India.
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={onRequestQuote}
              className="text-red-500 hover:text-red-400 font-bold uppercase"
            >
              Request Quote
            </button>
            <span className="text-neutral-700">|</span>
            <button
              onClick={onOpenAdmin}
              className="hover:text-white flex items-center gap-1 text-neutral-400"
            >
              <Shield className="w-3 h-3 text-red-500" />
              <span>Admin CMS Portal</span>
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
};
