import React from 'react';
import { ArrowRight, FileText, CheckCircle2, Factory, Globe2, Award } from 'lucide-react';
import { HomepageSettings } from '../types';

interface HeroProps {
  settings: HomepageSettings;
  onRequestQuote: () => void;
  onExploreProducts: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  settings,
  onRequestQuote,
  onExploreProducts,
}) => {
  return (
    <section className="relative bg-neutral-950 text-white overflow-hidden">
      {/* Background image with contrast scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={settings.heroImageUrl}
          alt="Into Wellness Commercial Gym Installation"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center opacity-30 transform scale-105 transition-transform duration-1000 ease-out"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-neutral-950 via-neutral-950/90 to-neutral-950/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-transparent to-neutral-950/40" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 lg:pt-28 lg:pb-24">
        <div className="max-w-3xl">
          {/* Subtle editorial kicker */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-950/60 border border-red-800/60 rounded text-xs font-semibold uppercase tracking-wider text-red-400 mb-6">
            <Factory className="w-3.5 h-3.5 text-red-400" />
            <span>Chakan, Pune · Tech Joint Venture with Realleader USA</span>
          </div>

          {/* Main Headline */}
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-none uppercase mb-6" style={{ textWrap: 'balance' }}>
            {settings.heroHeading}
          </h1>

          {/* Supporting Text */}
          <p className="text-lg sm:text-xl text-neutral-300 leading-relaxed font-normal mb-8 max-w-2xl">
            {settings.heroSubtext}
          </p>

          {/* Action CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 mb-14">
            <button
              onClick={onExploreProducts}
              className="px-8 py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white text-sm font-bold tracking-wider uppercase rounded transition-all duration-200 shadow-lg shadow-red-600/20 flex items-center justify-center gap-2 group cursor-pointer"
            >
              <span>{settings.ctaPrimaryText}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onRequestQuote}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 active:bg-white/30 text-white border border-white/20 text-sm font-bold tracking-wider uppercase rounded transition-all duration-200 backdrop-blur-sm flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileText className="w-4 h-4 text-red-400" />
              <span>{settings.ctaSecondaryText}</span>
            </button>
          </div>

          {/* Key Manufacturing Proof Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-6 pt-6 border-t border-neutral-800 text-xs text-neutral-300">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-red-500 shrink-0" />
              <span>11-Gauge 3mm Structural Steel</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe2 className="w-4 h-4 text-red-500 shrink-0" />
              <span>Exported to 12+ Countries</span>
            </div>
            <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
              <Award className="w-4 h-4 text-red-500 shrink-0" />
              <span>ZED Silver Certified Plant</span>
            </div>
          </div>
        </div>
      </div>

      {/* Numerical Stats Bar in neutral contrast card */}
      <div className="relative z-10 border-t border-neutral-800 bg-neutral-900/95 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 lg:gap-8">
            {settings.stats.map((stat) => (
              <div key={stat.label} className="border-l-2 border-red-600 pl-4">
                <div className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-white tabular-nums">
                  {stat.value}
                </div>
                <div className="text-xs font-bold text-neutral-300 uppercase tracking-wide mt-1">
                  {stat.label}
                </div>
                <div className="text-[11px] text-neutral-400 mt-0.5">
                  {stat.description}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
