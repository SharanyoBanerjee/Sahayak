import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-paper border-t border-rule py-8 text-xs text-mute">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-4 mb-4 border-b border-rule">
          {/* Brand */}
          <div className="flex items-baseline gap-2.5">
            <span className="font-serif text-lg font-medium text-ink">Sahayak</span>
            <span className="text-xs text-mute">Packaging Decision Intelligence</span>
          </div>

          {/* Standards & Dept info */}
          <div className="flex items-center gap-3 text-[11px] font-mono">
            <span>MoFPI · SIH 2024</span>
            <span className="text-rule">/</span>
            <span>Problem Statement #236</span>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-[11px]">
          <p>
            Deterministic chemical barrier engine · Steady-state respiration solver · Zero unverifiable claims
          </p>
          <p className="font-mono text-mute">
            All property rules cited to peer-reviewed literature
          </p>
        </div>
      </div>
    </footer>
  );
};
