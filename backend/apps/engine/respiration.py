"""Respiration rate and Modified Atmosphere Packaging (MAP) solver."""
import math
from typing import Dict, Any


def adjust_respiration_for_temperature(
    rate_at_ref: float,
    temp_c: float,
    q10: float = 2.0,
    t_ref: float = 20.0,
) -> float:
    """
    Adjust respiration rate for storage temperature using standard Q10 relation.
    
    R(T) = R_ref * Q10^((T - T_ref) / 10)
    """
    exponent = (temp_c - t_ref) / 10.0
    adjusted_rate = rate_at_ref * (q10 ** exponent)
    return max(0.1, round(adjusted_rate, 2))


def calculate_map_requirements(
    resp_o2_ref: float,
    resp_co2_ref: float,
    rq: float,
    q10: float,
    o2_target_pct: float,
    co2_tolerance_pct: float,
    temp_c: float,
    pack_weight_kg: float = 0.5,
    pack_area_m2: float = 0.08,
) -> Dict[str, Any]:
    """
    Calculate target equilibrium gas permeability for fresh respiring produce.
    
    Returns:
        Dict with target_otr_ml_m2_day_atm, min_co2_perm_ml_m2_day_atm,
        adjusted respiration rates, and temperature-adjusted parameters.
    """
    # 1. Temperature-adjusted respiration
    r_o2_t = adjust_respiration_for_temperature(resp_o2_ref, temp_c, q10)
    r_co2_t = r_o2_t * max(0.5, rq)

    safe_weight = max(0.01, pack_weight_kg)
    safe_area = max(0.001, pack_area_m2)

    # 2. Target Oxygen fraction y_O2 (convert % to decimal, e.g. 4% -> 0.04)
    y_o2 = max(0.01, min(0.15, o2_target_pct / 100.0))
    ambient_o2 = 0.21
    delta_o2 = ambient_o2 - y_o2

    # Daily total O2 consumption (mL/day) = R_O2(T) * Weight * 24
    daily_o2_consumption_ml = r_o2_t * safe_weight * 24.0

    # Steady state requirement: Target OTR = Daily O2 / (Area * delta_o2)
    target_otr = daily_o2_consumption_ml / (safe_area * delta_o2)
    target_otr = round(target_otr, 1)

    # 3. Maximum permissible CO2 accumulation limit
    # Max allowed internal y_CO2
    y_co2_max = max(0.02, min(0.20, co2_tolerance_pct / 100.0))
    daily_co2_evolution_ml = r_co2_t * safe_weight * 24.0
    min_co2_perm = daily_co2_evolution_ml / (safe_area * y_co2_max)
    min_co2_perm = round(min_co2_perm, 1)

    return {
        "is_produce": True,
        "r_o2_at_storage_temp": r_o2_t,
        "r_co2_at_storage_temp": round(r_co2_t, 2),
        "target_otr_ml_m2_day_atm": target_otr,
        "min_co2_perm_ml_m2_day_atm": min_co2_perm,
        "o2_target_pct": o2_target_pct,
        "co2_tolerance_pct": co2_tolerance_pct,
        "storage_temp_c": temp_c,
        "pack_weight_kg": safe_weight,
        "pack_area_m2": safe_area,
    }


def estimate_equilibrium_co2(
    r_co2_t: float,
    pack_weight_kg: float,
    pack_area_m2: float,
    film_co2_perm: float,
) -> float:
    """
    Estimate internal equilibrium CO2 concentration (%) for a given film.
    """
    if film_co2_perm <= 0.0:
        return 99.0
    daily_co2_ml = r_co2_t * pack_weight_kg * 24.0
    y_co2 = daily_co2_ml / (film_co2_perm * pack_area_m2)
    return round(y_co2 * 100.0, 2)
