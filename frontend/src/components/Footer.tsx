import React from 'react';
import { MascotBox } from './Illustrations';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-16 bg-card border-t-3 border-ink py-8 text-xs font-semibold text-ink">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-3">
            <MascotBox className="w-7 h-7" />
            <span className="text-sm font-extrabold text-ink">
              Sahayak Food Packaging Recommender
            </span>
          </div>

          <div className="flex items-center space-x-4 text-xs font-bold text-ink">
            <span className="bg-sun px-2.5 py-1 rounded border-2 border-ink shadow-brutal-sm">
              Ministry of Food Processing Industries
            </span>
            <span>Team Cognix • SIH236</span>
          </div>
        </div>

        <div className="pt-4 border-t-2 border-ink flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px] text-ink/80">
          <p>
            Deterministic rules engine with mathematical respiration equilibrium and barrier limit solvers.
          </p>
          <div className="flex items-center space-x-3 font-mono font-bold">
            <span>Sourced & Certified Literature</span>
            <span>•</span>
            <span>Zero-Guessing Transparency</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
