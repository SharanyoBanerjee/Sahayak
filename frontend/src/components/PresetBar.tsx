import React from 'react';
import { Apple, Cookie, Zap } from 'lucide-react';
import { PRESET_TOMATO, PRESET_BISCUITS } from '../lib/presets';
import { FoodFormState } from '../lib/types';

interface PresetBarProps {
  onSelectPreset: (preset: FoodFormState) => void;
  activePreset: string | null;
}

export const PresetBar: React.FC<PresetBarProps> = ({ onSelectPreset, activePreset }) => {
  return (
    <div className="bg-surface rounded-xl p-4 border border-gray-200 shadow-sm mb-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div className="flex items-center space-x-2">
          <Zap className="w-4 h-4 text-accent" />
          <span className="text-sm font-semibold text-body">
            Instant Demo Presets:
          </span>
          <span className="text-xs text-muted">
            (One-click test contrasting food categories)
          </span>
        </div>

        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() => onSelectPreset(PRESET_TOMATO)}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              activePreset === 'CMD-001'
                ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/20'
                : 'bg-page hover:bg-gray-100 text-body border-gray-200'
            }`}
          >
            <Apple className="w-3.5 h-3.5 text-emerald-600" />
            <span>1. Fresh Tomato (Respiring Produce)</span>
          </button>

          <button
            type="button"
            onClick={() => onSelectPreset(PRESET_BISCUITS)}
            className={`flex items-center space-x-2 px-3.5 py-1.5 rounded-lg text-xs font-medium transition-all border ${
              activePreset === 'CMD-005'
                ? 'bg-primary text-white border-primary shadow-sm ring-2 ring-primary/20'
                : 'bg-page hover:bg-gray-100 text-body border-gray-200'
            }`}
          >
            <Cookie className="w-3.5 h-3.5 text-amber-600" />
            <span>2. Crispy Biscuits (Dry Snack)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
