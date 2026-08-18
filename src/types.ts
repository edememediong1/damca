export type ViewMode = 'split' | 'portfolio' | 'academy' | 'case-study' | 'admin';

export type ProjectCategory = 
  | 'All'
  | 'Short-form'
  | 'Documentary'
  | 'Commercial'
  | 'Sports'
  | 'Talking Head'
  | 'Trailers'
  | 'Podcast'
  | 'Church'
  | 'YouTube';

export interface BeforeAfterMedia {
  beforeLabel: string;
  afterLabel: string;
  beforeImage: string;
  afterImage: string;
  description: string;
}

export interface CaseStudy {
  heroVideoUrl: string;
  overview: string;
  challenge: string;
  creativeProcess: string;
  editingWorkflow: string[];
  motionGraphicsSummary: string;
  colorGradingSummary: string;
  audioDesignSummary: string;
  beforeAfter: BeforeAfterMedia;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
    company: string;
    avatarUrl: string;
  };
  results: string[];
}

export interface Project {
  id: string;
  title: string;
  client: string;
  category: ProjectCategory;
  shortDescription: string;
  duration: string;
  softwareUsed: string[];
  thumbnail: string;
  videoPreviewUrl: string;
  heroVideoUrl: string;
  year: string;
  featured: boolean;
  caseStudy: CaseStudy;
}

export interface IndustryItem {
  id: string;
  name: string;
  description: string;
  iconName: string;
  tag: string;
  projectCount: string;
}

export interface ServiceItem {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
  icon: string;
}

export interface PricingPackage {
  id: string;
  name: string;
  subtitle: string;
  price: string;
  turnaroundTime: string;
  revisions: string;
  deliverables: string[];
  features: string[];
  isPopular?: boolean;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  company: string;
  avatar: string;
  quote: string;
  projectOrCourse: string;
  type: 'portfolio' | 'student';
  rating: number;
}

export interface AcademyProgram {
  id: string;
  number: string;
  title: string;
  duration: string;
  level: string;
  description: string;
  skills: string[];
  price: string;
  isPopular?: boolean;
}

export interface RoadmapWeek {
  weekNumber: string;
  title: string;
  description: string;
  topics: string[];
  tool: string;
  deliverable?: string;
  resourceLink?: string;
}

export interface AcademyFeeOption {
  id: string;
  title: string;
  price: string;
  originalPrice?: string;
  installmentNote: string;
  features: string[];
  isPopular?: boolean;
  badge?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

export type ContactStatus = 'new' | 'contacted' | 'in-discussion' | 'booked' | 'archived';

export interface ContactInquiry {
  id: string;
  name: string;
  email: string;
  company: string;
  budget: string;
  projectType: string;
  description: string;
  date: string;
  status: ContactStatus;
  notes?: string;
  phone?: string;
}

export type EnrollmentStatus = 'applied' | 'onboarding' | 'active' | 'graduated' | 'dropped';
export type PaymentStatus = 'paid' | 'installment' | 'pending' | 'scholarship';

export interface StudentRegistration {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  programId: string;
  programTitle: string;
  paymentPreference: PaymentStatus;
  enrollmentStatus: EnrollmentStatus;
  registeredDate: string;
  progressPercentage: number;
  assignedMentor?: string;
  showreelUrl?: string;
  notes?: string;
  tuitionAmount: string;
}

export interface SiteMediaConfig {
  portfolioHeroVideoUrl: string;
  portfolioHeroPoster: string;
  portfolioHeroTagline: string;
  academyHeroVideoUrl: string;
  academyHeroPoster: string;
  academyHeroTagline: string;
  splitLandingPortfolioVideo: string;
  splitLandingPortfolioImage: string;
  splitLandingAcademyVideo: string;
  splitLandingAcademyImage: string;
}

