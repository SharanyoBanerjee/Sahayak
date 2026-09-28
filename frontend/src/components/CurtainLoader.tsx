import React, { useEffect, useState } from 'react';

interface CurtainLoaderProps {
  onComplete?: () => void;
  minDurationMs?: number;
}

export const CurtainLoader: React.FC<CurtainLoaderProps> = ({
  onComplete,
  minDurationMs = 1200,
}) => {
  const [phase, setPhase] = useState<'showing' | 'opening' | 'finished'>('showing');
  const [statusText, setStatusText] = useState('Initializing deterministic engine…');

  useEffect(() => {
    // Lock scroll during curtain
    document.body.style.overflow = 'hidden';

    const t1 = setTimeout(() => {
      setStatusText('Calibrating barrier constraints…');
    }, 450);

    const t2 = setTimeout(() => {
      setStatusText('System Ready · SIH 2026');
    }, 800);

    // Trigger curtain lift up
    const t3 = setTimeout(() => {
      setPhase('opening');
    }, minDurationMs);

    // Completely finish and clean up
    const t4 = setTimeout(() => {
      setPhase('finished');
      document.body.style.overflow = '';
      if (onComplete) onComplete();
    }, minDurationMs + 1050);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      clearTimeout(t4);
      document.body.style.overflow = '';
    };
  }, [minDurationMs, onComplete]);

  if (phase === 'finished') {
    return null;
  }

  const isOpening = phase === 'opening';

  return (
    <div
      aria-hidden={isOpening ? 'true' : 'false'}
      className="fixed inset-0 z-[100] pointer-events-auto select-none overflow-hidden"
    >
      {/* Layer 1: Dark trailing under-curtain for luxury depth */}
      <div
        className={`absolute inset-0 bg-[#0F2419] transition-transform duration-[1000ms] will-change-transform ${
          isOpening ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)',
          transitionDelay: '100ms',
        }}
      />

      {/* Layer 2: Main Forest Green curtain with gold highlight border at bottom */}
      <div
        className={`absolute inset-0 bg-[#163826] border-b-2 border-[#D4A373]/40 shadow-2xl flex flex-col items-center justify-center transition-transform duration-[950ms] will-change-transform ${
          isOpening ? '-translate-y-full' : 'translate-y-0'
        }`}
        style={{
          transitionTimingFunction: 'cubic-bezier(0.85, 0, 0.15, 1)',
        }}
      >
        {/* Subtle decorative grid/glow inside curtain */}
        <div 
          className="absolute inset-0 opacity-[0.06] pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 50% 50%, #ffffff 1px, transparent 1px)`,
            backgroundSize: '32px 32px'
          }}
        />

        {/* Ambient warm radial spotlight */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#40916C]/15 blur-[120px] rounded-full pointer-events-none" />

        {/* Brand Content Container */}
        <div
          className={`relative z-10 flex flex-col items-center text-center px-6 transition-all duration-500 ${
            isOpening ? '-translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
          }`}
        >
          {/* Badge: SIH 2026 */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1B4332]/80 border border-[#D4E7D0]/20 text-[#D4E7D0] text-[11px] font-mono tracking-widest uppercase mb-6 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#40916C] animate-pulse" />
            <span>Smart India Hackathon 2026 · MoFPI</span>
          </div>

          {/* Grand Brand Typography */}
          <h1 className="font-serif text-5xl sm:text-6xl text-[#F5F0E8] tracking-tight mb-2 drop-shadow-sm">
            Sahayak
          </h1>

          {/* Subtitle */}
          <p className="text-xs sm:text-sm font-sans font-medium tracking-[0.2em] uppercase text-[#D4E7D0]/70 mb-8 max-w-md">
            Food Packaging Decision Intelligence
          </p>

          {/* Minimalist Gold/Green Progress Bar */}
          <div className="w-48 h-[2px] bg-white/10 rounded-full overflow-hidden mb-4 relative">
            <div className="h-full bg-gradient-to-r from-[#D4A373] via-[#D4E7D0] to-[#40916C] animate-curtain-progress rounded-full" />
          </div>

          {/* Dynamic Status ticker */}
          <p className="font-mono text-[11px] text-[#D4E7D0]/60 transition-all duration-300">
            {statusText}
          </p>
        </div>

        {/* Bottom subtle indicator */}
        <div className="absolute bottom-8 left-0 right-0 flex justify-center text-[10px] font-mono uppercase tracking-widest text-[#D4E7D0]/40">
          <span>Problem Statement #236</span>
        </div>
      </div>
    </div>
  );
};
