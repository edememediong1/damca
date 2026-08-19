import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Play, 
  ArrowUpRight, 
  ArrowRight,
  CheckCircle, 
  GraduationCap, 
  Sparkles, 
  HelpCircle, 
  ChevronDown, 
  Briefcase, 
  Award, 
  Layers, 
  Target, 
  Eye, 
  Lightbulb, 
  Users, 
  ShieldCheck, 
  Volume2, 
  VolumeX,
  CreditCard,
  MessageCircle,
  Menu,
  X
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { 
  AcademyProgram, 
  RoadmapWeek, 
  AcademyFeeOption, 
  FAQItem, 
  Testimonial,
  SiteMediaConfig,
  StudentRegistration
} from '../types';
import { StudentDashboardPreview } from './StudentDashboardPreview';

interface AcademyViewProps {
  programs: AcademyProgram[];
  roadmap: RoadmapWeek[];
  fees: AcademyFeeOption[];
  faqs: FAQItem[];
  testimonials: Testimonial[];
  mediaConfig?: SiteMediaConfig;
  onSwitchToPortfolio: () => void;
  onEnrollStudent?: (student: StudentRegistration) => Promise<void>;
}

export const AcademyView: React.FC<AcademyViewProps> = ({
  programs,
  roadmap,
  fees,
  faqs,
  testimonials,
  mediaConfig,
  onSwitchToPortfolio,
  onEnrollStudent,
}) => {
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const [isHeroMuted, setIsHeroMuted] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [enrollModalOpen, setEnrollModalOpen] = useState(false);
  const [selectedPlanForEnroll, setSelectedPlanForEnroll] = useState<string>('Private Mentorship');
  const [enrollForm, setEnrollForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    paymentPreference: 'paid' as 'paid' | 'installment' | 'scholarship'
  });
  const [enrollSubmitted, setEnrollSubmitted] = useState(false);

  const heroVideo = mediaConfig?.academyHeroVideoUrl || "https://assets.mixkit.co/videos/preview/mixkit-hands-of-a-craftsman-assembling-a-watch-42861-large.mp4";
  const heroPoster = mediaConfig?.academyHeroPoster;

  // Student testimonials
  const studentTestimonials = testimonials.filter((t) => t.type === 'student');

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleEnrollSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newStudent: StudentRegistration = {
      id: `stu-${Date.now()}`,
      fullName: enrollForm.fullName || 'New Enrollee',
      email: enrollForm.email,
      phone: enrollForm.phone,
      programId: 'prog-live-cohort',
      programTitle: selectedPlanForEnroll,
      paymentPreference: enrollForm.paymentPreference,
      enrollmentStatus: 'applied',
      registeredDate: new Date().toISOString().split('T')[0],
      progressPercentage: 0,
      tuitionAmount: '$1,200',
      notes: 'Enrolled via Academy web page'
    };

    try {
      await onEnrollStudent?.(newStudent);
      setEnrollSubmitted(true);
    } catch (error) {
      window.alert(error instanceof Error ? error.message : 'Unable to submit your application.');
      return;
    }

    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#C8A24A', '#FFFFFF', '#E0C068']
    });
    setTimeout(() => {
      setEnrollSubmitted(false);
      setEnrollModalOpen(false);
      setEnrollForm({ fullName: '', email: '', phone: '', paymentPreference: 'paid' });
    }, 3500);
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-white selection:bg-[#C8A24A] selection:text-black">
      
      {/* ================= ACADEMY NAVBAR ================= */}
      <header className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-12 py-5 bg-[#050505]/85 backdrop-blur-xl border-b border-white/10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-full border border-[#C8A24A] bg-black/60 flex items-center justify-center">
            <span className="font-cinzel text-xs text-[#C8A24A] font-bold">D</span>
          </div>
          <span className="font-cinzel tracking-[0.3em] text-sm font-semibold text-white">
            DAMCA
          </span>
          <span className="hidden sm:inline-block text-[10px] font-mono tracking-widest text-[#C8A24A] uppercase bg-[#C8A24A]/10 px-2 py-0.5 rounded">
            Academy
          </span>
        </div>

        {/* Navigation links matching screenshot */}
        <nav className="hidden md:flex items-center gap-8 text-xs font-mono tracking-widest text-white/70">
          <button onClick={() => scrollToSection('programs')} className="hover:text-[#C8A24A] transition-colors">PROGRAMS</button>
          <button onClick={() => scrollToSection('curriculum')} className="hover:text-[#C8A24A] transition-colors">CURRICULUM</button>
          <button onClick={() => scrollToSection('roadmap')} className="hover:text-[#C8A24A] transition-colors">ROADMAP</button>
          <button onClick={() => scrollToSection('pricing')} className="hover:text-[#C8A24A] transition-colors">PRICING</button>
          <button onClick={() => scrollToSection('faq')} className="hover:text-[#C8A24A] transition-colors">FAQ</button>
        </nav>

        {/* Switch to Portfolio & Enroll CTA */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            id="switch-to-portfolio-btn"
            onClick={onSwitchToPortfolio}
            className="flex items-center gap-1.5 px-3 sm:px-3.5 py-1.5 rounded-full border border-white/20 bg-white/5 hover:border-[#C8A24A]/60 text-xs text-white/80 hover:text-white transition-all font-cinzel"
          >
            <span>PORTFOLIO</span>
          </button>

          <button
            onClick={() => setEnrollModalOpen(true)}
            className="px-3.5 sm:px-4 py-1.5 rounded-full bg-[#C8A24A] text-black font-semibold text-xs tracking-wider uppercase hover:bg-white transition-all shadow-md"
          >
            Enroll
          </button>

          {/* Mobile Menu Toggle Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-1.5 rounded-lg bg-white/5 border border-white/10 text-white/80 hover:text-white"
            aria-label="Toggle Navigation Menu"
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
                onClick={() => { scrollToSection('programs'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 border-b border-white/5 hover:text-[#C8A24A] transition-colors"
              >
                PROGRAMS
              </button>
              <button 
                onClick={() => { scrollToSection('curriculum'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 border-b border-white/5 hover:text-[#C8A24A] transition-colors"
              >
                CURRICULUM
              </button>
              <button 
                onClick={() => { scrollToSection('roadmap'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 border-b border-white/5 hover:text-[#C8A24A] transition-colors"
              >
                ROADMAP (8 WEEKS)
              </button>
              <button 
                onClick={() => { scrollToSection('pricing'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 border-b border-white/5 hover:text-[#C8A24A] transition-colors"
              >
                PRICING
              </button>
              <button 
                onClick={() => { scrollToSection('faq'); setIsMobileMenuOpen(false); }} 
                className="text-left py-2 hover:text-[#C8A24A] transition-colors"
              >
                FAQ
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ================= 1. HERO SECTION (MATCHING SCREENSHOT 1) ================= */}
      <section className="relative w-full min-h-screen flex items-center justify-center pt-24 pb-16 px-6 md:px-12 overflow-hidden">
        {/* Background Video Layer */}
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
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/70 to-[#050505]/40" />
          <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/60 to-[#050505]" />
          <div className="absolute inset-0 film-grain opacity-40 pointer-events-none" />
        </div>

        {/* Hero Audio Button */}
        <div className="absolute bottom-10 right-6 md:right-12 z-20">
          <button
            onClick={() => setIsHeroMuted(!isHeroMuted)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white/80 hover:text-white hover:border-[#C8A24A]"
          >
            {isHeroMuted ? <VolumeX size={14} /> : <Volume2 size={14} className="text-[#C8A24A]" />}
            <span className="font-mono text-[10px]">{isHeroMuted ? 'UNMUTE TRAILER' : 'MUTED'}</span>
          </button>
        </div>

        {/* Hero Center Text matching Screenshot 1 */}
        <div className="relative z-10 max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-xs font-cinzel tracking-[0.3em] uppercase text-[#C8A24A]"
          >
            DAMCA ACADEMY — LEARN. CREATE. LEAD.
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.15 }}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-editorial font-light text-white leading-[1.08] tracking-tight"
          >
            Learn Video Editing <br />
            <span className="text-[#C8A24A] italic font-normal">Like a Professional.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-base sm:text-lg md:text-xl text-white/75 font-light max-w-2xl mx-auto leading-relaxed"
          >
            Real industry workflows, professional mentorship, and a community of creators. Transform from beginner to industry-ready editor.
          </motion.p>

          {/* Action Buttons matching Screenshot 1 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.45 }}
            className="flex flex-wrap items-center justify-center gap-4 pt-3"
          >
            <button
              onClick={() => setEnrollModalOpen(true)}
              className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C8A24A] text-black font-semibold text-xs md:text-sm tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_30px_rgba(200,162,74,0.3)]"
            >
              <span>ENROLL NOW</span>
              <ArrowRight size={16} />
            </button>

            <button
              onClick={() => scrollToSection('roadmap')}
              className="px-8 py-3.5 rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white font-medium text-xs md:text-sm tracking-widest uppercase hover:border-[#C8A24A] hover:text-[#C8A24A] transition-all"
            >
              VIEW CURRICULUM
            </button>
          </motion.div>

          {/* Scroll text matching screenshot 1 */}
          <div className="pt-12 flex flex-col items-center gap-2">
            <span className="text-[10px] font-cinzel uppercase tracking-[0.3em] text-white/50">
              SCROLL
            </span>
          </div>
        </div>
      </section>

      {/* ================= 2. ABOUT THE ACADEMY (MATCHING SCREENSHOT 5) ================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column matching Screenshot 5 */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-3">
              <span className="text-xs font-cinzel tracking-[0.25em] text-[#C8A24A] uppercase">
                ABOUT THE ACADEMY
              </span>
              <h2 className="text-3xl sm:text-5xl font-editorial font-light text-white leading-tight">
                Built by an Editor, <br />
                <span className="text-[#C8A24A] italic font-normal">For Editors</span>
              </h2>
              <div className="w-12 h-0.5 bg-[#C8A24A]/60" />
            </div>

            <div className="space-y-4 text-white/75 font-light text-sm sm:text-base leading-relaxed">
              <p>
                DAMCA Academy was founded by a working creative director with 7+ years of industry experience. Every curriculum decision comes from real-world practice — not textbooks. You'll learn what actually works in professional environments.
              </p>
              <p>
                Our students have gone on to work with global brands, launch freelance careers, and build creative studios of their own. The results speak for themselves.
              </p>
            </div>
          </div>

          {/* Right Column: 4 Grid Cards matching Screenshot 5 */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Card 1: Mission */}
            <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A24A]">
                <Target size={16} />
              </div>
              <h3 className="text-base font-editorial text-white">Mission</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Equip aspiring video editors with the real-world skills, industry tools, and creative mindset to build thriving careers in storytelling and content creation.
              </p>
            </div>

            {/* Card 2: Vision */}
            <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A24A]">
                <Eye size={16} />
              </div>
              <h3 className="text-base font-editorial text-white">Vision</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                To be Africa's leading creative education platform for video editors and filmmakers — producing world-class creatives who define the next generation of visual storytelling.
              </p>
            </div>

            {/* Card 3: Who It's For */}
            <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A24A]">
                <Users size={16} />
              </div>
              <h3 className="text-base font-editorial text-white">Who It's For</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Beginners looking for structure, intermediates wanting to level up, professionals seeking mentorship, and brands building internal creative teams.
              </p>
            </div>

            {/* Card 4: Philosophy */}
            <div className="p-6 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-3">
              <div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-[#C8A24A]">
                <Lightbulb size={16} />
              </div>
              <h3 className="text-base font-editorial text-white">Philosophy</h3>
              <p className="text-xs text-white/60 font-light leading-relaxed">
                Learn by doing. Every lesson is grounded in real client workflows, industry-standard tools, and hands-on projects — no filler, no theory-only lectures.
              </p>
            </div>
          </div>

        </div>
      </section>

      {/* ================= 3. PROGRAMS: CHOOSE YOUR PATH (MATCHING SCREENSHOT 4) ================= */}
      <section id="programs" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-16">
        
        <div className="space-y-3">
          <span className="text-xs font-cinzel tracking-[0.25em] text-[#C8A24A] uppercase">
            PROGRAMS
          </span>
          <h2 className="text-3xl sm:text-5xl font-editorial font-light text-white">
            Choose Your Path
          </h2>
        </div>

        {/* Programs Grid matching Screenshot 4 Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((prog) => (
            <div
              key={prog.id}
              className={`p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                prog.isPopular
                  ? 'bg-gradient-to-b from-[#141208] to-[#0c0c0c] border-2 border-[#C8A24A] shadow-[0_0_30px_rgba(200,162,74,0.15)]'
                  : 'bg-[#0c0c0c] border border-white/10 hover:border-white/20'
              }`}
            >
              {prog.isPopular && (
                <div className="absolute -top-3.5 left-6 px-4 py-1 rounded bg-[#C8A24A] text-black text-[10px] font-cinzel font-bold tracking-widest uppercase">
                  MOST POPULAR
                </div>
              )}

              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-[#C8A24A]/70 font-semibold">{prog.number}</span>
                  <Sparkles size={16} className="text-[#C8A24A]" />
                </div>

                <div>
                  <h3 className="text-2xl font-editorial text-white">{prog.title}</h3>
                  <p className="text-xs font-mono text-[#C8A24A] mt-1">{prog.duration}</p>
                </div>

                <p className="text-xs text-white/70 font-light leading-relaxed">
                  {prog.description}
                </p>

                {/* Skills tags */}
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {prog.skills.map((skill, i) => (
                    <span key={i} className="text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/60">
                      {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setSelectedPlanForEnroll(prog.title);
                    setEnrollModalOpen(true);
                  }}
                  className={`w-full py-3 rounded text-xs font-cinzel font-bold tracking-widest uppercase transition-all ${
                    prog.isPopular
                      ? 'bg-[#C8A24A] text-black hover:bg-white'
                      : 'border border-white/20 bg-white/5 text-white hover:border-[#C8A24A] hover:bg-[#C8A24A] hover:text-black'
                  }`}
                >
                  APPLY NOW
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ================= 4. WHAT STUDENTS WILL LEARN ================= */}
      <section id="curriculum" className="py-24 md:py-32 px-6 md:px-12 bg-[#090909] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-cinzel tracking-[0.25em] text-[#C8A24A] uppercase">
              COMPREHENSIVE TOOLKIT
            </span>
            <h2 className="text-3xl md:text-5xl font-editorial font-light text-white">
              What You Will Master
            </h2>
            <p className="text-xs md:text-sm text-white/60 font-light">
              Master the exact software stack and narrative frameworks employed in top Hollywood suites and leading creative agencies.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {[
              { name: 'Adobe Premiere Pro', type: 'Assembly & Timeline' },
              { name: 'After Effects', type: 'Motion VFX & Titles' },
              { name: 'DaVinci Resolve', type: 'Color Science & LUTs' },
              { name: 'Adobe Audition', type: 'Audio Mix & Foley' },
              { name: 'Cinematic Storytelling', type: 'Narrative Arcs' },
              { name: 'Rhythm & Pacing', type: 'Emotional Breath' },
              { name: 'Color Grading', type: 'Kodak 2383 Emulation' },
              { name: 'Speed Ramping', type: 'Optical Flow 1000fps' },
              { name: 'Portfolio Development', type: '60s Hero Showreel' },
              { name: 'Freelance Business', type: 'Client Acquisition' }
            ].map((skill, i) => (
              <div
                key={i}
                className="p-5 rounded-xl bg-[#0e0e0e] border border-white/10 hover:border-[#C8A24A]/40 transition-all space-y-2 group"
              >
                <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-[#C8A24A] group-hover:bg-[#C8A24A] group-hover:text-black transition-colors font-mono text-xs font-bold">
                  0{i + 1}
                </div>
                <h4 className="text-sm font-editorial text-white group-hover:text-[#C8A24A] transition-colors">{skill.name}</h4>
                <p className="text-[11px] font-mono text-white/40">{skill.type}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 5. COURSE ROADMAP: 8 WEEKS (MATCHING SCREENSHOT 2) ================= */}
      <section id="roadmap" className="py-20 sm:py-24 md:py-32 px-4 sm:px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-12 sm:space-y-16">
        
        <div className="space-y-3">
          <span className="text-xs font-cinzel tracking-[0.25em] text-[#C8A24A] uppercase">
            COURSE ROADMAP
          </span>
          <h2 className="text-2xl sm:text-4xl md:text-5xl font-editorial font-light text-white flex flex-wrap items-center gap-3">
            <span>8 Weeks to Professional</span>
            <span className="w-4 h-4 rounded-full border border-[#C8A24A] flex items-center justify-center shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-[#C8A24A]" />
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-white/60 font-light max-w-2xl">
            A comprehensive, project-driven progression from fundamental timeline discipline to Hollywood color science, sound design, and commercial client workflows.
          </p>
        </div>

        {/* 8 Weeks Grid with full responsive layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
          {roadmap.map((week) => (
            <div
              key={week.weekNumber}
              className="p-5 sm:p-7 md:p-8 rounded-2xl bg-[#0c0c0c] border border-white/10 hover:border-[#C8A24A]/40 transition-all flex flex-col justify-between group space-y-4 min-w-0 w-full overflow-hidden"
            >
              <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6 min-w-0 w-full">
                {/* Week Number Badge */}
                <div className="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start w-full sm:w-auto shrink-0 pb-2 sm:pb-0 border-b sm:border-b-0 border-white/5 space-y-0 sm:space-y-1">
                  <div className="font-mono text-xs text-[#C8A24A] uppercase tracking-wider">Week {week.weekNumber}</div>
                  <div className="text-xl sm:text-2xl font-editorial text-white/40 group-hover:text-[#C8A24A] transition-colors">
                    {week.weekNumber.length === 1 ? `0${week.weekNumber}` : week.weekNumber}
                  </div>
                </div>

                {/* Module Details */}
                <div className="space-y-2 flex-1 min-w-0 w-full">
                  <div className="flex flex-wrap sm:flex-nowrap items-start justify-between gap-2 min-w-0">
                    <h3 className="text-base sm:text-lg md:text-xl font-editorial text-white group-hover:text-[#C8A24A] transition-colors leading-snug break-words hyphens-auto min-w-0">
                      {week.title}
                    </h3>
                    <span className="text-[10px] font-mono text-[#C8A24A] bg-[#C8A24A]/10 px-2 py-0.5 rounded border border-[#C8A24A]/20 shrink-0 whitespace-nowrap self-start">
                      {week.tool}
                    </span>
                  </div>
                  
                  <p className="text-xs sm:text-[13px] text-white/65 font-light leading-relaxed break-words">
                    {week.description}
                  </p>

                  <div className="pt-2 flex flex-wrap gap-1.5 sm:gap-2">
                    {week.topics.map((top, idx) => (
                      <span key={idx} className="text-[10px] sm:text-[11px] font-mono px-2 py-0.5 rounded bg-white/5 text-white/70 max-w-full break-words border border-white/5">
                        {top}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {week.deliverable && (
                <div className="pt-3 border-t border-white/5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs font-mono min-w-0 w-full">
                  <div className="flex items-center gap-1.5 text-white/60 min-w-0 flex-1">
                    <Award size={13} className="text-[#C8A24A] shrink-0" />
                    <span className="text-[11px] truncate min-w-0">
                      Deliverable: <strong className="text-white/90">{week.deliverable}</strong>
                    </span>
                  </div>
                  {week.resourceLink && (
                    <span className="text-[10px] text-[#C8A24A] uppercase tracking-wider font-semibold shrink-0 self-start sm:self-auto">
                      Raw Pack Included
                    </span>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>

      </section>

      {/* ================= 6. INTERACTIVE STUDENT DASHBOARD PREVIEW ================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#090909] border-t border-white/10">
        <div className="max-w-7xl mx-auto space-y-12">
          
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-cinzel tracking-[0.25em] text-[#C8A24A] uppercase">
              STUDENT ECOSYSTEM
            </span>
            <h2 className="text-3xl md:text-5xl font-editorial font-light text-white">
              Student Dashboard Preview
            </h2>
            <p className="text-xs md:text-sm text-white/60 font-light">
              Experience the custom learning portal students receive: interactive modules, raw cinema assets, assignment video reviews, and community Discord.
            </p>
          </div>

          <StudentDashboardPreview />

        </div>
      </section>

      {/* ================= 7. ACADEMY FEES & INSTALLMENTS ================= */}
      <section id="pricing" className="py-24 md:py-32 px-6 md:px-12 max-w-7xl mx-auto border-t border-white/10 space-y-16">
        
        <div className="space-y-3 text-center max-w-2xl mx-auto">
          <span className="text-xs font-cinzel tracking-[0.25em] text-[#C8A24A] uppercase">
            INVESTMENT & TUITION
          </span>
          <h2 className="text-3xl md:text-5xl font-editorial font-light text-white">
            Simple, Transparent Tuition
          </h2>
          <p className="text-xs md:text-sm text-white/60 font-light">
            Flexible single payments or multi-month installment plans with instant cohort enrollment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {fees.map((fee) => (
            <div
              key={fee.id}
              className={`p-8 rounded-2xl flex flex-col justify-between transition-all duration-300 relative ${
                fee.isPopular
                  ? 'bg-gradient-to-b from-[#141208] to-[#0c0c0c] border-2 border-[#C8A24A] shadow-[0_0_30px_rgba(200,162,74,0.15)]'
                  : 'bg-[#0c0c0c] border border-white/10 hover:border-white/20'
              }`}
            >
              {fee.badge && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-0.5 rounded-full bg-[#C8A24A] text-black text-[10px] font-cinzel font-bold tracking-widest">
                  {fee.badge}
                </div>
              )}

              <div className="space-y-6">
                <div>
                  <h3 className="text-2xl font-editorial text-white">{fee.title}</h3>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="text-4xl font-editorial text-white font-semibold">{fee.price}</span>
                    {fee.originalPrice && (
                      <span className="text-sm font-mono text-white/40 line-through">{fee.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-xs font-mono text-[#C8A24A] mt-1">{fee.installmentNote}</div>
                </div>

                <div className="space-y-2.5 pt-4 border-t border-white/10">
                  {fee.features.map((feat, i) => (
                    <div key={i} className="flex items-start gap-2.5 text-xs text-white/80 font-light">
                      <CheckCircle size={14} className="text-[#C8A24A] shrink-0 mt-0.5" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-8">
                <button
                  onClick={() => {
                    setSelectedPlanForEnroll(fee.title);
                    setEnrollModalOpen(true);
                  }}
                  className={`w-full py-3.5 rounded-full text-xs font-cinzel font-bold tracking-widest uppercase transition-all ${
                    fee.isPopular
                      ? 'bg-[#C8A24A] text-black hover:bg-white'
                      : 'border border-white/20 bg-white/5 text-white hover:border-[#C8A24A] hover:bg-[#C8A24A] hover:text-black'
                  }`}
                >
                  ENROLL IN COHORT
                </button>
              </div>
            </div>
          ))}
        </div>

      </section>

      {/* ================= 8. TESTIMONIALS & TRANSFORMATIONS ================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 bg-[#090909] border-t border-white/10">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="space-y-3 text-center max-w-2xl mx-auto">
            <span className="text-xs font-cinzel tracking-[0.25em] text-[#C8A24A] uppercase">
              STUDENT OUTCOMES
            </span>
            <h2 className="text-3xl md:text-5xl font-editorial font-light text-white">
              Graduate Transformations
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {studentTestimonials.map((t) => (
              <div key={t.id} className="p-8 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-4 shadow-xl">
                <span className="text-4xl font-editorial text-[#C8A24A]">“</span>
                <p className="text-base font-editorial italic text-white/90 leading-relaxed">
                  {t.quote}
                </p>
                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img src={t.avatar} alt={t.name} className="w-10 h-10 rounded-full object-cover border border-[#C8A24A]" />
                  <div>
                    <h4 className="text-xs font-semibold text-white">{t.name}</h4>
                    <p className="text-[11px] text-white/50 font-mono">{t.role} • {t.company}</p>
                    <span className="text-[10px] text-[#C8A24A] font-mono">{t.projectOrCourse}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= 9. FAQ ACCORDION ================= */}
      <section id="faq" className="py-24 md:py-32 px-6 md:px-12 max-w-4xl mx-auto border-t border-white/10 space-y-12">
        
        <div className="space-y-3 text-center">
          <span className="text-xs font-cinzel tracking-[0.25em] text-[#C8A24A] uppercase">
            COMMON QUESTIONS
          </span>
          <h2 className="text-3xl md:text-5xl font-editorial font-light text-white">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => (
            <div
              key={idx}
              className="rounded-xl bg-[#0c0c0c] border border-white/10 overflow-hidden"
            >
              <button
                onClick={() => setOpenFaqIndex(openFaqIndex === idx ? null : idx)}
                className="w-full p-6 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
              >
                <span className="text-base font-editorial text-white">{faq.question}</span>
                <ChevronDown
                  size={18}
                  className={`text-[#C8A24A] transition-transform duration-300 ${
                    openFaqIndex === idx ? 'rotate-180' : ''
                  }`}
                />
              </button>

              <AnimatePresence>
                {openFaqIndex === idx && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="px-6 pb-6 text-xs sm:text-sm text-white/70 font-light leading-relaxed border-t border-white/5 pt-4"
                  >
                    {faq.answer}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

      </section>

      {/* ================= 10. FINAL CTA (MATCHING SCREENSHOT 3) ================= */}
      <section className="py-24 md:py-32 px-6 md:px-12 max-w-5xl mx-auto border-t border-white/10 text-center space-y-10">
        <div className="space-y-4">
          <span className="text-xs font-cinzel tracking-[0.3em] uppercase text-[#C8A24A]">
            BEGIN YOUR JOURNEY
          </span>

          <h2 className="text-4xl sm:text-6xl md:text-7xl font-editorial font-light text-white leading-tight">
            Start Your Creative <br />
            <span className="text-[#C8A24A] italic font-normal">Journey Today.</span>
          </h2>

          <p className="text-sm md:text-base text-white/70 font-light max-w-xl mx-auto leading-relaxed">
            Join hundreds of students who transformed their passion for video into a professional career. The next cohort starts soon — secure your spot now.
          </p>
        </div>

        {/* Buttons matching Screenshot 3 */}
        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <button
            onClick={() => setEnrollModalOpen(true)}
            className="flex items-center gap-2.5 px-8 py-3.5 rounded-full bg-[#C8A24A] text-black font-semibold text-xs md:text-sm tracking-widest uppercase hover:bg-white transition-all shadow-[0_0_30px_rgba(200,162,74,0.3)]"
          >
            <span>ENROLL NOW</span>
            <ArrowRight size={16} />
          </button>

          <button
            onClick={() => {
              window.location.href = 'mailto:contact@damcastudios.com?subject=DAMCA%20Academy%20question';
            }}
            className="px-8 py-3.5 rounded-full border border-white/30 bg-black/40 backdrop-blur-md text-white font-medium text-xs md:text-sm tracking-widest uppercase hover:border-[#C8A24A] hover:text-[#C8A24A] transition-all"
          >
            TALK TO ME
          </button>
        </div>

        {/* Key Statistics Matching Screenshot 3 */}
        <div className="grid grid-cols-3 gap-6 pt-12 border-t border-white/10 max-w-2xl mx-auto">
          <div>
            <div className="text-3xl md:text-4xl font-editorial text-[#C8A24A] font-semibold">500+</div>
            <div className="text-xs font-mono text-white/50 mt-1">Students Trained</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-editorial text-[#C8A24A] font-semibold">94%</div>
            <div className="text-xs font-mono text-white/50 mt-1">Completion Rate</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-editorial text-[#C8A24A] font-semibold">7+</div>
            <div className="text-xs font-mono text-white/50 mt-1">Years Experience</div>
          </div>
        </div>
      </section>

      {/* ================= 11. BOLD ARTISTIC FOOTER ================= */}
      <footer className="relative py-24 md:py-32 px-6 md:px-12 bg-[#020202] border-t border-white/10 overflow-hidden">
        <div className="max-w-7xl mx-auto space-y-16">
          
          <div className="space-y-2">
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-editorial font-light text-white/15 tracking-tight leading-none uppercase select-none">
              LET'S CREATE
            </h2>
            <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-editorial font-light text-[#C8A24A] tracking-tight leading-none uppercase select-none">
              SOMETHING MEMORABLE
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pt-12 border-t border-white/10 text-xs font-mono">
            <div className="space-y-3">
              <span className="font-cinzel text-sm font-semibold text-white tracking-[0.2em]">DAMCA ACADEMY</span>
              <p className="text-white/50 leading-relaxed font-light font-body">
                The premier post-production school for video editors, colorists, and creative directors.
              </p>
            </div>

            <div className="space-y-2">
              <span className="text-[#C8A24A] uppercase tracking-wider">Academy Tracks</span>
              <ul className="space-y-1 text-white/60">
                <li><button onClick={() => scrollToSection('programs')} className="hover:text-white">Beginner Editing</button></li>
                <li><button onClick={() => scrollToSection('programs')} className="hover:text-white">Intermediate Editing</button></li>
                <li><button onClick={() => scrollToSection('programs')} className="hover:text-white">Advanced Masterclass</button></li>
                <li><button onClick={() => scrollToSection('programs')} className="hover:text-white">Private Mentorship</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[#C8A24A] uppercase tracking-wider">Ecosystem</span>
              <ul className="space-y-1 text-white/60">
                <li><button onClick={onSwitchToPortfolio} className="hover:text-white">Creative Portfolio</button></li>
                <li><button onClick={() => scrollToSection('faq')} className="hover:text-white">Student FAQ</button></li>
              </ul>
            </div>

            <div className="space-y-2">
              <span className="text-[#C8A24A] uppercase tracking-wider">Admissions</span>
              <p className="text-white/60">admissions@damca.academy</p>
              <p className="text-white/40">Next Cohort: Registering Now</p>
            </div>
          </div>

          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-[11px] font-mono text-white/40 gap-4">
            <div>© {new Date().getFullYear()} DAMCA Academy. All rights reserved.</div>
            <div>Empowering the Next Generation of Filmmakers</div>
          </div>

        </div>
      </footer>

      {/* ================= ENROLLMENT MODAL ================= */}
      <AnimatePresence>
        {enrollModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative w-full max-w-lg bg-[#0e0e0e] border border-[#C8A24A]/40 rounded-2xl p-8 space-y-6 shadow-2xl"
            >
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono text-[#C8A24A] uppercase tracking-widest">COHORT ENROLLMENT</span>
                  <h3 className="text-2xl font-editorial text-white">Join DAMCA Academy</h3>
                </div>
                <button
                  onClick={() => setEnrollModalOpen(false)}
                  className="text-white/50 hover:text-white"
                >
                  ✕
                </button>
              </div>

              {enrollSubmitted ? (
                <div className="py-8 text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-full bg-[#C8A24A]/20 text-[#C8A24A] flex items-center justify-center">
                    <CheckCircle size={24} />
                  </div>
                  <h4 className="text-xl font-editorial text-white">Application Received!</h4>
                  <p className="text-xs text-white/70">
                    Our admissions team has sent onboarding instructions and schedule links to your email address. Welcome to DAMCA!
                  </p>
                </div>
              ) : (
                <form onSubmit={handleEnrollSubmit} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-xs font-mono text-white/70">Selected Track</label>
                    <input
                      type="text"
                      readOnly
                      value={selectedPlanForEnroll}
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-[#C8A24A] text-sm font-semibold outline-none"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-white/70">Your Full Name</label>
                    <input
                      type="text"
                      required
                      value={enrollForm.fullName}
                      onChange={(e) => setEnrollForm({ ...enrollForm, fullName: e.target.value })}
                      placeholder="e.g. Jordan Hayes"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#C8A24A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-white/70">Email Address</label>
                    <input
                      type="email"
                      required
                      value={enrollForm.email}
                      onChange={(e) => setEnrollForm({ ...enrollForm, email: e.target.value })}
                      placeholder="jordan@gmail.com"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#C8A24A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-white/70">Phone / WhatsApp</label>
                    <input
                      type="tel"
                      value={enrollForm.phone}
                      onChange={(e) => setEnrollForm({ ...enrollForm, phone: e.target.value })}
                      placeholder="+1 (555) 019-2834"
                      className="w-full px-4 py-2.5 rounded-lg bg-white/5 border border-white/10 text-white text-sm outline-none focus:border-[#C8A24A]"
                    />
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-mono text-white/70">Payment Preference</label>
                    <select
                      value={enrollForm.paymentPreference}
                      onChange={(e) => setEnrollForm({ ...enrollForm, paymentPreference: e.target.value as any })}
                      className="w-full px-4 py-2.5 rounded-lg bg-[#141414] border border-white/10 text-white text-sm outline-none focus:border-[#C8A24A]"
                    >
                      <option value="paid">Single Full Tuition Payment (Save 15%)</option>
                      <option value="installment">2 or 3 Monthly Installments</option>
                      <option value="scholarship">Inquire About Financial Aid</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 rounded-full bg-[#C8A24A] text-black font-semibold text-xs tracking-widest uppercase hover:bg-white transition-all shadow-lg"
                  >
                    Confirm & Reserve Spot
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};
