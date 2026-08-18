import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, ArrowUpRight, Volume2, VolumeX } from 'lucide-react';
import { SiteMediaConfig } from '../types';

interface SplitLandingProps {
  onSelectSide: (side: 'portfolio' | 'academy') => void;
  mediaConfig?: SiteMediaConfig;
}

export const SplitLanding: React.FC<SplitLandingProps> = ({ onSelectSide, mediaConfig }) => {
  const [hoveredSide, setHoveredSide] = useState<'left' | 'right' | null>(null);
  const [selectedTransition, setSelectedTransition] = useState<'left' | 'right' | null>(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isMobile, setIsMobile] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const portfolioImage = mediaConfig?.splitLandingPortfolioImage || "https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?q=80&w=1600&auto=format&fit=crop";
  const portfolioVideo = mediaConfig?.splitLandingPortfolioVideo;
  const academyImage = mediaConfig?.splitLandingAcademyImage || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop";
  const academyVideo = mediaConfig?.splitLandingAcademyVideo;

  const handleSelect = (side: 'left' | 'right') => {
    setSelectedTransition(side);
    setTimeout(() => {
      onSelectSide(side === 'left' ? 'portfolio' : 'academy');
    }, 850);
  };

  return (
    <div className="relative w-screen h-[100dvh] min-h-[100dvh] overflow-hidden bg-[#050505] text-white select-none">
      {/* Top Header Bar */}
      <header className="absolute top-0 left-0 right-0 z-40 flex items-center justify-between px-4 sm:px-6 md:px-12 py-3.5 sm:py-6 pointer-events-none">
        <div className="flex items-center gap-2.5 sm:gap-3 pointer-events-auto">
          <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[#C8A24A]/40 flex items-center justify-center bg-black/60 backdrop-blur-md shrink-0">
            <span className="font-cinzel text-xs text-[#C8A24A] font-bold">D</span>
          </div>
          <span className="font-cinzel tracking-[0.3em] sm:tracking-[0.35em] text-xs sm:text-sm md:text-base font-semibold text-white/90">
            DAMCA
          </span>
        </div>

        <div className="flex items-center gap-3 pointer-events-auto">
          <button
            id="toggle-audio-btn"
            onClick={() => setIsMuted(!isMuted)}
            className="flex items-center gap-1.5 sm:gap-2 px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-white/10 bg-black/50 backdrop-blur-md text-[11px] sm:text-xs text-white/70 hover:text-white hover:border-[#C8A24A]/50 transition-colors"
            title="Toggle Ambient Audio"
          >
            {isMuted ? <VolumeX size={13} className="sm:w-3.5 sm:h-3.5" /> : <Volume2 size={13} className="text-[#C8A24A] sm:w-3.5 sm:h-3.5" />}
            <span className="hidden sm:inline">{isMuted ? 'Sound Off' : 'Sound On'}</span>
          </button>
        </div>
      </header>

      {/* Desktop Center Divider Indicator (MD+) */}
      <div className="hidden md:flex absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex-col items-center gap-2">
        <div className="w-px h-12 bg-gradient-to-b from-transparent via-[#C8A24A]/60 to-transparent" />
        <div className="w-8 h-8 rounded-full border border-[#C8A24A]/50 bg-black/80 backdrop-blur-md flex items-center justify-center text-[10px] tracking-widest text-[#C8A24A] font-cinzel shadow-lg">
          OR
        </div>
        <div className="w-px h-12 bg-gradient-to-b from-[#C8A24A]/60 via-transparent to-transparent" />
      </div>

      {/* Mobile Center Divider Indicator (< MD) */}
      <div className="md:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 pointer-events-none flex items-center justify-center w-full px-6">
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C8A24A]/40 to-transparent" />
        <div className="w-7 h-7 mx-2 rounded-full border border-[#C8A24A]/50 bg-black/90 backdrop-blur-md flex items-center justify-center text-[9px] tracking-widest text-[#C8A24A] font-cinzel shadow-lg shrink-0">
          OR
        </div>
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#C8A24A]/40 to-transparent" />
      </div>

      {/* Split Panels Container */}
      <div className="relative w-full h-full flex flex-col md:flex-row">
        
        {/* ================= LEFT PANEL: PORTFOLIO ================= */}
        <motion.div
          id="landing-left-panel"
          onMouseEnter={() => !isMobile && setHoveredSide('left')}
          onMouseLeave={() => !isMobile && setHoveredSide(null)}
          onClick={() => handleSelect('left')}
          animate={
            isMobile
              ? {
                  width: '100%',
                  height: selectedTransition === 'left' ? '100%' : selectedTransition === 'right' ? '0%' : '50%',
                  opacity: selectedTransition === 'right' ? 0 : 1,
                  zIndex: selectedTransition === 'left' ? 35 : 10
                }
              : {
                  width: selectedTransition === 'left' ? '100%' : selectedTransition === 'right' ? '0%' : hoveredSide === 'left' ? '56%' : hoveredSide === 'right' ? '44%' : '50%',
                  height: '100%',
                  opacity: selectedTransition === 'right' ? 0 : 1,
                  zIndex: selectedTransition === 'left' ? 35 : 10
                }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-1/2 md:h-full cursor-pointer group overflow-hidden border-b md:border-b-0 md:border-r border-white/10 w-full"
        >
          {/* Background Media */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              animate={{
                scale: !isMobile && hoveredSide === 'left' ? 1.07 : 1,
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-full h-full"
            >
              {portfolioVideo ? (
                <video
                  src={portfolioVideo}
                  poster={portfolioImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.15]"
                />
              ) : (
                <img
                  src={portfolioImage}
                  alt="Creative Editor Portfolio"
                  className="w-full h-full object-cover filter brightness-[0.55] contrast-[1.15]"
                />
              )}
            </motion.div>
            
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 group-hover:via-black/60 transition-colors duration-700" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/40 to-[#050505]" />
          </div>

          {/* Ambient Film Grain */}
          <div className="absolute inset-0 film-grain pointer-events-none opacity-40" />

          {/* Content Block */}
          <div className="relative z-20 w-full h-full flex flex-col justify-end p-5 sm:p-8 md:p-14 lg:p-20 pb-6 sm:pb-10 md:pb-20">
            <motion.div
              animate={{
                y: !isMobile && hoveredSide === 'left' ? -8 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-xl space-y-2 sm:space-y-3 md:space-y-4"
            >
              {/* Category Tag */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <span className="w-1.5 sm:w-2 h-1.5 sm:h-2 rounded-full bg-[#C8A24A] animate-pulse shrink-0" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C8A24A] font-medium font-cinzel truncate">
                  Creative Editor & Director
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-editorial font-light tracking-tight text-white leading-tight sm:leading-none">
                Portfolio
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/75 font-light leading-relaxed max-w-md line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                Crafting stories through motion, rhythm, and emotion for world-class brands, documentaries, and creators.
              </p>

              {/* Button */}
              <div className="pt-1 sm:pt-2 md:pt-3">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md group-hover:border-[#C8A24A] group-hover:bg-[#C8A24A] group-hover:text-black text-white text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 shadow-xl">
                  <span>Enter Portfolio</span>
                  <ArrowUpRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Subtle Hover Glow Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8A24A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>

        {/* ================= RIGHT PANEL: DAMCA ACADEMY ================= */}
        <motion.div
          id="landing-right-panel"
          onMouseEnter={() => !isMobile && setHoveredSide('right')}
          onMouseLeave={() => !isMobile && setHoveredSide(null)}
          onClick={() => handleSelect('right')}
          animate={
            isMobile
              ? {
                  width: '100%',
                  height: selectedTransition === 'right' ? '100%' : selectedTransition === 'left' ? '0%' : '50%',
                  opacity: selectedTransition === 'left' ? 0 : 1,
                  zIndex: selectedTransition === 'right' ? 35 : 10
                }
              : {
                  width: selectedTransition === 'right' ? '100%' : selectedTransition === 'left' ? '0%' : hoveredSide === 'right' ? '56%' : hoveredSide === 'left' ? '44%' : '50%',
                  height: '100%',
                  opacity: selectedTransition === 'left' ? 0 : 1,
                  zIndex: selectedTransition === 'right' ? 35 : 10
                }
          }
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="relative h-1/2 md:h-full cursor-pointer group overflow-hidden w-full"
        >
          {/* Background Media */}
          <div className="absolute inset-0 z-0 overflow-hidden">
            <motion.div
              animate={{
                scale: !isMobile && hoveredSide === 'right' ? 1.07 : 1,
              }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="w-full h-full"
            >
              {academyVideo ? (
                <video
                  src={academyVideo}
                  poster={academyImage}
                  autoPlay
                  loop
                  muted
                  playsInline
                  className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.1]"
                />
              ) : (
                <img
                  src={academyImage}
                  alt="DAMCA Academy"
                  className="w-full h-full object-cover filter brightness-[0.5] contrast-[1.1]"
                />
              )}
            </motion.div>
            
            {/* Cinematic Gradient Overlays */}
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-black/30 group-hover:via-black/60 transition-colors duration-700" />
            <div className="absolute inset-0 bg-radial from-transparent via-[#050505]/40 to-[#050505]" />
          </div>

          {/* Ambient Film Grain */}
          <div className="absolute inset-0 film-grain pointer-events-none opacity-40" />

          {/* Content Block */}
          <div className="relative z-20 w-full h-full flex flex-col justify-end p-5 sm:p-8 md:p-14 lg:p-20 pb-6 sm:pb-10 md:pb-20">
            <motion.div
              animate={{
                y: !isMobile && hoveredSide === 'right' ? -8 : 0,
              }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="max-w-xl space-y-2 sm:space-y-3 md:space-y-4"
            >
              {/* Category Tag */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                <GraduationCap size={14} className="text-[#C8A24A] shrink-0 sm:w-4 sm:h-4" />
                <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] sm:tracking-[0.25em] text-[#C8A24A] font-medium font-cinzel truncate">
                  Education & Mentorship
                </span>
              </div>

              {/* Main Headline */}
              <h2 className="text-2xl sm:text-4xl md:text-5xl lg:text-7xl font-editorial font-light tracking-tight text-white leading-tight sm:leading-none">
                DAMCA Academy
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm md:text-base lg:text-lg text-white/75 font-light leading-relaxed max-w-md line-clamp-2 sm:line-clamp-3 md:line-clamp-none">
                Learn professional video editing through real industry workflows, live project breakdowns, and 1-on-1 mentorship.
              </p>

              {/* Button */}
              <div className="pt-1 sm:pt-2 md:pt-3">
                <div className="inline-flex items-center gap-2 sm:gap-3 px-4 py-2 sm:px-6 sm:py-3.5 rounded-full border border-white/20 bg-white/5 backdrop-blur-md group-hover:border-[#C8A24A] group-hover:bg-[#C8A24A] group-hover:text-black text-white text-xs sm:text-sm font-medium tracking-wider transition-all duration-300 shadow-xl">
                  <span>Enter Academy</span>
                  <ArrowUpRight size={14} className="sm:w-4 sm:h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform shrink-0" />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Subtle Hover Glow Line */}
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#C8A24A] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
        </motion.div>

      </div>

      {/* Bottom Hint Indicator */}
      <div className="hidden md:block absolute bottom-4 left-1/2 -translate-x-1/2 z-30 pointer-events-none text-center">
        <span className="text-[11px] uppercase tracking-[0.3em] text-white/40 font-mono">
          Select an experience to begin
        </span>
      </div>
    </div>
  );
};
