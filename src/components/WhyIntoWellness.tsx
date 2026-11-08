import React from 'react';
import { Microscope, Cog, Globe2, ShieldCheck, Hammer, Wrench, ArrowRight } from 'lucide-react';

interface WhyIntoWellnessProps {
  onRequestQuote: () => void;
}

export const WhyIntoWellness: React.FC<WhyIntoWellnessProps> = ({ onRequestQuote }) => {
  const pillars = [
    {
      icon: Microscope,
      title: 'Research & Development',
      subtitle: 'Biomechanical Engineering Lab',
      description:
        'Our in-house Pune R&D center performs multi-axis kinetic force modeling and finite element analysis (FEA). We map natural musculoskeletal motion arcs to prevent joint impingement and maximize target muscle hypertrophy.',
      points: ['Computer-aided 3D CAD modeling', 'Iso-lateral force curve analysis', 'Ergonomic multi-grip geometry']
    },
    {
      icon: Cog,
      title: 'Manufacturing Process',
      subtitle: 'Chakan Precision Complex',
      description:
        'Housed in a 50,000+ sq. ft. precision facility in Chakan, Pune, our production incorporates CNC 3D laser tube cutting, automated robotic welding arms, and automated multi-stage shot blasting.',
      points: ['0.1mm robotic laser precision', 'Robotic cell seam welding', 'Dual-stage electrostatic coating']
    },
    {
      icon: Globe2,
      title: 'Realleader USA',
      subtitle: 'International Technical Collaboration',
      description:
        'Our 2016 technical joint venture with Realleader USA pairs global fitness equipment patents, converging biomechanics, and international durability benchmarks with domestic Indian manufacturing prowess.',
      points: ['Patented converging motion arcs', 'International fitness expo testing', 'Global commercial specifications']
    },
    {
      icon: ShieldCheck,
      title: 'Quality Promise',
      subtitle: '100% Load & Stress Testing',
      description:
        'Every structural component undergoes 500,000-cycle fatigue load testing under extreme tension. We are proud recipients of the Government of India ZED Silver (Zero Defect, Zero Effect) certification.',
      points: ['500,000 cycle fatigue testing', 'ZED Silver certified plant', 'Zero structural weld failure guarantee']
    },
    {
      icon: Hammer,
      title: 'Product Durability',
      subtitle: '11-Gauge Structural Steel',
      description:
        'Built with heavy 3.0mm to 3.2mm structural steel tubing, 2000 kg tensile proof-tested aircraft aviation cables, and high-density anti-tear polyurethane molded cushions that never sag under commercial abuse.',
      points: ['3.0mm (11-Gauge) steel tubing', '2000 kg proof aviation cables', 'High-density molded PU cushions']
    },
    {
      icon: Wrench,
      title: 'After-Sales Service',
      subtitle: 'Pan-India 48-Hour SLA Support',
      description:
        'With factory-trained technical service engineers stationed across 20+ metro hubs and guaranteed 10-year spare parts inventory in Pune, your facility downtime is minimized to under 48 hours.',
      points: ['20+ Metro service hubs', 'Guaranteed domestic spare parts', 'Dedicated 48-hour SLA response']
    }
  ];

  return (
    <section id="why-us" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
            Engineering & Manufacturing Excellence
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 uppercase">
            WHY INTO WELLNESS
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 mb-6" />
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Commercial fitness equipment is an industrial investment. We build machinery that thrives through
            decades of continuous commercial high-volume gym abuse without biomechanical degradation.
          </p>
        </div>

        {/* 6-Pillar Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="bg-neutral-50 rounded-xl p-8 border border-neutral-200 hover:border-red-500/50 hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 rounded-lg bg-red-600 text-white flex items-center justify-center shadow-md shadow-red-600/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="font-display text-xl font-bold text-neutral-300">
                      0{idx + 1}
                    </span>
                  </div>

                  <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">
                    {pillar.subtitle}
                  </div>
                  <h3 className="font-display text-xl font-bold uppercase text-neutral-900 mb-3">
                    {pillar.title}
                  </h3>

                  <p className="text-sm text-neutral-600 leading-relaxed mb-6">
                    {pillar.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-neutral-200/80 space-y-2">
                  {pillar.points.map((pt, pIdx) => (
                    <div key={pIdx} className="flex items-center gap-2 text-xs font-medium text-neutral-700">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-600 shrink-0" />
                      <span>{pt}</span>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Banner */}
        <div className="mt-16 bg-neutral-900 text-white rounded-xl p-8 sm:p-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center lg:text-left">
            <h3 className="font-display text-2xl font-bold uppercase text-white">
              Ready to Upgrade Your Commercial Fitness Facility?
            </h3>
            <p className="text-sm text-neutral-400 max-w-2xl">
              Consult with our factory biomechanics specialists for turnkey layout 2D/3D design and quotation.
            </p>
          </div>
          <button
            onClick={onRequestQuote}
            className="px-8 py-3.5 bg-red-600 hover:bg-red-700 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded transition-colors whitespace-nowrap shadow flex items-center gap-2 shrink-0"
          >
            <span>Request Facility Consultation</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  );
};
