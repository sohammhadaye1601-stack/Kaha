import React, { useState } from 'react';
import { Palette, Check, Sparkles, Send, ShieldCheck, Download } from 'lucide-react';
import { CustomizationColor } from '../types';

interface CustomizationStudioProps {
  colors: CustomizationColor[];
  onRequestCustomQuote: (frameColor: string, upholsteryColor: string) => void;
}

export const CustomizationStudio: React.FC<CustomizationStudioProps> = ({
  colors,
  onRequestCustomQuote,
}) => {
  const frameColors = colors.filter((c) => c.type === 'frame');
  const upholsteryColors = colors.filter((c) => c.type === 'upholstery');

  const [activeFrame, setActiveFrame] = useState(frameColors[0] || { id: 'f-1', name: 'Matte Jet Black', hex: '#1C1C1E' });
  const [activeUpholstery, setActiveUpholstery] = useState(upholsteryColors[0] || { id: 'u-1', name: 'Classic Burgundy Red', hex: '#881337' });

  return (
    <section id="customization" className="py-20 bg-neutral-900 text-white border-b border-neutral-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
            Bespoke Facility Identity
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
            1,200+ CUSTOMIZATION COMBINATIONS
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 mb-6" />
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Your fitness brand deserves a distinctive, unforgettable aesthetic. Into Wellness offers 25 high-durability
            electrostatic frame powder coatings, 5 automotive-grade double-stitched upholstery leathers, and laser-engraved
            custom brand badges.
          </p>
        </div>

        {/* Interactive Customizer Studio Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left: Interactive Machine SVG Preview */}
          <div className="lg:col-span-7 bg-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-8 flex flex-col justify-between">
            <div className="flex items-center justify-between pb-4 border-b border-neutral-800 mb-6">
              <div className="flex items-center gap-2">
                <Palette className="w-4 h-4 text-red-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-300">
                  Live Equipment Colorway Preview
                </span>
              </div>
              <div className="text-[11px] text-neutral-400">
                HS Pro Iso-Lateral Chest Press Configuration
              </div>
            </div>

            {/* Dynamic SVG Visualizer */}
            <div className="relative aspect-16/10 flex items-center justify-center bg-gradient-to-b from-neutral-900 to-neutral-950 rounded-lg p-4 border border-neutral-800/80 overflow-hidden">
              <svg
                viewBox="0 0 600 400"
                className="w-full h-full max-h-[360px] drop-shadow-2xl transition-all duration-300"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Background Grid Lines */}
                <defs>
                  <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
                    <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#262626" strokeWidth="0.5" />
                  </pattern>
                </defs>
                <rect width="600" height="400" fill="url(#grid)" opacity="0.3" />

                {/* Ground platform */}
                <rect x="50" y="360" width="500" height="12" rx="4" fill="#262626" />
                <line x1="80" y1="360" x2="520" y2="360" stroke="#404040" strokeWidth="2" />

                {/* Main Machine Frame Base (Dynamic Frame Color) */}
                <path
                  d="M120 360 L200 240 L360 240 L460 360"
                  stroke={activeFrame.hex}
                  strokeWidth="28"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />

                {/* Vertical Support Spine */}
                <path
                  d="M260 360 L260 120 L320 80 L360 120"
                  stroke={activeFrame.hex}
                  strokeWidth="26"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />

                {/* Overhead Converging Lever Arms */}
                <path
                  d="M320 80 L420 110 L440 220"
                  stroke={activeFrame.hex}
                  strokeWidth="20"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="transition-all duration-300"
                />

                {/* Pivot Joint Accents (Chrome / Metallic Red) */}
                <circle cx="320" cy="80" r="14" fill="#D32F2F" stroke="#ffffff" strokeWidth="2" />
                <circle cx="200" cy="240" r="10" fill="#94A3B8" />

                {/* Weight Horns & Olympic Plates */}
                <circle cx="440" cy="220" r="32" fill="#171717" stroke="#404040" strokeWidth="6" />
                <circle cx="440" cy="220" r="12" fill="#737373" />
                <rect x="420" y="214" width="40" height="12" rx="3" fill="#D32F2F" />

                {/* Seat Post / Adjustment Mechanism */}
                <rect x="235" y="230" width="22" height="70" rx="3" fill="#525252" />

                {/* Backrest Cushion (Dynamic Upholstery Color) */}
                <path
                  d="M 230 140 L 270 125 L 290 230 L 250 245 Z"
                  fill={activeUpholstery.hex}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  rx="6"
                  className="transition-all duration-300 filter drop-shadow"
                />
                {/* Backrest Stitching lines */}
                <line x1="245" y1="135" x2="265" y2="238" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                {/* Seat Cushion (Dynamic Upholstery Color) */}
                <path
                  d="M 220 260 L 300 245 L 310 275 L 230 290 Z"
                  fill={activeUpholstery.hex}
                  stroke="#ffffff"
                  strokeWidth="1.5"
                  className="transition-all duration-300 filter drop-shadow"
                />
                <line x1="230" y1="275" x2="295" y2="263" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 3" opacity="0.6" />

                {/* Ergonomic Knurled Handgrips */}
                <rect x="425" y="195" width="24" height="12" rx="4" fill="#D32F2F" />
                <rect x="430" y="200" width="14" height="2" fill="#ffffff" />

                {/* Brand Badge on Frame */}
                <rect x="248" y="170" width="24" height="8" rx="2" fill="#D32F2F" />
                <text x="250" y="176" fontSize="5" fill="#ffffff" fontWeight="bold">INTO</text>
              </svg>

              {/* Color Details Watermark overlay */}
              <div className="absolute bottom-3 left-3 bg-neutral-900/90 backdrop-blur-md px-3 py-1.5 rounded border border-neutral-700 text-xs flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: activeFrame.hex }} />
                  <span className="font-semibold text-neutral-200">{activeFrame.name}</span>
                </div>
                <span className="text-neutral-500">|</span>
                <div className="flex items-center gap-1.5">
                  <span className="w-3 h-3 rounded-full border border-white/40" style={{ backgroundColor: activeUpholstery.hex }} />
                  <span className="font-semibold text-neutral-200">{activeUpholstery.name}</span>
                </div>
              </div>
            </div>

            {/* Custom Branding Badges note */}
            <div className="mt-6 pt-4 border-t border-neutral-800 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-neutral-400">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-red-500 shrink-0" />
                <span>Laser-cut facility logo plate available</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-red-500 shrink-0" />
                <span>Precision headrest cushion custom embroidery</span>
              </div>
            </div>
          </div>

          {/* Right: Color Selection Palettes */}
          <div className="lg:col-span-5 space-y-6">
            {/* Frame Colors Section */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold uppercase text-white">
                    Frame Powder Coatings
                  </h3>
                  <div className="text-[11px] text-neutral-400">25 Electrostatic Finishes</div>
                </div>
                <div className="text-xs font-semibold text-red-400 flex items-center gap-1">
                  <span>Selected:</span>
                  <span className="text-white font-bold">{activeFrame.name}</span>
                </div>
              </div>

              {/* Grid of 25 frame colors */}
              <div className="grid grid-cols-5 gap-2.5 max-h-52 overflow-y-auto pr-1">
                {frameColors.map((color) => (
                  <button
                    key={color.id}
                    onClick={() => setActiveFrame(color)}
                    title={`${color.name} (${color.hex})`}
                    className={`h-9 rounded-md border transition-all flex items-center justify-center relative group ${
                      activeFrame.id === color.id
                        ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-neutral-900 border-white scale-105'
                        : 'border-neutral-700 hover:border-neutral-400 hover:scale-102'
                    }`}
                    style={{ backgroundColor: color.hex }}
                  >
                    {activeFrame.id === color.id && (
                      <Check className="w-4 h-4 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Upholstery Colors Section */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-base font-bold uppercase text-white">
                    Upholstery Leather Choices
                  </h3>
                  <div className="text-[11px] text-neutral-400">5 High-Density PU Finishes</div>
                </div>
                <div className="text-xs font-semibold text-red-400 flex items-center gap-1">
                  <span>Selected:</span>
                  <span className="text-white font-bold">{activeUpholstery.name}</span>
                </div>
              </div>

              <div className="grid grid-cols-5 gap-2.5">
                {upholsteryColors.map((uph) => (
                  <button
                    key={uph.id}
                    onClick={() => setActiveUpholstery(uph)}
                    title={`${uph.name} (${uph.hex})`}
                    className={`h-11 rounded-md border transition-all flex items-center justify-center relative ${
                      activeUpholstery.id === uph.id
                        ? 'ring-2 ring-red-500 ring-offset-2 ring-offset-neutral-900 border-white scale-105'
                        : 'border-neutral-700 hover:border-neutral-400'
                    }`}
                    style={{ backgroundColor: uph.hex }}
                  >
                    {activeUpholstery.id === uph.id && (
                      <Check className="w-4 h-4 text-white drop-shadow" />
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* CTA to quote with current custom scheme */}
            <button
              onClick={() => onRequestCustomQuote(activeFrame.name, activeUpholstery.name)}
              className="w-full py-4 bg-red-600 hover:bg-red-700 active:bg-red-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-xl transition-colors shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Request Quote With This Scheme</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
