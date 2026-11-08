import React, { useState } from 'react';
import { X, CheckCircle, FileText, Send, AlertCircle, ShieldCheck } from 'lucide-react';
import { Product, ProductSeries } from '../types';
import { addEnquiry } from '../utils/cmsStore';

interface QuoteModalProps {
  isOpen: boolean;
  onClose: () => void;
  preselectedProduct?: Product | null;
  seriesList: ProductSeries[];
  customFrameColor?: string;
  customUpholsteryColor?: string;
}

export const QuoteModal: React.FC<QuoteModalProps> = ({
  isOpen,
  onClose,
  preselectedProduct,
  seriesList,
  customFrameColor,
  customUpholsteryColor,
}) => {
  if (!isOpen) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    facilityType: 'Commercial Gym',
    machineCount: '20 - 35 Machines',
    selectedSeries: preselectedProduct ? [preselectedProduct.seriesName] : ['HS Pro Series'],
    message: preselectedProduct
      ? `Requesting detailed formal quotation for ${preselectedProduct.name} (${preselectedProduct.seriesName}).`
      : customFrameColor
      ? `Interested in turnkey gym outfitting with custom color scheme: Frame [${customFrameColor}], Upholstery [${customUpholsteryColor}].`
      : 'Interested in outfitting our new commercial facility.'
  });

  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const toggleSeries = (name: string) => {
    setFormData((prev) => {
      const exists = prev.selectedSeries.includes(name);
      return {
        ...prev,
        selectedSeries: exists
          ? prev.selectedSeries.filter((s) => s !== name)
          : [...prev.selectedSeries, name]
      };
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim()) {
      setErrorMessage('Please fill in all mandatory contact fields.');
      setStatus('error');
      return;
    }

    setStatus('submitting');

    try {
      addEnquiry({
        type: 'quote',
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city || 'India',
        facilityType: formData.facilityType,
        seriesInterest: formData.selectedSeries,
        machineCount: formData.machineCount,
        message: formData.message,
      });

      setStatus('success');
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to save quote request. Please try again.');
      setStatus('error');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-neutral-950/80 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 animate-in fade-in duration-200">
      <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[92vh] overflow-y-auto border border-neutral-200 relative">
        {/* Top Header */}
        <div className="sticky top-0 z-10 bg-white/95 backdrop-blur-md px-6 py-4 border-b border-neutral-200 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded bg-red-600 flex items-center justify-center text-white font-bold text-xs">
              IW
            </div>
            <div>
              <h3 className="font-display text-base font-bold uppercase text-neutral-900 leading-none">
                Request a Commercial Quote
              </h3>
              <p className="text-[11px] text-neutral-500 mt-0.5">
                Official Factory Quotation & 2D/3D Biomechanical Layout
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close quote modal"
            className="p-1.5 text-neutral-400 hover:text-neutral-700 hover:bg-neutral-100 rounded-full"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          {status === 'success' ? (
            <div className="py-10 text-center space-y-4">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 mx-auto flex items-center justify-center">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="font-display text-2xl font-bold uppercase text-neutral-900">
                Quotation Request Received
              </h3>
              <p className="text-sm text-neutral-600 max-w-md mx-auto leading-relaxed">
                Thank you for considering Into Wellness. Our commercial sales engineering team will review your project
                specifications and deliver an itemized PDF quote and CAD layout plan within 24 business hours.
              </p>
              <div className="pt-4">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-6 py-2.5 bg-neutral-900 text-white text-xs font-bold uppercase tracking-wider rounded"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {status === 'error' && (
                <div className="p-3 bg-red-50 border border-red-200 text-red-700 text-xs rounded flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Preselected product or custom scheme notice */}
              {(preselectedProduct || customFrameColor) && (
                <div className="p-3 bg-neutral-50 border border-neutral-200 rounded-lg text-xs text-neutral-700 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FileText className="w-4 h-4 text-red-600" />
                    <span>
                      {preselectedProduct
                        ? `Configuring Quote for: ${preselectedProduct.name}`
                        : `Selected Colors: Frame (${customFrameColor}) / Upholstery (${customUpholsteryColor})`}
                    </span>
                  </div>
                </div>
              )}

              {/* Contact Information */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Vikramaditya Shinde"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Direct Phone Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="+91 98220 12345"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-neutral-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Official Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="vikram@titanfitness.co.in"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-neutral-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    City / Facility Location
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    placeholder="e.g. Pune, Maharashtra"
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-neutral-900"
                  />
                </div>
              </div>

              {/* Facility & Volume Selection */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Facility Category
                  </label>
                  <select
                    value={formData.facilityType}
                    onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-neutral-900"
                  >
                    <option value="Commercial Gym">Commercial Gym</option>
                    <option value="Corporate Wellness">Corporate Campus Wellness</option>
                    <option value="Hotel / Resort">Hotel / Luxury Resort</option>
                    <option value="Defence / Forces">Defence / Armed Forces</option>
                    <option value="Residential Society">Residential Society Clubhouse</option>
                    <option value="Private Home Gym">Executive Villa / Private Gym</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                    Estimated Machine Count
                  </label>
                  <select
                    value={formData.machineCount}
                    onChange={(e) => setFormData({ ...formData, machineCount: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-neutral-900"
                  >
                    <option value="1 - 10 Machines">1 - 10 Machines (Selective Upgrade)</option>
                    <option value="10 - 20 Machines">10 - 20 Machines (Studio Setup)</option>
                    <option value="20 - 35 Machines">20 - 35 Machines (Medium Gym)</option>
                    <option value="35 - 50+ Machines">35 - 50+ Machines (Full Commercial Club)</option>
                  </select>
                </div>
              </div>

              {/* Equipment Series Multi-Select */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1.5">
                  Select Series of Interest
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {seriesList.map((series) => {
                    const isChecked = formData.selectedSeries.includes(series.name);
                    return (
                      <button
                        type="button"
                        key={series.id}
                        onClick={() => toggleSeries(series.name)}
                        className={`px-2.5 py-1.5 text-xs rounded border text-left transition-colors flex items-center justify-between ${
                          isChecked
                            ? 'bg-neutral-900 text-white border-neutral-900 font-semibold'
                            : 'bg-neutral-50 text-neutral-700 border-neutral-200 hover:bg-neutral-100'
                        }`}
                      >
                        <span className="truncate">{series.name}</span>
                        {isChecked && <span className="text-red-400 font-bold ml-1">✓</span>}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Message */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 mb-1">
                  Specific Requirements & Questions
                </label>
                <textarea
                  rows={3}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Include floor space area, expected launch date, or financing preference..."
                  className="w-full px-3 py-2 text-xs bg-neutral-50 border border-neutral-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-red-600 text-neutral-900 leading-relaxed"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={status === 'submitting'}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-neutral-400 text-white text-xs sm:text-sm font-bold uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-4 h-4" />
                  <span>{status === 'submitting' ? 'Submitting Request...' : 'Send Quotation Request'}</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
