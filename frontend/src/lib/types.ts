export interface Source {
  id: string;
  title: string;
  url?: string;
  year?: number;
}

export interface Commodity {
  id: string;
  name: string;
  category: 'produce' | 'dry';
  moisture: number;
  fat: number;
  ph: number;
  is_respiring: boolean;
  resp_o2: number;
  resp_co2: number;
  rq: number;
  q10: number;
  o2_target: number;
  co2_tolerance: number;
  critical_moisture: number;
  typical_shelf_life_days: number;
  default_temp_c: number;
  default_humidity_rh: number;
  description: string;
  source?: Source;
}

export interface Material {
  id: string;
  name: string;
  structure: string;
  thickness_range_um: string;
  typical_thickness_um: number;
  otr_ml_m2_day_atm: number;
  wvtr_g_m2_day: number;
  co2_perm_ml_m2_day_atm: number;
  seal_type: string;
  mechanical_strength: string;
  breathable: boolean;
  recyclable: boolean;
  biodegradable: boolean;
  cost_tier: 'Low' | 'Moderate' | 'Premium';
  estimated: boolean;
  description: string;
  source?: Source;
}

export interface RuleCitation {
  rule_id: string;
  name: string;
  rationale: string;
  source: string;
}

export interface Explanation {
  summary: string;
  rules_fired: RuleCitation[];
  data_label: 'Sourced' | 'Estimated';
  citation: string;
}

export interface Recommendation {
  material_id: string;
  material_name: string;
  structure: string;
  thickness_range_um: string;
  offered_otr: number;
  offered_wvtr: number;
  offered_co2_perm: number;
  estimated_internal_co2_pct?: number;
  fit_score: number;
  fit_status: string;
  seal_type: string;
  mechanical_strength: string;
  cost_tier: 'Low' | 'Moderate' | 'Premium';
  breathable: boolean;
  recyclable: boolean;
  biodegradable: boolean;
  estimated: boolean;
  source?: {
    id: string;
    title: string;
    url: string;
  };
  explanation?: Explanation;
}

export interface DerivedRequirements {
  is_produce?: boolean;
  target_otr_ml_m2_day_atm?: number;
  min_co2_perm_ml_m2_day_atm?: number;
  r_o2_at_storage_temp?: number;
  r_co2_at_storage_temp?: number;
  max_wvtr_g_m2_day?: number;
  max_otr_ml_m2_day_atm?: number;
  allowable_water_gain_g?: number;
  pack_weight_kg: number;
  pack_area_m2: number;
  storage_temp_c?: number;
  shelf_life_days?: number;
}

export interface RecommendResponse {
  commodity_name: string;
  category: 'produce' | 'dry';
  is_produce: boolean;
  input_summary: {
    moisture_pct: number;
    fat_pct: number;
    ph: number;
    shelf_life_days: number;
    temp_c: number;
    humidity_rh: number;
    storage_type: string;
  };
  requirements_derived: DerivedRequirements;
  recommendations: Recommendation[];
  total_candidates_evaluated: number;
}

export interface FoodFormState {
  commodity_id: string;
  commodity_name: string;
  category: 'produce' | 'dry';
  moisture: number;
  critical_moisture: number;
  fat: number;
  ph: number;
  is_respiring: boolean;
  resp_o2: number;
  resp_co2: number;
  rq: number;
  q10: number;
  o2_target: number;
  co2_tolerance: number;
  shelf_life_days: number;
  temp_c: number;
  humidity_rh: number;
  storage_type: 'ambient' | 'chilled' | 'frozen';
  transport_conditions: 'ambient' | 'cold_chain' | 'long_haul';
  pack_weight_kg: number;
  pack_area_m2: number;
}
