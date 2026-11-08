import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Send,
  CheckCircle,
  AlertCircle,
  Clock,
  Headphones,
  ExternalLink
} from 'lucide-react';
import { CompanyInfo } from '../types';
import { addEnquiry } from '../utils/cmsStore';
import { cleanPhoneForTel } from '../utils/filterAndSearch';

interface ContactSectionProps {
  companyInfo: CompanyInfo;
  onRequestQuote: () => void;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ companyInfo, onRequestQuote }) => {
  const [activeTab, setActiveTab] = useState<'sales' | 'service'>('sales');

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    city: '',
    facilityType: 'Commercial Gym',
    message: '',
    serialNumber: '' // For service tab
  });

  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.name.trim() || !formData.email.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage('Please fill in all required fields.');
      setFormStatus('error');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setErrorMessage('Please provide a valid email address.');
      setFormStatus('error');
      return;
    }

    setFormStatus('submitting');

    try {
      addEnquiry({
        type: activeTab === 'sales' ? 'contact' : 'service',
        customerName: formData.name,
        email: formData.email,
        phone: formData.phone,
        city: formData.city || 'Not specified',
        facilityType: formData.facilityType,
        message: activeTab === 'service'
          ? `[Service Ticket - Serial: ${formData.serialNumber || 'N/A'}] ${formData.message}`
          : formData.message,
      });

      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        phone: '',
        city: '',
        facilityType: 'Commercial Gym',
        message: '',
        serialNumber: ''
      });
    } catch (err) {
      console.error(err);
      setErrorMessage('Failed to send enquiry. Please try calling our sales helpline.');
      setFormStatus('error');
    }
  };

  const mapAddressQuery = encodeURIComponent(
    '805 Supreme Headquarters, Mumbai-Pune-Highway, Baner, Pune, Maharashtra 411045'
  );

  return (
    <section id="contact" className="py-20 bg-neutral-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="max-w-3xl mb-16">
          <div className="text-xs font-bold uppercase tracking-widest text-red-500 mb-2">
            Corporate Headquarters & Nationwide Sales
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white uppercase">
            CONNECT WITH INTO WELLNESS
          </h2>
          <div className="w-16 h-1 bg-red-600 mt-4 mb-6" />
          <p className="text-base sm:text-lg text-neutral-300 leading-relaxed">
            Reach out to our regional sales directors, schedule a private factory tour in Chakan,
            or speak with our factory service engineers.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Official Contacts & Regional Grid */}
          <div className="lg:col-span-6 space-y-8">
            {/* Corporate Address Card */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-4">
              <div className="flex items-start gap-3">
                <div className="p-2.5 rounded-lg bg-red-950/80 border border-red-800/80 text-red-500 shrink-0">
                  <MapPin className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-display text-xl font-bold uppercase text-white">
                    Corporate Headquarters
                  </h3>
                  <div className="text-xs text-red-400 font-semibold uppercase mt-0.5">
                    {companyInfo.legalName}
                  </div>
                  <p className="text-sm text-neutral-300 mt-2 leading-relaxed">
                    {companyInfo.headOffice.line1},<br />
                    {companyInfo.headOffice.line2},<br />
                    {companyInfo.headOffice.area}, {companyInfo.headOffice.city} - {companyInfo.headOffice.pincode},<br />
                    {companyInfo.headOffice.state}, {companyInfo.headOffice.country}.
                  </p>

                  <a
                    href={`https://www.google.com/maps/search/?api=1&query=${mapAddressQuery}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 text-xs font-bold uppercase text-red-400 hover:text-red-300 mt-3 pt-3 border-t border-neutral-800"
                  >
                    <span>Open in Google Maps Navigation</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </div>

              {/* Manufacturing Complex Note */}
              <div className="pt-4 border-t border-neutral-800 text-xs text-neutral-400">
                <span className="text-neutral-200 font-bold">Factory:</span> {companyInfo.manufacturingPlant.name},{' '}
                {companyInfo.manufacturingPlant.location}.
              </div>
            </div>

            {/* Regional Sales Contacts Grid */}
            <div className="bg-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-8 space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
                <h3 className="font-display text-base font-bold uppercase text-white flex items-center gap-2">
                  <Phone className="w-4 h-4 text-red-500" />
                  <span>Regional Sales Helpdesks</span>
                </h3>
                <span className="text-[11px] text-neutral-400">Direct Click-to-Call</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                <a
                  href={`tel:${cleanPhoneForTel(companyInfo.contacts.salesWestSouth)}`}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-red-500 transition-colors block"
                >
                  <div className="text-neutral-400 font-medium">West & South India:</div>
                  <div className="text-sm font-bold text-white mt-0.5">{companyInfo.contacts.salesWestSouth}</div>
                </a>

                <a
                  href={`tel:${cleanPhoneForTel(companyInfo.contacts.salesEast)}`}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-red-500 transition-colors block"
                >
                  <div className="text-neutral-400 font-medium">East India:</div>
                  <div className="text-sm font-bold text-white mt-0.5">{companyInfo.contacts.salesEast}</div>
                </a>

                <a
                  href={`tel:${cleanPhoneForTel(companyInfo.contacts.salesNorth)}`}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-red-500 transition-colors block"
                >
                  <div className="text-neutral-400 font-medium">North India:</div>
                  <div className="text-sm font-bold text-white mt-0.5">{companyInfo.contacts.salesNorth}</div>
                </a>

                <a
                  href={`tel:${cleanPhoneForTel(companyInfo.contacts.salesExport)}`}
                  className="p-3 bg-neutral-900 border border-neutral-800 rounded-lg hover:border-red-500 transition-colors block"
                >
                  <div className="text-neutral-400 font-medium">International Exports:</div>
                  <div className="text-sm font-bold text-white mt-0.5">{companyInfo.contacts.salesExport}</div>
                </a>
              </div>

              {/* Service & Support numbers */}
              <div className="pt-4 border-t border-neutral-800 space-y-2">
                <div className="text-xs font-bold uppercase tracking-wider text-red-400 flex items-center gap-1.5">
                  <Headphones className="w-3.5 h-3.5" />
                  <span>Technical Service & Spare Parts</span>
                </div>
                <div className="flex flex-wrap gap-4 text-xs">
                  <a
                    href={`tel:${cleanPhoneForTel(companyInfo.contacts.service1)}`}
                    className="font-bold text-neutral-200 hover:text-white"
                  >
                    Primary: {companyInfo.contacts.service1}
                  </a>
                  <span className="text-neutral-600">|</span>
                  <a
                    href={`tel:${cleanPhoneForTel(companyInfo.contacts.service2)}`}
                    className="font-bold text-neutral-200 hover:text-white"
                  >
                    Alternate: {companyInfo.contacts.service2}
                  </a>
                </div>
              </div>

              {/* Email & WhatsApp Instant Link */}
              <div className="pt-4 border-t border-neutral-800 flex flex-wrap gap-4 text-xs">
                <a
                  href={`mailto:${companyInfo.contacts.email}`}
                  className="flex items-center gap-1.5 text-neutral-300 hover:text-white"
                >
                  <Mail className="w-3.5 h-3.5 text-red-500" />
                  <span>{companyInfo.contacts.email}</span>
                </a>

                <a
                  href={`https://wa.me/${companyInfo.contacts.whatsapp}?text=Hello%20Into%20Wellness,%20I%20am%20inquiring%20about%20commercial%20equipment.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-semibold"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Tabbed Form (Sales / Service) */}
          <div className="lg:col-span-6 bg-neutral-950 border border-neutral-800 rounded-xl p-6 sm:p-8">
            {/* Form Mode Selector */}
            <div className="flex items-center gap-2 pb-6 border-b border-neutral-800">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('sales');
                  setFormStatus('idle');
                }}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-center ${
                  activeTab === 'sales'
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                Equipment Sales & Quote Enquiry
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('service');
                  setFormStatus('idle');
                }}
                className={`flex-1 py-2.5 text-xs font-bold uppercase tracking-wider rounded-lg transition-colors text-center ${
                  activeTab === 'service'
                    ? 'bg-red-600 text-white shadow'
                    : 'bg-neutral-900 text-neutral-400 hover:text-white'
                }`}
              >
                Customer Service Ticket
              </button>
            </div>

            {/* Success state */}
            {formStatus === 'success' ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-950/80 text-emerald-400 border border-emerald-800 mx-auto flex items-center justify-center">
                  <CheckCircle className="w-8 h-8" />
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-white">
                  Enquiry Successfully Dispatched
                </h3>
                <p className="text-sm text-neutral-300 max-w-md mx-auto">
                  Thank you for reaching out to Into Wellness Private Limited. Your request has been assigned to our
                  regional desk. An executive will contact you within 4 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setFormStatus('idle')}
                  className="px-6 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-white text-xs font-bold uppercase tracking-wider rounded"
                >
                  Send Another Enquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="pt-6 space-y-4">
                {formStatus === 'error' && (
                  <div className="p-3 bg-red-950/80 border border-red-800 text-red-300 text-xs rounded flex items-center gap-2">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Vikramaditya Shinde"
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98220 12345"
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Work Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="vikram@gymname.com"
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      City / State
                    </label>
                    <input
                      type="text"
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="e.g. Pune / Mumbai"
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>

                {activeTab === 'sales' ? (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Facility Project Type
                    </label>
                    <select
                      value={formData.facilityType}
                      onChange={(e) => setFormData({ ...formData, facilityType: e.target.value })}
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white focus:outline-none focus:border-red-500"
                    >
                      <option value="Commercial Gym">Commercial Gym Facility</option>
                      <option value="Corporate Wellness">Corporate Campus Wellness</option>
                      <option value="Defence / Forces">Defence / Armed Forces Center</option>
                      <option value="Hotel / Resort">Hotel / Luxury Resort Fitness</option>
                      <option value="Residential Clubhouse">Residential Society Clubhouse</option>
                      <option value="Personal Studio">Boutique Personal Studio</option>
                    </select>
                  </div>
                ) : (
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                      Machine Serial / Series (Optional)
                    </label>
                    <input
                      type="text"
                      value={formData.serialNumber}
                      onChange={(e) => setFormData({ ...formData, serialNumber: e.target.value })}
                      placeholder="e.g. HS Pro Chest Press / Serial #2024-912"
                      className="w-full px-3.5 py-2.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-red-500"
                    />
                  </div>
                )}

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1.5">
                    {activeTab === 'sales' ? 'Message & Equipment Requirements *' : 'Describe Service Issue *'}
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={
                      activeTab === 'sales'
                        ? 'Describe your gym size (sq. ft.), expected opening timeline, or specific machine series of interest...'
                        : 'Describe the issue (cable tension, pulley, cushion replacement, routine maintenance)...'
                    }
                    className="w-full px-3.5 py-2.5 text-xs bg-neutral-900 border border-neutral-800 rounded-lg text-white placeholder:text-neutral-500 focus:outline-none focus:border-red-500 leading-relaxed"
                  />
                </div>

                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="w-full py-3.5 bg-red-600 hover:bg-red-700 active:bg-red-800 disabled:bg-neutral-800 text-white font-bold text-xs sm:text-sm uppercase tracking-wider rounded-lg transition-colors flex items-center justify-center gap-2 shadow"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {formStatus === 'submitting'
                      ? 'Dispatching Request...'
                      : activeTab === 'sales'
                      ? 'Submit Official Enquiry'
                      : 'File Service Ticket'}
                  </span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
