import React from 'react';
import { Link2 } from 'lucide-react';

interface HeaderProps {
  serverHealthy: boolean;
}

export const Header: React.FC<HeaderProps> = ({ serverHealthy }) => {
  return (
    <header className="bg-paper border-b border-rule sticky top-0 z-30">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Wordmark */}
        <div className="flex items-baseline gap-3">
          <h1 className="font-serif text-2xl font-medium text-ink tracking-tight">
            Sahayak
          </h1>
          <span className="text-xs text-mute font-normal hidden sm:inline border-l border-rule pl-3">
            Food Packaging Recommender · Ministry of Food Processing Industries
          </span>
        </div>

        {/* Status bar */}
        <div className="flex items-center gap-4 sm:gap-6 text-xs">
          {/* Source note */}
          <div className="hidden md:flex items-center gap-1.5 text-mute font-medium">
            <Link2 className="w-3.5 h-3.5 text-mute" aria-hidden="true" />
            <span>Every value linked to a source</span>
          </div>

          {/* Engine status */}
          <div className="flex items-center gap-2 text-ink-2 font-mono text-xs">
            <span
              className={`w-2 h-2 rounded-full ${
                serverHealthy ? 'bg-ink' : 'border border-mute'
              }`}
              aria-hidden="true"
            />
            <span>{serverHealthy ? 'Engine Ready' : 'Engine Offline'}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
