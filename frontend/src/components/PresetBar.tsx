import React from 'react';
import { Zap, ArrowRight } from 'lucide-react';
import { PRESET_TOMATO, PRESET_BISCUITS } from '../lib/presets';
import { FoodFormState } from '../lib/types';
import { TomatoIcon, BiscuitIcon } from './Illustrations';

interface PresetBarProps {
  onSelectPreset: (preset: FoodFormState) => void;
  activePreset: string | null;
}

export const PresetBar: React.FC<PresetBarProps> = ({ onSelectPreset, activePreset }) => {
  return (
    <div className="brutal-card p-4 sm:p-5 bg-card border-3 border-ink rounded-brutal shadow-brutal mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3">
        <div className="flex items-center space-x-2.5">
          <div className="p-1.5 bg-sun rounded-lg border-2 border-ink shadow-brutal-sm -rotate-2">
            <Zap className="w-5 h-5 text-ink" />
          </div>
          <div>
            <span className="text-sm font-extrabold text-ink uppercase tracking-wide block">
              Contrasting Demo Presets
            </span>
            <span className="text-xs text-ink/80 font-medium">
              Click to instantly run the two fundamental problem cases
            </span>
          </div>
        </div>

        {/* Big Sticker Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Preset 1: Fresh Tomato */}
          <button
            type="button"
            onClick={() => onSelectPreset(PRESET_TOMATO)}
            className={`brutal-btn p-3 flex items-center justify-between space-x-3 text-left transition-all ${
              activePreset === 'CMD-001'
                ? 'bg-green ring-4 ring-ink'
                : 'bg-paper hover:bg-green/40'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <TomatoIcon className="w-7 h-7 flex-shrink-0" />
              <div>
                <span className="text-xs font-extrabold text-ink block">
                  1. Fresh Tomato
                </span>
                <span className="text-[10px] font-bold text-ink/80 block">
                  Respiring Produce (MAP Breathable)
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-ink flex-shrink-0" />
          </button>

          {/* Preset 2: Crispy Biscuits */}
          <button
            type="button"
            onClick={() => onSelectPreset(PRESET_BISCUITS)}
            className={`brutal-btn p-3 flex items-center justify-between space-x-3 text-left transition-all ${
              activePreset === 'CMD-005'
                ? 'bg-sun ring-4 ring-ink'
                : 'bg-paper hover:bg-sun/40'
            }`}
          >
            <div className="flex items-center space-x-2.5">
              <BiscuitIcon className="w-7 h-7 flex-shrink-0" />
              <div>
                <span className="text-xs font-extrabold text-ink block">
                  2. Crispy Biscuits
                </span>
                <span className="text-[10px] font-bold text-ink/80 block">
                  Moisture & Fat Sensitive (High Barrier)
                </span>
              </div>
            </div>
            <ArrowRight className="w-4 h-4 text-ink flex-shrink-0" />
          </button>
        </div>
      </div>
    </div>
  );
};
