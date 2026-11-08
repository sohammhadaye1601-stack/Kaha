import { CMSData, Enquiry } from '../types';
import { initialCMSData } from '../data/initialData';

const STORAGE_KEY = 'INTO_WELLNESS_CMS_DATA_V1';
const EVENT_NAME = 'into_wellness_cms_updated';

export const loadCMSData = (): CMSData => {
  if (typeof window === 'undefined') {
    return initialCMSData;
  }
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCMSData));
      return initialCMSData;
    }
    const parsed = JSON.parse(raw);
    // Deep merge safeguard
    return {
      ...initialCMSData,
      ...parsed,
      homepage: { ...initialCMSData.homepage, ...(parsed.homepage || {}) },
      companyInfo: {
        ...initialCMSData.companyInfo,
        ...(parsed.companyInfo || {}),
        contacts: { ...initialCMSData.companyInfo.contacts, ...(parsed.companyInfo?.contacts || {}) },
        headOffice: { ...initialCMSData.companyInfo.headOffice, ...(parsed.companyInfo?.headOffice || {}) },
        leadership: { ...initialCMSData.companyInfo.leadership, ...(parsed.companyInfo?.leadership || {}) },
      },
      seo: { ...initialCMSData.seo, ...(parsed.seo || {}) },
      products: Array.isArray(parsed.products) && parsed.products.length > 0 ? parsed.products : initialCMSData.products,
      seriesList: Array.isArray(parsed.seriesList) && parsed.seriesList.length > 0 ? parsed.seriesList : initialCMSData.seriesList,
      installations: Array.isArray(parsed.installations) && parsed.installations.length > 0 ? parsed.installations : initialCMSData.installations,
      milestones: Array.isArray(parsed.milestones) && parsed.milestones.length > 0 ? parsed.milestones : initialCMSData.milestones,
      blogs: Array.isArray(parsed.blogs) && parsed.blogs.length > 0 ? parsed.blogs : initialCMSData.blogs,
      colors: Array.isArray(parsed.colors) && parsed.colors.length > 0 ? parsed.colors : initialCMSData.colors,
      enquiries: Array.isArray(parsed.enquiries) ? parsed.enquiries : initialCMSData.enquiries,
    };
  } catch (err) {
    console.error('Failed to parse CMS data from localStorage:', err);
    return initialCMSData;
  }
};

export const saveCMSData = (data: CMSData): void => {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: data }));
  } catch (err) {
    console.error('Failed to save CMS data to localStorage:', err);
  }
};

export const resetCMSData = (): CMSData => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(initialCMSData));
    window.dispatchEvent(new CustomEvent(EVENT_NAME, { detail: initialCMSData }));
  }
  return initialCMSData;
};

export const addEnquiry = (enquiryData: Omit<Enquiry, 'id' | 'createdAt' | 'status'>): Enquiry => {
  const current = loadCMSData();
  const newEnquiry: Enquiry = {
    ...enquiryData,
    id: 'enq-' + Date.now().toString(36) + '-' + Math.random().toString(36).substring(2, 6),
    status: 'New',
    createdAt: new Date().toISOString()
  };
  const updatedEnquiries = [newEnquiry, ...current.enquiries];
  saveCMSData({
    ...current,
    enquiries: updatedEnquiries
  });
  return newEnquiry;
};

export const onCMSUpdate = (callback: (data: CMSData) => void): (() => void) => {
  if (typeof window === 'undefined') return () => {};
  const handler = (e: Event) => {
    const custom = e as CustomEvent<CMSData>;
    if (custom.detail) {
      callback(custom.detail);
    } else {
      callback(loadCMSData());
    }
  };
  window.addEventListener(EVENT_NAME, handler);
  window.addEventListener('storage', handler);
  return () => {
    window.removeEventListener(EVENT_NAME, handler);
    window.removeEventListener('storage', handler);
  };
};
