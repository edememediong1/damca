import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Film, Volume2, Sparkles, Eye, Sliders, Layers, ChevronRight, Play } from 'lucide-react';

interface LayerInfo {
  id: number;
  label: string;
  badge: string;
  title: string;
  description: string;
  meta: string[];
  imageUrl: string;
  colorGradeFilter: string;
}

const LAYERS: LayerInfo[] = [
  {
    id: 1,
    label: '01. Raw Assembly',
    badge: 'RAW S-LOG3',
    title: 'Raw Sensor Capture & Rough Edit',
    description: 'Flat dynamic range capture preserving 14+ stops of shadow & highlight latitude. Audio is raw scratch camera mic.',
    meta: ['Codec: Sony XAVC S-I 4K', 'FPS: 24.000', 'Aspect: 2.39:1 Anamorphic', 'Color Profile: S-Gamut3.Cine'],
    imageUrl: 'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1200&auto=format&fit=crop',
    colorGradeFilter: 'grayscale(20%) brightness(0.9) contrast(0.85)'
  },
  {
    id: 2,
    label: '02. Audio Stems',
    badge: '32-BIT FLOAT',
    title: 'Sound Design & Foley Waveforms',
    description: 'Layering 16 discrete audio stems — custom engine foley, mechanical clicks, binaural air pressure, and sub-bass impacts.',
    meta: ['Tracks: 16 Stems', 'Sample Rate: 96kHz / 32-bit', 'Binaural Ambisonics', 'Loudness Target: -14 LUFS'],
    imageUrl: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?q=80&w=1200&auto=format&fit=crop',
    colorGradeFilter: 'contrast(1.1) brightness(0.7) hue-rotate(180deg)'
  },
  {
    id: 3,
    label: '03. Motion VFX',
    badge: 'AFTER EFFECTS',
    title: 'Motion Tracking & HUD Overlays',
    description: '3D point cloud planar camera tracking with bespoke animated kinetic typography, telemetry grids, and optical lens dirt.',
    meta: ['Tracking: Mocha Pro 3D', 'Render Engine: AE Compositing', 'Typography: Custom Serif HUD', 'Chromatic Aberration: +1.5%'],
    imageUrl: 'https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1200&auto=format&fit=crop',
    colorGradeFilter: 'contrast(1.25) saturate(1.3) brightness(0.95)'
  },
  {
    id: 4,
    label: '04. Final Master',
    badge: 'CINEMA MASTER',
    title: 'DaVinci Resolve Film Emulation & Delivery',
    description: 'Bespoke Kodak 2383 film grain print emulation, isolated golden skin tones, halation around specular highlights, and Dolby Atmos audio master.',
    meta: ['Color Pipeline: ACEScc', 'Film Stock: Kodak 5219 / 2383', 'Master Output: ProRes 4444 XQ', 'Dynamic Range: HDR10+'],
    imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?q=80&w=1200&auto=format&fit=crop',
    colorGradeFilter: 'none'
  }
];

export const DeepProjectInspector: React.FC = () => {
  const [activeLayer, setActiveLayer] = useState<number>(4);

  const current = LAYERS.find((l) => l.id === activeLayer) || LAYERS[3];

  return (
    <section className="relative py-24 md:py-32 px-6 md:px-12 bg-[#080808] border-y border-white/10 overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#C8A24A]/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-12">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2">
              <Layers size={14} className="text-[#C8A24A]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#C8A24A] font-cinzel">
                Interactive Layer Inspector
              </span>
            </div>
            <h2 className="text-3xl md:text-5xl font-editorial font-light text-white leading-tight">
              Peeling Back The <span className="text-[#C8A24A] italic font-normal">Anatomy</span> of a Cut
            </h2>
            <p className="text-sm md:text-base text-white/60 font-light">
              Video editing is architectural. Toggle through the four distinct layers of production to see how raw captured frames evolve into a polished cinematic master.
            </p>
          </div>

          {/* Quick layer badges */}
          <div className="flex flex-wrap gap-2">
            {LAYERS.map((layer) => (
              <button
                key={layer.id}
                onClick={() => setActiveLayer(layer.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono tracking-wider transition-all duration-300 ${
                  activeLayer === layer.id
                    ? 'bg-[#C8A24A] text-black font-semibold shadow-[0_0_20px_rgba(200,162,74,0.3)]'
                    : 'bg-white/5 text-white/70 border border-white/10 hover:border-[#C8A24A]/40'
                }`}
              >
                {layer.label}
              </button>
            ))}
          </div>
        </div>

        {/* Interactive Studio Canvas */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-[#050505] p-6 md:p-8 rounded-2xl border border-white/10 shadow-2xl">
          
          {/* Main Visual Display */}
          <div className="lg:col-span-8 space-y-4">
            <div className="relative aspect-video rounded-xl overflow-hidden border border-white/10 bg-black group">
              <AnimatePresence mode="wait">
                <motion.img
                  key={current.id}
                  src={current.imageUrl}
                  alt={current.title}
                  initial={{ opacity: 0.4, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0.3 }}
                  transition={{ duration: 0.4 }}
                  style={{ filter: current.colorGradeFilter }}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>

              {/* Layer Top HUD */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-xs font-mono text-[#C8A24A]">
                  <span className="w-2 h-2 rounded-full bg-[#C8A24A] animate-pulse" />
                  {current.badge}
                </div>
                <div className="px-3 py-1.5 rounded-md bg-black/80 backdrop-blur-md border border-white/10 text-[11px] font-mono text-white/70">
                  LAYER {current.id} / 04
                </div>
              </div>

              {/* Simulated Waveform / Grid Overlay for Layers 2 & 3 */}
              {activeLayer === 2 && (
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-lg bg-black/70 backdrop-blur-md border border-white/15 space-y-2 pointer-events-none">
                  <div className="flex items-center justify-between text-[11px] font-mono text-[#C8A24A]">
                    <span className="flex items-center gap-1.5"><Volume2 size={12} /> STEM BUS A: STEREO FOLEY</span>
                    <span>-14.2 LUFS</span>
                  </div>
                  <div className="flex items-end gap-1 h-8">
                    {[40, 65, 85, 30, 95, 45, 75, 90, 50, 80, 100, 60, 35, 70, 85, 95, 60, 40, 75, 90, 45, 65, 80, 55, 90, 100, 70, 50, 85, 65].map((h, i) => (
                      <motion.div
                        key={i}
                        animate={{ height: [`${h * 0.4}%`, `${h}%`, `${h * 0.6}%`] }}
                        transition={{ duration: 0.8 + (i % 5) * 0.2, repeat: Infinity, ease: 'easeInOut' }}
                        className="flex-1 bg-gradient-to-t from-[#C8A24A] to-amber-200 rounded-t-sm opacity-80"
                      />
                    ))}
                  </div>
                </div>
              )}

              {activeLayer === 3 && (
                <div className="absolute inset-0 pointer-events-none border-2 border-dashed border-[#C8A24A]/30 m-8 rounded-lg flex items-center justify-center">
                  <div className="text-center space-y-1 bg-black/70 px-4 py-2 rounded border border-[#C8A24A]/40 text-xs font-mono text-[#C8A24A]">
                    <div>[ CAMERA TRACK 3D POINT SOLVE ]</div>
                    <div className="text-[10px] text-white/60">POS: X: 1920.4 | Y: 1080.2 | Z: -42.8</div>
                  </div>
                </div>
              )}

              {/* Layer Scrub Slider at bottom */}
              <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-[10px] font-mono text-white/50 bg-black/60 px-3 py-1 rounded backdrop-blur-md">
                <span>00:00:14:18</span>
                <span className="text-[#C8A24A]">SCRUB TIMELINE PREVIEW</span>
                <span>REC TC 01:45:00</span>
              </div>
            </div>

            {/* Scrub selector bar */}
            <div className="grid grid-cols-4 gap-2 pt-2">
              {LAYERS.map((layer) => (
                <button
                  key={layer.id}
                  onClick={() => setActiveLayer(layer.id)}
                  className={`p-2.5 rounded-lg border text-left transition-all ${
                    activeLayer === layer.id
                      ? 'border-[#C8A24A] bg-[#C8A24A]/10 text-white'
                      : 'border-white/5 bg-white/[0.02] text-white/50 hover:text-white/80 hover:border-white/20'
                  }`}
                >
                  <div className="text-[10px] font-mono text-[#C8A24A]">0{layer.id}</div>
                  <div className="text-xs font-medium truncate">{layer.badge}</div>
                </button>
              ))}
            </div>
          </div>

          {/* Layer Technical Breakdown & Details */}
          <div className="lg:col-span-4 space-y-6">
            <div className="space-y-2">
              <span className="text-xs font-mono text-[#C8A24A] tracking-wider uppercase">
                Active Layer Analysis
              </span>
              <h3 className="text-2xl font-editorial font-light text-white">
                {current.title}
              </h3>
              <p className="text-sm text-white/70 font-light leading-relaxed">
                {current.description}
              </p>
            </div>

            {/* Technical Metadata Specs */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/50">
                Pipeline Specifications
              </h4>
              <div className="space-y-2">
                {current.meta.map((item, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 p-2.5 rounded-md bg-white/[0.03] border border-white/5 text-xs font-mono text-white/80"
                  >
                    <div className="w-1.5 h-1.5 rounded-full bg-[#C8A24A]" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Direct Workflow Note */}
            <div className="p-4 rounded-xl border border-[#C8A24A]/20 bg-[#C8A24A]/5 space-y-1.5">
              <div className="text-xs font-cinzel text-[#C8A24A] font-semibold flex items-center gap-1.5">
                <Sparkles size={13} />
                Editor's Direct Secret
              </div>
              <p className="text-xs text-white/70 leading-relaxed font-light">
                Every frame is graded and paced to evoke physical presence. We don't just assemble footage; we design visceral rhythm.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};
