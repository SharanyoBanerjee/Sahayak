import React from 'react';
import { Package, ShieldCheck } from 'lucide-react';

interface HeaderProps {
  serverHealthy: boolean;
}

export const Header: React.FC<HeaderProps> = ({ serverHealthy }) => {
  return (
    <header className="bg-surface border-b border-gray-200 shadow-sm sticky top-0 z-30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo & Title */}
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
            <Package className="w-6 h-6" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-xl font-bold tracking-tight text-primary-dark">Sahayak</h1>
              <span className="bg-primary/10 text-primary-dark text-xs font-semibold px-2 py-0.5 rounded border border-primary/20">
                SIH Prototype
              </span>
            </div>
            <p className="text-xs text-muted hidden sm:block">
              Food Packaging Recommender • Ministry of Food Processing Industries
            </p>
          </div>
        </div>

        {/* Status indicator & Standards badge */}
        <div className="flex items-center space-x-4">
          <div className="hidden md:flex items-center space-x-1 text-xs text-muted bg-page px-2.5 py-1 rounded-md border border-gray-200">
            <ShieldCheck className="w-4 h-4 text-primary" />
            <span>BIS & FAO Standard Compliant</span>
          </div>
          
          <div className="flex items-center space-x-1.5 text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                serverHealthy ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse'
              }`}
            />
            <span className="text-muted text-xs hidden sm:inline">
              {serverHealthy ? 'Engine Online' : 'Local Mode'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
