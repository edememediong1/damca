import React, { useState, useRef, useCallback } from 'react';
import { Sparkles, Sliders } from 'lucide-react';
import { BeforeAfterMedia } from '../types';

interface BeforeAfterSliderProps {
  data: BeforeAfterMedia;
  className?: string;
}

export const BeforeAfterSlider: React.FC<BeforeAfterSliderProps> = ({ data, className = '' }) => {
  const [sliderPosition, setSliderPosition] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMove = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
    const percentage = (x / rect.width) * 100;
    setSliderPosition(percentage);
  }, []);

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    handleMove(e.touches[0].clientX);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    handleMove(e.clientX);
  };

  return (
    <div className={`space-y-3 ${className}`}>
      <div
        ref={containerRef}
        onMouseDown={() => setIsDragging(true)}
        onMouseUp={() => setIsDragging(false)}
        onMouseLeave={() => setIsDragging(false)}
        onMouseMove={handleMouseMove}
        onTouchStart={() => setIsDragging(true)}
        onTouchEnd={() => setIsDragging(false)}
        onTouchMove={handleTouchMove}
        className="relative w-full aspect-video md:aspect-[21/9] rounded-xl overflow-hidden cursor-ew-resize select-none border border-white/10 shadow-2xl bg-black"
      >
        {/* "After" Image (Full background) */}
        <img
          src={data.afterImage}
          alt={data.afterLabel}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* "Before" Image (Clipped overlay) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ width: `${sliderPosition}%` }}
        >
          <img
            src={data.beforeImage}
            alt={data.beforeLabel}
            className="absolute inset-0 w-full h-full object-cover max-w-none filter grayscale-[30%] brightness-90"
            style={{ width: containerRef.current ? `${containerRef.current.clientWidth}px` : '100%' }}
          />
        </div>

        {/* Split Divider Line & Handle */}
        <div
          className="absolute top-0 bottom-0 w-0.5 bg-[#C8A24A] shadow-[0_0_10px_#C8A24A] z-20 flex items-center justify-center -translate-x-1/2"
          style={{ left: `${sliderPosition}%` }}
        >
          <div className="w-8 h-8 rounded-full bg-black/90 border-2 border-[#C8A24A] text-[#C8A24A] flex items-center justify-center shadow-lg backdrop-blur-md">
            <Sliders size={14} />
          </div>
        </div>

        {/* Label Tags */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 rounded bg-black/70 backdrop-blur-md border border-white/10 text-[11px] font-mono uppercase tracking-wider text-white/80">
          {data.beforeLabel}
        </div>
        <div className="absolute top-4 right-4 z-20 px-3 py-1 rounded bg-[#C8A24A]/90 backdrop-blur-md border border-[#C8A24A] text-[11px] font-mono uppercase tracking-wider text-black font-semibold">
          {data.afterLabel}
        </div>

        {/* Drag Hint */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-widest text-white/60 pointer-events-none">
          Drag to compare grading
        </div>
      </div>

      {data.description && (
        <p className="text-xs text-white/50 text-center font-light italic">
          {data.description}
        </p>
      )}
    </div>
  );
};
