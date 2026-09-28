import React from 'react';
import { PRESET_TOMATO, PRESET_BISCUITS } from '../lib/presets';
import { FoodFormState } from '../lib/types';
import { TomatoIcon, BiscuitIcon } from './Illustrations';

interface PresetBarProps {
  onSelectPreset: (preset: FoodFormState) => void;
  activePreset: string | null;
}

export const PresetBar: React.FC<PresetBarProps> = ({ onSelectPreset, activePreset }) => {
  return (
    <div className="card p-4 mb-6 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
      {/* Label */}
      <div className="flex items-center gap-3">
        <span className="label">Reference Cases</span>
        <span className="text-xs text-mute font-normal hidden md:inline border-l border-rule pl-3">
          Two standard specimens with contrasting barrier physics
        </span>
      </div>

      {/* Action buttons */}
      <div className="flex items-center gap-2">
        {/* Fresh Tomato */}
        <button
          type="button"
          onClick={() => onSelectPreset(PRESET_TOMATO)}
          className={`btn-secondary text-xs ${
            activePreset === 'CMD-001' ? 'bg-accent-light border-accent text-ink font-semibold' : ''
          }`}
          aria-pressed={activePreset === 'CMD-001'}
        >
          <TomatoIcon className="w-4 h-4" />
          <span>Fresh Tomato</span>
          <span className="text-[10px] text-mute font-mono hidden sm:inline">(Respiring MAP)</span>
        </button>

        {/* Crispy Biscuits */}
        <button
          type="button"
          onClick={() => onSelectPreset(PRESET_BISCUITS)}
          className={`btn-secondary text-xs ${
            activePreset === 'CMD-005' ? 'bg-accent-light border-accent text-ink font-semibold' : ''
          }`}
          aria-pressed={activePreset === 'CMD-005'}
        >
          <BiscuitIcon className="w-4 h-4" />
          <span>Crisp Biscuits</span>
          <span className="text-[10px] text-mute font-mono hidden sm:inline">(High-Barrier)</span>
        </button>
      </div>
    </div>
  );
};
