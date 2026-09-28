import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-ink text-white/80 py-10 text-xs">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-5 mb-5 border-b border-white/15">
          {/* Brand */}
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-xl text-white">Sahayak</span>
            <span className="text-xs text-white/50">Packaging Decision Intelligence</span>
          </div>

          {/* Standards & Dept info */}
          <div className="flex items-center gap-3 text-[11px] font-mono text-white/50">
            <span>MoFPI · SIH 2026</span>
            <span className="text-white/20">|</span>
            <span>Problem Statement #236</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px] text-white/50">
          <p>
            Deterministic chemical barrier engine · Steady-state respiration solver · Zero unverifiable claims
          </p>
          <p className="font-mono">
            All property rules cited to peer-reviewed literature
          </p>
        </div>
      </div>
    </footer>
  );
};
