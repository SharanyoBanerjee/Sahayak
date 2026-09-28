import React, { useState, useEffect, useRef } from 'react';
import { DerivedRequirements } from '../lib/types';

interface RequirementStripProps {
  requirements: DerivedRequirements;
  isProduce: boolean;
}

/** Animates a number from 0 to target over `duration` ms */
function useCountUp(target: number = 0, duration = 500): number {
  const [count, setCount] = useState(0);
  const frameRef = useRef<number>(0);

  useEffect(() => {
    // Honor reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setCount(target);
      return;
    }

    const start = performance.now();
    const from = 0;
    const to = target;

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.round((from + (to - from) * eased) * 10) / 10);
      if (progress < 1) {
        frameRef.current = requestAnimationFrame(tick);
      }
    };

    frameRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameRef.current);
  }, [target, duration]);

  return count;
}

export const RequirementStrip: React.FC<RequirementStripProps> = ({ requirements, isProduce }) => {
  const animOtr    = useCountUp(requirements.target_otr_ml_m2_day_atm ?? 0);
  const animResp   = useCountUp(requirements.r_o2_at_storage_temp ?? 0);
  const animCo2    = useCountUp(requirements.min_co2_perm_ml_m2_day_atm ?? 0);
  const animWvtr   = useCountUp(requirements.max_wvtr_g_m2_day ?? 0);
  const animDryOtr = useCountUp(requirements.max_otr_ml_m2_day_atm ?? 0);
  const animWater  = useCountUp(requirements.allowable_water_gain_g ?? 0);

  return (
    <div className="card p-5 mb-5 sticky top-16 z-20 bg-card/95 backdrop-blur-sm">
      {/* Header */}
      <div className="card-header mb-3 pb-2">
        <span className="label">
          {isProduce ? 'Derived Targets · Gas Balance' : 'Derived Targets · Barrier Limits'}
        </span>
        <span className="caption">Table 1 · Engineering Limits</span>
      </div>

      {/* Tiles grid */}
      <div className="req-tile-group">
        {isProduce ? (
          <>
            <div className="req-tile space-y-1">
              <span className="label text-[10px] text-mute block">Equilibrium Target OTR</span>
              <div className="num text-2xl sm:text-3xl text-ink">
                {animOtr.toLocaleString()}
              </div>
              <span className="text-[11px] font-mono text-mute block">mL / m²·day·atm</span>
            </div>

            <div className="req-tile space-y-1">
              <span className="label text-[10px] text-mute block">Metabolic Rate @ Temp</span>
              <div className="num text-2xl sm:text-3xl text-ink">
                {animResp}
              </div>
              <span className="text-[11px] font-mono text-mute block">mL O₂ / kg·h</span>
            </div>

            <div className="req-tile space-y-1">
              <span className="label text-[10px] text-mute block">Min CO₂ Permeability</span>
              <div className="num text-2xl sm:text-3xl text-ink">
                {animCo2.toLocaleString()}
              </div>
              <span className="text-[11px] font-mono text-mute block">mL / m²·day</span>
            </div>

            <div className="req-tile space-y-1">
              <span className="label text-[10px] text-mute block">Target Specimen Mass</span>
              <div className="num text-2xl sm:text-3xl text-ink">
                {requirements.pack_weight_kg}<span className="text-sm font-sans font-normal text-mute ml-1">kg</span>
              </div>
              <span className="text-[11px] font-mono text-mute block">Pack Area: {requirements.pack_area_m2} m²</span>
            </div>
          </>
        ) : (
          <>
            <div className="req-tile space-y-1">
              <span className="label text-[10px] text-mute block">Max Permissible WVTR</span>
              <div className="num text-2xl sm:text-3xl text-ink">
                ≤ {animWvtr}
              </div>
              <span className="text-[11px] font-mono text-mute block">g / m²·day (Moisture)</span>
            </div>

            <div className="req-tile space-y-1">
              <span className="label text-[10px] text-mute block">Max Permissible OTR</span>
              <div className="num text-2xl sm:text-3xl text-ink">
                ≤ {animDryOtr}
              </div>
              <span className="text-[11px] font-mono text-mute block">mL / m²·day·atm (Lipids)</span>
            </div>

            <div className="req-tile space-y-1">
              <span className="label text-[10px] text-mute block">Allowable Moisture Gain</span>
              <div className="num text-2xl sm:text-3xl text-ink">
                {animWater}<span className="text-sm font-sans font-normal text-mute ml-1">g</span>
              </div>
              <span className="text-[11px] font-mono text-mute block">Critical Crispness Limit</span>
            </div>

            <div className="req-tile space-y-1">
              <span className="label text-[10px] text-mute block">Design Shelf Life</span>
              <div className="num text-2xl sm:text-3xl text-ink">
                {requirements.shelf_life_days}<span className="text-sm font-sans font-normal text-mute ml-1">d</span>
              </div>
              <span className="text-[11px] font-mono text-mute block">Net Weight: {requirements.pack_weight_kg} kg</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
