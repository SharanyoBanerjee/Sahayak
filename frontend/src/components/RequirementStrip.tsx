import React from 'react';
import { DerivedRequirements } from '../lib/types';
import { Wind, Droplets, Activity, Gauge, Clock, ShieldCheck } from 'lucide-react';

interface RequirementStripProps {
  requirements: DerivedRequirements;
  isProduce: boolean;
}

export const RequirementStrip: React.FC<RequirementStripProps> = ({ requirements, isProduce }) => {
  return (
    <div className="bg-emerald-950 text-white rounded-xl p-4 shadow-sm mb-6 border border-emerald-900">
      <div className="flex items-center justify-between mb-3 border-b border-emerald-800/80 pb-2">
        <div className="flex items-center space-x-2">
          <Activity className="w-4 h-4 text-accent" />
          <h3 className="text-sm font-semibold tracking-wide uppercase text-emerald-200">
            Engine-Derived Barrier Targets
          </h3>
        </div>
        <div className="flex items-center space-x-1 text-xs text-emerald-300">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Calculated via Thermodynamic & Biological Equilibrium</span>
        </div>
      </div>

      {isProduce ? (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-emerald-900/60 rounded-lg p-2.5 border border-emerald-800">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-300 mb-1">
              <Wind className="w-3.5 h-3.5" />
              <span>Target OTR</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {requirements.target_otr_ml_m2_day_atm?.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400">mL/m²·day·atm</div>
          </div>

          <div className="bg-emerald-900/60 rounded-lg p-2.5 border border-emerald-800">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-300 mb-1">
              <Activity className="w-3.5 h-3.5" />
              <span>Respiration @ Temp</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {requirements.r_o2_at_storage_temp}
            </div>
            <div className="text-[10px] text-emerald-400">mL O₂/kg·h</div>
          </div>

          <div className="bg-emerald-900/60 rounded-lg p-2.5 border border-emerald-800">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-300 mb-1">
              <Gauge className="w-3.5 h-3.5" />
              <span>Min CO₂ Perm</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {requirements.min_co2_perm_ml_m2_day_atm?.toLocaleString()}
            </div>
            <div className="text-[10px] text-emerald-400">mL/m²·day</div>
          </div>

          <div className="bg-emerald-900/60 rounded-lg p-2.5 border border-emerald-800">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-300 mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Pack Weight & Area</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {requirements.pack_weight_kg} kg
            </div>
            <div className="text-[10px] text-emerald-400">Area: {requirements.pack_area_m2} m²</div>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-emerald-900/60 rounded-lg p-2.5 border border-emerald-800">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-300 mb-1">
              <Droplets className="w-3.5 h-3.5" />
              <span>Max Allowable WVTR</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              &le; {requirements.max_wvtr_g_m2_day}
            </div>
            <div className="text-[10px] text-emerald-400">g/m²·day (moisture limit)</div>
          </div>

          <div className="bg-emerald-900/60 rounded-lg p-2.5 border border-emerald-800">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-300 mb-1">
              <Wind className="w-3.5 h-3.5" />
              <span>Max Allowable OTR</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              &le; {requirements.max_otr_ml_m2_day_atm}
            </div>
            <div className="text-[10px] text-emerald-400">mL/m²·day·atm (oxidation limit)</div>
          </div>

          <div className="bg-emerald-900/60 rounded-lg p-2.5 border border-emerald-800">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-300 mb-1">
              <Droplets className="w-3.5 h-3.5" />
              <span>Max Water Gain</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {requirements.allowable_water_gain_g} g
            </div>
            <div className="text-[10px] text-emerald-400">per {requirements.pack_weight_kg}kg pack</div>
          </div>

          <div className="bg-emerald-900/60 rounded-lg p-2.5 border border-emerald-800">
            <div className="flex items-center space-x-1.5 text-xs text-emerald-300 mb-1">
              <Clock className="w-3.5 h-3.5" />
              <span>Target Duration</span>
            </div>
            <div className="text-lg font-bold font-mono text-white">
              {requirements.shelf_life_days} Days
            </div>
            <div className="text-[10px] text-emerald-400">Surface: {requirements.pack_area_m2} m²</div>
          </div>
        </div>
      )}
    </div>
  );
};
