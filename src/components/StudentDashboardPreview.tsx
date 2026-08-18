import React, { useState } from 'react';
import { motion } from 'motion/react';
import { 
  Play, 
  CheckCircle, 
  Download, 
  Award, 
  MessageSquare, 
  FolderKanban, 
  Sliders, 
  FileCode, 
  Sparkles, 
  Clock, 
  Lock,
  ChevronRight,
  Video
} from 'lucide-react';

export const StudentDashboardPreview: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'lessons' | 'assignments' | 'downloads' | 'certificate' | 'community'>('lessons');
  const [activeLessonId, setActiveLessonId] = useState(2);
  const [isDownloaded, setIsDownloaded] = useState<string | null>(null);

  const handleDownloadSimulation = (title: string) => {
    setIsDownloaded(title);
    setTimeout(() => setIsDownloaded(null), 3000);
  };

  return (
    <div className="w-full bg-[#0a0a0a] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Top Simulated App Bar */}
      <div className="flex flex-wrap items-center justify-between px-6 py-4 bg-[#111111] border-b border-white/10 gap-4">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="h-4 w-px bg-white/10" />
          <span className="font-cinzel text-xs text-[#C8A24A] font-semibold tracking-wider">
            DAMCA STUDENT PORTAL v2.4
          </span>
          <span className="hidden sm:inline-block px-2 py-0.5 rounded bg-[#C8A24A]/10 text-[10px] font-mono text-[#C8A24A]">
            PRO COHORT
          </span>
        </div>

        {/* Student Progress Pill */}
        <div className="flex items-center gap-3">
          <div className="text-right">
            <div className="text-[11px] font-mono text-white/50">Overall Progress</div>
            <div className="text-xs font-semibold text-[#C8A24A]">Week 4 of 8 • 68% Complete</div>
          </div>
          <div className="w-16 h-2 rounded-full bg-white/10 overflow-hidden">
            <div className="h-full bg-gradient-to-r from-[#C8A24A] to-amber-300 w-[68%]" />
          </div>
        </div>
      </div>

      {/* Main Dashboard Navigation Tabs */}
      <div className="flex overflow-x-auto border-b border-white/10 bg-[#0c0c0c] px-6 py-2 gap-2 text-xs font-medium scrollbar-none">
        <button
          onClick={() => setActiveTab('lessons')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'lessons'
              ? 'bg-[#C8A24A] text-black font-semibold shadow-md'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Video size={14} />
          <span>Curriculum Lessons</span>
        </button>

        <button
          onClick={() => setActiveTab('assignments')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'assignments'
              ? 'bg-[#C8A24A] text-black font-semibold shadow-md'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <FolderKanban size={14} />
          <span>Live Briefs & Homework</span>
        </button>

        <button
          onClick={() => setActiveTab('downloads')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'downloads'
              ? 'bg-[#C8A24A] text-black font-semibold shadow-md'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Download size={14} />
          <span>Raw 4K Cinema Assets & LUTs</span>
        </button>

        <button
          onClick={() => setActiveTab('community')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'community'
              ? 'bg-[#C8A24A] text-black font-semibold shadow-md'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <MessageSquare size={14} />
          <span>Mentor Discord</span>
        </button>

        <button
          onClick={() => setActiveTab('certificate')}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${
            activeTab === 'certificate'
              ? 'bg-[#C8A24A] text-black font-semibold shadow-md'
              : 'text-white/60 hover:text-white hover:bg-white/5'
          }`}
        >
          <Award size={14} />
          <span>Verified Certificate</span>
        </button>
      </div>

      {/* Tab Content Display Area */}
      <div className="p-6 md:p-8 min-h-[420px]">
        {/* TAB 1: LESSONS */}
        {activeTab === 'lessons' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Lesson Video Screen */}
            <div className="lg:col-span-8 space-y-4">
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-white/10 group shadow-lg">
                <img
                  src="https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1200&auto=format&fit=crop"
                  alt="Lesson Video"
                  className="w-full h-full object-cover filter brightness-[0.7]"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30" />
                
                {/* Center Play indicator */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-16 h-16 rounded-full bg-[#C8A24A] text-black flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform cursor-pointer">
                    <Play size={24} className="ml-1 fill-black" />
                  </div>
                </div>

                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs text-white/90">
                  <span className="font-mono bg-black/60 px-2 py-1 rounded">Module 04: Master DaVinci Node Trees</span>
                  <span className="font-mono text-[#C8A24A]">18:42 / 24:15</span>
                </div>
              </div>

              <div>
                <h4 className="text-lg font-editorial text-white">
                  Lesson 4.2: Building Custom Film Emulation LUTs for Commercials
                </h4>
                <p className="text-xs text-white/60 font-light mt-1">
                  In this master lesson, we deconstruct how Kodak 2383 handles skin undertones, split-toning highlights, and avoiding digital clipping in HDR delivery.
                </p>
              </div>
            </div>

            {/* Lesson List */}
            <div className="lg:col-span-4 space-y-2 max-h-[380px] overflow-y-auto pr-1">
              <div className="text-xs font-mono uppercase tracking-widest text-[#C8A24A] mb-2">
                Course Outline
              </div>

              {[
                { id: 1, title: '01. Organizing 4K Project Files & Ingestion', duration: '14 min', completed: true },
                { id: 2, title: '02. Building Rhythm: J-Cuts & Acoustic Pacing', duration: '24 min', completed: true, active: true },
                { id: 3, title: '03. Speed-Ramping & Optical Flow Secrets', duration: '31 min', completed: true },
                { id: 4, title: '04. DaVinci Node Trees & Color Separation', duration: '28 min', completed: false, current: true },
                { id: 5, title: '05. Kinetic Typography in After Effects', duration: '40 min', locked: true },
                { id: 6, title: '06. Commercial Sound Design & 32-bit Foley', duration: '35 min', locked: true },
                { id: 7, title: '07. Live Client Project Brief Review', duration: '45 min', locked: true },
                { id: 8, title: '08. Showreel Assembly & Portfolio Polish', duration: '50 min', locked: true },
              ].map((lesson) => (
                <div
                  key={lesson.id}
                  onClick={() => !lesson.locked && setActiveLessonId(lesson.id)}
                  className={`flex items-center justify-between p-3 rounded-lg border text-xs cursor-pointer transition-all ${
                    lesson.id === activeLessonId
                      ? 'border-[#C8A24A] bg-[#C8A24A]/10 text-white'
                      : lesson.locked
                      ? 'border-white/5 bg-white/[0.01] text-white/30 cursor-not-allowed'
                      : 'border-white/5 bg-white/[0.03] text-white/80 hover:border-white/20'
                  }`}
                >
                  <div className="flex items-center gap-2.5 truncate">
                    {lesson.completed ? (
                      <CheckCircle size={14} className="text-emerald-400 shrink-0" />
                    ) : lesson.locked ? (
                      <Lock size={14} className="text-white/30 shrink-0" />
                    ) : (
                      <Play size={14} className="text-[#C8A24A] shrink-0" />
                    )}
                    <span className="truncate">{lesson.title}</span>
                  </div>
                  <span className="font-mono text-[10px] text-white/40 ml-2">{lesson.duration}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 2: ASSIGNMENTS */}
        {activeTab === 'assignments' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-editorial text-white">Active Client Briefs & Homework</h4>
                <p className="text-xs text-white/60 font-light">
                  Submit your ProRes / H.264 timeline exports directly to your mentor for timestamped video critiques.
                </p>
              </div>
              <span className="text-xs font-mono text-[#C8A24A] border border-[#C8A24A]/30 px-3 py-1 rounded-full">
                2 DUE THIS WEEK
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-amber-500/10 text-amber-300">
                    DUE IN 3 DAYS
                  </span>
                  <span className="text-xs text-white/40 font-mono">Module 4 Capstone</span>
                </div>
                <h5 className="text-base font-editorial text-white">
                  Brief: Grade 3 Mixed-Lighting Clips into One Cohesive Look
                </h5>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Download the provided raw S-Log3 and RED IPP2 test files. Balance exposure, align skin tones, and build a unified 35mm warm tone.
                </p>
                <div className="pt-2 flex items-center gap-3">
                  <button className="px-4 py-2 rounded-lg bg-[#C8A24A] text-black text-xs font-semibold hover:bg-amber-300 transition-colors">
                    Upload Cut (MP4/MOV)
                  </button>
                  <button className="px-3 py-2 rounded-lg border border-white/10 text-xs text-white/70 hover:text-white">
                    View Rubric
                  </button>
                </div>
              </div>

              <div className="p-5 rounded-xl bg-white/[0.02] border border-white/10 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300">
                    REVIEWED • GRADE A+
                  </span>
                  <span className="text-xs text-white/40 font-mono">Module 3 Project</span>
                </div>
                <h5 className="text-base font-editorial text-white">
                  60-Second Sports Cutdown with Speed-Ramping
                </h5>
                <p className="text-xs text-white/60 leading-relaxed font-light">
                  Mentor feedback: "Incredible rhythm on the second turn. Sound design is 10/10. Ready for your showreel!"
                </p>
                <div className="pt-2">
                  <button className="text-xs text-[#C8A24A] hover:underline flex items-center gap-1">
                    <span>Watch Mentor Video Review (08:20)</span>
                    <ChevronRight size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: DOWNLOADS */}
        {activeTab === 'downloads' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-editorial text-white">Student Asset Library & Raw Footages</h4>
                <p className="text-xs text-white/60 font-light">
                  Exclusive Hollywood-grade sound effects, DAMCA master LUTs, and uncompressed cinema files.
                </p>
              </div>
              {isDownloaded && (
                <div className="px-3 py-1 rounded bg-emerald-500/20 text-emerald-300 text-xs font-mono animate-bounce">
                  ✓ Download started: {isDownloaded}
                </div>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              {[
                { title: 'DAMCA Master Cinema LUT Pack (12 .CUBE)', size: '142 MB', type: 'Color LUTs', count: '12 LUTs' },
                { title: 'Raw Formula Racing 4K S-Log3 Practice Package', size: '4.8 GB', type: 'Raw Footage', count: '34 Clips' },
                { title: 'Sub-Bass & Mechanical Foley Sound Pack', size: '890 MB', type: 'Sound FX', count: '150+ Stems' },
                { title: 'Kinetic Typography After Effects MOGRT Suite', size: '210 MB', type: 'Motion GFX', count: '25 MOGRTs' },
                { title: 'Freelance Client Contract & Pricing Templates', size: '18 MB', type: 'Business Kit', count: '5 Docs' },
                { title: 'Master Keyboard Shortcut Cheat Sheet PDF', size: '4 MB', type: 'Cheat Sheet', count: '2 PDF Guides' }
              ].map((pack, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-xl bg-white/[0.02] border border-white/10 space-y-3 hover:border-[#C8A24A]/40 transition-all flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <span className="text-[10px] font-mono text-[#C8A24A] uppercase tracking-wider">{pack.type}</span>
                    <h5 className="text-sm font-editorial text-white">{pack.title}</h5>
                    <div className="text-[11px] text-white/40 font-mono">{pack.size} • {pack.count}</div>
                  </div>

                  <button
                    onClick={() => handleDownloadSimulation(pack.title)}
                    className="w-full flex items-center justify-center gap-2 py-2 rounded bg-white/5 hover:bg-[#C8A24A] hover:text-black text-white text-xs font-medium transition-all"
                  >
                    <Download size={13} />
                    <span>Download Resource</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: COMMUNITY */}
        {activeTab === 'community' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-lg font-editorial text-white">Private Alumni & Mentor Community</h4>
                <p className="text-xs text-white/60 font-light">
                  500+ active editors sharing client opportunities, timeline critiques, and gear discussions.
                </p>
              </div>
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                128 Editors Online Now
              </span>
            </div>

            <div className="space-y-3 pt-2">
              {[
                { author: 'Chidi N.', role: 'Alumnus', time: '12m ago', text: 'Hey guys! Just landed a $3,500 documentary gig using the DAMCA pitch deck template. Huge thanks to the mentor team!' },
                { author: 'Elena Rostova', role: 'Mentor', time: '45m ago', text: 'Reminder: Tonight is live Office Hours at 7 PM UTC. Drop your timeline links in the #review channel!' },
                { author: 'Tunde Adeleke', role: 'Cohort 5 Student', time: '2h ago', text: 'Quick tip: When editing multicam in Premiere 2025, enabling proxy toggle on SSD halved my render times.' }
              ].map((msg, i) => (
                <div key={i} className="p-3.5 rounded-xl bg-white/[0.02] border border-white/5 flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#C8A24A]/20 border border-[#C8A24A]/30 text-[#C8A24A] font-cinzel text-xs flex items-center justify-center shrink-0">
                    {msg.author[0]}
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-semibold text-white">{msg.author}</span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white/60">{msg.role}</span>
                      <span className="text-[10px] text-white/40">{msg.time}</span>
                    </div>
                    <p className="text-xs text-white/80 font-light">{msg.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: CERTIFICATE */}
        {activeTab === 'certificate' && (
          <div className="flex flex-col items-center justify-center text-center space-y-6 py-4">
            <div className="relative p-8 rounded-2xl bg-gradient-to-b from-[#14120c] to-[#0a0a0a] border-2 border-[#C8A24A]/40 max-w-xl shadow-2xl space-y-4">
              <div className="w-12 h-12 mx-auto rounded-full bg-[#C8A24A]/10 border border-[#C8A24A] text-[#C8A24A] flex items-center justify-center">
                <Award size={24} />
              </div>
              <div className="font-cinzel tracking-[0.3em] text-xs text-[#C8A24A] uppercase">
                DAMCA ACADEMY CERTIFICATE OF PROFESSIONAL MASTERY
              </div>
              <h4 className="text-2xl font-editorial text-white">
                Certified Post-Production Video Editor & Colorist
              </h4>
              <p className="text-xs text-white/60 font-light max-w-md mx-auto">
                Issued upon successful completion of 8-week rigorous coursework, 5 real-world capstone briefs, and portfolio review by industry Creative Directors.
              </p>
              <div className="pt-2 flex items-center justify-center gap-6 text-[10px] font-mono text-white/50 border-t border-white/10 pt-4">
                <span>VERIFIED ID: DAMCA-2025-8849</span>
                <span>GLOBAL RECOGNITION</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
