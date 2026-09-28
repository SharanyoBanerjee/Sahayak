"""Scoring, filtering, and ranking engine for candidate packaging materials."""
import math
from typing import List, Dict, Any
from apps.engine.respiration import estimate_equilibrium_co2


def score_produce_material(
    material: Any,
    reqs: Dict[str, Any],
) -> Dict[str, Any]:
    """Score a candidate material for fresh respiring produce."""
    target_otr = reqs["target_otr_ml_m2_day_atm"]
    offered_otr = material.otr_ml_m2_day_atm
    co2_tolerance = reqs["co2_tolerance_pct"]
    
    # Calculate estimated equilibrium CO2 in package
    est_co2 = estimate_equilibrium_co2(
        r_co2_t=reqs["r_co2_at_storage_temp"],
        pack_weight_kg=reqs["pack_weight_kg"],
        pack_area_m2=reqs["pack_area_m2"],
        film_co2_perm=material.co2_perm_ml_m2_day_atm,
    )
    
    # Score based on logarithmic proximity of OTR to target OTR
    if target_otr <= 0 or offered_otr <= 0:
        ratio = 0.01
    else:
        ratio = offered_otr / target_otr
        
    log_diff = abs(math.log10(max(0.001, ratio)))
    
    # Base barrier fit score (100 if ratio=1, degrades as log_diff grows)
    base_score = max(5.0, 100.0 - (log_diff * 45.0))
    
    # Severe penalty if material is non-breathable for respiring produce
    if not material.breathable:
        base_score = min(25.0, base_score * 0.3)
        fit_status = "Insufficient Permeability (Risk of Anaerobiosis)"
    elif est_co2 > co2_tolerance * 1.5:
        base_score = max(10.0, base_score - 30.0)
        fit_status = f"High CO2 Accumulation Risk ({est_co2:.1f}% vs {co2_tolerance}% limit)"
    elif 0.5 <= ratio <= 2.0:
        fit_status = "Optimal Breathability Match"
        if material.biodegradable or material.recyclable:
            base_score = min(98.0, base_score + 4.0)
    else:
        fit_status = "Acceptable Breathability"

    fit_score = round(min(100.0, max(0.0, base_score)), 1)

    return {
        "material_id": material.id,
        "material_name": material.name,
        "structure": material.structure,
        "thickness_range_um": material.thickness_range_um,
        "offered_otr": material.otr_ml_m2_day_atm,
        "offered_wvtr": material.wvtr_g_m2_day,
        "offered_co2_perm": material.co2_perm_ml_m2_day_atm,
        "estimated_internal_co2_pct": est_co2,
        "fit_score": fit_score,
        "fit_status": fit_status,
        "seal_type": material.seal_type,
        "mechanical_strength": material.mechanical_strength,
        "cost_tier": material.cost_tier,
        "breathable": material.breathable,
        "recyclable": material.recyclable,
        "biodegradable": material.biodegradable,
        "estimated": material.estimated,
        "source": {
            "id": material.source.id if material.source else "N/A",
            "title": material.source.title if material.source else "Internal Database",
            "url": material.source.url if material.source else "",
        },
    }


def score_dry_material(
    material: Any,
    reqs: Dict[str, Any],
) -> Dict[str, Any]:
    """Score a candidate material for dry or packaged food."""
    max_wvtr = reqs["max_wvtr_g_m2_day"]
    max_otr = reqs["max_otr_ml_m2_day_atm"]
    
    offered_wvtr = material.wvtr_g_m2_day
    offered_otr = material.otr_ml_m2_day_atm
    
    wvtr_pass = offered_wvtr <= max_wvtr
    otr_pass = offered_otr <= max_otr
    
    # Moisture barrier score (40 points max)
    if wvtr_pass:
        wvtr_score = 40.0 - min(10.0, (offered_wvtr / max_wvtr) * 10.0)
    else:
        gap = (offered_wvtr - max_wvtr) / max_wvtr
        wvtr_score = max(0.0, 30.0 - (gap * 20.0))

    # Oxygen barrier score (40 points max)
    if otr_pass:
        otr_score = 40.0 - min(10.0, (offered_otr / max_otr) * 10.0)
    else:
        gap = (offered_otr - max_otr) / max_otr
        otr_score = max(0.0, 30.0 - (gap * 20.0))

    # Seal & Mechanical strength bonus (20 points max)
    mech_score = 15.0
    if "Alu Foil" in material.name or "Met-" in material.structure:
        mech_score += 3.0
    if material.recyclable:
        mech_score += 2.0

    total_score = wvtr_score + otr_score + mech_score

    # Determine status
    if wvtr_pass and otr_pass:
        if offered_wvtr < max_wvtr * 0.1 and offered_otr < max_otr * 0.1:
            fit_status = "Optimal High-Barrier Protection"
        else:
            fit_status = "Target Barrier Compliant"
    elif not wvtr_pass and not otr_pass:
        total_score = min(35.0, total_score * 0.4)
        fit_status = "Insufficient Moisture & Oxygen Barrier"
    elif not wvtr_pass:
        total_score = min(45.0, total_score * 0.5)
        fit_status = "Insufficient Moisture Barrier (Risk of Sogginess)"
    else:
        total_score = min(50.0, total_score * 0.6)
        fit_status = "Insufficient Oxygen Barrier (Risk of Rancidity)"

    fit_score = round(min(100.0, max(0.0, total_score)), 1)

    return {
        "material_id": material.id,
        "material_name": material.name,
        "structure": material.structure,
        "thickness_range_um": material.thickness_range_um,
        "offered_otr": offered_otr,
        "offered_wvtr": offered_wvtr,
        "offered_co2_perm": material.co2_perm_ml_m2_day_atm,
        "fit_score": fit_score,
        "fit_status": fit_status,
        "seal_type": material.seal_type,
        "mechanical_strength": material.mechanical_strength,
        "cost_tier": material.cost_tier,
        "breathable": material.breathable,
        "recyclable": material.recyclable,
        "biodegradable": material.biodegradable,
        "estimated": material.estimated,
        "source": {
            "id": material.source.id if material.source else "N/A",
            "title": material.source.title if material.source else "Internal Database",
            "url": material.source.url if material.source else "",
        },
    }


def rank_materials(
    materials: List[Any],
    is_produce: bool,
    requirements: Dict[str, Any],
    top_n: int = 3,
) -> List[Dict[str, Any]]:
    """Rank candidate materials against requirements and return top N."""
    scored_list = []
    for mat in materials:
        if is_produce:
            scored = score_produce_material(mat, requirements)
        else:
            scored = score_dry_material(mat, requirements)
        scored_list.append(scored)

    # Sort descending by fit_score
    scored_list.sort(key=lambda x: x["fit_score"], reverse=True)
    return scored_list[:top_n]
