import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  ArrowUpRight, 
  ChevronRight, 
  ChevronLeft, 
  Sparkles, 
  Film, 
  Scissors, 
  Sliders, 
  Layers, 
  Tv, 
  Clapperboard, 
  Video, 
  Radio, 
  Compass, 
  CheckCircle, 
  Send, 
  GraduationCap, 
  ShieldCheck, 
  Volume2, 
  VolumeX, 
  Flame, 
  Building, 
  Mic, 
  Crown, 
  Calendar, 
  Share2, 
  Music, 
  Mail, 
  Phone, 
  Instagram, 
  Linkedin,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  Project, 
  ProjectCategory, 
  IndustryItem, 
  ServiceItem, 
  PricingPackage, 
  Testimonial,
  SiteMediaConfig,
  ContactInquiry
} from '../types';
import { DeepProjectInspector } from './DeepProjectInspector';

interface PortfolioViewProps {
  projects: Project[];
  industries: IndustryItem[];
  services: ServiceItem[];
  pricing: PricingPackage[];
  testimonials: Testimonial[];
  mediaConfig?: SiteMediaConfig;
  onOpenCaseStudy: (project: Project) => void;
  onSwitchToAcademy: () => void;
  onAddContact?: (inquiry: ContactInquiry) => void;
}

const CATEGORY_TABS: ProjectCategory[] = [
  'All',
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

export const PortfolioView: React.FC<PortfolioViewProps> = ({
  projects,
  industries,
  services,
  pricing,
  testimonials,
  mediaConfig,
  onOpenCaseStudy,
  onSwitchToAcademy,
  onAddContact,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory>('All');
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null);
  const [activeTestimonialIdx, setActiveTestimonialIdx] = useState(0);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Inquiry Form State
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    company: '',
    budget: '$2,500 - $5,000',
    description: '',
    projectType: 'Commercial'
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const heroVideo = mediaConfig?.portfolioHeroVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-car-racing-on-a-track-41551-large.mp4";
  const heroPoster = mediaConfig?.portfolioHeroPoster;

  // Filter projects
  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter((p) => p.category === selectedCategory);

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);

    const newInquiry: ContactInquiry = {
      id: `contact-${Date.now()}`,
      name: formState.name,
      email: formState.email,
      company: formState.company || 'Direct Client',
      budget: formState.budget,
      projectType: formState.projectType,
      description: formState.description,
      date: new Date().toISOString().replace('T', ' ').substring(0, 16),
      status: 'new'
    };

    onAddContact?.(newInquiry);

    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.7 },
      colors: ['#C8A24A', '#FFFFFF', '#E0C068']
    });
    setTimeout(() => {
      setFormSubmitted(false);
      setFormState({
        name: '',
        email: '',
        company: '',
        budget: '$2,500 - $5,000',
        description: '',
        projectType: 'Commercial'
      });
    }, 4000);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#C8A24A] selection:text-black">
      
      {/* ================= STICKY HEADER ================= */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-[#050505]/85 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C8A24A] bg-black/60 flex items-center justify-center">
            <span className="font-cinzel text-xs text-[#C8A24A] font-bold">D</span>
          </div>
          <span className="font-cinzel tracking-[0.3em] text-sm font-semibold text-white">
            DAMCA
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-[#C8A24A] uppercase bg-[#C8A24A]/10 px-2 py-0.5 rounded">
            Portfolio
          </span>
        </div>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-white/70">
          <button onClick={() => scrollToSection('work')} className="hover:text-[#C8A24A] transition-colors">WORK</button>
          <button onClick={() => scrollToSection('about')} className="hover:text-[#C8A24A] transition-colors">ABOUT</button>
          <button onClick={() => scrollToSection('workflow')} className="hover:text-[#C8A24A] transition-colors">WORKFLOW</button>
          <button onClick={() => scrollToSection('services')} className="hover:text-[#C8A24A] transition-colors">SERVICES</button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-[#C8A24A] transition-colors">PRICING</button>
          <button onClick={() => scrollToSection('contact')} className="hover:text-[#C8A24A] transition-colors">CONTACT</button>
        </nav>

        {/* Action buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="switch-to-academy-btn"
            onClick={onSwitchToAcademy}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-white/15 bg-white/5 hover:border-[#C8A24A]/50 text-xs text-white/80 hover:text-white transition-all"
          >
            <GraduationCap size={14} className="text-[#C8A24A]" />
            <span className="hidden sm:inline">Academy</span>
          </button>

          <button
            onClick={() => scrollToSection('contact')}
            className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#C8A24A] text-black font-semibold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-md"
          >
            Hire Me
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white"
            aria-label="Toggle Portfolio Navigation Menu"
          >
            {isMobileMenuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </header>

      {/* Mobile Navigation Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-[70px] left-0 right-0 z-30 bg-[#0c0c0c]/95 backdrop-blur-xl border-b border-white/10 p-6 space-y-4 md:hidden"
          >
            <div className="flex flex-col gap-3 font-mono text-xs tracking-widest text-white/80">
              <button 
                onClick={() => { scrollToSection('work'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 border-b border-white/5 hover:text-[#C8A24A] transition-colors"
              >
                WORK
              </button>
              <button 
                onClick={() => { scrollToSection('about'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 border-b border-white/5 hover:text-[#C8A24A] transition-colors"
              >
                ABOUT
              </button>
              <button 
                onClick={() => { scrollToSection('workflow'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 border-b border-white/5 hover:text-[#C8A24A] transition-colors"
              >
                WORKFLOW
              </button>
              <button 
                onClick={() => { scrollToSection('services'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 border-b border-white/5 hover:text-[#C8A24A] transition-colors"
              >
                SERVICES
              </button>
              <button 
                onClick={() => { scrollToSection('pricing'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 border-b border-white/5 hover:text-[#C8A24A] transition-colors"
              >
                PRICING
              </button>
              <button 
                onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 hover:text-[#C8A24A] transition-colors"
              >
                CONTACT
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden">
        {/* Background Reel Video */}
        <div className="absolute inset-0 z-0">
          <video
            src={heroVideo}
            poster={heroPoster}
            autoPlay
            loop
            muted={isHeroMuted}
            playsInline
            className="w-full h-full object-cover filter brightness-[0.4] contrast-[1.1]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-[#050505]/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/60 to-[#050505]" />
          <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />
        </div>

        {/* Hero Audio Toggle */}
        <div className="absolute bottom-10 right-6 md:right-12 z-20">
          <button
            onClick={() => setIsHeroMuted(!isHeroMuted)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white/80 hover:text-white hover:border-[#C8A24A]"
          >
            {isHeroMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#C8A24A]" />}
            <span className="font-mono text-[10px]">{isHeroMuted ? 'UNMUTE SHOWREEL' : 'MUTED'}</span>
          </button>
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#C8A24A]/10 border border-[#C8A24A]/30 text-[#C8A24A] text-xs font-cinzel tracking-[0.25em] uppercase"
          >
            <span className="w-2 h-2 rounded-full bg-[#C8A24A] animate-pulse" />
            Creative Director & Lead Video Editor
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-light text-white leading-[1.05] tracking-tight"
          >
            Editing Stories That{' '}
            <span className="text-[#C8A24A] italic font-normal">People Remember.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-white/70 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Over 7+ years shaping emotion, rhythm, and high-impact visual narratives for global brands, documentaries, high-stakes commercials, and world-class creators.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-4"
          >
            <button
              id="hero-view-work-btn"
              onClick={() => scrollToSection('work')}
              className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#C8A24A] text-black font-semibold text-xs md:text-sm tracking-widest uppercase hover:bg-white hover:text-black transition-all shadow-[0_0_30px_rgba(200,162,74,0.3)]"
            >
              <span>View My Work</span>
              <ArrowUpRight size={16} />
            </button>

            <button
              id="hero-hire-me-btn"
              onClick={() => scrollToSection('contact')}
              className="flex items-center gap-3 px-8 py-4 rounded-full border border-white/20 bg-white/5 backdrop-blur-md text-white font-medium text-xs md:text-sm tracking-widest uppercase hover:border-[#C8A24A] hover:bg-[#C8A24A]/10 transition-all"
            >
              <span>Hire Me</span>
            </button>
          </motion.div>

          {/* Animated Scroll Down Indicator */}
          <div className="pt-12 flex flex-col items-center gap-2 opacity-60 hover:opacity-100 transition-opacity">
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-[#C8A24A]">SCROLL TO EXPLORE</span>
            <div className="w-5 h-9 rounded-full border border-white/20 flex justify-center pt-2">
              <motion.div
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                className="w-1 h-1.5 rounded-full bg-[#C8A24A]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ================= 2. ABOUT SECTION ================= */}
      <section id="about" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Portrait & Brand Image */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl group">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=1200&auto=format&fit=crop"
                alt="Creative Director Portrait"
                className="w-full h-full object-cover filter contrast-[1.1] grayscale-[15%] group-hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-transparent to-transparent" />
              
              {/* Floating Badge */}
              <div className="absolute bottom-6 left-6 right-6 p-4 rounded-xl bg-black/80 backdrop-blur-md border border-[#C8A24A]/30">
                <div className="font-cinzel text-xs text-[#C8A24A] font-bold">DAMCA STUDIO</div>
                <div className="text-xs text-white/70 font-light">Directing, Editing, and Teaching Post-Production Globally.</div>
              </div>
            </div>

            {/* Ambient Gold Glow */}
            <div className="absolute -inset-4 bg-[#C8A24A]/10 rounded-3xl blur-2xl -z-10" />
          </div>

          {/* About Editorial Text */}
          <div className="lg:col-span-7 space-y-8">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8A24A]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#C8A24A] font-cinzel">
                  About Me & Philosophy
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-editorial font-light text-white leading-tight">
                Crafting Visual Rhythm That <span className="text-[#C8A24A] italic font-normal">Transcends</span> The Screen.
              </h2>
            </div>

            <div className="space-y-4 text-white/75 font-light leading-relaxed text-sm md:text-base">
              <p>
                Great editing is not just about cutting clips to music; it is the art of psychological manipulation through temporal pacing, micro-tension, acoustic design, and color tonality.
              </p>
              <p>
                Over the past 7+ years, I have directed and cut campaigns for global sports giants, luxury horology brands, deep-narrative documentaries, and YouTube powerhouses. My philosophy is rooted in acoustic rhythm: I edit with my ears first, aligning visual match-cuts to subtle soundscapes to immerse the viewer completely.
              </p>
            </div>

            {/* Key Statistics Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-white/10">
              <div>
                <div className="text-3xl md:text-4xl font-editorial text-[#C8A24A] font-semibold">7+</div>
                <div className="text-xs font-mono text-white/50 uppercase mt-1">Years Experience</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-editorial text-white font-semibold">500+</div>
                <div className="text-xs font-mono text-white/50 uppercase mt-1">Projects Cut</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-editorial text-[#C8A24A] font-semibold">50M+</div>
                <div className="text-xs font-mono text-white/50 uppercase mt-1">Total Views</div>
              </div>
              <div>
                <div className="text-3xl md:text-4xl font-editorial text-white font-semibold">40+</div>
                <div className="text-xs font-mono text-white/50 uppercase mt-1">Global Clients</div>
              </div>
            </div>

            {/* Client Logos / Recognitions marquee style */}
            <div className="pt-2">
              <div className="text-[11px] font-mono uppercase tracking-widest text-white/40 mb-3">
                Trusted By Industry Leaders & Studios
              </div>
              <div className="flex flex-wrap gap-3">
                {['Red Bull Brand Studio', 'Vacheron Constantin', 'National Geographic Wild', 'Sony Interactive', 'Elevation Media', 'Puma Global'].map((client, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-white/[0.03] border border-white/10 text-xs font-mono text-white/80">
                    {client}
                  </span>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= 3. INDUSTRIES SERVED ================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#090909] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <Sparkles size={14} className="text-[#C8A24A]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#C8A24A] font-cinzel">
                  Specializations
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-editorial font-light text-white leading-tight">
                Industries Served
              </h2>
            </div>
            <p className="text-xs md:text-sm text-white/60 font-light max-w-md">
              From fast-paced adrenaline commercials to intimate documentaries and high-conversion creator channels.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {industries.map((ind) => (
              <motion.div
                key={ind.id}
                whileHover={{ y: -6 }}
                className="p-6 rounded-2xl bg-[#0e0e0e] border border-white/10 hover:border-[#C8A24A]/40 transition-all group space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A24A] group-hover:bg-[#C8A24A] group-hover:text-black transition-colors">
                      <Sparkles size={18} />
                    </div>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/50">
                      {ind.projectCount}
                    </span>
                  </div>

                  <h3 className="text-lg font-editorial text-white group-hover:text-[#C8A24A] transition-colors">
                    {ind.name}
                  </h3>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {ind.description}
                  </p>
                </div>

                <div className="pt-2 flex items-center justify-between text-[11px] font-mono text-[#C8A24A]/80 border-t border-white/5 pt-3">
                  <span>{ind.tag}</span>
                  <ArrowUpRight size={14} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </div>
              </motion.div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 4. FEATURED WORK (CENTERPIECE) ================= */}
      <section id="work" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-12">
        
        {/* Section Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C8A24A]/10 border border-[#C8A24A]/30 text-[#C8A24A] text-xs font-cinzel tracking-[0.25em] uppercase">
            Curated Showreel & Archive
          </div>
          <h2 className="text-3xl sm:text-5xl lg:text-6xl font-editorial font-light text-white">
            Featured <span className="text-[#C8A24A] italic font-normal">Works</span>
          </h2>
          <p className="text-sm md:text-base text-white/60 font-light">
            Explore selected case studies. Hover to preview footage live, or click to open the complete deep case study.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center justify-center overflow-x-auto py-2 gap-2 scrollbar-none">
          {CATEGORY_TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedCategory(tab)}
              className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 whitespace-nowrap ${
                selectedCategory === tab
                  ? 'bg-[#C8A24A] text-black font-bold shadow-[0_0_15px_rgba(200,162,74,0.3)]'
                  : 'bg-white/5 text-white/60 border border-white/10 hover:border-white/20 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {filteredProjects.map((project) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                onMouseEnter={() => setHoveredProjectId(project.id)}
                onMouseLeave={() => setHoveredProjectId(null)}
                onClick={() => onOpenCaseStudy(project)}
                className="group cursor-pointer rounded-2xl overflow-hidden bg-[#0c0c0c] border border-white/10 hover:border-[#C8A24A]/60 transition-all duration-500 flex flex-col justify-between shadow-xl"
              >
                {/* Media Container with Video Preview on Hover */}
                <div className="relative aspect-video overflow-hidden bg-black">
                  {hoveredProjectId === project.id ? (
                    <video
                      src={project.videoPreviewUrl}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <img
                      src={project.thumbnail}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 filter contrast-[1.05]"
                    />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition-opacity" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex items-center justify-between pointer-events-none">
                    <span className="px-2.5 py-1 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-[#C8A24A]">
                      {project.category}
                    </span>
                    <span className="px-2 py-1 rounded bg-black/80 backdrop-blur-md text-[10px] font-mono text-white/80">
                      {project.duration}
                    </span>
                  </div>

                  {/* Center Play Icon on Hover */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-[#C8A24A] text-black flex items-center justify-center shadow-xl transform scale-90 group-hover:scale-100 transition-transform">
                      <Play size={18} className="ml-0.5 fill-black" />
                    </div>
                  </div>
                </div>

                {/* Project Details */}
                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div className="space-y-1.5">
                    <div className="text-[11px] font-mono text-white/50">
                      {project.client} • {project.year}
                    </div>
                    <h3 className="text-xl font-editorial font-light text-white group-hover:text-[#C8A24A] transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs text-white/60 font-light line-clamp-2 leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-white/5 flex items-center justify-between">
                    <div className="flex flex-wrap gap-1.5">
                      {project.softwareUsed.map((sw, i) => (
                        <span key={i} className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                          {sw}
                        </span>
                      ))}
                    </div>

                    <span className="text-xs text-[#C8A24A] font-mono flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                      <span>Case Study</span>
                      <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </section>

      {/* ================= 5. DEEP PROJECT LAYER INSPECTOR ================= */}
      <DeepProjectInspector />

      {/* ================= 6. WORKFLOW SECTION ================= */}
      <section id="workflow" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-16">
        
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8A24A]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A24A] font-cinzel">
              Methodology
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-editorial font-light text-white">
            The 8-Step Post-Production Workflow
          </h2>
          <p className="text-xs md:text-sm text-white/60 font-light">
            Every project follows a bulletproof, calibrated timeline from initial footage ingestion to final master export.
          </p>
        </div>

        {/* 8-Step Timeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { num: '01', title: 'Discovery', desc: 'Analyzing the creative brief, organizing raw footage, audio stems, and establishing target emotional beats.' },
            { num: '02', title: 'Strategy', desc: 'Drafting the narrative arc, storyboarding rough pacing, and selecting hero soundtrack pieces.' },
            { num: '03', title: 'Editing', desc: 'Assembling the assembly cut, refining micro-timing with J/L-cuts, and tightening rhythm.' },
            { num: '04', title: 'Motion Graphics', desc: 'Integrating custom 2D/3D typography, kinetic titles, HUD overlays, and tracking graphics.' },
            { num: '05', title: 'Sound Design', desc: 'Foley sound effects, spatial ambisonics, sub-bass impacts, and broadcast loudness leveling.' },
            { num: '06', title: 'Color Grading', desc: 'Color correction in DaVinci Resolve, film stock emulation, and specular highlight control.' },
            { num: '07', title: 'Revisions', desc: 'Frame-accurate client feedback integration using Frame.io with rapid turnaround cycles.' },
            { num: '08', title: 'Final Delivery', desc: 'Uncompressed 4K ProRes 422 HQ masters, social vertical cutdowns, and clean source stem archiving.' }
          ].map((step, idx) => (
            <div
              key={idx}
              className="p-6 rounded-2xl bg-[#0b0b0b] border border-white/10 hover:border-[#C8A24A]/40 transition-all space-y-4 group"
            >
              <div className="w-10 h-10 rounded-full border border-[#C8A24A]/40 bg-[#C8A24A]/10 text-[#C8A24A] font-mono text-sm font-bold flex items-center justify-center group-hover:bg-[#C8A24A] group-hover:text-black transition-colors">
                {step.num}
              </div>
              <h3 className="text-lg font-editorial text-white group-hover:text-[#C8A24A] transition-colors">
                {step.title}
              </h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>

      </section>

      {/* ================= 7. SERVICES SECTION ================= */}
      <section id="services" className="py-24 md:py-32 px-6 md:px-12 bg-[#090909] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-3 max-w-2xl">
              <div className="flex items-center gap-2">
                <Scissors size={14} className="text-[#C8A24A]" />
                <span className="text-xs uppercase tracking-[0.25em] text-[#C8A24A] font-cinzel">
                  Capabilities
                </span>
              </div>
              <h2 className="text-3xl md:text-5xl font-editorial font-light text-white">
                Comprehensive Services
              </h2>
            </div>
            <p className="text-xs md:text-sm text-white/60 font-light max-w-md">
              Full-spectrum post-production solutions crafted for cinematic broadcast, commercial brands, and modern media creators.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((srv) => (
              <div
                key={srv.id}
                className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-[#C8A24A]/40 transition-all space-y-4 flex flex-col justify-between group"
              >
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A24A] group-hover:bg-[#C8A24A] group-hover:text-black transition-colors">
                    <Sparkles size={18} />
                  </div>
                  <div>
                    <h3 className="text-lg font-editorial text-white">{srv.title}</h3>
                    <div className="text-[11px] font-mono text-[#C8A24A] mt-0.5">{srv.subtitle}</div>
                  </div>
                  <p className="text-xs text-white/60 font-light leading-relaxed">
                    {srv.description}
                  </p>
                </div>

                <div className="space-y-1.5 pt-3 border-t border-white/5">
                  {srv.deliverables.map((deliv, i) => (
                    <div key={i} className="flex items-center gap-2 text-[11px] text-white/70 font-light">
                      <span className="w-1 h-1 rounded-full bg-[#C8A24A]" />
                      <span>{deliv}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 8. PRICING SECTION ================= */}
      <section id="pricing" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-16">
        
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <div className="flex items-center justify-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#C8A24A]" />
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A24A] font-cinzel">
              Investment
            </span>
          </div>
          <h2 className="text-3xl md:text-5xl font-editorial font-light text-white">
            Transparent Pricing Packages
          </h2>
          <p className="text-xs md:text-sm text-white/60 font-light">
            Flexible production packages designed for creators, emerging brands, and enterprise commercial campaigns.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {pricing.map((pkg) => (
            <div
              key={pkg.id}
              className={`p-6 rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                pkg.isPopular
                  ? 'bg-gradient-to-b from-[#141108] to-[#0d0d0d] border-2 border-[#C8A24A] shadow-[0_0_30px_rgba(200,162,74,0.15)]'
                  : 'bg-[#0b0b0b] border border-white/10 hover:border-white/25'
              }`}
            >
              {pkg.isPopular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-[#C8A24A] text-black text-[10px] font-cinzel font-bold tracking-widest">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-5">
                <div>
                  <h3 className="text-xl font-editorial text-white">{pkg.name}</h3>
                  <p className="text-xs text-white/50 font-light mt-1">{pkg.subtitle}</p>
                </div>

                <div>
                  <div className="text-3xl md:text-4xl font-editorial text-white font-semibold">
                    {pkg.price}
                  </div>
                  <div className="text-[11px] font-mono text-[#C8A24A] mt-1">
                    Turnaround: {pkg.turnaroundTime}
                  </div>
                </div>

                <div className="space-y-2 pt-2 border-t border-white/10">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-white/40">
                    Included Features:
                  </div>
                  {pkg.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2 text-xs text-white/80 font-light">
                      <CheckCircle size={13} className="text-[#C8A24A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-6">
                <button
                  onClick={() => scrollToSection('contact')}
                  className={`w-full py-3 rounded-full text-xs font-semibold tracking-wider uppercase transition-all ${
                    pkg.isPopular
                      ? 'bg-[#C8A24A] text-black hover:bg-white'
                      : 'border border-white/20 bg-white/5 text-white hover:border-[#C8A24A] hover:bg-[#C8A24A] hover:text-black'
                  }`}
                >
                  Request Quote
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ================= 9. TESTIMONIALS SLIDER ================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#090909] border-t border-white/10">
        <div className="max-w-5xl mx-auto space-y-12">
          
          <div className="flex items-center justify-between">
            <div className="space-y-2">
              <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[#C8A24A]">
                Endorsements
              </span>
              <h2 className="text-3xl md:text-4xl font-editorial font-light text-white">
                Client Testimonials
              </h2>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setActiveTestimonialIdx((prev) => (prev > 0 ? prev - 1 : testimonials.length - 1))}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:border-[#C8A24A] hover:text-[#C8A24A] transition-colors"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setActiveTestimonialIdx((prev) => (prev < testimonials.length - 1 ? prev + 1 : 0))}
                className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:border-[#C8A24A] hover:text-[#C8A24A] transition-colors"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div className="relative p-8 md:p-14 rounded-3xl bg-[#0e0e0e] border border-white/10 overflow-hidden shadow-2xl">
            <span className="text-6xl md:text-8xl font-editorial text-[#C8A24A]/20 absolute top-4 left-6 pointer-events-none">
              “
            </span>

            <div className="relative z-10 space-y-6">
              <p className="text-lg md:text-2xl font-editorial font-light italic text-white/90 leading-relaxed">
                {testimonials[activeTestimonialIdx].quote}
              </p>

              <div className="flex items-center gap-4 pt-4 border-t border-white/5">
                <img
                  src={testimonials[activeTestimonialIdx].avatar}
                  alt={testimonials[activeTestimonialIdx].name}
                  className="w-12 h-12 rounded-full object-cover border border-[#C8A24A]"
                />
                <div>
                  <h4 className="text-sm font-semibold text-white">
                    {testimonials[activeTestimonialIdx].name}
                  </h4>
                  <p className="text-xs text-white/50 font-mono">
                    {testimonials[activeTestimonialIdx].role} • {testimonials[activeTestimonialIdx].company}
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 10. CONTACT SECTION ================= */}
      <section id="contact" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
          
          {/* Left Column Text & Socials */}
          <div className="lg:col-span-5 space-y-8">
            <div className="space-y-3">
              <span className="text-xs font-cinzel uppercase tracking-[0.25em] text-[#C8A24A]">
                Inquire & Collaborate
              </span>
              <h2 className="text-4xl md:text-6xl font-editorial font-light text-white leading-tight">
                Let's Create <br />
                <span className="text-[#C8A24A] italic font-normal">Something Great.</span>
              </h2>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed pt-2">
                Have a campaign, documentary, commercial, or creative direction project in mind? Fill out the brief form or reach out directly across any channel.
              </p>
            </div>

            {/* Direct Contact Links */}
            <div className="space-y-4 pt-4">
              <a
                href="mailto:contact@damcastudios.com"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-[#C8A24A] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A24A]">
                  <Mail size={14} />
                </div>
                <span>contact@damcastudios.com</span>
              </a>

              <a
                href="https://wa.me/2348000000000"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 text-sm text-white/80 hover:text-[#C8A24A] transition-colors"
              >
                <div className="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-emerald-400">
                  <MessageCircle size={14} />
                </div>
                <span>WhatsApp Direct Line</span>
              </a>

              <div className="flex items-center gap-3 pt-2">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:border-[#C8A24A] hover:text-[#C8A24A] transition-colors"
                  title="Instagram"
                >
                  <Instagram size={16} />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-white hover:border-[#C8A24A] hover:text-[#C8A24A] transition-colors"
                  title="LinkedIn"
                >
                  <Linkedin size={16} />
                </a>
              </div>
            </div>
          </div>

          {/* Right Column Form */}
          <div className="lg:col-span-7 bg-[#0b0b0b] p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl">
            {formSubmitted ? (
              <div className="py-16 text-center space-y-4">
                <div className="w-16 h-16 mx-auto rounded-full bg-[#C8A24A]/20 border border-[#C8A24A] text-[#C8A24A] flex items-center justify-center">
                  <CheckCircle size={32} />
                </div>
                <h3 className="text-2xl font-editorial text-white">Inquiry Received</h3>
                <p className="text-xs text-white/70 max-w-md mx-auto">
                  Thank you for reaching out! We review all project submissions within 24 business hours and will respond with scheduling options.
                </p>
              </div>
            ) : (
              <form onSubmit={handleInquirySubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/70 uppercase">Your Name</label>
                    <input
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      value={formState.name}
                      onChange={(e) => setFormState({ ...formState, name: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#C8A24A] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/70 uppercase">Email Address</label>
                    <input
                      type="email"
                      required
                      placeholder="alex@company.com"
                      value={formState.email}
                      onChange={(e) => setFormState({ ...formState, email: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#C8A24A] outline-none"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/70 uppercase">Company / Brand</label>
                    <input
                      type="text"
                      placeholder="e.g. Apex Studio"
                      value={formState.company}
                      onChange={(e) => setFormState({ ...formState, company: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#C8A24A] outline-none"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono text-white/70 uppercase">Estimated Budget</label>
                    <select
                      value={formState.budget}
                      onChange={(e) => setFormState({ ...formState, budget: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-[#141414] border border-white/10 text-white text-sm focus:border-[#C8A24A] outline-none"
                    >
                      <option value="$1,000 - $2,500">$1,000 - $2,500</option>
                      <option value="$2,500 - $5,000">$2,500 - $5,000</option>
                      <option value="$5,000 - $10,000">$5,000 - $10,000</option>
                      <option value="$10,000+">$10,000+ (Enterprise / Retainer)</option>
                    </select>
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-white/70 uppercase">Project Description & Timeline</label>
                  <textarea
                    rows={4}
                    required
                    placeholder="Tell us about the project goals, deliverables, footage format, and deadlines..."
                    value={formState.description}
                    onChange={(e) => setFormState({ ...formState, description: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-sm focus:border-[#C8A24A] outline-none resize-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-4 rounded-full bg-[#C8A24A] text-black font-semibold text-xs md:text-sm tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_25px_rgba(200,162,74,0.3)] flex items-center justify-center gap-2"
                >
                  <Send size={16} />
                  <span>Send Inquiry</span>
                </button>
              </form>
            )}
          </div>

        </div>
      </section>

      {/* ================= 11. BOLD ARTISTIC FOOTER ================= */}
      <footer className="relative py-24 md:py-32 px-6 md:px-12 bg-[#020202] border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          
          {/* Huge Typography Banner */}
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-editorial font-light text-white/15 tracking-tight leading-none uppercase select-none">
              LET'S CREATE
            </h2>
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-editorial font-light text-[#C8A24A] tracking-tight leading-none uppercase select-none">
              SOMETHING MEMORABLE
            </h2>
          </div>

          {/* Footer Grid */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-white/10 text-xs font-mono">
            <div className="space-y-3">
              <span className="font-cinzel text-sm font-semibold text-white tracking-[0.2em]">DAMCA</span>
              <p className="text-white/50 leading-relaxed font-light font-body">
                Cinematic creative direction, elite video editing, and DAMCA post-production academy.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[#C8A24A] uppercase tracking-wider">Navigation</span>
              <ul className="space-y-1 text-white/60">
                <li><button onClick={() => scrollToSection('work')} className="hover:text-white">Portfolio Works</button></li>
                <li><button onClick={() => scrollToSection('about')} className="hover:text-white">About & Philosophy</button></li>
                <li><button onClick={() => scrollToSection('services')} className="hover:text-white">Services</button></li>
                <li><button onClick={() => scrollToSection('pricing')} className="hover:text-white">Pricing Packages</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[#C8A24A] uppercase tracking-wider">Ecosystem</span>
              <ul className="space-y-1 text-white/60">
                <li><button onClick={onSwitchToAcademy} className="hover:text-white">DAMCA Academy</button></li>
                <li><button onClick={() => scrollToSection('contact')} className="hover:text-white">Book Consultation</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[#C8A24A] uppercase tracking-wider">Contact</span>
              <p className="text-white/60">contact@damcastudios.com</p>
              <p className="text-white/40">Lagos • London • Worldwide</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-4">
            <div>© {new Date().getFullYear()} DAMCA. All rights reserved.</div>
            <div>Crafted for Awwwards & High-End Visual Storytelling</div>
          </div>

        </div>
      </footer>

    </div>
  );
};
