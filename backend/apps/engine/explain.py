"""Human-readable explanation and rule-attachment generator."""
from typing import Dict, Any, List
from apps.catalog.models import Rule


def generate_explanation(
    material_result: Dict[str, Any],
    food_params: Dict[str, Any],
    reqs: Dict[str, Any],
    is_produce: bool,
) -> Dict[str, Any]:
    """
    Generate plain-language explanation, active rules, and source citations.
    """
    rules_fired = []
    plain_summary = ""
    
    if is_produce:
        # Produce explanation
        target_otr = reqs["target_otr_ml_m2_day_atm"]
        offered_otr = material_result["offered_otr"]
        temp_c = food_params.get("temp_c", 12.0)
        
        rule_map = Rule.objects.filter(id="RUL-003").first()
        if rule_map:
            rules_fired.append({
                "rule_id": rule_map.id,
                "name": rule_map.name,
                "rationale": rule_map.rationale,
                "source": rule_map.source.title if rule_map.source else "Postharvest Literature",
            })
            
        if material_result.get("estimated_internal_co2_pct", 0) > reqs.get("co2_tolerance_pct", 5):
            rule_co2 = Rule.objects.filter(id="RUL-004").first()
            if rule_co2:
                rules_fired.append({
                    "rule_id": rule_co2.id,
                    "name": rule_co2.name,
                    "rationale": rule_co2.rationale,
                    "source": rule_co2.source.title if rule_co2.source else "Postharvest Literature",
                })

        plain_summary = (
            f"At {temp_c}°C storage, produce consumes oxygen steadily. "
            f"This film supplies {offered_otr} mL/m²·day OTR, balancing against the required {target_otr} mL/m²·day "
            f"to sustain a safe 3–5% equilibrium oxygen atmosphere without causing anaerobic spoilage."
        )

    else:
        # Dry / packaged food explanation
        fat_pct = food_params.get("fat_pct", 0.0)
        shelf_life = food_params.get("shelf_life_days", 30)
        moisture_pct = food_params.get("moisture_pct", 5.0)
        
        if moisture_pct <= 6.0:
            rule_wvtr = Rule.objects.filter(id="RUL-002").first()
            if rule_wvtr:
                rules_fired.append({
                    "rule_id": rule_wvtr.id,
                    "name": rule_wvtr.name,
                    "rationale": rule_wvtr.rationale,
                    "source": rule_wvtr.source.title if rule_wvtr.source else "Packaging Standards",
                })

        if fat_pct >= 8.0:
            rule_fat = Rule.objects.filter(id="RUL-001").first()
            if rule_fat:
                rules_fired.append({
                    "rule_id": rule_fat.id,
                    "name": rule_fat.name,
                    "rationale": rule_fat.rationale,
                    "source": rule_fat.source.title if rule_fat.source else "Packaging Standards",
                })

        if food_params.get("ph", 7.0) < 4.6:
            rule_ph = Rule.objects.filter(id="RUL-005").first()
            if rule_ph:
                rules_fired.append({
                    "rule_id": rule_ph.id,
                    "name": rule_ph.name,
                    "rationale": rule_ph.rationale,
                    "source": rule_ph.source.title if rule_ph.source else "Packaging Standards",
                })

        max_wvtr = reqs["max_wvtr_g_m2_day"]
        max_otr = reqs["max_otr_ml_m2_day_atm"]
        offered_wvtr = material_result["offered_wvtr"]
        offered_otr = material_result["offered_otr"]

        plain_summary = (
            f"For a {shelf_life}-day shelf life, moisture ingress must stay below {max_wvtr} g/m²·day and oxygen below {max_otr} mL/m²·day·atm. "
            f"This material offers WVTR of {offered_wvtr} g/m²·day and OTR of {offered_otr} mL/m²·day·atm, protecting against crispness loss and rancidity."
        )

    return {
        "summary": plain_summary,
        "rules_fired": rules_fired,
        "data_label": "Estimated" if material_result.get("estimated") else "Sourced",
        "citation": material_result.get("source", {}).get("title", "Standard Food Packaging Database"),
    }
