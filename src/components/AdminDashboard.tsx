import React, { useState, useMemo } from 'react';
import { 
  Project, 
  AcademyProgram, 
  Testimonial, 
  RoadmapWeek,
  ContactInquiry,
  StudentRegistration,
  SiteMediaConfig,
  ProjectCategory,
  ContactStatus,
  EnrollmentStatus,
  PaymentStatus
} from '../types';
import { 
  Users, 
  GraduationCap, 
  Mail, 
  Phone, 
  Film, 
  Sliders, 
  Video, 
  Layers, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  RotateCcw, 
  Check, 
  Eye, 
  Sparkles, 
  X,
  UploadCloud,
  Image as ImageIcon,
  Search,
  Filter,
  Calendar,
  DollarSign,
  TrendingUp,
  CheckCircle,
  Clock,
  AlertCircle,
  BookOpen,
  Award,
  Download,
  ExternalLink,
  FileText,
  Play,
  Copy,
  MessageSquare,
  ChevronRight,
  ShieldCheck,
  Menu,
  LayoutDashboard
} from 'lucide-react';

interface AdminDashboardProps {
  projects: Project[];
  programs: AcademyProgram[];
  testimonials: Testimonial[];
  roadmap: RoadmapWeek[];
  contacts: ContactInquiry[];
  students: StudentRegistration[];
  mediaConfig: SiteMediaConfig;
  onSaveProjects: (projects: Project[]) => void;
  onSavePrograms: (programs: AcademyProgram[]) => void;
  onSaveTestimonials: (testimonials: Testimonial[]) => void;
  onSaveRoadmap: (roadmap: RoadmapWeek[]) => void;
  onSaveContacts: (contacts: ContactInquiry[]) => void;
  onSaveStudents: (students: StudentRegistration[]) => void;
  onSaveMediaConfig: (config: SiteMediaConfig) => void;
  onResetDefaults: () => void;
  onClose: () => void;
  onPreviewProject: (project: Project) => void;
}

type AdminTab = 
  | 'overview' 
  | 'contacts' 
  | 'students' 
  | 'curriculum' 
  | 'media-studio' 
  | 'projects' 
  | 'programs' 
  | 'testimonials';

const CATEGORIES: ProjectCategory[] = [
  'Short-form',
  'Documentary',
  'Commercial',
  'Sports',
  'Talking Head',
  'Trailers',
  'Podcast',
  'Church',
  'YouTube'
];

const CURATED_MEDIA_PRESETS = [
  {
    title: 'Motorsport Racing (High Octane)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-track-41551-large.mp4',
    poster: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    tag: 'Sports / Commercial'
  },
  {
    title: 'Luxury Horology (Macro Craft)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-assembling-a-watch-42861-large.mp4',
    poster: 'https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?q=80&w=1200&auto=format&fit=crop',
    tag: 'Luxury / Detail'
  },
  {
    title: 'Wild Savanna Aerial (Documentary)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-aerial-view-of-elephants-walking-in-the-savannah-42867-large.mp4',
    poster: 'https://images.unsplash.com/photo-1516426122078-c23e76319801?q=80&w=1200&auto=format&fit=crop',
    tag: 'Nature / Drone'
  },
  {
    title: 'Stadium Concert Stage Lights',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-stage-lights-at-a-music-concert-40292-large.mp4',
    poster: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?q=80&w=1200&auto=format&fit=crop',
    tag: 'Concert / Ministry'
  },
  {
    title: 'Futuristic Neon Tunnel (Cyberpunk)',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-futuristic-tunnel-with-neon-lights-42998-large.mp4',
    poster: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1200&auto=format&fit=crop',
    tag: 'Trailers / Gaming'
  },
  {
    title: 'Studio Interview & Microphones',
    url: 'https://assets.mixkit.co/videos/preview/mixkit-interview-in-a-studio-with-professional-microphones-43282-large.mp4',
    poster: 'https://images.unsplash.com/photo-1590602847861-f357a9332bbc?q=80&w=1200&auto=format&fit=crop',
    tag: 'Podcast / Studio'
  }
];

export const AdminDashboard: React.FC<AdminDashboardProps> = ({
  projects,
  programs,
  testimonials,
  roadmap,
  contacts,
  students,
  mediaConfig,
  onSaveProjects,
  onSavePrograms,
  onSaveTestimonials,
  onSaveRoadmap,
  onSaveContacts,
  onSaveStudents,
  onSaveMediaConfig,
  onResetDefaults,
  onClose,
  onPreviewProject,
}) => {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [saveSuccessMsg, setSaveSuccessMsg] = useState<string | null>(null);

  // Search & Filter States
  const [contactSearch, setContactSearch] = useState('');
  const [contactFilter, setContactFilter] = useState<string>('all');
  const [studentSearch, setStudentSearch] = useState('');
  const [studentFilter, setStudentFilter] = useState<string>('all');

  // Active Modals & Selected Items
  const [selectedContact, setSelectedContact] = useState<ContactInquiry | null>(null);
  const [selectedStudent, setSelectedStudent] = useState<StudentRegistration | null>(null);
  const [isNewContactModal, setIsNewContactModal] = useState(false);
  const [isNewStudentModal, setIsNewStudentModal] = useState(false);

  // Project Editing State
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [isCreatingNewProject, setIsCreatingNewProject] = useState(false);

  // Curriculum Editing State
  const [editingWeek, setEditingWeek] = useState<RoadmapWeek | null>(null);
  const [isCreatingNewWeek, setIsCreatingNewWeek] = useState(false);

  // Media Config State (local copy for live edits)
  const [localMediaConfig, setLocalMediaConfig] = useState<SiteMediaConfig>(mediaConfig);
  const [mediaSaved, setMediaSaved] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Testimonial Editing
  const [editingTestimonial, setEditingTestimonial] = useState<Testimonial | null>(null);
  const [isCreatingNewTestimonial, setIsCreatingNewTestimonial] = useState(false);

  const showNotification = (msg: string) => {
    setSaveSuccessMsg(msg);
    setTimeout(() => setSaveSuccessMsg(null), 3200);
  };

  // ================= STATS COMPUTATION =================
  const stats = useMemo(() => {
    const totalContacts = contacts.length;
    const newLeads = contacts.filter((c) => c.status === 'new').length;
    const bookedLeads = contacts.filter((c) => c.status === 'booked').length;
    
    const totalStudents = students.length;
    const activeStudents = students.filter((s) => s.enrollmentStatus === 'active').length;
    const graduatedStudents = students.filter((s) => s.enrollmentStatus === 'graduated').length;
    const totalTuitionEstimated = students.reduce((acc, s) => {
      const num = parseInt(s.tuitionAmount.replace(/[^0-9]/g, ''), 10) || 0;
      return acc + num;
    }, 0);

    return {
      totalContacts,
      newLeads,
      bookedLeads,
      totalStudents,
      activeStudents,
      graduatedStudents,
      totalTuitionEstimated,
      totalProjects: projects.length,
      featuredProjects: projects.filter((p) => p.featured).length,
      curriculumWeeks: roadmap.length
    };
  }, [contacts, students, projects, roadmap]);

  // ================= CONTACTS HANDLERS =================
  const handleUpdateContactStatus = (id: string, newStatus: ContactStatus) => {
    const updated = contacts.map((c) => c.id === id ? { ...c, status: newStatus } : c);
    onSaveContacts(updated);
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact({ ...selectedContact, status: newStatus });
    }
    showNotification(`Inquiry marked as ${newStatus.toUpperCase()}`);
  };

  const handleUpdateContactNotes = (id: string, notes: string) => {
    const updated = contacts.map((c) => c.id === id ? { ...c, notes } : c);
    onSaveContacts(updated);
    if (selectedContact && selectedContact.id === id) {
      setSelectedContact({ ...selectedContact, notes });
    }
    showNotification('Inquiry notes saved.');
  };

  const handleDeleteContact = (id: string) => {
    if (confirm('Delete this inquiry?')) {
      const updated = contacts.filter((c) => c.id !== id);
      onSaveContacts(updated);
      setSelectedContact(null);
      showNotification('Inquiry removed.');
    }
  };

  const handleCreateContact = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const newEntry: ContactInquiry = {
      id: `cnt-${Date.now()}`,
      name: (fd.get('name') as string) || 'New Client',
      email: (fd.get('email') as string) || 'client@brand.com',
      company: (fd.get('company') as string) || 'Brand Co',
      budget: (fd.get('budget') as string) || '$2,500 - $5,000',
      projectType: (fd.get('projectType') as string) || 'Commercial',
      description: (fd.get('description') as string) || '',
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'new',
      phone: (fd.get('phone') as string) || '',
      notes: (fd.get('notes') as string) || 'Added via Admin Dashboard'
    };
    onSaveContacts([newEntry, ...contacts]);
    setIsNewContactModal(false);
    showNotification('New inquiry added successfully.');
  };

  const exportContactsCSV = () => {
    const headers = 'ID,Name,Email,Phone,Company,Budget,Type,Status,Date,Notes\n';
    const rows = contacts.map((c) => 
      `"${c.id}","${c.name}","${c.email}","${c.phone || ''}","${c.company}","${c.budget}","${c.projectType}","${c.status}","${c.date}","${(c.notes || '').replace(/"/g, '""')}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `damca-inquiries-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showNotification('Contacts CSV downloaded.');
  };

  // ================= STUDENTS HANDLERS =================
  const handleUpdateStudentStatus = (id: string, enrollmentStatus: EnrollmentStatus) => {
    const updated = students.map((s) => s.id === id ? { ...s, enrollmentStatus } : s);
    onSaveStudents(updated);
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent({ ...selectedStudent, enrollmentStatus });
    }
    showNotification(`Student status updated to ${enrollmentStatus.toUpperCase()}`);
  };

  const handleUpdateStudentPayment = (id: string, paymentPreference: PaymentStatus) => {
    const updated = students.map((s) => s.id === id ? { ...s, paymentPreference } : s);
    onSaveStudents(updated);
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent({ ...selectedStudent, paymentPreference });
    }
    showNotification('Payment status updated.');
  };

  const handleUpdateStudentProgress = (id: string, progressPercentage: number) => {
    const updated = students.map((s) => s.id === id ? { ...s, progressPercentage } : s);
    onSaveStudents(updated);
    if (selectedStudent && selectedStudent.id === id) {
      setSelectedStudent({ ...selectedStudent, progressPercentage });
    }
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Delete this student registration?')) {
      const updated = students.filter((s) => s.id !== id);
      onSaveStudents(updated);
      setSelectedStudent(null);
      showNotification('Student removed.');
    }
  };

  const handleCreateStudent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const programId = (fd.get('programId') as string) || 'prog-advanced';
    const foundProg = programs.find((p) => p.id === programId);

    const newStudent: StudentRegistration = {
      id: `stu-${Date.now()}`,
      fullName: (fd.get('fullName') as string) || 'New Student',
      email: (fd.get('email') as string) || 'student@academy.com',
      phone: (fd.get('phone') as string) || '',
      programId: programId,
      programTitle: foundProg ? foundProg.title : 'Advanced Editing',
      paymentPreference: (fd.get('paymentPreference') as PaymentStatus) || 'paid',
      enrollmentStatus: 'active',
      registeredDate: new Date().toISOString().split('T')[0],
      progressPercentage: parseInt(fd.get('progressPercentage') as string, 10) || 10,
      assignedMentor: (fd.get('assignedMentor') as string) || 'DAMCA Lead Director',
      showreelUrl: (fd.get('showreelUrl') as string) || '',
      notes: (fd.get('notes') as string) || 'Registered in Admin Portal',
      tuitionAmount: foundProg ? foundProg.price : '$1,200'
    };

    onSaveStudents([newStudent, ...students]);
    setIsNewStudentModal(false);
    showNotification('Student successfully enrolled.');
  };

  const exportStudentsCSV = () => {
    const headers = 'ID,Full Name,Email,Phone,Program,Tuition,Payment,Status,Progress%,Registered Date,Mentor\n';
    const rows = students.map((s) => 
      `"${s.id}","${s.fullName}","${s.email}","${s.phone}","${s.programTitle}","${s.tuitionAmount}","${s.paymentPreference}","${s.enrollmentStatus}","${s.progressPercentage}%","${s.registeredDate}","${s.assignedMentor || ''}"`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `damca-students-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    showNotification('Student roster CSV downloaded.');
  };

  // ================= CURRICULUM HANDLERS =================
  const handleSaveWeek = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingWeek) return;

    let updatedRoadmap: RoadmapWeek[];
    if (isCreatingNewWeek) {
      updatedRoadmap = [...roadmap, editingWeek];
    } else {
      updatedRoadmap = roadmap.map((w) => w.weekNumber === editingWeek.weekNumber ? editingWeek : w);
    }
    onSaveRoadmap(updatedRoadmap);
    setEditingWeek(null);
    setIsCreatingNewWeek(false);
    showNotification('Curriculum module updated and published live!');
  };

  const handleDeleteWeek = (weekNum: string) => {
    if (confirm(`Remove Week ${weekNum} from the curriculum roadmap?`)) {
      const updated = roadmap.filter((w) => w.weekNumber !== weekNum);
      onSaveRoadmap(updated);
      showNotification(`Week ${weekNum} removed.`);
    }
  };

  // ================= MEDIA CONFIG HANDLERS =================
  const handleSaveMedia = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveMediaConfig(localMediaConfig);
    setMediaSaved(true);
    setTimeout(() => setMediaSaved(false), 2500);
    showNotification('Hero & site video configuration saved successfully!');
  };

  const applyMediaPresetToField = (field: keyof SiteMediaConfig, url: string, poster?: string) => {
    setLocalMediaConfig((prev) => ({
      ...prev,
      [field]: url,
      ...(poster && field === 'portfolioHeroVideoUrl' ? { portfolioHeroPoster: poster } : {}),
      ...(poster && field === 'academyHeroVideoUrl' ? { academyHeroPoster: poster } : {}),
      ...(poster && field === 'splitLandingPortfolioVideo' ? { splitLandingPortfolioImage: poster } : {}),
      ...(poster && field === 'splitLandingAcademyVideo' ? { splitLandingAcademyImage: poster } : {})
    }));
    showNotification('Applied preset video clip to selected slot.');
  };

  // ================= PROJECTS CMS HANDLERS =================
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProject) return;

    let updated: Project[];
    if (isCreatingNewProject) {
      updated = [editingProject, ...projects];
    } else {
      updated = projects.map((p) => p.id === editingProject.id ? editingProject : p);
    }
    onSaveProjects(updated);
    setEditingProject(null);
    setIsCreatingNewProject(false);
    showNotification('Case study & project saved live.');
  };

  const handleDeleteProject = (id: string) => {
    if (confirm('Delete this project case study?')) {
      const updated = projects.filter((p) => p.id !== id);
      onSaveProjects(updated);
      showNotification('Project deleted.');
    }
  };

  // Filtered lists
  const filteredContacts = contacts.filter((c) => {
    const matchesSearch = c.name.toLowerCase().includes(contactSearch.toLowerCase()) || 
                          c.company.toLowerCase().includes(contactSearch.toLowerCase()) ||
                          c.email.toLowerCase().includes(contactSearch.toLowerCase()) ||
                          c.projectType.toLowerCase().includes(contactSearch.toLowerCase());
    const matchesFilter = contactFilter === 'all' || c.status === contactFilter;
    return matchesSearch && matchesFilter;
  });

  const filteredStudents = students.filter((s) => {
    const matchesSearch = s.fullName.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          s.email.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          s.programTitle.toLowerCase().includes(studentSearch.toLowerCase()) ||
                          (s.assignedMentor || '').toLowerCase().includes(studentSearch.toLowerCase());
    const matchesFilter = studentFilter === 'all' || s.enrollmentStatus === studentFilter;
    return matchesSearch && matchesFilter;
  });

  const navSections = [
    {
      title: 'OPERATIONS & CRM',
      items: [
        {
          id: 'overview' as AdminTab,
          label: 'Overview & Analytics',
          icon: <TrendingUp size={16} />,
          badge: null,
          badgeColor: ''
        },
        {
          id: 'contacts' as AdminTab,
          label: 'Inquiries & Leads',
          icon: <Mail size={16} />,
          badge: stats.newLeads > 0 ? stats.newLeads : stats.totalContacts,
          badgeColor: stats.newLeads > 0 ? 'bg-[#C8A24A] text-black font-bold' : 'bg-white/10 text-white/70'
        },
        {
          id: 'students' as AdminTab,
          label: 'Students & Cohorts',
          icon: <GraduationCap size={16} />,
          badge: stats.totalStudents,
          badgeColor: 'bg-white/10 text-white/70'
        }
      ]
    },
    {
      title: 'CONTENT & CURRICULUM',
      items: [
        {
          id: 'curriculum' as AdminTab,
          label: 'Course Roadmap',
          icon: <BookOpen size={16} />,
          badge: `${stats.roadmapWeeks} wks`,
          badgeColor: 'bg-[#C8A24A]/20 text-[#C8A24A]'
        },
        {
          id: 'media-studio' as AdminTab,
          label: 'Hero & Video Studio',
          icon: <Video size={16} />,
          badge: null,
          badgeColor: ''
        },
        {
          id: 'projects' as AdminTab,
          label: 'Case Studies CMS',
          icon: <Film size={16} />,
          badge: stats.totalProjects,
          badgeColor: 'bg-white/10 text-white/70'
        },
        {
          id: 'programs' as AdminTab,
          label: 'Academy Tracks',
          icon: <Layers size={16} />,
          badge: programs.length,
          badgeColor: 'bg-white/10 text-white/70'
        },
        {
          id: 'testimonials' as AdminTab,
          label: 'Testimonials',
          icon: <Sparkles size={16} />,
          badge: testimonials.length,
          badgeColor: 'bg-white/10 text-white/70'
        }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex flex-col md:flex-row bg-[#080808] text-white selection:bg-[#C8A24A] selection:text-black overflow-hidden">
      
      {/* ================= DESKTOP SIDEBAR (MD+) ================= */}
      <aside className="w-64 lg:w-72 bg-[#0c0c0c] border-r border-white/10 flex-col justify-between shrink-0 h-full overflow-y-auto hidden md:flex select-none z-40">
        <div className="p-5 space-y-6">
          {/* Brand Header */}
          <div className="flex items-center gap-3 pb-4 border-b border-white/10">
            <div className="w-9 h-9 rounded-full border border-[#C8A24A] bg-black/60 flex items-center justify-center shrink-0">
              <span className="font-cinzel text-xs text-[#C8A24A] font-bold">D</span>
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-cinzel text-sm font-semibold tracking-wider text-white truncate">DAMCA</span>
                <span className="px-1.5 py-0.2 rounded bg-[#C8A24A]/15 text-[#C8A24A] font-mono text-[9px] font-medium border border-[#C8A24A]/30">
                  /admin
                </span>
              </div>
              <p className="text-[10px] text-white/50 truncate">Command Center & CMS</p>
            </div>
          </div>

          {/* Live Sync Status Pill */}
          <div className="px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[11px] font-mono text-white/70">Live Production Sync</span>
            </div>
            <span className="text-[10px] font-mono text-[#C8A24A]">v2.4</span>
          </div>

          {/* Navigation Links */}
          <nav className="space-y-6">
            {navSections.map((section, sIdx) => (
              <div key={sIdx} className="space-y-1.5">
                <div className="px-3 text-[10px] font-mono tracking-widest text-white/40 uppercase">
                  {section.title}
                </div>
                <div className="space-y-1">
                  {section.items.map((item) => {
                    const isActive = activeTab === item.id;
                    return (
                      <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-mono tracking-wider transition-all text-left ${
                          isActive
                            ? 'bg-[#C8A24A] text-black font-semibold shadow-md shadow-[#C8A24A]/10'
                            : 'text-white/70 hover:text-white hover:bg-white/5'
                        }`}
                      >
                        <div className="flex items-center gap-2.5 truncate">
                          <span className={isActive ? 'text-black' : 'text-[#C8A24A]'}>
                            {item.icon}
                          </span>
                          <span className="truncate">{item.label}</span>
                        </div>
                        {item.badge !== null && item.badge !== undefined && (
                          <span
                            className={`px-1.5 py-0.5 rounded-full text-[10px] shrink-0 font-bold ${
                              isActive
                                ? 'bg-black text-[#C8A24A]'
                                : item.badgeColor || 'bg-white/10 text-white/70'
                            }`}
                          >
                            {item.badge}
                          </span>
                        )}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </nav>
        </div>

        {/* Sidebar Footer Controls */}
        <div className="p-4 border-t border-white/10 bg-[#090909] space-y-2">
          <button
            onClick={() => {
              if (confirm('Reset all CMS content, inquiries, students, and media back to factory defaults?')) {
                onResetDefaults();
                showNotification('All datasets reset to default.');
              }
            }}
            className="w-full flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-white/10 text-xs text-white/60 hover:text-white hover:border-white/30 hover:bg-white/5 transition-all font-mono"
            title="Reset to initial factory data"
          >
            <RotateCcw size={13} />
            <span>Reset Defaults</span>
          </button>

          <button
            onClick={onClose}
            className="w-full flex items-center justify-center gap-2 px-3 py-2.5 rounded-full bg-[#C8A24A] text-black font-semibold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-md font-mono"
          >
            <X size={14} />
            <span>Exit to Website</span>
          </button>
        </div>
      </aside>

      {/* ================= MOBILE TOP HEADER BAR (< MD) ================= */}
      <div className="md:hidden flex items-center justify-between px-4 py-3 bg-[#0d0d0d] border-b border-white/10 shrink-0 z-40">
        <div className="flex items-center gap-2.5">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="p-2 rounded-lg bg-white/5 border border-white/10 text-white hover:bg-white/10"
            aria-label="Open Navigation Sidebar"
          >
            <Menu size={18} />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-cinzel text-xs font-semibold text-white">DAMCA Admin</span>
            <span className="px-1.5 py-0.5 rounded bg-[#C8A24A]/20 text-[#C8A24A] font-mono text-[9px] capitalize">
              {activeTab}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {saveSuccessMsg && (
            <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
              <Check size={11} /> Saved
            </span>
          )}
          <button
            onClick={onClose}
            className="p-1.5 px-3 rounded-full bg-[#C8A24A] text-black text-xs font-mono font-semibold"
          >
            Exit
          </button>
        </div>
      </div>

      {/* ================= MOBILE SIDEBAR DRAWER (< MD) ================= */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            onClick={() => setIsMobileSidebarOpen(false)} 
          />

          {/* Drawer Content */}
          <div className="relative w-72 max-w-[85vw] bg-[#0c0c0c] border-r border-white/10 h-full p-4 flex flex-col justify-between z-50 overflow-y-auto">
            <div className="space-y-5">
              {/* Drawer Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2.5">
                  <div className="w-7 h-7 rounded-full border border-[#C8A24A] bg-black flex items-center justify-center">
                    <span className="font-cinzel text-[10px] text-[#C8A24A] font-bold">D</span>
                  </div>
                  <div>
                    <div className="font-cinzel text-xs font-semibold text-white">DAMCA Admin</div>
                    <div className="text-[9px] text-white/50 font-mono">Operations & CMS</div>
                  </div>
                </div>
                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="p-1.5 rounded-lg bg-white/5 text-white/70 hover:text-white"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Navigation */}
              <nav className="space-y-5">
                {navSections.map((section, sIdx) => (
                  <div key={sIdx} className="space-y-1">
                    <div className="px-2 text-[9px] font-mono tracking-widest text-white/40 uppercase">
                      {section.title}
                    </div>
                    <div className="space-y-1">
                      {section.items.map((item) => {
                        const isActive = activeTab === item.id;
                        return (
                          <button
                            key={item.id}
                            onClick={() => {
                              setActiveTab(item.id);
                              setIsMobileSidebarOpen(false);
                            }}
                            className={`w-full flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono tracking-wider transition-all text-left ${
                              isActive
                                ? 'bg-[#C8A24A] text-black font-semibold'
                                : 'text-white/70 hover:text-white hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2">
                              <span>{item.icon}</span>
                              <span>{item.label}</span>
                            </div>
                            {item.badge !== null && item.badge !== undefined && (
                              <span
                                className={`px-1.5 py-0.5 rounded-full text-[9px] font-bold ${
                                  isActive
                                    ? 'bg-black text-[#C8A24A]'
                                    : item.badgeColor || 'bg-white/10 text-white/70'
                                }`}
                              >
                                {item.badge}
                              </span>
                            )}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </nav>
            </div>

            {/* Drawer Footer */}
            <div className="pt-4 border-t border-white/10 space-y-2">
              <button
                onClick={() => {
                  if (confirm('Reset all CMS datasets to default?')) {
                    onResetDefaults();
                    setIsMobileSidebarOpen(false);
                    showNotification('All datasets reset to default.');
                  }
                }}
                className="w-full py-2 rounded-lg border border-white/10 text-xs text-white/60 font-mono"
              >
                Reset Defaults
              </button>
              <button
                onClick={onClose}
                className="w-full py-2 rounded-full bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase"
              >
                Exit to Website
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ================= RIGHT MAIN CONTENT AREA ================= */}
      <div className="flex-1 min-w-0 h-full overflow-y-auto flex flex-col bg-[#080808]">
        
        {/* Contextual Top Bar for Active Section */}
        <header className="sticky top-0 z-30 flex items-center justify-between px-4 sm:px-8 py-3.5 bg-[#0a0a0a]/90 backdrop-blur-xl border-b border-white/10">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-[#C8A24A] uppercase tracking-wider">
                {activeTab === 'overview' && 'Operations Dashboard'}
                {activeTab === 'contacts' && 'CRM & Lead Management'}
                {activeTab === 'students' && 'Academy Cohort Portal'}
                {activeTab === 'curriculum' && 'Roadmap & Syllabus Visual Editor'}
                {activeTab === 'media-studio' && 'Hero Reel & Showcase Video Config'}
                {activeTab === 'projects' && 'Portfolio Case Studies CMS'}
                {activeTab === 'programs' && 'Academy Program Tracks'}
                {activeTab === 'testimonials' && 'Testimonials & Reviews'}
              </span>
            </div>
            <h1 className="text-base sm:text-lg font-cinzel font-semibold text-white">
              {activeTab === 'overview' && 'Business Overview & Health'}
              {activeTab === 'contacts' && `Client Inquiries (${contacts.length})`}
              {activeTab === 'students' && `Enrolled Students (${students.length})`}
              {activeTab === 'curriculum' && `Course Roadmap (${roadmap.length} Modules)`}
              {activeTab === 'media-studio' && 'Media Studio & Showreel Presets'}
              {activeTab === 'projects' && `Case Studies (${projects.length} Projects)`}
              {activeTab === 'programs' && 'Academy Offerings & Tuition'}
              {activeTab === 'testimonials' && `Endorsements (${testimonials.length})`}
            </h1>
          </div>

          <div className="flex items-center gap-3">
            {saveSuccessMsg && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-mono animate-fade-in">
                <Check size={13} />
                <span>{saveSuccessMsg}</span>
              </div>
            )}

            <button
              onClick={onClose}
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-white/20 hover:border-[#C8A24A] text-white/80 hover:text-white text-xs font-mono transition-all"
            >
              <ExternalLink size={13} className="text-[#C8A24A]" />
              <span>Preview Live Site</span>
            </button>
          </div>
        </header>

        {/* Main Content Body */}
        <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-8 w-full pb-28">

        {/* -------------------- TAB: OVERVIEW -------------------- */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-fade-in">
            {/* Top Stat KPI Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-white/50 text-xs font-mono">
                  <span>CLIENT INQUIRIES</span>
                  <Mail size={16} className="text-[#C8A24A]" />
                </div>
                <div className="text-3xl font-cinzel font-bold text-white">{stats.totalContacts}</div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-emerald-400 font-semibold">{stats.newLeads} new leads</span>
                  <span className="text-white/40">•</span>
                  <span className="text-[#C8A24A]">{stats.bookedLeads} booked</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-white/50 text-xs font-mono">
                  <span>ACTIVE STUDENTS</span>
                  <GraduationCap size={16} className="text-[#C8A24A]" />
                </div>
                <div className="text-3xl font-cinzel font-bold text-white">{stats.activeStudents}</div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-white/60">{stats.totalStudents} total enrolled</span>
                  <span className="text-white/40">•</span>
                  <span className="text-emerald-400">{stats.graduatedStudents} alumni</span>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-white/50 text-xs font-mono">
                  <span>ESTIMATED TUITION PIPELINE</span>
                  <DollarSign size={16} className="text-emerald-400" />
                </div>
                <div className="text-3xl font-cinzel font-bold text-emerald-400">
                  ${stats.totalTuitionEstimated.toLocaleString()}
                </div>
                <div className="text-xs font-mono text-white/50">Across active cohorts & mentorships</div>
              </div>

              <div className="p-5 rounded-2xl bg-[#111111] border border-white/10 space-y-2 relative overflow-hidden">
                <div className="flex items-center justify-between text-white/50 text-xs font-mono">
                  <span>PORTFOLIO & CURRICULUM</span>
                  <Film size={16} className="text-[#C8A24A]" />
                </div>
                <div className="text-3xl font-cinzel font-bold text-white">{stats.totalProjects}</div>
                <div className="flex items-center gap-2 text-xs font-mono">
                  <span className="text-[#C8A24A]">{stats.featuredProjects} featured cases</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/60">{stats.curriculumWeeks} roadmap weeks</span>
                </div>
              </div>
            </div>

            {/* Quick Actions Row */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-[#141414] to-[#1a1a1a] border border-[#C8A24A]/30">
              <div className="space-y-1">
                <h3 className="font-editorial text-lg text-white">Quick Production & Admin Actions</h3>
                <p className="text-xs text-white/60 font-body">Rapid shortcuts to manage incoming leads, student reviews, video swaps, and course roadmap.</p>
              </div>
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setActiveTab('contacts');
                    setIsNewContactModal(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#C8A24A] hover:text-black text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <Plus size={13} />
                  <span>Log Client Lead</span>
                </button>
                <button
                  onClick={() => {
                    setActiveTab('students');
                    setIsNewStudentModal(true);
                  }}
                  className="px-3.5 py-2 rounded-xl bg-white/10 hover:bg-[#C8A24A] hover:text-black text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <Plus size={13} />
                  <span>Enroll Student</span>
                </button>
                <button
                  onClick={() => setActiveTab('media-studio')}
                  className="px-3.5 py-2 rounded-xl bg-[#C8A24A]/20 text-[#C8A24A] border border-[#C8A24A]/40 hover:bg-[#C8A24A] hover:text-black text-xs font-mono uppercase tracking-wider transition-all flex items-center gap-1.5"
                >
                  <Video size={13} />
                  <span>Change Hero Videos</span>
                </button>
              </div>
            </div>

            {/* Split Stream: Recent Inquiries & Recent Students */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Recent Inquiries Feed */}
              <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Mail size={16} className="text-[#C8A24A]" />
                    <h3 className="font-editorial text-base text-white">Recent Client Inquiries</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('contacts')}
                    className="text-xs font-mono text-[#C8A24A] hover:underline flex items-center gap-1"
                  >
                    <span>View All ({contacts.length})</span>
                    <ChevronRight size={12} />
                  </button>
                </div>

                <div className="space-y-3">
                  {contacts.slice(0, 4).map((c) => (
                    <div
                      key={c.id}
                      onClick={() => {
                        setSelectedContact(c);
                        setActiveTab('contacts');
                      }}
                      className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#C8A24A]/40 transition-all cursor-pointer space-y-1.5"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{c.name}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                          c.status === 'new' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                          c.status === 'booked' ? 'bg-[#C8A24A]/20 text-[#C8A24A] border border-[#C8A24A]/30' :
                          'bg-white/10 text-white/70'
                        }`}>
                          {c.status}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
                        <span>{c.company}</span>
                        <span className="text-[#C8A24A]">{c.budget}</span>
                      </div>
                      <p className="text-xs text-white/70 line-clamp-1 font-body">{c.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent Student Enrollments Feed */}
              <div className="p-6 rounded-2xl bg-[#0f0f0f] border border-white/10 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <GraduationCap size={16} className="text-[#C8A24A]" />
                    <h3 className="font-editorial text-base text-white">Recent Student Cohorts</h3>
                  </div>
                  <button
                    onClick={() => setActiveTab('students')}
                    className="text-xs font-mono text-[#C8A24A] hover:underline flex items-center gap-1"
                  >
                    <span>View All ({students.length})</span>
                    <ChevronRight size={12} />
                  </button>
                </div>

                <div className="space-y-3">
                  {students.slice(0, 4).map((s) => (
                    <div
                      key={s.id}
                      onClick={() => {
                        setSelectedStudent(s);
                        setActiveTab('students');
                      }}
                      className="p-3.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/5 hover:border-[#C8A24A]/40 transition-all cursor-pointer space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-white">{s.fullName}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                          s.enrollmentStatus === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                          s.enrollmentStatus === 'graduated' ? 'bg-[#C8A24A]/20 text-[#C8A24A]' :
                          'bg-amber-500/20 text-amber-300'
                        }`}>
                          {s.enrollmentStatus}
                        </span>
                      </div>
                      <div className="flex items-center justify-between text-[11px] text-white/50 font-mono">
                        <span className="text-white/80">{s.programTitle}</span>
                        <span className="text-emerald-400">{s.tuitionAmount}</span>
                      </div>
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-white/40">
                          <span>Progress</span>
                          <span>{s.progressPercentage}%</span>
                        </div>
                        <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#C8A24A] to-emerald-400 rounded-full"
                            style={{ width: `${s.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* -------------------- TAB: CONTACTS & LEADS -------------------- */}
        {activeTab === 'contacts' && (
          <div className="space-y-6 animate-fade-in">
            {/* Header with Search, Filter & Actions */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl text-white">Client Inquiries & Project Briefs</h2>
                <p className="text-xs text-white/60 font-body">Manage prospective clients, commercial briefs, budget allocations, and follow-ups.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportContactsCSV}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-white/80 transition-all flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Export CSV</span>
                </button>
                <button
                  onClick={() => setIsNewContactModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-white transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Plus size={14} />
                  <span>Add Lead</span>
                </button>
              </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-[#111] border border-white/10">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search name, company, email, or brief keywords..."
                  value={contactSearch}
                  onChange={(e) => setContactSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:border-[#C8A24A] outline-none"
                />
              </div>

              <div className="flex items-center gap-1 text-xs font-mono">
                <Filter size={13} className="text-white/40 mr-1" />
                {(['all', 'new', 'contacted', 'in-discussion', 'booked', 'archived'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setContactFilter(st)}
                    className={`px-2.5 py-1 rounded-md text-[11px] uppercase transition-all ${
                      contactFilter === st
                        ? 'bg-[#C8A24A] text-black font-bold'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Contacts Table / Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* List Column */}
              <div className="lg:col-span-2 space-y-3">
                {filteredContacts.length === 0 ? (
                  <div className="p-12 text-center bg-[#111] rounded-2xl border border-white/10 space-y-2">
                    <Mail size={32} className="mx-auto text-white/30" />
                    <p className="text-sm text-white/60">No client inquiries found matching your filters.</p>
                  </div>
                ) : (
                  filteredContacts.map((c) => (
                    <div
                      key={c.id}
                      onClick={() => setSelectedContact(c)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer space-y-2 ${
                        selectedContact?.id === c.id
                          ? 'bg-[#181818] border-[#C8A24A] shadow-lg'
                          : 'bg-[#111111] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{c.name}</span>
                            <span className="text-xs font-mono text-[#C8A24A]">@{c.company}</span>
                          </div>
                          <span className="text-[11px] font-mono text-white/50">{c.email}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="text-xs font-mono font-bold text-emerald-400">{c.budget}</span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            c.status === 'new' ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' :
                            c.status === 'booked' ? 'bg-[#C8A24A]/20 text-[#C8A24A] border border-[#C8A24A]/30' :
                            c.status === 'in-discussion' ? 'bg-blue-500/20 text-blue-400' :
                            'bg-white/10 text-white/60'
                          }`}>
                            {c.status}
                          </span>
                        </div>
                      </div>

                      <p className="text-xs text-white/70 line-clamp-2 font-body leading-relaxed">{c.description}</p>

                      <div className="flex items-center justify-between text-[10px] font-mono text-white/40 pt-1 border-t border-white/5">
                        <span>Format: <strong className="text-white/70">{c.projectType}</strong></span>
                        <span>{c.date}</span>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Detail / Action Sidebar */}
              <div className="lg:col-span-1">
                {selectedContact ? (
                  <div className="sticky top-28 p-6 rounded-2xl bg-[#121212] border border-white/15 space-y-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#C8A24A] uppercase">LEAD DETAILS</span>
                        <h3 className="font-editorial text-xl text-white">{selectedContact.name}</h3>
                        <p className="text-xs font-mono text-white/60">{selectedContact.company}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteContact(selectedContact.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Delete Inquiry"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="space-y-2 text-xs font-mono bg-black/40 p-3.5 rounded-xl border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-white/40">Email:</span>
                        <a href={`mailto:${selectedContact.email}`} className="text-[#C8A24A] hover:underline">
                          {selectedContact.email}
                        </a>
                      </div>
                      {selectedContact.phone && (
                        <div className="flex justify-between">
                          <span className="text-white/40">Phone:</span>
                          <span className="text-white/80">{selectedContact.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-white/40">Budget:</span>
                        <span className="text-emerald-400 font-bold">{selectedContact.budget}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Format:</span>
                        <span className="text-white/80">{selectedContact.projectType}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Received:</span>
                        <span className="text-white/80">{selectedContact.date}</span>
                      </div>
                    </div>

                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/50 uppercase">Project Scope / Brief</label>
                      <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs text-white/80 leading-relaxed font-body max-h-36 overflow-y-auto">
                        {selectedContact.description}
                      </div>
                    </div>

                    {/* Status Update Buttons */}
                    <div className="space-y-2">
                      <label className="text-xs font-mono text-white/50 uppercase">Update Status</label>
                      <div className="grid grid-cols-2 gap-1.5 text-xs font-mono">
                        {(['new', 'contacted', 'in-discussion', 'booked'] as ContactStatus[]).map((st) => (
                          <button
                            key={st}
                            onClick={() => handleUpdateContactStatus(selectedContact.id, st)}
                            className={`py-1.5 px-2 rounded-lg capitalize border transition-all text-center ${
                              selectedContact.status === st
                                ? 'bg-[#C8A24A] text-black font-bold border-[#C8A24A]'
                                : 'bg-white/5 border-white/10 text-white/70 hover:bg-white/10'
                            }`}
                          >
                            {st.replace('-', ' ')}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Admin Internal Notes */}
                    <div className="space-y-1.5">
                      <label className="text-xs font-mono text-white/50 uppercase">Internal Notes</label>
                      <textarea
                        rows={3}
                        defaultValue={selectedContact.notes || ''}
                        onBlur={(e) => handleUpdateContactNotes(selectedContact.id, e.target.value)}
                        placeholder="Add production notes, schedule links, rate agreements..."
                        className="w-full p-2.5 rounded-xl bg-white/5 border border-white/10 text-xs text-white placeholder-white/30 focus:border-[#C8A24A] outline-none resize-none"
                      />
                    </div>

                    <a
                      href={`mailto:${selectedContact.email}?subject=DAMCA%20Creative%20Production%20Inquiry%20-%20${encodeURIComponent(selectedContact.company)}`}
                      className="w-full py-2.5 rounded-xl bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-white transition-all shadow-md"
                    >
                      <Mail size={13} />
                      <span>Reply to Client</span>
                    </a>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#121212] rounded-2xl border border-white/10 space-y-2">
                    <FileText size={28} className="mx-auto text-white/30" />
                    <p className="text-xs text-white/50 font-mono">Select an inquiry from the left to view full brief details and update pipeline status.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* -------------------- TAB: STUDENTS & COHORTS -------------------- */}
        {activeTab === 'students' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl text-white">Registered Students & Cohort Roster</h2>
                <p className="text-xs text-white/60 font-body">Track student progress, assigned mentors, tuition payments, and graduation reels.</p>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={exportStudentsCSV}
                  className="px-3.5 py-2 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-xs font-mono text-white/80 transition-all flex items-center gap-1.5"
                >
                  <Download size={13} />
                  <span>Export Roster CSV</span>
                </button>
                <button
                  onClick={() => setIsNewStudentModal(true)}
                  className="px-4 py-2 rounded-xl bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-white transition-all flex items-center gap-1.5 shadow-md"
                >
                  <Plus size={14} />
                  <span>Enroll Student</span>
                </button>
              </div>
            </div>

            {/* Search & Filter Toolbar */}
            <div className="flex flex-wrap items-center gap-3 p-3 rounded-xl bg-[#111] border border-white/10">
              <div className="relative flex-1 min-w-[200px]">
                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40" />
                <input
                  type="text"
                  placeholder="Search student name, email, track, or mentor..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white placeholder-white/40 focus:border-[#C8A24A] outline-none"
                />
              </div>

              <div className="flex items-center gap-1 text-xs font-mono">
                {(['all', 'applied', 'onboarding', 'active', 'graduated'] as const).map((st) => (
                  <button
                    key={st}
                    onClick={() => setStudentFilter(st)}
                    className={`px-2.5 py-1 rounded-md text-[11px] uppercase transition-all ${
                      studentFilter === st
                        ? 'bg-[#C8A24A] text-black font-bold'
                        : 'bg-white/5 text-white/60 hover:text-white'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>

            {/* Students Table / Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2 space-y-3">
                {filteredStudents.length === 0 ? (
                  <div className="p-12 text-center bg-[#111] rounded-2xl border border-white/10 space-y-2">
                    <GraduationCap size={32} className="mx-auto text-white/30" />
                    <p className="text-sm text-white/60">No students found matching your filters.</p>
                  </div>
                ) : (
                  filteredStudents.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedStudent(s)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer space-y-3 ${
                        selectedStudent?.id === s.id
                          ? 'bg-[#181818] border-[#C8A24A] shadow-lg'
                          : 'bg-[#111111] border-white/10 hover:border-white/20'
                      }`}
                    >
                      <div className="flex items-start justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-semibold text-white">{s.fullName}</span>
                            <span className="text-xs font-mono text-[#C8A24A]">{s.tuitionAmount}</span>
                          </div>
                          <span className="text-[11px] font-mono text-white/50">{s.email}</span>
                        </div>

                        <div className="flex items-center gap-1.5">
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            s.paymentPreference === 'paid' ? 'bg-emerald-500/20 text-emerald-400' :
                            s.paymentPreference === 'installment' ? 'bg-blue-500/20 text-blue-300' :
                            'bg-amber-500/20 text-amber-300'
                          }`}>
                            {s.paymentPreference}
                          </span>
                          <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase font-semibold ${
                            s.enrollmentStatus === 'active' ? 'bg-emerald-500/20 text-emerald-400' :
                            s.enrollmentStatus === 'graduated' ? 'bg-[#C8A24A]/20 text-[#C8A24A]' :
                            'bg-white/10 text-white/60'
                          }`}>
                            {s.enrollmentStatus}
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between text-xs font-mono text-white/70">
                        <span>Track: <strong className="text-white">{s.programTitle}</strong></span>
                        <span>Mentor: <strong className="text-[#C8A24A]">{s.assignedMentor || 'Unassigned'}</strong></span>
                      </div>

                      {/* Progress Bar with Quick Controls */}
                      <div className="space-y-1">
                        <div className="flex justify-between text-[10px] font-mono text-white/40">
                          <span>Curriculum Completion</span>
                          <span className="text-[#C8A24A] font-bold">{s.progressPercentage}%</span>
                        </div>
                        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                          <div
                            className="h-full bg-gradient-to-r from-[#C8A24A] to-emerald-400 transition-all duration-300 rounded-full"
                            style={{ width: `${s.progressPercentage}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              {/* Student Detail & Progression Manager */}
              <div className="lg:col-span-1">
                {selectedStudent ? (
                  <div className="sticky top-28 p-6 rounded-2xl bg-[#121212] border border-white/15 space-y-5">
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-[10px] font-mono text-[#C8A24A] uppercase">STUDENT PROFILE</span>
                        <h3 className="font-editorial text-xl text-white">{selectedStudent.fullName}</h3>
                        <p className="text-xs font-mono text-white/60">{selectedStudent.programTitle}</p>
                      </div>
                      <button
                        onClick={() => handleDeleteStudent(selectedStudent.id)}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 transition-colors"
                        title="Remove Student"
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>

                    <div className="space-y-2 text-xs font-mono bg-black/40 p-3.5 rounded-xl border border-white/5">
                      <div className="flex justify-between">
                        <span className="text-white/40">Email:</span>
                        <span className="text-white">{selectedStudent.email}</span>
                      </div>
                      {selectedStudent.phone && (
                        <div className="flex justify-between">
                          <span className="text-white/40">WhatsApp/Phone:</span>
                          <span className="text-white">{selectedStudent.phone}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span className="text-white/40">Enrolled Date:</span>
                        <span className="text-white">{selectedStudent.registeredDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/40">Tuition:</span>
                        <span className="text-emerald-400 font-bold">{selectedStudent.tuitionAmount}</span>
                      </div>
                    </div>

                    {/* Progress Slider */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs font-mono">
                        <label className="text-white/60">Module Progress</label>
                        <span className="text-[#C8A24A] font-bold">{selectedStudent.progressPercentage}%</span>
                      </div>
                      <input
                        type="range"
                        min="0"
                        max="100"
                        step="5"
                        value={selectedStudent.progressPercentage}
                        onChange={(e) => handleUpdateStudentProgress(selectedStudent.id, parseInt(e.target.value, 10))}
                        className="w-full accent-[#C8A24A] cursor-pointer"
                      />
                    </div>

                    {/* Status Selectors */}
                    <div className="grid grid-cols-2 gap-3">
                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-white/50 uppercase">Status</label>
                        <select
                          value={selectedStudent.enrollmentStatus}
                          onChange={(e) => handleUpdateStudentStatus(selectedStudent.id, e.target.value as EnrollmentStatus)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none"
                        >
                          <option value="applied">Applied</option>
                          <option value="onboarding">Onboarding</option>
                          <option value="active">Active Student</option>
                          <option value="graduated">Graduated</option>
                          <option value="dropped">Dropped</option>
                        </select>
                      </div>

                      <div className="space-y-1">
                        <label className="text-[10px] font-mono text-white/50 uppercase">Payment</label>
                        <select
                          value={selectedStudent.paymentPreference}
                          onChange={(e) => handleUpdateStudentPayment(selectedStudent.id, e.target.value as PaymentStatus)}
                          className="w-full px-2.5 py-1.5 rounded-lg bg-[#1a1a1a] border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none"
                        >
                          <option value="paid">Paid in Full</option>
                          <option value="installment">Installment Active</option>
                          <option value="pending">Pending</option>
                          <option value="scholarship">Scholarship / Grant</option>
                        </select>
                      </div>
                    </div>

                    {/* Showreel Link */}
                    {selectedStudent.showreelUrl && (
                      <a
                        href={selectedStudent.showreelUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between p-3 rounded-xl bg-[#C8A24A]/10 border border-[#C8A24A]/30 text-xs text-[#C8A24A] hover:bg-[#C8A24A] hover:text-black transition-all"
                      >
                        <span className="flex items-center gap-1.5">
                          <Play size={13} />
                          <span>Student Graduation Reel</span>
                        </span>
                        <ExternalLink size={13} />
                      </a>
                    )}

                    <a
                      href={`mailto:${selectedStudent.email}?subject=DAMCA%20Academy%20Mentorship%20Update`}
                      className="w-full py-2.5 rounded-xl bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-white transition-all shadow-md"
                    >
                      <Mail size={13} />
                      <span>Send Mentorship Email</span>
                    </a>
                  </div>
                ) : (
                  <div className="p-8 text-center bg-[#121212] rounded-2xl border border-white/10 space-y-2">
                    <GraduationCap size={28} className="mx-auto text-white/30" />
                    <p className="text-xs text-white/50 font-mono">Select a student on the left to view profile metrics, update progress percentage, or issue graduation status.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* -------------------- TAB: CURRICULUM ROADMAP -------------------- */}
        {activeTab === 'curriculum' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl text-white">DAMCA 8-Week Course Roadmap & Curriculum</h2>
                <p className="text-xs text-white/60 font-body">Update weekly learning modules, topics, primary tool stack, deliverables, and resource files in real-time.</p>
              </div>

              <button
                onClick={() => {
                  const nextNum = (roadmap.length + 1).toString().padStart(2, '0');
                  setEditingWeek({
                    weekNumber: nextNum,
                    title: 'New Masterclass Module',
                    description: 'Advanced production and workflow topic.',
                    topics: ['Core topic 1', 'Advanced technique 2', 'Industry workflow 3'],
                    tool: 'DaVinci Resolve / After Effects',
                    deliverable: 'Master Capstone Project Export',
                    resourceLink: 'https://damca.academy/assets/masterclass.zip'
                  });
                  setIsCreatingNewWeek(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-white transition-all flex items-center gap-1.5 shadow-md"
              >
                <Plus size={14} />
                <span>Add Curriculum Week</span>
              </button>
            </div>

            {/* Curriculum Modules Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {roadmap.map((week) => (
                <div
                  key={week.weekNumber}
                  className="p-5 rounded-2xl bg-[#111111] border border-white/10 hover:border-[#C8A24A]/40 transition-all space-y-4 relative group"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-[#C8A24A]/15 border border-[#C8A24A]/40 flex items-center justify-center font-cinzel text-sm font-bold text-[#C8A24A]">
                        {week.weekNumber}
                      </div>
                      <div>
                        <h3 className="text-base font-semibold text-white">{week.title}</h3>
                        <span className="text-xs font-mono text-[#C8A24A]">{week.tool}</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5 opacity-80 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => {
                          setEditingWeek(JSON.parse(JSON.stringify(week)));
                          setIsCreatingNewWeek(false);
                        }}
                        className="p-2 rounded-lg bg-white/5 hover:bg-[#C8A24A] hover:text-black text-white/80 transition-all"
                        title="Edit Module"
                      >
                        <Edit3 size={14} />
                      </button>
                      <button
                        onClick={() => handleDeleteWeek(week.weekNumber)}
                        className="p-2 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 transition-all"
                        title="Delete Module"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>

                  <p className="text-xs text-white/70 font-body leading-relaxed">{week.description}</p>

                  {/* Topics Tags */}
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-white/40 uppercase">Topics Covered:</span>
                    <div className="flex flex-wrap gap-1.5">
                      {week.topics.map((t, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 rounded bg-white/5 border border-white/10 text-[11px] text-white/80 font-mono"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Deliverable & Resource */}
                  {week.deliverable && (
                    <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono">
                      <span className="text-white/40">Deliverable: <strong className="text-emerald-400">{week.deliverable}</strong></span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- TAB: MEDIA & VIDEO STUDIO -------------------- */}
        {activeTab === 'media-studio' && (
          <div className="space-y-8 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl text-white">Hero & Background Video Studio</h2>
                <p className="text-xs text-white/60 font-body">Directly change background hero showreels, landing teasers, and preview videos across the website.</p>
              </div>

              <button
                onClick={handleSaveMedia}
                className="px-5 py-2.5 rounded-full bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-white transition-all flex items-center gap-2 shadow-lg"
              >
                <Save size={15} />
                <span>{mediaSaved ? 'Saved & Live!' : 'Save All Video Configs'}</span>
              </button>
            </div>

            {/* Quick Media Presets Vault */}
            <div className="p-6 rounded-2xl bg-[#121212] border border-[#C8A24A]/30 space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Sparkles size={16} className="text-[#C8A24A]" />
                  <h3 className="font-editorial text-lg text-white">Quick Royalty-Free Cinema Preset Vault</h3>
                </div>
                <span className="text-xs font-mono text-[#C8A24A]">1-Click Slot Assignment</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {CURATED_MEDIA_PRESETS.map((preset, idx) => (
                  <div
                    key={idx}
                    className="p-3.5 rounded-xl bg-black/50 border border-white/10 space-y-3 hover:border-[#C8A24A]/40 transition-all"
                  >
                    <div className="relative aspect-video rounded-lg overflow-hidden border border-white/10 bg-black">
                      <img
                        src={preset.poster}
                        alt={preset.title}
                        className="w-full h-full object-cover"
                      />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#C8A24A]">
                        {preset.tag}
                      </span>
                    </div>

                    <div>
                      <h4 className="text-xs font-semibold text-white">{preset.title}</h4>
                      <p className="text-[10px] font-mono text-white/40 truncate">{preset.url}</p>
                    </div>

                    <div className="grid grid-cols-2 gap-1.5 text-[10px] font-mono">
                      <button
                        onClick={() => applyMediaPresetToField('portfolioHeroVideoUrl', preset.url, preset.poster)}
                        className="py-1 px-2 rounded bg-white/5 hover:bg-[#C8A24A] hover:text-black text-white/80 transition-colors"
                      >
                        Set Portfolio Hero
                      </button>
                      <button
                        onClick={() => applyMediaPresetToField('academyHeroVideoUrl', preset.url, preset.poster)}
                        className="py-1 px-2 rounded bg-white/5 hover:bg-[#C8A24A] hover:text-black text-white/80 transition-colors"
                      >
                        Set Academy Hero
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Video Slot Editors with Live Players */}
            <form onSubmit={handleSaveMedia} className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* 1. Portfolio Hero Reel */}
                <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-lg text-white">Portfolio Hero Showreel Video</h3>
                    <span className="px-2 py-0.5 rounded bg-[#C8A24A]/10 text-[#C8A24A] text-[10px] font-mono">
                      Main Portfolio Top
                    </span>
                  </div>

                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                    <video
                      src={localMediaConfig.portfolioHeroVideoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/70">Video MP4 URL</label>
                      <input
                        type="url"
                        required
                        value={localMediaConfig.portfolioHeroVideoUrl}
                        onChange={(e) => setLocalMediaConfig({ ...localMediaConfig, portfolioHeroVideoUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/70">Poster / Fallback Image URL</label>
                      <input
                        type="url"
                        value={localMediaConfig.portfolioHeroPoster}
                        onChange={(e) => setLocalMediaConfig({ ...localMediaConfig, portfolioHeroPoster: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 2. Academy Hero Trailer */}
                <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-lg text-white">Academy Hero Trailer Video</h3>
                    <span className="px-2 py-0.5 rounded bg-[#C8A24A]/10 text-[#C8A24A] text-[10px] font-mono">
                      Academy Top Reel
                    </span>
                  </div>

                  <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10">
                    <video
                      src={localMediaConfig.academyHeroVideoUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/70">Video MP4 URL</label>
                      <input
                        type="url"
                        required
                        value={localMediaConfig.academyHeroVideoUrl}
                        onChange={(e) => setLocalMediaConfig({ ...localMediaConfig, academyHeroVideoUrl: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/70">Poster / Fallback Image URL</label>
                      <input
                        type="url"
                        value={localMediaConfig.academyHeroPoster}
                        onChange={(e) => setLocalMediaConfig({ ...localMediaConfig, academyHeroPoster: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 3. Split Landing Left Panel Media */}
                <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-lg text-white">Split Landing Left Panel (Portfolio)</h3>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 text-[10px] font-mono">Landing View</span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/70">Background Image URL</label>
                      <input
                        type="url"
                        value={localMediaConfig.splitLandingPortfolioImage}
                        onChange={(e) => setLocalMediaConfig({ ...localMediaConfig, splitLandingPortfolioImage: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/70">Optional Background Video URL</label>
                      <input
                        type="url"
                        value={localMediaConfig.splitLandingPortfolioVideo}
                        onChange={(e) => setLocalMediaConfig({ ...localMediaConfig, splitLandingPortfolioVideo: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>

                {/* 4. Split Landing Right Panel Media */}
                <div className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="font-editorial text-lg text-white">Split Landing Right Panel (Academy)</h3>
                    <span className="px-2 py-0.5 rounded bg-white/10 text-white/80 text-[10px] font-mono">Landing View</span>
                  </div>

                  <div className="space-y-3">
                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/70">Background Image URL</label>
                      <input
                        type="url"
                        value={localMediaConfig.splitLandingAcademyImage}
                        onChange={(e) => setLocalMediaConfig({ ...localMediaConfig, splitLandingAcademyImage: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-mono text-white/70">Optional Background Video URL</label>
                      <input
                        type="url"
                        value={localMediaConfig.splitLandingAcademyVideo}
                        onChange={(e) => setLocalMediaConfig({ ...localMediaConfig, splitLandingAcademyVideo: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="px-8 py-3 rounded-full bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-widest hover:bg-white transition-all shadow-xl"
                >
                  Save Video Configurations
                </button>
              </div>
            </form>
          </div>
        )}

        {/* -------------------- TAB: PROJECTS CMS -------------------- */}
        {activeTab === 'projects' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl text-white">Portfolio Case Studies & Video Projects</h2>
                <p className="text-xs text-white/60 font-body">Create, edit, grade, and publish interactive video case studies with before/after sliders.</p>
              </div>

              <button
                onClick={() => {
                  const newProj: Project = {
                    id: `project-${Date.now()}`,
                    title: 'New Commercial Campaign',
                    client: 'Studio Client',
                    category: 'Commercial',
                    shortDescription: 'High-impact cinematic cut crafted with dynamic pacing and custom grade.',
                    duration: '01:45',
                    year: '2026',
                    softwareUsed: ['Premiere Pro', 'DaVinci Resolve', 'After Effects'],
                    thumbnail: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop',
                    videoPreviewUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-track-41551-large.mp4',
                    heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-track-41551-large.mp4',
                    featured: true,
                    caseStudy: {
                      heroVideoUrl: 'https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-track-41551-large.mp4',
                      overview: 'A high-impact campaign engineered to capture brand essence.',
                      challenge: 'Navigating tight deadlines and diverse multi-cam lighting conditions.',
                      creativeProcess: 'Designed a rhythm-first pacing structure to maximize emotional engagement.',
                      editingWorkflow: [
                        'Organized 4K raw footage and proxy generation',
                        'Acoustic sound design and pacing cut',
                        'Fine color calibration in DaVinci Resolve',
                        'Broadcast master exports'
                      ],
                      motionGraphicsSummary: 'Clean bespoke typography and logo animations.',
                      colorGradingSummary: 'Rich film emulation grade with warm gold highlights and deep blacks.',
                      audioDesignSummary: 'Multi-layer sound design with stereo foley.',
                      beforeAfter: {
                        beforeLabel: 'Raw Flat S-Log',
                        afterLabel: 'Final Grade',
                        beforeImage: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1000&auto=format&fit=crop',
                        afterImage: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1000&auto=format&fit=crop',
                        description: 'Film emulation and highlight recovery.'
                      },
                      results: ['2.5M+ Views', '42% Higher Retention']
                    }
                  };
                  setEditingProject(newProj);
                  setIsCreatingNewProject(true);
                }}
                className="px-4 py-2 rounded-xl bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-white transition-all flex items-center gap-1.5 shadow-md"
              >
                <Plus size={14} />
                <span>Add Case Study</span>
              </button>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((proj) => (
                <div
                  key={proj.id}
                  className="rounded-2xl bg-[#111] border border-white/10 hover:border-[#C8A24A]/40 overflow-hidden flex flex-col justify-between transition-all group"
                >
                  <div className="relative aspect-video bg-black overflow-hidden">
                    <img
                      src={proj.thumbnail}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 left-2 flex items-center gap-1">
                      <span className="px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-[#C8A24A]">
                        {proj.category}
                      </span>
                      {proj.featured && (
                        <span className="px-2 py-0.5 rounded bg-[#C8A24A] text-black text-[10px] font-mono font-bold">
                          FEATURED
                        </span>
                      )}
                    </div>
                    <span className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/80 text-[10px] font-mono text-white/80">
                      {proj.duration}
                    </span>
                  </div>

                  <div className="p-5 space-y-3 flex-1 flex flex-col justify-between">
                    <div className="space-y-1">
                      <span className="text-[11px] font-mono text-[#C8A24A]">{proj.client} • {proj.year}</span>
                      <h3 className="font-editorial text-base text-white line-clamp-1">{proj.title}</h3>
                      <p className="text-xs text-white/60 line-clamp-2 font-body">{proj.shortDescription}</p>
                    </div>

                    <div className="pt-3 border-t border-white/5 flex items-center justify-between">
                      <button
                        onClick={() => onPreviewProject(proj)}
                        className="text-xs font-mono text-[#C8A24A] hover:underline flex items-center gap-1"
                      >
                        <Eye size={13} />
                        <span>Preview Case</span>
                      </button>

                      <div className="flex items-center gap-1.5">
                        <button
                          onClick={() => {
                            setEditingProject(JSON.parse(JSON.stringify(proj)));
                            setIsCreatingNewProject(false);
                          }}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-[#C8A24A] hover:text-black text-white/80 transition-all"
                          title="Edit Project"
                        >
                          <Edit3 size={14} />
                        </button>
                        <button
                          onClick={() => handleDeleteProject(proj.id)}
                          className="p-1.5 rounded-lg bg-white/5 hover:bg-rose-500/20 text-rose-400 transition-all"
                          title="Delete Project"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- TAB: ACADEMY TRACKS -------------------- */}
        {activeTab === 'programs' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl text-white">Academy Tracks & Programs</h2>
                <p className="text-xs text-white/60 font-body">Manage curriculum track offerings, tuition costs, duration, and skills taught.</p>
              </div>

              <button
                onClick={() => {
                  const newProg: AcademyProgram = {
                    id: `prog-${Date.now()}`,
                    number: (programs.length + 1).toString().padStart(2, '0'),
                    title: 'New Specialized Masterclass',
                    duration: '4 Weeks',
                    level: 'Intermediate',
                    description: 'Hands-on training track focused on advanced post-production.',
                    skills: ['DaVinci Resolve', 'Commercial Pacing', 'Sound Foley'],
                    price: '$850',
                    isPopular: false
                  };
                  onSavePrograms([...programs, newProg]);
                  showNotification('New program track added.');
                }}
                className="px-4 py-2 rounded-xl bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-white transition-all flex items-center gap-1.5 shadow-md"
              >
                <Plus size={14} />
                <span>Add Program Track</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {programs.map((prog) => (
                <div
                  key={prog.id}
                  className="p-6 rounded-2xl bg-[#111] border border-white/10 space-y-4 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-cinzel text-sm font-bold text-[#C8A24A]">TRACK {prog.number}</span>
                      <span className="text-sm font-mono font-bold text-emerald-400">{prog.price}</span>
                    </div>
                    <h3 className="font-editorial text-xl text-white">{prog.title}</h3>
                    <div className="flex items-center gap-2 text-xs font-mono text-white/50">
                      <span>{prog.duration}</span>
                      <span>•</span>
                      <span>{prog.level}</span>
                    </div>
                    <p className="text-xs text-white/70 font-body leading-relaxed">{prog.description}</p>
                  </div>

                  <div className="space-y-3 pt-3 border-t border-white/5">
                    <div className="flex flex-wrap gap-1">
                      {prog.skills.map((sk, idx) => (
                        <span key={idx} className="px-2 py-0.5 rounded bg-white/5 text-[10px] font-mono text-white/70">
                          {sk}
                        </span>
                      ))}
                    </div>

                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => {
                          const updated = programs.filter((p) => p.id !== prog.id);
                          onSavePrograms(updated);
                          showNotification('Program track removed.');
                        }}
                        className="p-1.5 rounded-lg text-rose-400 hover:bg-rose-500/20 text-xs font-mono transition-all flex items-center gap-1"
                      >
                        <Trash2 size={13} />
                        <span>Delete</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* -------------------- TAB: TESTIMONIALS -------------------- */}
        {activeTab === 'testimonials' && (
          <div className="space-y-6 animate-fade-in">
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
              <div>
                <h2 className="font-editorial text-2xl text-white">Client & Student Testimonials</h2>
                <p className="text-xs text-white/60 font-body">Manage social proof quotes, company roles, ratings, and endorsements.</p>
              </div>

              <button
                onClick={() => {
                  const newT: Testimonial = {
                    id: `t-${Date.now()}`,
                    name: 'New Client / Alumni',
                    role: 'Creative Director',
                    company: 'Brand Agency',
                    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop',
                    quote: 'Working with DAMCA elevated our entire video production standard.',
                    projectOrCourse: 'Commercial Campaign',
                    type: 'portfolio',
                    rating: 5
                  };
                  onSaveTestimonials([newT, ...testimonials]);
                  showNotification('New testimonial added.');
                }}
                className="px-4 py-2 rounded-xl bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-wider hover:bg-white transition-all flex items-center gap-1.5 shadow-md"
              >
                <Plus size={14} />
                <span>Add Testimonial</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {testimonials.map((t) => (
                <div
                  key={t.id}
                  className="p-5 rounded-2xl bg-[#111] border border-white/10 space-y-3 flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <img
                          src={t.avatar}
                          alt={t.name}
                          className="w-10 h-10 rounded-full object-cover border border-[#C8A24A]/40"
                        />
                        <div>
                          <h4 className="text-sm font-semibold text-white">{t.name}</h4>
                          <p className="text-[11px] font-mono text-[#C8A24A]">{t.role} • {t.company}</p>
                        </div>
                      </div>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono uppercase ${
                        t.type === 'student' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-blue-500/20 text-blue-400'
                      }`}>
                        {t.type}
                      </span>
                    </div>

                    <p className="text-xs text-white/80 italic font-body">"{t.quote}"</p>
                  </div>

                  <div className="pt-2 border-t border-white/5 flex items-center justify-between text-[11px] font-mono text-white/50">
                    <span>{t.projectOrCourse}</span>
                    <button
                      onClick={() => {
                        const updated = testimonials.filter((item) => item.id !== t.id);
                        onSaveTestimonials(updated);
                        showNotification('Testimonial deleted.');
                      }}
                      className="text-rose-400 hover:underline flex items-center gap-1"
                    >
                      <Trash2 size={12} />
                      <span>Remove</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* ================= 4. MODALS ================= */}

      {/* MODAL: ADD CLIENT LEAD MANUALLY */}
      {isNewContactModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#141414] border border-[#C8A24A]/40 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-xl text-white">Log New Client Lead</h3>
              <button onClick={() => setIsNewContactModal(false)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateContact} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Client Name</label>
                  <input name="name" required placeholder="Alex Vance" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Company / Brand</label>
                  <input name="company" required placeholder="Apex Media" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Email Address</label>
                  <input name="email" type="email" required placeholder="alex@brand.com" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Phone / WhatsApp</label>
                  <input name="phone" placeholder="+1 555 0199" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Estimated Budget</label>
                  <select name="budget" className="w-full px-3 py-2 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none">
                    <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                    <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                    <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                    <option value="$10,000+">$10,000+ (Enterprise)</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Project Type</label>
                  <select name="projectType" className="w-full px-3 py-2 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none">
                    {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70">Project Scope Description</label>
                <textarea name="description" rows={3} required placeholder="Deliverables, deadlines, footage format..." className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none resize-none" />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-widest hover:bg-white transition-all shadow-md"
              >
                Save Inquiry to Pipeline
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: ENROLL STUDENT MANUALLY */}
      {isNewStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-lg rounded-2xl bg-[#141414] border border-[#C8A24A]/40 p-6 space-y-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-xl text-white">Enroll Student in Cohort</h3>
              <button onClick={() => setIsNewStudentModal(false)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreateStudent} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70">Full Name</label>
                <input name="fullName" required placeholder="Jordan Hayes" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none" />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Email Address</label>
                  <input name="email" type="email" required placeholder="jordan@gmail.com" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none" />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Phone / WhatsApp</label>
                  <input name="phone" placeholder="+1 555 8392" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Selected Track</label>
                  <select name="programId" className="w-full px-3 py-2 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none">
                    {programs.map((p) => <option key={p.id} value={p.id}>{p.title} ({p.price})</option>)}
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Payment Status</label>
                  <select name="paymentPreference" className="w-full px-3 py-2 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none">
                    <option value="paid">Paid in Full</option>
                    <option value="installment">Installment Plan</option>
                    <option value="scholarship">Scholarship / Aid</option>
                    <option value="pending">Pending</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Assigned Mentor</label>
                  <input name="assignedMentor" defaultValue="DAMCA Lead Director" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none" />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Initial Progress %</label>
                  <input name="progressPercentage" type="number" min="0" max="100" defaultValue="15" className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-widest hover:bg-white transition-all shadow-md"
              >
                Enroll Student to Cohort
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT CURRICULUM WEEK */}
      {editingWeek && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-xl rounded-2xl bg-[#141414] border border-[#C8A24A]/40 p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-xl text-white">
                {isCreatingNewWeek ? 'Add Curriculum Week' : `Edit Week ${editingWeek.weekNumber}`}
              </h3>
              <button onClick={() => setEditingWeek(null)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveWeek} className="space-y-4">
              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Week Number</label>
                  <input
                    value={editingWeek.weekNumber}
                    onChange={(e) => setEditingWeek({ ...editingWeek, weekNumber: e.target.value })}
                    required
                    placeholder="01"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                  />
                </div>
                <div className="col-span-2 space-y-1">
                  <label className="text-xs font-mono text-white/70">Module Title</label>
                  <input
                    value={editingWeek.title}
                    onChange={(e) => setEditingWeek({ ...editingWeek, title: e.target.value })}
                    required
                    placeholder="Color Grading & Science"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70">Description / Focus</label>
                <textarea
                  rows={2}
                  value={editingWeek.description}
                  onChange={(e) => setEditingWeek({ ...editingWeek, description: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none resize-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70">Primary Software / Tool</label>
                <input
                  value={editingWeek.tool}
                  onChange={(e) => setEditingWeek({ ...editingWeek, tool: e.target.value })}
                  required
                  placeholder="DaVinci Resolve Studio / After Effects"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70">Topics (Comma separated)</label>
                <input
                  value={editingWeek.topics.join(', ')}
                  onChange={(e) => setEditingWeek({
                    ...editingWeek,
                    topics: e.target.value.split(',').map((t) => t.trim()).filter(Boolean)
                  })}
                  placeholder="Exposure balancing, Film curves, LUT crafting"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                />
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70">Weekly Deliverable Homework</label>
                <input
                  value={editingWeek.deliverable || ''}
                  onChange={(e) => setEditingWeek({ ...editingWeek, deliverable: e.target.value })}
                  placeholder="Color Graded Commercial Cut with Before/After Stills"
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-widest hover:bg-white transition-all shadow-md"
              >
                Save & Publish Module
              </button>
            </form>
          </div>
        </div>
      )}

      {/* MODAL: EDIT PROJECT CASE STUDY */}
      {editingProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-3xl rounded-2xl bg-[#141414] border border-[#C8A24A]/40 p-6 space-y-5 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3 className="font-editorial text-xl text-white">
                {isCreatingNewProject ? 'Create New Case Study' : `Edit: ${editingProject.title}`}
              </h3>
              <button onClick={() => setEditingProject(null)} className="text-white/50 hover:text-white">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveProject} className="space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Project Title</label>
                  <input
                    value={editingProject.title}
                    onChange={(e) => setEditingProject({ ...editingProject, title: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Client Name</label>
                  <input
                    value={editingProject.client}
                    onChange={(e) => setEditingProject({ ...editingProject, client: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Category</label>
                  <select
                    value={editingProject.category}
                    onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as ProjectCategory })}
                    className="w-full px-3 py-2 rounded-lg bg-[#1c1c1c] border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none"
                  >
                    {CATEGORIES.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Duration</label>
                  <input
                    value={editingProject.duration}
                    onChange={(e) => setEditingProject({ ...editingProject, duration: e.target.value })}
                    placeholder="01:45"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Year</label>
                  <input
                    value={editingProject.year}
                    onChange={(e) => setEditingProject({ ...editingProject, year: e.target.value })}
                    placeholder="2026"
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Thumbnail Image URL</label>
                  <input
                    value={editingProject.thumbnail}
                    onChange={(e) => setEditingProject({ ...editingProject, thumbnail: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-mono text-white/70">Video Preview MP4 URL</label>
                  <input
                    value={editingProject.videoPreviewUrl}
                    onChange={(e) => setEditingProject({ ...editingProject, videoPreviewUrl: e.target.value })}
                    required
                    className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none font-mono"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono text-white/70">Short Summary</label>
                <textarea
                  rows={2}
                  value={editingProject.shortDescription}
                  onChange={(e) => setEditingProject({ ...editingProject, shortDescription: e.target.value })}
                  required
                  className="w-full px-3 py-2 rounded-lg bg-white/5 border border-white/10 text-xs text-white focus:border-[#C8A24A] outline-none resize-none"
                />
              </div>

              {/* Featured toggle */}
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  id="featured-toggle"
                  checked={editingProject.featured}
                  onChange={(e) => setEditingProject({ ...editingProject, featured: e.target.checked })}
                  className="w-4 h-4 accent-[#C8A24A]"
                />
                <label htmlFor="featured-toggle" className="text-xs font-mono text-white/80">
                  Feature prominently on top of Portfolio Showcase
                </label>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-full bg-[#C8A24A] text-black font-semibold text-xs font-mono uppercase tracking-widest hover:bg-white transition-all shadow-md"
              >
                Save & Update Case Study
              </button>
            </form>
          </div>
        </div>
      )}

      </div>
    </div>
  );
};
