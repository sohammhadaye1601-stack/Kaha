import React, { useState } from 'react';
import { MapPin, Dumbbell, Calendar, ArrowRight, Building, CheckCircle } from 'lucide-react';
import { InstallationProject } from '../types';
import { filterInstallations } from '../utils/filterAndSearch';

interface InstallationsGalleryProps {
  installations: InstallationProject[];
  onRequestQuote: () => void;
}

export const InstallationsGallery: React.FC<InstallationsGalleryProps> = ({
  installations,
  onRequestQuote,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [activeProject, setActiveProject] = useState<InstallationProject | null>(null);

  const categories = [
    { id: 'all', label: 'All Installations' },
    { id: 'Commercial Gym', label: 'Commercial Gyms' },
    { id: 'Defence / Forces', label: 'Defence & Armed Forces' },
    { id: 'Corporate', label: 'Corporate Wellness' },
  ];

  const filtered = filterInstallations(installations, selectedCategory);

  return (
    <section id="installations" className="py-20 bg-white border-b border-neutral-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="text-xs font-bold uppercase tracking-widest text-red-600 mb-2">
              National Project Portfolio
            </div>
            <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-neutral-900 uppercase">
              COMMERCIAL GYM INSTALLATIONS
            </h2>
            <div className="w-16 h-1 bg-red-600 mt-4" />
          </div>

          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors whitespace-nowrap shrink-0 ${
                  selectedCategory === cat.id
                    ? 'bg-neutral-900 text-white shadow-sm'
                    : 'bg-neutral-100 text-neutral-700 hover:bg-neutral-200'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Installations Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((project) => (
            <div
              key={project.id}
              className="bg-neutral-50 rounded-xl border border-neutral-200 overflow-hidden flex flex-col justify-between hover:shadow-lg hover:border-neutral-300 transition-all duration-200 group"
            >
              <div>
                {/* Photo container */}
                <div
                  onClick={() => setActiveProject(project)}
                  className="relative aspect-16/10 bg-neutral-900 overflow-hidden cursor-pointer"
                >
                  <img
                    src={project.imageUrl}
                    alt={project.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 opacity-90 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-neutral-950/80 via-transparent to-transparent" />
                  <div className="absolute top-3 left-3 bg-red-600 text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow">
                    {project.category}
                  </div>
                  <div className="absolute bottom-3 left-3 flex items-center gap-1 text-white text-xs font-medium">
                    <MapPin className="w-3.5 h-3.5 text-red-400" />
                    <span>{project.location}</span>
                  </div>
                </div>

                {/* Body */}
                <div className="p-6 space-y-3">
                  <h3
                    onClick={() => setActiveProject(project)}
                    className="font-display text-xl font-bold uppercase text-neutral-900 leading-snug group-hover:text-red-600 transition-colors cursor-pointer"
                  >
                    {project.name}
                  </h3>

                  <p className="text-xs text-neutral-600 leading-relaxed line-clamp-3">
                    {project.description}
                  </p>

                  {/* Highlights */}
                  <div className="pt-2 border-t border-neutral-200/80 space-y-1.5">
                    <div className="text-[11px] font-bold text-neutral-500 uppercase">
                      Equipped Series:
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {project.highlightSeries.map((series, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[11px] font-medium text-neutral-800 bg-neutral-200/60 px-2 py-0.5 rounded"
                        >
                          {series}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Footer */}
              <div className="p-6 pt-0 flex items-center justify-between border-t border-neutral-100 mt-4">
                <div className="flex items-center gap-1.5 text-xs text-neutral-500 font-semibold">
                  <Dumbbell className="w-3.5 h-3.5 text-red-600" />
                  <span>{project.equipmentCount} Commercial Stations</span>
                </div>

                <button
                  onClick={() => setActiveProject(project)}
                  className="text-xs font-bold uppercase text-red-600 hover:text-red-700 flex items-center gap-1 group-hover:translate-x-0.5 transition-transform"
                >
                  <span>Details</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Project Detail Modal */}
        {activeProject && (
          <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full overflow-hidden border border-neutral-200 relative animate-in fade-in zoom-in-95 duration-150">
              <div className="relative aspect-16/9 bg-neutral-950">
                <img
                  src={activeProject.imageUrl}
                  alt={activeProject.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={() => setActiveProject(null)}
                  className="absolute top-3 right-3 bg-neutral-900/80 text-white p-2 rounded-full hover:bg-neutral-900"
                >
                  ✕
                </button>
                <div className="absolute bottom-3 left-4 bg-red-600 text-white text-xs font-bold uppercase px-2.5 py-1 rounded">
                  {activeProject.category}
                </div>
              </div>

              <div className="p-6 sm:p-8 space-y-4">
                <div>
                  <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                    {activeProject.name}
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-neutral-500 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-red-600" />
                    <span>{activeProject.location}</span>
                    <span aria-hidden="true">·</span>
                    <span>Installed: {activeProject.completionDate}</span>
                  </div>
                </div>

                <p className="text-sm text-neutral-700 leading-relaxed">
                  {activeProject.description}
                </p>

                <div className="bg-neutral-50 p-4 rounded-lg border border-neutral-200 space-y-2">
                  <div className="text-xs font-bold uppercase text-neutral-800">
                    Installed Equipment Breakdown ({activeProject.equipmentCount} Stations)
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {activeProject.highlightSeries.map((s, idx) => (
                      <span key={idx} className="bg-white border border-neutral-200 text-neutral-700 px-2.5 py-1 rounded text-xs font-medium">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-end gap-3 pt-3 border-t border-neutral-100">
                  <button
                    onClick={() => setActiveProject(null)}
                    className="px-4 py-2 text-xs font-bold uppercase text-neutral-600 hover:text-neutral-900"
                  >
                    Close
                  </button>
                  <button
                    onClick={() => {
                      setActiveProject(null);
                      onRequestQuote();
                    }}
                    className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white text-xs font-bold uppercase rounded shadow"
                  >
                    Request Similar Installation
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
