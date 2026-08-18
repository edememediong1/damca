import React, { useState, useEffect, useCallback } from 'react';
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
  INITIAL_CONTACTS,
  INITIAL_STUDENTS,
  INITIAL_MEDIA_CONFIG,
  INDUSTRIES_SERVED, 
  SERVICES_DATA, 
  PRICING_PACKAGES, 
  TESTIMONIALS_DATA, 
  ACADEMY_FEES, 
  ACADEMY_FAQS 
} from './data/mockData';
import { SplitLanding } from './components/SplitLanding';
import { PortfolioView } from './components/PortfolioView';
import { AcademyView } from './components/AcademyView';
import { CaseStudyModal } from './components/CaseStudyModal';
import { AdminDashboard } from './components/AdminDashboard';
import { Settings, Shield } from 'lucide-react';

const STORAGE_KEYS = {
  PROJECTS: 'damca_cms_projects_v2',
  PROGRAMS: 'damca_cms_programs_v2',
  TESTIMONIALS: 'damca_cms_testimonials_v2',
  CONTACTS: 'damca_cms_contacts_v2',
  STUDENTS: 'damca_cms_students_v2',
  ROADMAP: 'damca_cms_roadmap_v2',
  MEDIA_CONFIG: 'damca_cms_media_config_v2',
};

export default function App() {
  const [viewMode, setViewMode] = useState<ViewMode>('split');
  const [selectedCaseStudy, setSelectedCaseStudy] = useState<Project | null>(null);

  // Dynamic CMS state initialized from LocalStorage or default mockData
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROJECTS);
      return saved ? JSON.parse(saved) : INITIAL_PROJECTS;
    } catch {
      return INITIAL_PROJECTS;
    }
  });

  const [programs, setPrograms] = useState<AcademyProgram[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PROGRAMS);
      return saved ? JSON.parse(saved) : INITIAL_PROGRAMS;
    } catch {
      return INITIAL_PROGRAMS;
    }
  });

  const [testimonials, setTestimonials] = useState<Testimonial[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.TESTIMONIALS);
      return saved ? JSON.parse(saved) : TESTIMONIALS_DATA;
    } catch {
      return TESTIMONIALS_DATA;
    }
  });

  const [contacts, setContacts] = useState<ContactInquiry[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONTACTS);
      return saved ? JSON.parse(saved) : INITIAL_CONTACTS;
    } catch {
      return INITIAL_CONTACTS;
    }
  });

  const [students, setStudents] = useState<StudentRegistration[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.STUDENTS);
      return saved ? JSON.parse(saved) : INITIAL_STUDENTS;
    } catch {
      return INITIAL_STUDENTS;
    }
  });

  const [roadmap, setRoadmap] = useState<RoadmapWeek[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ROADMAP);
      return saved ? JSON.parse(saved) : INITIAL_ROADMAP;
    } catch {
      return INITIAL_ROADMAP;
    }
  });

  const [mediaConfig, setMediaConfig] = useState<SiteMediaConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.MEDIA_CONFIG);
      return saved ? JSON.parse(saved) : INITIAL_MEDIA_CONFIG;
    } catch {
      return INITIAL_MEDIA_CONFIG;
    }
  });

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

  // Save changes to state & localStorage
  const handleSaveProjects = (newProjects: Project[]) => {
    setProjects(newProjects);
    try {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(newProjects));
    } catch (e) {
      console.error('Failed to save projects to localStorage', e);
    }
  };

  const handleSavePrograms = (newPrograms: AcademyProgram[]) => {
    setPrograms(newPrograms);
    try {
      localStorage.setItem(STORAGE_KEYS.PROGRAMS, JSON.stringify(newPrograms));
    } catch (e) {
      console.error('Failed to save programs to localStorage', e);
    }
  };

  const handleSaveTestimonials = (newTestimonials: Testimonial[]) => {
    setTestimonials(newTestimonials);
    try {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(newTestimonials));
    } catch (e) {
      console.error('Failed to save testimonials to localStorage', e);
    }
  };

  const handleSaveContacts = (newContacts: ContactInquiry[]) => {
    setContacts(newContacts);
    try {
      localStorage.setItem(STORAGE_KEYS.CONTACTS, JSON.stringify(newContacts));
    } catch (e) {
      console.error('Failed to save contacts to localStorage', e);
    }
  };

  const handleSaveStudents = (newStudents: StudentRegistration[]) => {
    setStudents(newStudents);
    try {
      localStorage.setItem(STORAGE_KEYS.STUDENTS, JSON.stringify(newStudents));
    } catch (e) {
      console.error('Failed to save students to localStorage', e);
    }
  };

  const handleSaveRoadmap = (newRoadmap: RoadmapWeek[]) => {
    setRoadmap(newRoadmap);
    try {
      localStorage.setItem(STORAGE_KEYS.ROADMAP, JSON.stringify(newRoadmap));
    } catch (e) {
      console.error('Failed to save roadmap to localStorage', e);
    }
  };

  const handleSaveMediaConfig = (newConfig: SiteMediaConfig) => {
    setMediaConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEYS.MEDIA_CONFIG, JSON.stringify(newConfig));
    } catch (e) {
      console.error('Failed to save mediaConfig to localStorage', e);
    }
  };

  // Live client submissions
  const handleAddContact = (inquiry: ContactInquiry) => {
    const updated = [inquiry, ...contacts];
    handleSaveContacts(updated);
  };

  const handleEnrollStudent = (student: StudentRegistration) => {
    const updated = [student, ...students];
    handleSaveStudents(updated);
  };

  const handleResetDefaults = () => {
    setProjects(INITIAL_PROJECTS);
    setPrograms(INITIAL_PROGRAMS);
    setTestimonials(TESTIMONIALS_DATA);
    setContacts(INITIAL_CONTACTS);
    setStudents(INITIAL_STUDENTS);
    setRoadmap(INITIAL_ROADMAP);
    setMediaConfig(INITIAL_MEDIA_CONFIG);
    try {
      Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
    } catch (e) {
      console.error('Failed to clear localStorage', e);
    }
  };

  return (
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
      {viewMode === 'admin' && (
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

      {/* Floating Discreet Admin Command Button for instant navigation */}
      {viewMode !== 'admin' && (
        <div className="fixed bottom-4 left-4 z-40">
          <button
            id="admin-cmd-shortcut"
            onClick={() => navigateTo('admin', '/admin')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/80 hover:bg-[#C8A24A] text-white/60 hover:text-black border border-white/15 hover:border-[#C8A24A] text-xs font-mono backdrop-blur-md transition-all shadow-xl group"
            title="Open Admin CMS & Control Center (/admin)"
          >
            <Shield size={13} className="text-[#C8A24A] group-hover:text-black transition-colors" />
            <span className="text-[11px] font-medium tracking-wider">/admin</span>
          </button>
        </div>
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
  );
}
