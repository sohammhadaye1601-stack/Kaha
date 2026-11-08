export type ProductCategory = 'strength' | 'cardio' | 'functional' | 'benches-racks' | 'accessories';

export interface ProductSpecs {
  dimensions?: string;
  weight?: string;
  steelGauge?: string;
  weightStack?: string;
  pulleyRatio?: string;
  cableCapacity?: string;
  upholsteryGrade?: string;
  powderCoating?: string;
  maxUserWeight?: string;
  flywheelWeight?: string;
  resistanceLevels?: string;
  driveSystem?: string;
}

export interface Product {
  id: string;
  name: string;
  seriesId: string;
  seriesName: string;
  category: ProductCategory;
  description: string;
  imageUrl: string;
  specifications: ProductSpecs;
  features: string[];
  customOptions: string[];
  published: boolean;
  isFeatured?: boolean;
}

export interface ProductSeries {
  id: string;
  name: string;
  category: ProductCategory;
  tagline: string;
  description: string;
  idealFor: string;
}

export interface InstallationProject {
  id: string;
  name: string;
  location: string;
  category: 'Commercial Gym' | 'Corporate' | 'Defence / Forces' | 'Hotel / Resort';
  completionDate: string;
  description: string;
  imageUrl: string;
  equipmentCount: number;
  highlightSeries: string[];
  published: boolean;
}

export interface Milestone {
  id: string;
  monthYear: string;
  dateSort: string;
  title: string;
  description: string;
  tag?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  excerpt: string;
  content: string[];
  imageUrl: string;
  published: boolean;
}

export interface CustomizationColor {
  id: string;
  name: string;
  hex: string;
  type: 'frame' | 'upholstery';
  description?: string;
}

export interface CompanyContacts {
  salesWestSouth: string;
  salesEast: string;
  salesNorth: string;
  salesExport: string;
  service1: string;
  service2: string;
  email: string;
  whatsapp: string;
}

export interface CompanyInfo {
  legalName: string;
  brandName: string;
  headOffice: {
    line1: string;
    line2: string;
    area: string;
    city: string;
    pincode: string;
    state: string;
    country: string;
  };
  manufacturingPlant: {
    name: string;
    location: string;
    city: string;
    areaSqFt: string;
  };
  contacts: CompanyContacts;
  leadership: {
    name: string;
    title: string;
    roleBio: string;
    quote: string;
    partnershipNote: string;
  };
}

export type EnquiryStatus = 'New' | 'In Review' | 'Contacted' | 'Closed';

export interface Enquiry {
  id: string;
  type: 'quote' | 'contact' | 'service';
  customerName: string;
  email: string;
  phone: string;
  city: string;
  facilityType?: string;
  seriesInterest?: string[];
  machineCount?: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
}

export interface HomepageSettings {
  heroHeading: string;
  heroSubtext: string;
  heroImageUrl: string;
  ctaPrimaryText: string;
  ctaSecondaryText: string;
  stats: {
    label: string;
    value: string;
    description: string;
  }[];
  sectionVisibility: {
    about: boolean;
    products: boolean;
    whyUs: boolean;
    customization: boolean;
    installations: boolean;
    timeline: boolean;
    blogs: boolean;
    contact: boolean;
  };
}

export interface SEOSettings {
  metaTitle: string;
  metaDescription: string;
  keywords: string;
  canonicalUrl: string;
  ogImageUrl: string;
}

export interface CMSData {
  homepage: HomepageSettings;
  products: Product[];
  seriesList: ProductSeries[];
  installations: InstallationProject[];
  milestones: Milestone[];
  blogs: BlogPost[];
  colors: CustomizationColor[];
  companyInfo: CompanyInfo;
  enquiries: Enquiry[];
  seo: SEOSettings;
}
