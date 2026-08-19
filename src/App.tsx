import React, { useState, useEffect, useCallback, lazy, Suspense } from 'react';
import { 
  ViewMode, 
  Project, 
  AcademyProgram, 
  Testimonial,
  ContactInquiry,
  StudentRegistration,
  RoadmapWeek,
  SiteMediaConfig
} from './types';
import { 
  INITIAL_PROJECTS, 
  INITIAL_PROGRAMS, 
  INITIAL_ROADMAP, 
  INITIAL_MEDIA_CONFIG,
  INDUSTRIES_SERVED, 
  SERVICES_DATA, 
  PRICING_PACKAGES, 
  TESTIMONIALS_DATA, 
  ACADEMY_FEES, 
  ACADEMY_FAQS 
} from './data/mockData';
import { api, AdminContent } from './api';

const SplitLanding = lazy(() => import('./components/SplitLanding').then(m => ({ default: m.SplitLanding })));
const PortfolioView = lazy(() => import('./components/PortfolioView').then(m => ({ default: m.PortfolioView })));
const AcademyView = lazy(() => import('./components/AcademyView').then(m => ({ default: m.AcademyView })));
const CaseStudyModal = lazy(() => import('./components/CaseStudyModal').then(m => ({ default: m.CaseStudyModal })));
const AdminDashboard = lazy(() => import('./components/AdminDashboard').then(m => ({ default: m.AdminDashboard })));
const AdminLogin = lazy(() => import('./components/AdminLogin').then(m => ({ default: m.AdminLogin })));

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);
  const [projects, setProjects] = useState<Project[]>(INITIAL_PROJECTS);
  const [programs, setPrograms] = useState<AcademyProgram[]>(INITIAL_PROGRAMS);
  const [testimonials, setTestimonials] = useState<Testimonial[]>(TESTIMONIALS_DATA);
  const [contacts, setContacts] = useState<ContactInquiry[]>([]);
  const [students, setStudents] = useState<StudentRegistration[]>([]);
  const [roadmap, setRoadmap] = useState<RoadmapWeek[]>(INITIAL_ROADMAP);
  const [mediaConfig, setMediaConfig] = useState<SiteMediaConfig>(INITIAL_MEDIA_CONFIG);
  const [adminAuthenticated, setAdminAuthenticated] = useState(false);

  const applyContent = (data: Partial<AdminContent>) => {
    if (data.projects) setProjects(data.projects); if (data.programs) setPrograms(data.programs);
    if (data.testimonials) setTestimonials(data.testimonials); if (data.roadmap) setRoadmap(data.roadmap);
    if (data.mediaConfig) setMediaConfig(data.mediaConfig); if (data.contacts) setContacts(data.contacts);
    if (data.students) setStudents(data.students);
  };

  useEffect(() => { api.publicContent().then(applyContent).catch(error => console.error('Unable to load server content', error)); }, []);
  useEffect(() => {
    if (viewMode === 'admin') api.adminContent().then(data => { applyContent(data); setAdminAuthenticated(true); }).catch(() => setAdminAuthenticated(false));
  }, [viewMode]);

  // URL Route Synchronization
  const syncRouteWithUrl = useCallback(() => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();

    if (
      path === '/admin' || 
      path.startsWith('/admin/') || 
      hash === '#admin' || 
      hash === '#/admin'
    ) {
      setViewMode('admin');
    } else if (
      path === '/portfolio' || 
      hash === '#portfolio' || 
      hash === '#/portfolio'
    ) {
      setViewMode('portfolio');
    } else if (
      path === '/academy' || 
      hash === '#academy' || 
      hash === '#/academy'
    ) {
      setViewMode('academy');
    } else {
      setViewMode('split');
    }
  }, []);

  useEffect(() => {
    syncRouteWithUrl();

    window.addEventListener('popstate', syncRouteWithUrl);
    window.addEventListener('hashchange', syncRouteWithUrl);

    return () => {
      window.removeEventListener('popstate', syncRouteWithUrl);
      window.removeEventListener('hashchange', syncRouteWithUrl);
    };
  }, [syncRouteWithUrl]);

  // Programmatic navigation helper
  const navigateTo = (mode: ViewMode, path: string) => {
    try {
      window.history.pushState(null, '', path);
    } catch {
      // Fallback for restricted frame environments
      window.location.hash = path.replace(/^\//, '');
    }
    setViewMode(mode);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const persist = <K extends keyof AdminContent>(key: K, value: AdminContent[K]) => {
    void api.save(key, value).catch(error => window.alert(`The server could not save this change: ${error.message}`));
  };

  const handleSaveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    persist('projects', newProjects);
  };

  const handleSavePrograms = (newPrograms: AcademyProgram[]) => {
    setPrograms(newPrograms);
    persist('programs', newPrograms);
  };

  const handleSaveTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    persist('testimonials', newTestimonials);
  };

  const handleSaveContacts = (newContacts: ContactInquiry[]) => {
    setContacts(newContacts);
    persist('contacts', newContacts);
  };

  const handleSaveStudents = (newStudents: StudentRegistration[]) => {
    setStudents(newStudents);
    persist('students', newStudents);
  };

  const handleSaveRoadmap = (newRoadmap: RoadmapWeek[]) => {
    setRoadmap(newRoadmap);
    persist('roadmap', newRoadmap);
  };

  const handleSaveMediaConfig = (newConfig: SiteMediaConfig) => {
    setMediaConfig(newConfig);
    persist('mediaConfig', newConfig);
  };

  // Live client submissions
  const handleAddContact = async (inquiry: ContactInquiry) => { await api.contact(inquiry); };

  const handleEnrollStudent = async (student: StudentRegistration) => { await api.enroll(student); };

  const handleResetDefaults = () => {
    void api.reset().then(applyContent).catch(error => window.alert(error.message));
  };

  return (
    <Suspense fallback={<div className="min-h-screen grid place-items-center bg-[#050505] text-[#C8A24A]">Loading DAMCA…</div>}>
    <div className="relative min-h-screen bg-[#050505] text-white font-body selection:bg-[#C8A24A] selection:text-black">
      
      {/* View Router */}
      {viewMode === 'split' && (
        <SplitLanding
          mediaConfig={mediaConfig}
          onSelectSide={(side) => {
            if (side === 'portfolio') {
              navigateTo('portfolio', '/portfolio');
            } else {
              navigateTo('academy', '/academy');
            }
          }}
        />
      )}

      {viewMode === 'portfolio' && (
        <PortfolioView
          projects={projects}
          industries={INDUSTRIES_SERVED}
          services={SERVICES_DATA}
          pricing={PRICING_PACKAGES}
          testimonials={testimonials}
          mediaConfig={mediaConfig}
          onAddContact={handleAddContact}
          onOpenCaseStudy={(proj) => setSelectedCaseStudy(proj)}
          onSwitchToAcademy={() => {
            navigateTo('academy', '/academy');
          }}
        />
      )}

      {viewMode === 'academy' && (
        <AcademyView
          programs={programs}
          roadmap={roadmap}
          fees={ACADEMY_FEES}
          faqs={ACADEMY_FAQS}
          testimonials={testimonials}
          mediaConfig={mediaConfig}
          onEnrollStudent={handleEnrollStudent}
          onSwitchToPortfolio={() => {
            navigateTo('portfolio', '/portfolio');
          }}
        />
      )}

      {/* Dedicated /admin CMS Route */}
      {viewMode === 'admin' && !adminAuthenticated && (
        <AdminLogin
          onLogin={async (email, password) => { await api.login(email, password); const data = await api.adminContent(); applyContent(data); setAdminAuthenticated(true); }}
          onClose={() => navigateTo('split', '/')}
        />
      )}

      {viewMode === 'admin' && adminAuthenticated && (
        <AdminDashboard
          projects={projects}
          programs={programs}
          testimonials={testimonials}
          contacts={contacts}
          students={students}
          roadmap={roadmap}
          mediaConfig={mediaConfig}
          onSaveProjects={handleSaveProjects}
          onSavePrograms={handleSavePrograms}
          onSaveTestimonials={handleSaveTestimonials}
          onSaveContacts={handleSaveContacts}
          onSaveStudents={handleSaveStudents}
          onSaveRoadmap={handleSaveRoadmap}
          onSaveMediaConfig={handleSaveMediaConfig}
          onResetDefaults={handleResetDefaults}
          onClose={() => navigateTo('split', '/')}
          onPreviewProject={(p) => {
            setSelectedCaseStudy(p);
            navigateTo('portfolio', '/portfolio');
          }}
        />
      )}

      {/* Case Study Modal */}
      {selectedCaseStudy && (
        <CaseStudyModal
          project={selectedCaseStudy}
          allProjects={projects}
          onClose={() => setSelectedCaseStudy(null)}
          onSelectRelated={(p) => setSelectedCaseStudy(p)}
        />
      )}

    </div>
    </Suspense>
  );
}
