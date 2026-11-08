import React, { useState } from 'react';
import { Milestone } from '../types';
import { Calendar, Award, ChevronLeft, ChevronRight, Flag } from 'lucide-react';

interface HistoryTimelineProps {
  milestones: Milestone[];
}

export const HistoryTimeline: React.FC<HistoryTimelineProps> = ({ milestones }) => {
  const [selectedMilestone, setSelectedMilestone] = useState<Milestone>(milestones[milestones.length - 1]);

  return (
    <section id="timeline" className="py-20 bg-neutral-50 border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
            A Decade of Industrial Innovation
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 uppercase">
            COMPANY HISTORY & ACHIEVEMENTS
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 mb-6" />
          <p className="text-base sm:text-lg text-neutral-600 leading-relaxed">
            From the establishment of our Chakan factory in 2015 to our selection for the Stanford Seed Transformation
            Program in 2025, explore the milestone events that shaped Into Wellness into India’s premier fitness equipment manufacturer.
          </p>
        </div>

        {/* Milestone Horizontal Track Bar */}
        <div className="mb-10 bg-white p-4 sm:p-6 rounded-xl border border-neutral-200 shadow-sm overflow-x-auto">
          <div className="flex items-center gap-3 min-w-[700px] pb-2">
            {milestones.map((m) => {
              const isSelected = selectedMilestone.id === m.id;
              return (
                <button
                  key={m.id}
                  onClick={() => setSelectedMilestone(m)}
                  className={`px-4 py-3 rounded-lg text-left transition-all shrink-0 border ${
                    isSelected
                      ? 'bg-neutral-900 text-white border-neutral-900 shadow-md scale-102'
                      : 'bg-neutral-50 text-neutral-700 hover:bg-neutral-100 border-neutral-200'
                  }`}
                >
                  <div className={`text-[10px] font-bold uppercase tracking-wider ${isSelected ? 'text-red-400' : 'text-neutral-500'}`}>
                    {m.monthYear}
                  </div>
                  <div className="font-display text-xs font-bold uppercase line-clamp-1 max-w-[170px] mt-0.5">
                    {m.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Selected Milestone Feature Card */}
        {selectedMilestone && (
          <div className="bg-white rounded-xl border border-neutral-200 p-8 sm:p-10 shadow-sm mb-16 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-bl-full pointer-events-none -mr-8 -mt-8" />
            <div className="relative z-10 max-w-3xl space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-red-50 text-red-700 rounded text-xs font-bold uppercase tracking-wider">
                <Award className="w-3.5 h-3.5" />
                <span>{selectedMilestone.tag || 'Official Milestone'} · {selectedMilestone.monthYear}</span>
              </div>

              <h3 className="font-display text-2xl sm:text-3xl font-bold uppercase text-neutral-900">
                {selectedMilestone.title}
              </h3>

              <p className="text-base text-neutral-700 leading-relaxed">
                {selectedMilestone.description}
              </p>
            </div>
          </div>
        )}

        {/* Full Vertical Timeline Overview */}
        <div className="relative border-l-2 border-red-200 ml-4 sm:ml-8 space-y-10 pl-6 sm:pl-10">
          {milestones.map((m) => (
            <div
              key={m.id}
              className={`relative group cursor-pointer transition-all ${
                selectedMilestone.id === m.id ? 'opacity-100' : 'opacity-85 hover:opacity-100'
              }`}
              onClick={() => setSelectedMilestone(m)}
            >
              {/* Dot */}
              <div
                className={`absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full border-2 transition-transform ${
                  selectedMilestone.id === m.id
                    ? 'bg-red-600 border-white ring-4 ring-red-200 scale-125'
                    : 'bg-white border-neutral-400 group-hover:border-red-500'
                }`}
              />

              <div className="bg-white p-5 rounded-lg border border-neutral-200 hover:border-red-400/60 shadow-xs transition-colors">
                <div className="flex items-center justify-between gap-4 mb-1">
                  <span className="text-xs font-bold uppercase text-red-600 tracking-wider">
                    {m.monthYear}
                  </span>
                  {m.tag && (
                    <span className="text-[10px] font-semibold text-neutral-500 bg-neutral-100 px-2 py-0.5 rounded">
                      {m.tag}
                    </span>
                  )}
                </div>
                <h4 className="font-display text-base sm:text-lg font-bold uppercase text-neutral-900">
                  {m.title}
                </h4>
                <p className="text-xs sm:text-sm text-neutral-600 mt-1 leading-relaxed">
                  {m.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
