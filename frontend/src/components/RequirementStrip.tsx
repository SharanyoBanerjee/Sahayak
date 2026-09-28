import React, { useState, useEffect } from 'react';
import { DerivedRequirements } from '../lib/types';
import { Activity } from 'lucide-react';

interface RequirementStripProps {
  requirements: DerivedRequirements;
  isProduce: boolean;
}

// Simple count-up hook
function useCountUp(target: number = 0, duration: number = 700) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    if (start === end) {
      setCount(end);
      return;
    }
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = (end - start) / steps;

    const timer = setInterval(() => {
      start += increment;
      if ((increment > 0 && start >= end) || (increment < 0 && start <= end)) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.round(start * 10) / 10);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return count;
}

export const RequirementStrip: React.FC<RequirementStripProps> = ({ requirements, isProduce }) => {
  const animatedOtr = useCountUp(requirements.target_otr_ml_m2_day_atm || 0);
  const animatedWvtr = useCountUp(requirements.max_wvtr_g_m2_day || 0);
  const animatedDryOtr = useCountUp(requirements.max_otr_ml_m2_day_atm || 0);
  const animatedResp = useCountUp(requirements.r_o2_at_storage_temp || 0);
  const animatedWater = useCountUp(requirements.allowable_water_gain_g || 0);
  const animatedCo2 = useCountUp(requirements.min_co2_perm_ml_m2_day_atm || 0);

  return (
    <div className="sticky top-20 z-20 brutal-card p-4 bg-card border-3 border-ink rounded-brutal shadow-brutal mb-6 transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-3 border-b-3 border-ink pb-2">
        <div className="flex items-center space-x-2">
          <span className="p-1 bg-sun rounded border-2 border-ink shadow-brutal-sm -rotate-2">
            <Activity className="w-4 h-4 text-ink" />
          </span>
          <h3 className="text-xs sm:text-sm font-extrabold uppercase tracking-wide text-ink">
            {isProduce ? 'Gas Balance for Respiring Produce' : 'Dry Food Moisture & Oxidation Limits'}
          </h3>
        </div>
        <span className="text-[11px] font-extrabold bg-lilac text-ink px-2 py-0.5 rounded border-2 border-ink shadow-brutal-sm">
          TARGET BARRIER SPECS
        </span>
      </div>

      {/* 4 Colored Number Tiles */}
      {isProduce ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Tile 1: Green */}
          <div className="bg-green p-3 rounded-xl border-3 border-ink shadow-brutal-sm">
            <span className="text-[10px] font-extrabold uppercase text-ink block">
              Target Equilibrium OTR
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-ink leading-tight">
              {animatedOtr.toLocaleString()}
            </div>
            <span className="text-[9px] font-mono font-bold text-ink/80 block">
              mL/m²·day·atm
            </span>
          </div>

          {/* Tile 2: Sun */}
          <div className="bg-sun p-3 rounded-xl border-3 border-ink shadow-brutal-sm">
            <span className="text-[10px] font-extrabold uppercase text-ink block">
              Respiration @ Temp
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-ink leading-tight">
              {animatedResp}
            </div>
            <span className="text-[9px] font-mono font-bold text-ink/80 block">
              mL O₂/kg·h
            </span>
          </div>

          {/* Tile 3: Sky */}
          <div className="bg-sky p-3 rounded-xl border-3 border-ink shadow-brutal-sm">
            <span className="text-[10px] font-extrabold uppercase text-ink block">
              Min CO₂ Perm
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-ink leading-tight">
              {animatedCo2.toLocaleString()}
            </div>
            <span className="text-[9px] font-mono font-bold text-ink/80 block">
              mL/m²·day
            </span>
          </div>

          {/* Tile 4: Lilac */}
          <div className="bg-lilac p-3 rounded-xl border-3 border-ink shadow-brutal-sm">
            <span className="text-[10px] font-extrabold uppercase text-ink block">
              Pack Size
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-ink leading-tight">
              {requirements.pack_weight_kg}kg
            </div>
            <span className="text-[9px] font-mono font-bold text-ink/80 block">
              Area: {requirements.pack_area_m2} m²
            </span>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
          {/* Tile 1: Green */}
          <div className="bg-green p-3 rounded-xl border-3 border-ink shadow-brutal-sm">
            <span className="text-[10px] font-extrabold uppercase text-ink block">
              Max Permissible WVTR
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-ink leading-tight">
              &le;{animatedWvtr}
            </div>
            <span className="text-[9px] font-mono font-bold text-ink/80 block">
              g/m²·day (Moisture)
            </span>
          </div>

          {/* Tile 2: Sun */}
          <div className="bg-sun p-3 rounded-xl border-3 border-ink shadow-brutal-sm">
            <span className="text-[10px] font-extrabold uppercase text-ink block">
              Max Permissible OTR
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-ink leading-tight">
              &le;{animatedDryOtr}
            </div>
            <span className="text-[9px] font-mono font-bold text-ink/80 block">
              mL/m²·day·atm (Fat)
            </span>
          </div>

          {/* Tile 3: Sky */}
          <div className="bg-sky p-3 rounded-xl border-3 border-ink shadow-brutal-sm">
            <span className="text-[10px] font-extrabold uppercase text-ink block">
              Allowed Water Gain
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-ink leading-tight">
              {animatedWater}g
            </div>
            <span className="text-[9px] font-mono font-bold text-ink/80 block">
              Critical Crisp Limit
            </span>
          </div>

          {/* Tile 4: Lilac */}
          <div className="bg-lilac p-3 rounded-xl border-3 border-ink shadow-brutal-sm">
            <span className="text-[10px] font-extrabold uppercase text-ink block">
              Target Shelf Life
            </span>
            <div className="text-2xl sm:text-3xl font-mono font-bold text-ink leading-tight">
              {requirements.shelf_life_days}d
            </div>
            <span className="text-[9px] font-mono font-bold text-ink/80 block">
              Pack: {requirements.pack_weight_kg}kg
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
