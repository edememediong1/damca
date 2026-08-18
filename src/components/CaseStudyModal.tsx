import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Play, Pause, Volume2, VolumeX, CheckCircle, ArrowRight, Sparkles, Layers, Sliders, ExternalLink } from 'lucide-react';
import { Project } from '../types';
import { BeforeAfterSlider } from './BeforeAfterSlider';

interface CaseStudyModalProps {
  project: Project | null;
  allProjects: Project[];
  onClose: () => void;
  onSelectRelated: (project: Project) => void;
}

export const CaseStudyModal: React.FC<CaseStudyModalProps> = ({
  project,
  allProjects,
  onClose,
  onSelectRelated,
}) => {
  if (!project) return null;

  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const relatedProjects = allProjects
    .filter((p) => p.id !== project.id)
    .slice(0, 3);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 overflow-y-auto bg-black/95 backdrop-blur-2xl">
        {/* Top Floating Navbar */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-12 py-5 bg-black/80 backdrop-blur-md border-b border-white/10">
          <div className="flex items-center gap-3">
            <span className="text-xs uppercase tracking-[0.25em] text-[#C8A24A] font-cinzel">
              Case Study
            </span>
            <span className="text-white/30">/</span>
            <span className="text-sm font-medium text-white/90 truncate max-w-[200px] md:max-w-md">
              {project.title}
            </span>
          </div>

          <button
            id="close-case-study-btn"
            onClick={onClose}
            className="flex items-center gap-2 px-4 py-2 rounded-full border border-white/15 bg-white/5 hover:bg-white/15 text-white text-xs font-medium tracking-wider transition-all"
          >
            <span>Close</span>
            <X size={16} />
          </button>
        </header>

        {/* Modal Main Content Body */}
        <div className="max-w-6xl mx-auto px-6 md:px-12 py-12 space-y-16">
          
          {/* Project Title Header */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="px-3 py-1 rounded-full bg-[#C8A24A]/10 border border-[#C8A24A]/30 text-xs font-cinzel text-[#C8A24A]">
                {project.category}
              </span>
              <span className="text-xs text-white/50 font-mono">Client: {project.client}</span>
              <span className="text-xs text-white/50 font-mono">•</span>
              <span className="text-xs text-white/50 font-mono">Year: {project.year}</span>
              <span className="text-xs text-white/50 font-mono">•</span>
              <span className="text-xs text-white/50 font-mono">Duration: {project.duration}</span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-editorial font-light text-white leading-tight">
              {project.title}
            </h1>

            <p className="text-base md:text-xl text-white/70 font-light max-w-3xl leading-relaxed">
              {project.caseStudy.overview}
            </p>
          </div>

          {/* Large Hero Video Player */}
          <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black shadow-2xl group">
            <video
              src={project.caseStudy.heroVideoUrl || project.heroVideoUrl}
              autoPlay
              loop
              muted={isMuted}
              playsInline
              className="w-full h-full object-cover"
            />

            {/* Video Floating Controls */}
            <div className="absolute bottom-6 left-6 right-6 flex items-center justify-between pointer-events-auto">
              <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/70 backdrop-blur-md border border-white/15 text-xs text-white">
                <span className="w-2 h-2 rounded-full bg-[#C8A24A] animate-pulse" />
                <span>4K CINEMATIC MASTER</span>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="w-10 h-10 rounded-full bg-black/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white hover:text-[#C8A24A] hover:border-[#C8A24A] transition-all"
                  title="Toggle Audio"
                >
                  {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
                </button>
              </div>
            </div>
          </div>

          {/* Challenge & Creative Process Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 pt-4">
            <div className="p-8 rounded-2xl bg-[#0c0c0c] border border-white/10 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-red-400" />
                <span className="text-xs uppercase tracking-[0.2em] font-cinzel text-white/60">
                  The Challenge
                </span>
              </div>
              <h3 className="text-2xl font-editorial font-light text-white">
                Overcoming Friction
              </h3>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {project.caseStudy.challenge}
              </p>
            </div>

            <div className="p-8 rounded-2xl bg-[#0c0c0c] border border-[#C8A24A]/20 space-y-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8A24A]" />
                <span className="text-xs uppercase tracking-[0.2em] font-cinzel text-[#C8A24A]">
                  Creative Process
                </span>
              </div>
              <h3 className="text-2xl font-editorial font-light text-white">
                Architecting The Emotion
              </h3>
              <p className="text-sm md:text-base text-white/70 font-light leading-relaxed">
                {project.caseStudy.creativeProcess}
              </p>
            </div>
          </div>

          {/* Detailed Editing Workflow Timeline */}
          <div className="space-y-6 pt-4">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8A24A]">
                Post-Production Blueprint
              </span>
              <h3 className="text-2xl md:text-3xl font-editorial font-light text-white">
                Editing Workflow Breakdown
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {project.caseStudy.editingWorkflow.map((step, idx) => (
                <div
                  key={idx}
                  className="flex items-start gap-4 p-5 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-white/15 transition-all"
                >
                  <div className="w-8 h-8 rounded-full border border-[#C8A24A]/40 bg-[#C8A24A]/10 text-[#C8A24A] font-mono text-xs flex items-center justify-center shrink-0">
                    0{idx + 1}
                  </div>
                  <p className="text-sm text-white/80 font-light leading-relaxed pt-1">
                    {step}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Color Grading & Interactive Before/After Split Slider */}
          <div className="space-y-6 pt-6">
            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-[#C8A24A]">
                Color Science & Film Emulation
              </span>
              <h3 className="text-2xl md:text-3xl font-editorial font-light text-white">
                Before & After Color Grade
              </h3>
              <p className="text-sm text-white/60 font-light max-w-2xl">
                {project.caseStudy.colorGradingSummary}
              </p>
            </div>

            {/* Interactive Before & After Slider */}
            <BeforeAfterSlider data={project.caseStudy.beforeAfter} />
          </div>

          {/* Motion Graphics & Audio Design 2-Column Specs */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
            <div className="p-6 rounded-2xl bg-[#0b0b0b] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#C8A24A]">
                <Sparkles size={16} />
                <span className="text-xs font-mono uppercase tracking-widest">Motion Graphics & VFX</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                {project.caseStudy.motionGraphicsSummary}
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-[#0b0b0b] border border-white/10 space-y-3">
              <div className="flex items-center gap-2 text-[#C8A24A]">
                <Volume2 size={16} />
                <span className="text-xs font-mono uppercase tracking-widest">Sound Design & Mix</span>
              </div>
              <p className="text-sm text-white/70 leading-relaxed font-light">
                {project.caseStudy.audioDesignSummary}
              </p>
            </div>
          </div>

          {/* Client Testimonial (if present) & Key Measurable Results */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 items-center">
            {project.caseStudy.testimonial && (
              <div className="lg:col-span-7 p-8 rounded-2xl bg-gradient-to-br from-[#12100a] to-[#0a0a0a] border border-[#C8A24A]/30 space-y-4">
                <span className="text-4xl font-editorial text-[#C8A24A]">“</span>
                <p className="text-base md:text-lg font-editorial italic text-white/90 leading-relaxed">
                  {project.caseStudy.testimonial.quote}
                </p>
                <div className="flex items-center gap-3 pt-2">
                  <img
                    src={project.caseStudy.testimonial.avatarUrl}
                    alt={project.caseStudy.testimonial.author}
                    className="w-10 h-10 rounded-full object-cover border border-[#C8A24A]/40"
                  />
                  <div>
                    <div className="text-xs font-semibold text-white">
                      {project.caseStudy.testimonial.author}
                    </div>
                    <div className="text-[11px] text-white/50">
                      {project.caseStudy.testimonial.role} • {project.caseStudy.testimonial.company}
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className={`${project.caseStudy.testimonial ? 'lg:col-span-5' : 'lg:col-span-12'} space-y-4 p-8 rounded-2xl bg-[#0a0a0a] border border-white/10`}>
              <div className="text-xs font-mono uppercase tracking-widest text-[#C8A24A]">
                Impact & Key Results
              </div>
              <div className="space-y-3">
                {project.caseStudy.results.map((result, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-[#C8A24A] shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80 font-light">{result}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Related Projects */}
          <div className="space-y-6 pt-12 border-t border-white/10">
            <div className="flex items-center justify-between">
              <h4 className="text-xl md:text-2xl font-editorial font-light text-white">
                More Featured Works
              </h4>
              <span className="text-xs font-mono text-white/40">EXPLORE ARCHIVE</span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedProjects.map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onSelectRelated(rel)}
                  className="group cursor-pointer rounded-xl overflow-hidden bg-[#0c0c0c] border border-white/10 hover:border-[#C8A24A]/50 transition-all space-y-3 p-3"
                >
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-black">
                    <img
                      src={rel.thumbnail}
                      alt={rel.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-2 right-2 px-2 py-0.5 rounded bg-black/70 backdrop-blur-md text-[10px] font-cinzel text-[#C8A24A]">
                      {rel.category}
                    </div>
                  </div>
                  <div>
                    <h5 className="text-sm font-editorial text-white group-hover:text-[#C8A24A] transition-colors truncate">
                      {rel.title}
                    </h5>
                    <p className="text-xs text-white/50 truncate">{rel.client}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Close Button */}
          <div className="text-center pt-8">
            <button
              onClick={onClose}
              className="px-8 py-3.5 rounded-full border border-[#C8A24A] bg-[#C8A24A] text-black font-semibold text-xs tracking-widest uppercase hover:bg-white hover:border-white transition-all shadow-xl"
            >
              Back to Portfolio
            </button>
          </div>

        </div>
      </div>
    </AnimatePresence>
  );
};
