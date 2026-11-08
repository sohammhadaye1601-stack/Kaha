import React from 'react';
import { CompanyInfo } from '../types';
import { ShieldCheck, Cpu, Flame, Check, Quote } from 'lucide-react';

interface AboutSectionProps {
  companyInfo: CompanyInfo;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ companyInfo }) => {
  return (
    <section id="about" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
            Company Vision & Industrial Heritage
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 uppercase">
            BUILDING THE FUTURE OF FITNESS.
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 mb-6" />
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            Founded with the conviction that Indian engineering can lead the international fitness industry,
            Into Wellness Private Limited manufactures world-class commercial fitness equipment at our advanced
            50,000+ sq. ft. plant in Chakan, Pune. In 2016, we formed a historic technical joint venture with
            Realleader USA, bringing authentic American biomechanics to state-of-the-art domestic manufacturing.
          </p>
        </div>

        {/* 2-Column Split: Manufacturing & Realleader USA Partnership */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch mb-20">
          <div className="lg:col-span-7 flex flex-col justify-between space-y-6">
            <div className="bg-neutral-50 border border-neutral-200 p-8 rounded-lg space-y-6">
              <h3 className="font-display text-2xl font-bold text-neutral-900 uppercase tracking-tight flex items-center gap-3">
                <Cpu className="w-6 h-6 text-red-600" />
                <span>The Realleader USA Technical Alliance</span>
              </h3>
              <p className="text-neutral-700 leading-relaxed text-sm sm:text-base">
                Our collaborative framework with Realleader USA incorporates decades of biomechanical research,
                converging/diverging motion arc patents, and rigorous high-load stress testing. By fusing American
                ergonomics with Indian manufacturing agility, Into Wellness delivers equipment comparable to the
                world’s top tier at unmatched investment value.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-red-100 text-red-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-neutral-900">Laser-Cut 3D Tubing</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Robotic CNC laser cutting guarantees 0.1mm dimensional tolerance across all joints.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-red-100 text-red-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-neutral-900">Natural Motion Curves</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Iso-lateral converging and diverging pivots preserve joint health under peak load.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-red-100 text-red-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-neutral-900">Dual Electrostatic Coating</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Thermo-cured epoxy powder coating ensures superior resistance to sweat and abrasion.
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="p-1 rounded bg-red-100 text-red-700 shrink-0 mt-0.5">
                    <Check className="w-3.5 h-3.5" />
                  </div>
                  <div>
                    <h4 className="text-xs font-bold uppercase text-neutral-900">2000 kg Cable Rating</h4>
                    <p className="text-xs text-neutral-600 mt-0.5">
                      Aviation-grade lubricated internal steel wire with silent nylon sheathing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick trust metrics */}
            <div className="grid grid-cols-3 gap-4">
              <div className="p-4 bg-neutral-100 border border-neutral-200 rounded text-center">
                <div className="font-display text-2xl font-bold text-neutral-900">50,000+</div>
                <div className="text-[11px] font-semibold text-neutral-600 uppercase mt-1">Sq. Ft. Factory</div>
              </div>
              <div className="p-4 bg-neutral-100 border border-neutral-200 rounded text-center">
                <div className="font-display text-2xl font-bold text-neutral-900">ZED Silver</div>
                <div className="text-[11px] font-semibold text-neutral-600 uppercase mt-1">Govt. Certified</div>
              </div>
              <div className="p-4 bg-neutral-100 border border-neutral-200 rounded text-center">
                <div className="font-display text-2xl font-bold text-neutral-900">Stanford Seed</div>
                <div className="text-[11px] font-semibold text-neutral-600 uppercase mt-1">Class of 2026</div>
              </div>
            </div>
          </div>

          {/* Right Image: Manufacturing facility */}
          <div className="lg:col-span-5 relative rounded-lg overflow-hidden border border-neutral-200 shadow-sm min-h-[360px] flex flex-col justify-end">
            <img
              src="/src/assets/images/manufacturing_facility_1794110545984.jpg"
              alt="Into Wellness Chakan Manufacturing Facility Pune"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/90 via-neutral-950/40 to-transparent" />
            <div className="relative z-10 p-6 text-white space-y-2">
              <div className="text-xs font-bold uppercase tracking-wider text-red-400">
                Chakan Industrial Hub, Pune
              </div>
              <h4 className="font-display text-xl font-bold text-white uppercase">
                Robotic Precision & Biomechanical Testing Facility
              </h4>
              <p className="text-xs text-neutral-300">
                Equipped with automated welding cells, automated tube bending, and computer-controlled load simulation.
              </p>
            </div>
          </div>
        </div>

        {/* Company Leadership Section: MD Ritesh Mahindrakar */}
        <div className="bg-neutral-900 text-white rounded-xl overflow-hidden border border-neutral-800 p-8 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-4 text-center lg:text-left space-y-4">
              <div className="inline-block relative">
                <div className="w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-neutral-800 border-2 border-red-600 mx-auto lg:mx-0 overflow-hidden flex items-center justify-center text-4xl font-display font-bold text-neutral-300">
                  RM
                </div>
                <div className="absolute bottom-1 right-1 bg-red-600 text-white p-1.5 rounded-full shadow">
                  <ShieldCheck className="w-4 h-4" />
                </div>
              </div>
              <div>
                <h3 className="font-display text-2xl font-bold uppercase tracking-tight text-white">
                  {companyInfo.leadership.name}
                </h3>
                <div className="text-xs font-bold uppercase tracking-widest text-red-500 mt-1">
                  {companyInfo.leadership.title}
                </div>
                <div className="text-xs text-neutral-400 mt-1">Into Wellness Private Limited</div>
              </div>
            </div>

            <div className="lg:col-span-8 space-y-6">
              <div className="relative pl-6 border-l-2 border-red-600">
                <Quote className="w-8 h-8 text-red-500/30 absolute -top-3 -left-3" />
                <p className="text-base sm:text-lg text-neutral-200 italic leading-relaxed">
                  "{companyInfo.leadership.quote}"
                </p>
              </div>

              <div className="space-y-4 text-sm text-neutral-300 leading-relaxed">
                <p>{companyInfo.leadership.roleBio}</p>
                <p className="text-xs text-neutral-400 border-t border-neutral-800 pt-4">
                  {companyInfo.leadership.partnershipNote}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
