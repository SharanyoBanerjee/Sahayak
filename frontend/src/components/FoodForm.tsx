import React from 'react';
import { Commodity, FoodFormState } from '../lib/types';
import {
  Thermometer,
  Droplets,
  Calendar,
  Wind,
  Info,
  ArrowRight,
} from 'lucide-react';

interface FoodFormProps {
  formState: FoodFormState;
  onChange: (updates: Partial<FoodFormState>) => void;
  commodities: Commodity[];
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

export const FoodForm: React.FC<FoodFormProps> = ({
  formState,
  onChange,
  commodities,
  onSubmit,
  isLoading,
}) => {
  const handleCommoditySelect = (commodityId: string) => {
    if (!commodityId) return;
    const selected = commodities.find((c) => c.id === commodityId);
    if (selected) {
      onChange({
        commodity_id: selected.id,
        commodity_name: selected.name,
        category: selected.category,
        moisture: selected.moisture,
        critical_moisture: selected.critical_moisture,
        fat: selected.fat,
        ph: selected.ph,
        is_respiring: selected.is_respiring,
        resp_o2: selected.resp_o2,
        resp_co2: selected.resp_co2,
        rq: selected.rq,
        q10: selected.q10,
        o2_target: selected.o2_target,
        co2_tolerance: selected.co2_tolerance,
        shelf_life_days: selected.typical_shelf_life_days,
        temp_c: selected.default_temp_c,
        humidity_rh: selected.default_humidity_rh,
        storage_type: selected.category === 'produce' ? 'chilled' : 'ambient',
      });
    }
  };

  return (
    <form onSubmit={onSubmit} className="bg-surface rounded-xl p-5 sm:p-6 border border-gray-200 shadow-sm space-y-6">
      {/* Step 1: Commodity Selection */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <label htmlFor="commodity-select" className="text-sm font-bold text-primary-dark flex items-center space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
              1
            </span>
            <span>Select Food Commodity</span>
          </label>
          <span className="text-xs text-muted">Prefills standard parameters</span>
        </div>

        <select
          id="commodity-select"
          value={formState.commodity_id}
          onChange={(e) => handleCommoditySelect(e.target.value)}
          className="w-full bg-page border border-gray-300 rounded-lg px-3.5 py-2.5 text-sm text-body font-medium focus:ring-2 focus:ring-primary focus:border-primary transition-all"
        >
          <option value="">-- Choose from standard catalog --</option>
          <optgroup label="Fresh Produce (Respiring)">
            {commodities
              .filter((c) => c.category === 'produce')
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </optgroup>
          <optgroup label="Dry / Processed Foods">
            {commodities
              .filter((c) => c.category === 'dry')
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </optgroup>
        </select>
      </div>

      {/* Produce vs Dry Category Switcher */}
      <div className="bg-page/80 p-3 rounded-lg border border-gray-200 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Info className="w-4 h-4 text-info flex-shrink-0" />
          <span className="text-xs text-body font-medium">
            Food Category Mode:
          </span>
        </div>
        <div className="flex items-center gap-1.5">
          <button
            type="button"
            onClick={() => onChange({ is_respiring: false, category: 'dry' })}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              !formState.is_respiring
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-muted border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Dry / Packaged
          </button>
          <button
            type="button"
            onClick={() => onChange({ is_respiring: true, category: 'produce' })}
            className={`px-3 py-1 rounded text-xs font-semibold transition-all ${
              formState.is_respiring
                ? 'bg-primary text-white shadow-sm'
                : 'bg-white text-muted border border-gray-200 hover:bg-gray-50'
            }`}
          >
            Fresh Produce
          </button>
        </div>
      </div>

      {/* Step 2: Physical & Chemical Properties */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-primary-dark flex items-center space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
              2
            </span>
            <span>Food Properties</span>
          </h3>
          <span className="text-xs text-muted">Auto-tuned values</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Moisture */}
          <div className="bg-page/50 p-2.5 rounded-lg border border-gray-200">
            <label className="text-xs font-medium text-muted block mb-1">
              Moisture Content (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formState.moisture}
              onChange={(e) => onChange({ moisture: parseFloat(e.target.value) || 0 })}
              className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-sm font-mono font-bold text-body focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <span className="text-[10px] text-muted mt-0.5 block">Initial food moisture</span>
          </div>

          {/* Fat / Oil */}
          <div className="bg-page/50 p-2.5 rounded-lg border border-gray-200">
            <label className="text-xs font-medium text-muted block mb-1">
              Fat / Oil Content (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formState.fat}
              onChange={(e) => onChange({ fat: parseFloat(e.target.value) || 0 })}
              className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-sm font-mono font-bold text-body focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <span className="text-[10px] text-muted mt-0.5 block">Drives oxidation risk</span>
          </div>

          {/* pH */}
          <div className="bg-page/50 p-2.5 rounded-lg border border-gray-200 col-span-2 sm:col-span-1">
            <label className="text-xs font-medium text-muted block mb-1">
              Food pH Level
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="14"
              value={formState.ph}
              onChange={(e) => onChange({ ph: parseFloat(e.target.value) || 7.0 })}
              className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-sm font-mono font-bold text-body focus:ring-1 focus:ring-primary focus:border-primary"
            />
            <span className="text-[10px] text-muted mt-0.5 block">&lt;4.6 is acidic</span>
          </div>
        </div>
      </div>

      {/* Step 3: Respiration Panel (Conditional on Produce) */}
      {formState.is_respiring && (
        <div className="bg-emerald-50/70 rounded-lg p-4 border border-emerald-200 space-y-3">
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-primary" />
            <h4 className="text-xs font-bold uppercase tracking-wider text-primary-dark">
              Produce Biological Respiration (MAP)
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-muted block mb-1 font-medium">
                Respiration Rate (mL O₂/kg·h)
              </label>
              <input
                type="number"
                step="0.5"
                value={formState.resp_o2}
                onChange={(e) => onChange({ resp_o2: parseFloat(e.target.value) || 0 })}
                className="w-full bg-white border border-emerald-300 rounded px-2.5 py-1.5 font-mono font-bold text-body focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-muted block mb-1 font-medium">
                Target Internal O₂ (%)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="15"
                value={formState.o2_target}
                onChange={(e) => onChange({ o2_target: parseFloat(e.target.value) || 4.0 })}
                className="w-full bg-white border border-emerald-300 rounded px-2.5 py-1.5 font-mono font-bold text-body focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-muted block mb-1 font-medium">
                Max CO₂ Tolerance (%)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="25"
                value={formState.co2_tolerance}
                onChange={(e) => onChange({ co2_tolerance: parseFloat(e.target.value) || 5.0 })}
                className="w-full bg-white border border-emerald-300 rounded px-2.5 py-1.5 font-mono font-bold text-body focus:ring-1 focus:ring-primary"
              />
            </div>

            <div>
              <label className="text-muted block mb-1 font-medium">
                Sensitivity Q10 Factor
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="3"
                value={formState.q10}
                onChange={(e) => onChange({ q10: parseFloat(e.target.value) || 2.0 })}
                className="w-full bg-white border border-emerald-300 rounded px-2.5 py-1.5 font-mono font-bold text-body focus:ring-1 focus:ring-primary"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Storage, Logistics & Shelf Life */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h3 className="text-sm font-bold text-primary-dark flex items-center space-x-1.5">
            <span className="w-5 h-5 rounded-full bg-primary/10 text-primary flex items-center justify-center text-xs">
              3
            </span>
            <span>Storage & Target Shelf Life</span>
          </h3>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Target Shelf Life */}
          <div className="bg-page/50 p-2.5 rounded-lg border border-gray-200">
            <label className="text-xs font-medium text-muted block mb-1 flex items-center space-x-1">
              <Calendar className="w-3.5 h-3.5 text-muted" />
              <span>Shelf Life (Days)</span>
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={formState.shelf_life_days}
              onChange={(e) => onChange({ shelf_life_days: parseInt(e.target.value) || 1 })}
              className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-sm font-mono font-bold text-body focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Storage Temperature */}
          <div className="bg-page/50 p-2.5 rounded-lg border border-gray-200">
            <label className="text-xs font-medium text-muted block mb-1 flex items-center space-x-1">
              <Thermometer className="w-3.5 h-3.5 text-muted" />
              <span>Storage Temp (°C)</span>
            </label>
            <input
              type="number"
              step="1"
              value={formState.temp_c}
              onChange={(e) => onChange({ temp_c: parseFloat(e.target.value) || 0 })}
              className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-sm font-mono font-bold text-body focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>

          {/* Humidity RH */}
          <div className="bg-page/50 p-2.5 rounded-lg border border-gray-200 col-span-2 sm:col-span-1">
            <label className="text-xs font-medium text-muted block mb-1 flex items-center space-x-1">
              <Droplets className="w-3.5 h-3.5 text-muted" />
              <span>Humidity (% RH)</span>
            </label>
            <input
              type="number"
              min="10"
              max="100"
              value={formState.humidity_rh}
              onChange={(e) => onChange({ humidity_rh: parseFloat(e.target.value) || 50 })}
              className="w-full bg-white border border-gray-300 rounded px-2.5 py-1.5 text-sm font-mono font-bold text-body focus:ring-1 focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      {/* Submit Action Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-xl shadow-sm transition-all flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        {isLoading ? (
          <>
            <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Calculating Barrier Requirements...</span>
          </>
        ) : (
          <>
            <span>Recommend Best Packaging</span>
            <ArrowRight className="w-4 h-4" />
          </>
        )}
      </button>
    </form>
  );
};
