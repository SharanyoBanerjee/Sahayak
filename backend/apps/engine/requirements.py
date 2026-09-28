"""Barrier limits calculator for dry and shelf-stable packaged foods."""
from typing import Dict, Any


def calculate_dry_food_requirements(
    moisture_pct: float,
    critical_moisture_pct: float,
    fat_pct: float,
    shelf_life_days: int,
    pack_weight_kg: float = 0.25,
    pack_area_m2: float = 0.05,
    humidity_rh: float = 65.0,
    temp_c: float = 25.0,
) -> Dict[str, Any]:
    """
    Calculate maximum allowable WVTR and OTR for dry/packaged foods.
    
    Args:
        moisture_pct: Initial product moisture (% w/w).
        critical_moisture_pct: Critical moisture threshold before sogginess/spoilage (% w/w).
        fat_pct: Total fat/oil content (% w/w).
        shelf_life_days: Targeted shelf life duration in days.
        pack_weight_kg: Net food weight in package (kg).
        pack_area_m2: Total package surface area (m²).
        humidity_rh: External relative humidity (% RH).
        temp_c: Storage temperature (°C).

    Returns:
        Dict with max_wvtr_g_m2_day, max_otr_ml_m2_day_atm, and calculation diagnostics.
    """
    safe_days = max(1, shelf_life_days)
    safe_area = max(0.001, pack_area_m2)
    safe_weight = max(0.01, pack_weight_kg)
    
    # 1. Moisture gain limit
    # Delta moisture allowable before product goes stale/soggy
    delta_m_pct = max(0.1, critical_moisture_pct - moisture_pct)
    allowable_water_gain_g = safe_weight * (delta_m_pct / 100.0) * 1000.0
    
    # Standard WVTR test is 38°C/90% RH; humidity factor adjusts ambient exposure
    rh_factor = max(0.4, min(1.2, humidity_rh / 75.0))
    max_wvtr = (allowable_water_gain_g / (safe_area * safe_days)) / rh_factor
    # Cap to reasonable physical limits
    max_wvtr = round(max(0.05, min(100.0, max_wvtr)), 2)

    # 2. Oxygen transmission limit (Oxidation protection)
    # Fat autoxidation accelerates with lipid concentration and time
    if fat_pct >= 25.0:
        # Extreme fat (potato chips, nuts, milk powder) -> high barrier required
        base_otr = 120.0 / (fat_pct * (safe_days ** 0.45))
    elif fat_pct >= 8.0:
        # Moderate fat (biscuits, baked snacks)
        base_otr = 300.0 / (fat_pct * (safe_days ** 0.4))
    else:
        # Low fat (spices, grains, dry pulses)
        base_otr = 500.0 / (max(1.0, fat_pct) * (safe_days ** 0.3))

    max_otr = round(max(0.1, min(200.0, base_otr)), 2)

    return {
        "max_wvtr_g_m2_day": max_wvtr,
        "max_otr_ml_m2_day_atm": max_otr,
        "allowable_water_gain_g": round(allowable_water_gain_g, 2),
        "pack_weight_kg": safe_weight,
        "pack_area_m2": safe_area,
        "shelf_life_days": safe_days,
    }
