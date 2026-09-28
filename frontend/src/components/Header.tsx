import React from 'react';
import { Link2 } from 'lucide-react';
import { MascotBox } from './Illustrations';

interface HeaderProps {
  serverHealthy: boolean;
}

export const Header: React.FC<HeaderProps> = ({ serverHealthy }) => {
  return (
    <header className="bg-card border-b-3 border-ink sticky top-0 z-30 shadow-brutal-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 py-3 flex items-center justify-between">
        {/* Logo Sticker & Brand */}
        <div className="flex items-center space-x-3.5">
          <div className="p-1 bg-sun rounded-xl border-3 border-ink shadow-brutal-sm">
            <MascotBox className="w-9 h-9" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-ink">
                Sahayak
              </h1>
              <span className="bg-lilac text-ink text-xs font-extrabold px-2 py-0.5 rounded border-2 border-ink shadow-brutal-sm rotate-1">
                SIH236
              </span>
            </div>
            <p className="text-xs text-ink font-semibold hidden sm:block">
              Food Packaging Recommender • Ministry of Food Processing Industries
            </p>
          </div>
        </div>

        {/* Status Pill & Integrity Tag */}
        <div className="flex items-center space-x-3">
          <div className="hidden md:flex items-center space-x-1.5 text-xs font-extrabold text-ink bg-sky px-3 py-1.5 rounded-lg border-2 border-ink shadow-brutal-sm">
            <Link2 className="w-3.5 h-3.5 text-ink" />
            <span>Every value linked to a source</span>
          </div>

          <div className="flex items-center space-x-1.5 text-xs font-mono font-bold bg-paper px-3 py-1.5 rounded-lg border-2 border-ink shadow-brutal-sm">
            <span
              className={`w-2.5 h-2.5 rounded-full border border-ink ${
                serverHealthy ? 'bg-green' : 'bg-tomato animate-pulse'
              }`}
            />
            <span className="text-ink">
              {serverHealthy ? 'ENGINE READY' : 'OFFLINE'}
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};
