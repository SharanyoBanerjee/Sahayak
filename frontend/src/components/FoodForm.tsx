import React from 'react';
import { Commodity, FoodFormState } from '../lib/types';
import { ArrowRight, ArrowDownRight } from 'lucide-react';
import { CommodityPlate, getBotanicalName } from './Illustrations';

interface FoodFormProps {
  formState: FoodFormState;
  onChange: (updates: Partial<FoodFormState>) => void;
  commodities: Commodity[];
  onSubmit: (e: React.FormEvent) => void;
  isLoading: boolean;
}

interface FieldRowProps {
  label: string;
  unit?: string;
  children: React.ReactNode;
  wide?: boolean;
}

const FieldRow: React.FC<FieldRowProps> = ({ label, unit, children, wide }) => (
  <div className={`space-y-1.5 ${wide ? 'col-span-2 sm:col-span-3' : ''}`}>
    <div className="flex justify-between items-baseline">
      <label className="text-[10px] font-semibold uppercase tracking-wider text-mute">{label}</label>
      {unit && <span className="font-mono text-[10px] text-mute">{unit}</span>}
    </div>
    {children}
  </div>
);

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

  const currentBotanical = getBotanicalName(formState.commodity_id, formState.commodity_name);

  return (
    <form onSubmit={onSubmit} className="card p-6 space-y-6">
      {/* Header */}
      <div className="card-header">
        <span className="label">Specimen Inputs</span>
        <span className="caption">Parameters</span>
      </div>

      {/* Section 1: Commodity Selection & Mode */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-ink">1. Commodity Specimen</span>
          {currentBotanical && (
            <span className="font-serif italic text-xs text-mute">{currentBotanical}</span>
          )}
        </div>

        <div className="flex items-center gap-3">
          <div className="border border-rule rounded-lg p-2.5 bg-paper flex-shrink-0">
            <CommodityPlate
              commodityId={formState.commodity_id}
              isRespiring={formState.is_respiring}
              className="w-7 h-7"
            />
          </div>
          <div className="flex-1">
            <select
              id="commodity-select"
              value={formState.commodity_id}
              onChange={(e) => handleCommoditySelect(e.target.value)}
              className="field field-select text-xs font-mono"
            >
              <option value="">— Custom Specification —</option>
              <optgroup label="Fresh Produce (Respiring)">
                {commodities
                  .filter((c) => c.category === 'produce')
                  .map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
              </optgroup>
              <optgroup label="Dry & Shelf-Stable Foods">
                {commodities
                  .filter((c) => c.category === 'dry')
                  .map((c) => (
                    <option key={c.id} value={c.id}>{c.name}</option>
                  ))}
              </optgroup>
            </select>
          </div>
        </div>

        {/* Segmented Control (Mode) */}
        <div className="seg-control mt-2" role="group" aria-label="Commodity category">
          <button
            type="button"
            onClick={() => onChange({ is_respiring: false, category: 'dry' })}
            className={`seg-btn ${!formState.is_respiring ? 'active' : ''}`}
          >
            Dry / Processed
          </button>
          <button
            type="button"
            onClick={() => onChange({ is_respiring: true, category: 'produce' })}
            className={`seg-btn ${formState.is_respiring ? 'active' : ''}`}
          >
            Fresh Produce
          </button>
        </div>
      </div>

      {/* Section 2: Intrinsic Chemical Properties */}
      <div className="space-y-3 pt-4 border-t border-rule">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink">2. Composition & Water Activity</span>
        <div className="grid grid-cols-3 gap-2.5">
          <FieldRow label="Moisture" unit="% w/w">
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formState.moisture}
              onChange={(e) => onChange({ moisture: parseFloat(e.target.value) || 0 })}
              className="field text-xs font-mono"
            />
          </FieldRow>
          <FieldRow label="Lipids / Fat" unit="% w/w">
            <input
              type="number"
              step="0.1"
              min="0"
              max="100"
              value={formState.fat}
              onChange={(e) => onChange({ fat: parseFloat(e.target.value) || 0 })}
              className="field text-xs font-mono"
            />
          </FieldRow>
          <FieldRow label="pH Level" unit="pH">
            <input
              type="number"
              step="0.1"
              min="1"
              max="14"
              value={formState.ph}
              onChange={(e) => onChange({ ph: parseFloat(e.target.value) || 7 })}
              className="field text-xs font-mono"
            />
          </FieldRow>
        </div>
      </div>

      {/* Section 3: Respiration Parameters (Only for Produce) */}
      {formState.is_respiring && (
        <div className="space-y-3 pt-4 border-t border-rule bg-accent-light/20 p-4 rounded-lg border border-accent/20">
          <div className="flex items-center gap-1.5">
            <ArrowDownRight className="w-3.5 h-3.5 text-accent" />
            <span className="text-xs font-semibold uppercase tracking-wider text-ink">3. Respiration Kinetics</span>
          </div>
          <div className="grid grid-cols-2 gap-2.5">
            <FieldRow label="Base r_O₂" unit="mL / kg·h">
              <input
                type="number"
                step="0.5"
                value={formState.resp_o2}
                onChange={(e) => onChange({ resp_o2: parseFloat(e.target.value) || 0 })}
                className="field text-xs font-mono"
              />
            </FieldRow>
            <FieldRow label="Target O₂ Zone" unit="%">
              <input
                type="number"
                step="0.5"
                min="1"
                max="15"
                value={formState.o2_target}
                onChange={(e) => onChange({ o2_target: parseFloat(e.target.value) || 4 })}
                className="field text-xs font-mono"
              />
            </FieldRow>
            <FieldRow label="Max CO₂ Tolerance" unit="%">
              <input
                type="number"
                step="0.5"
                min="1"
                max="25"
                value={formState.co2_tolerance}
                onChange={(e) => onChange({ co2_tolerance: parseFloat(e.target.value) || 5 })}
                className="field text-xs font-mono"
              />
            </FieldRow>
            <FieldRow label="Q₁₀ Temperature Coeff." unit="ratio">
              <input
                type="number"
                step="0.1"
                min="1"
                max="3"
                value={formState.q10}
                onChange={(e) => onChange({ q10: parseFloat(e.target.value) || 2 })}
                className="field text-xs font-mono"
              />
            </FieldRow>
          </div>
        </div>
      )}

      {/* Section 4: Storage & Ambient Conditions */}
      <div className="space-y-3 pt-4 border-t border-rule">
        <span className="text-xs font-semibold uppercase tracking-wider text-ink">
          {formState.is_respiring ? '4. Storage & Logistics' : '3. Storage & Shelf Life'}
        </span>
        <div className="grid grid-cols-3 gap-2.5">
          <FieldRow label="Target Life" unit="days">
            <input
              type="number"
              min="1"
              max="1000"
              value={formState.shelf_life_days}
              onChange={(e) => onChange({ shelf_life_days: parseInt(e.target.value) || 1 })}
              className="field text-xs font-mono"
            />
          </FieldRow>
          <FieldRow label="Storage Temp" unit="°C">
            <input
              type="number"
              step="1"
              value={formState.temp_c}
              onChange={(e) => onChange({ temp_c: parseFloat(e.target.value) || 0 })}
              className="field text-xs font-mono"
            />
          </FieldRow>
          <FieldRow label="Ambient RH" unit="%">
            <input
              type="number"
              min="10"
              max="100"
              value={formState.humidity_rh}
              onChange={(e) => onChange({ humidity_rh: parseFloat(e.target.value) || 50 })}
              className="field text-xs font-mono"
            />
          </FieldRow>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-2">
        <button
          type="submit"
          disabled={isLoading}
          className="btn-primary w-full py-3 text-sm"
        >
          <span>Calculate Recommendations</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </form>
  );
};
