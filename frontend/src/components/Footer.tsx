import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-12 bg-surface border-t border-gray-200 py-8 text-xs text-muted">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-4">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center space-x-2 text-body font-semibold">
            <span className="w-6 h-6 rounded-md bg-primary/10 text-primary flex items-center justify-center font-bold text-xs">
              S
            </span>
            <span>Sahayak Packaging Recommendation Engine</span>
          </div>

          <div className="flex items-center space-x-6 text-xs text-muted">
            <span className="flex items-center space-x-1">
              <ShieldCheck className="w-3.5 h-3.5 text-primary" />
              <span>Ministry of Food Processing Industries</span>
            </span>
            <span>Team Cognix • SIH26236</span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-2 text-[11px]">
          <p>
            Barrier calculations and respiration gas equilibrium solver built on empirical BIS IS 10171 and FAO postharvest models.
          </p>
          <div className="flex items-center space-x-4">
            <span className="text-muted">Deterministic Rules Engine</span>
            <span>•</span>
            <span className="text-muted">Zero-Guessing Sourced Data</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
