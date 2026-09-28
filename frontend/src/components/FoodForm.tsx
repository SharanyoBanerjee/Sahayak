import React from 'react';
import { Commodity, FoodFormState } from '../lib/types';
import {
  Thermometer,
  Droplets,
  Calendar,
  Wind,
  ArrowRight,
} from 'lucide-react';
import { CommoditySticker } from './Illustrations';

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
    <form
      onSubmit={onSubmit}
      className="brutal-card p-5 sm:p-6 bg-card border-3 border-ink rounded-brutal shadow-brutal space-y-6"
    >
      {/* Top Banner with Dynamic Commodity Sticker */}
      <div className="flex items-center justify-between border-b-3 border-ink pb-4">
        <div>
          <h2 className="text-xl font-extrabold text-ink tracking-tight">
            Food Parameters
          </h2>
          <p className="text-xs text-ink font-semibold">
            Input physical, chemical & respiration values
          </p>
        </div>
        <div className="p-2 bg-paper rounded-xl border-2 border-ink shadow-brutal-sm rotate-2">
          <CommoditySticker
            commodityId={formState.commodity_id}
            isRespiring={formState.is_respiring}
            className="w-10 h-10"
          />
        </div>
      </div>

      {/* Step 1: Commodity Selection */}
      <div>
        <label
          htmlFor="commodity-select"
          className="text-xs font-extrabold text-ink uppercase tracking-wider block mb-1.5"
        >
          1. Select Commodity from Catalog
        </label>
        <select
          id="commodity-select"
          value={formState.commodity_id}
          onChange={(e) => handleCommoditySelect(e.target.value)}
          className="brutal-input w-full px-3.5 py-2.5 text-sm font-bold text-ink"
        >
          <option value="">-- Custom Food Commodity --</option>
          <optgroup label="Fresh Produce (Respiring)">
            {commodities
              .filter((c) => c.category === 'produce')
              .map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
          </optgroup>
          <optgroup label="Dry & Shelf-Stable Foods">
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

      {/* Chunky Category Switcher */}
      <div>
        <span className="text-xs font-extrabold text-ink uppercase tracking-wider block mb-1.5">
          Packaging Paradigm Mode:
        </span>
        <div className="grid grid-cols-2 gap-2 bg-paper p-1.5 rounded-xl border-3 border-ink">
          <button
            type="button"
            onClick={() => onChange({ is_respiring: false, category: 'dry' })}
            className={`py-2 px-3 rounded-lg text-xs font-extrabold transition-all border-2 border-ink ${
              !formState.is_respiring
                ? 'bg-sun shadow-brutal-sm'
                : 'bg-card text-ink opacity-70 hover:opacity-100'
            }`}
          >
            Dry & Processed Food
          </button>
          <button
            type="button"
            onClick={() => onChange({ is_respiring: true, category: 'produce' })}
            className={`py-2 px-3 rounded-lg text-xs font-extrabold transition-all border-2 border-ink ${
              formState.is_respiring
                ? 'bg-green shadow-brutal-sm'
                : 'bg-card text-ink opacity-70 hover:opacity-100'
            }`}
          >
            Fresh Respiring Produce
          </button>
        </div>
      </div>

      {/* Step 2: Food Properties */}
      <div className="space-y-3">
        <span className="text-xs font-extrabold text-ink uppercase tracking-wider block">
          2. Intrinsic Food Properties
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Moisture */}
          <div className="bg-paper p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm">
            <label className="text-[10px] font-extrabold uppercase text-ink block mb-1">
              Moisture (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formState.moisture}
              onChange={(e) => onChange({ moisture: parseFloat(e.target.value) || 0 })}
              className="brutal-input w-full px-2 py-1 text-sm font-mono font-bold text-ink"
            />
          </div>

          {/* Fat / Oil */}
          <div className="bg-paper p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm">
            <label className="text-[10px] font-extrabold uppercase text-ink block mb-1">
              Fat / Oil (%)
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formState.fat}
              onChange={(e) => onChange({ fat: parseFloat(e.target.value) || 0 })}
              className="brutal-input w-full px-2 py-1 text-sm font-mono font-bold text-ink"
            />
          </div>

          {/* pH */}
          <div className="bg-paper p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm col-span-2 sm:col-span-1">
            <label className="text-[10px] font-extrabold uppercase text-ink block mb-1">
              Food pH Level
            </label>
            <input
              type="number"
              step="0.1"
              min="1"
              max="14"
              value={formState.ph}
              onChange={(e) => onChange({ ph: parseFloat(e.target.value) || 7.0 })}
              className="brutal-input w-full px-2 py-1 text-sm font-mono font-bold text-ink"
            />
          </div>
        </div>
      </div>

      {/* Step 3: Respiration (Only when produce) */}
      {formState.is_respiring && (
        <div className="p-4 bg-green/20 rounded-xl border-3 border-ink space-y-3 shadow-brutal-sm">
          <div className="flex items-center space-x-2">
            <Wind className="w-4 h-4 text-ink" />
            <h4 className="text-xs font-extrabold uppercase tracking-wide text-ink">
              Produce Biological Respiration (MAP)
            </h4>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label className="text-[10px] font-extrabold text-ink block mb-1">
                Respiration Rate (mL/kg·h)
              </label>
              <input
                type="number"
                step="0.5"
                value={formState.resp_o2}
                onChange={(e) => onChange({ resp_o2: parseFloat(e.target.value) || 0 })}
                className="brutal-input w-full px-2 py-1 font-mono font-bold text-ink"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-ink block mb-1">
                Target Internal O₂ (%)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="15"
                value={formState.o2_target}
                onChange={(e) => onChange({ o2_target: parseFloat(e.target.value) || 4.0 })}
                className="brutal-input w-full px-2 py-1 font-mono font-bold text-ink"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-ink block mb-1">
                Max CO₂ Tolerance (%)
              </label>
              <input
                type="number"
                step="0.5"
                min="1"
                max="25"
                value={formState.co2_tolerance}
                onChange={(e) => onChange({ co2_tolerance: parseFloat(e.target.value) || 5.0 })}
                className="brutal-input w-full px-2 py-1 font-mono font-bold text-ink"
              />
            </div>

            <div>
              <label className="text-[10px] font-extrabold text-ink block mb-1">
                Sensitivity Q10 Factor
              </label>
              <input
                type="number"
                step="0.1"
                min="1"
                max="3"
                value={formState.q10}
                onChange={(e) => onChange({ q10: parseFloat(e.target.value) || 2.0 })}
                className="brutal-input w-full px-2 py-1 font-mono font-bold text-ink"
              />
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Storage & Shelf Life */}
      <div className="space-y-3">
        <span className="text-xs font-extrabold text-ink uppercase tracking-wider block">
          3. Storage Conditions & Target Shelf Life
        </span>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {/* Target Shelf Life */}
          <div className="bg-paper p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm">
            <label className="text-[10px] font-extrabold uppercase text-ink block mb-1 flex items-center space-x-1">
              <Calendar className="w-3 h-3" />
              <span>Shelf Life (Days)</span>
            </label>
            <input
              type="number"
              min="1"
              max="1000"
              value={formState.shelf_life_days}
              onChange={(e) => onChange({ shelf_life_days: parseInt(e.target.value) || 1 })}
              className="brutal-input w-full px-2 py-1 text-sm font-mono font-bold text-ink"
            />
          </div>

          {/* Temperature */}
          <div className="bg-paper p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm">
            <label className="text-[10px] font-extrabold uppercase text-ink block mb-1 flex items-center space-x-1">
              <Thermometer className="w-3 h-3" />
              <span>Temp (°C)</span>
            </label>
            <input
              type="number"
              step="1"
              value={formState.temp_c}
              onChange={(e) => onChange({ temp_c: parseFloat(e.target.value) || 0 })}
              className="brutal-input w-full px-2 py-1 text-sm font-mono font-bold text-ink"
            />
          </div>

          {/* Humidity */}
          <div className="bg-paper p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm col-span-2 sm:col-span-1">
            <label className="text-[10px] font-extrabold uppercase text-ink block mb-1 flex items-center space-x-1">
              <Droplets className="w-3 h-3" />
              <span>Humidity (% RH)</span>
            </label>
            <input
              type="number"
              min="10"
              max="100"
              value={formState.humidity_rh}
              onChange={(e) => onChange({ humidity_rh: parseFloat(e.target.value) || 50 })}
              className="brutal-input w-full px-2 py-1 text-sm font-mono font-bold text-ink"
            />
          </div>
        </div>
      </div>

      {/* Submit Action Button */}
      <button
        type="submit"
        disabled={isLoading}
        className="brutal-btn w-full py-3.5 px-4 text-base font-extrabold text-ink bg-green flex items-center justify-center space-x-2 disabled:opacity-50"
      >
        <span>Recommend Best Packaging</span>
        <ArrowRight className="w-5 h-5 text-ink" strokeWidth={3} />
      </button>
    </form>
  );
};
