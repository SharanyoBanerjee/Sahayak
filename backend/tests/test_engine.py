import pytest
from apps.engine.requirements import calculate_dry_food_requirements
from apps.engine.respiration import (
    adjust_respiration_for_temperature,
    calculate_map_requirements,
    estimate_equilibrium_co2,
)
from apps.catalog.models import Material, Source
from apps.engine.ranker import rank_materials


@pytest.mark.django_db
class TestEngineCalculations:
    def test_respiration_q10_adjustment(self):
        # At reference 20°C, rate should be base rate
        rate_20 = adjust_respiration_for_temperature(15.0, temp_c=20.0, q10=2.0)
        assert rate_20 == 15.0

        # At 30°C (10°C higher with Q10=2), rate should double
        rate_30 = adjust_respiration_for_temperature(15.0, temp_c=30.0, q10=2.0)
        assert rate_30 == 30.0

        # At 10°C (10°C lower with Q10=2), rate should halve
        rate_10 = adjust_respiration_for_temperature(15.0, temp_c=10.0, q10=2.0)
        assert rate_10 == 7.5

    def test_dry_food_wvtr_and_otr(self):
        # Low moisture dry biscuit: 3% moisture, 6% critical, 16% fat, 180 days shelf life
        reqs = calculate_dry_food_requirements(
            moisture_pct=3.0,
            critical_moisture_pct=6.0,
            fat_pct=16.0,
            shelf_life_days=180,
            pack_weight_kg=0.25,
            pack_area_m2=0.05,
            humidity_rh=65.0,
        )
        # Max permissible WVTR must be low (< 2.0 g/m2/day)
        assert reqs["max_wvtr_g_m2_day"] < 2.0
        # Max permissible OTR must be low (< 3.0 mL/m2/day)
        assert reqs["max_otr_ml_m2_day_atm"] < 3.0

    def test_demo_case_fresh_tomato(self):
        """Demo Case 1: Fresh Tomato must recommend breathable produce film."""
        src = Source.objects.create(id="TEST-SRC", title="Test Source")
        
        # Create test materials
        mat_breathable = Material.objects.create(
            id="MAT-TEST-LDPE",
            name="Breathable LDPE Film",
            structure="30µm LDPE",
            otr_ml_m2_day_atm=1200.0,
            wvtr_g_m2_day=12.0,
            co2_perm_ml_m2_day_atm=4800.0,
            breathable=True,
            source=src,
        )
        mat_foil = Material.objects.create(
            id="MAT-TEST-FOIL",
            name="PET / Alu Foil Laminate",
            structure="12µm PET / 9µm Alu / 50µm PE",
            otr_ml_m2_day_atm=0.1,
            wvtr_g_m2_day=0.05,
            co2_perm_ml_m2_day_atm=0.2,
            breathable=False,
            source=src,
        )

        reqs = calculate_map_requirements(
            resp_o2_ref=15.0,
            resp_co2_ref=18.0,
            rq=1.2,
            q10=2.1,
            o2_target_pct=4.0,
            co2_tolerance_pct=4.0,
            temp_c=12.0,
            pack_weight_kg=0.5,
            pack_area_m2=0.08,
        )

        ranked = rank_materials([mat_breathable, mat_foil], is_produce=True, requirements=reqs, top_n=2)
        
        # Top material must be breathable film, not impermeable foil
        assert ranked[0]["material_id"] == "MAT-TEST-LDPE"
        assert ranked[0]["fit_score"] > ranked[1]["fit_score"]
        assert ranked[0]["breathable"] is True

    def test_demo_case_crispy_biscuits(self):
        """Demo Case 2: Dry biscuits must recommend high-barrier laminate."""
        src = Source.objects.create(id="TEST-SRC-2", title="Test Source 2")
        
        mat_barrier = Material.objects.create(
            id="MAT-TEST-MET",
            name="Metallised PET / LDPE",
            structure="12µm Met-PET / 40µm LDPE",
            otr_ml_m2_day_atm=1.2,
            wvtr_g_m2_day=0.9,
            co2_perm_ml_m2_day_atm=2.5,
            breathable=False,
            source=src,
        )
        mat_breathable = Material.objects.create(
            id="MAT-TEST-MICRO",
            name="Micro-perforated Film",
            structure="25µm BOPP micro-perforated",
            otr_ml_m2_day_atm=3500.0,
            wvtr_g_m2_day=18.0,
            co2_perm_ml_m2_day_atm=4200.0,
            breathable=True,
            source=src,
        )

        reqs = calculate_dry_food_requirements(
            moisture_pct=3.0,
            critical_moisture_pct=6.0,
            fat_pct=16.0,
            shelf_life_days=180,
            pack_weight_kg=0.25,
            pack_area_m2=0.05,
        )

        ranked = rank_materials([mat_barrier, mat_breathable], is_produce=False, requirements=reqs, top_n=2)

        # Top material must be barrier laminate, not micro-perforated
        assert ranked[0]["material_id"] == "MAT-TEST-MET"
        assert ranked[0]["fit_score"] > 70.0
        assert ranked[1]["fit_score"] < 40.0
