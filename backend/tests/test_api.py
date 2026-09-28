import pytest
from rest_framework.test import APIClient
from apps.catalog.models import Source, Commodity, Material, Rule


@pytest.fixture
def api_client():
    return APIClient()


@pytest.fixture
def seed_test_db():
    src = Source.objects.create(id="SRC-BIS", title="Bureau of Indian Standards", url="https://bis.gov.in")
    
    Commodity.objects.create(
        id="CMD-TOM",
        name="Fresh Tomato",
        category="produce",
        moisture=94.0,
        fat=0.2,
        ph=4.4,
        is_respiring=True,
        resp_o2=15.0,
        resp_co2=18.0,
        rq=1.2,
        q10=2.1,
        o2_target=4.0,
        co2_tolerance=4.0,
        critical_moisture=96.0,
        typical_shelf_life_days=14,
        source=src,
    )
    
    Commodity.objects.create(
        id="CMD-BIS",
        name="Biscuits",
        category="dry",
        moisture=3.0,
        fat=16.0,
        ph=7.0,
        is_respiring=False,
        critical_moisture=6.0,
        typical_shelf_life_days=180,
        source=src,
    )

    Material.objects.create(
        id="MAT-MET",
        name="Metallised PET / LDPE",
        structure="12µm Met-PET / 40µm LDPE",
        otr_ml_m2_day_atm=1.2,
        wvtr_g_m2_day=0.9,
        co2_perm_ml_m2_day_atm=2.5,
        breathable=False,
        source=src,
    )

    Material.objects.create(
        id="MAT-LDPE",
        name="Breathable LDPE Film",
        structure="30µm LDPE",
        otr_ml_m2_day_atm=1200.0,
        wvtr_g_m2_day=12.0,
        co2_perm_ml_m2_day_atm=4800.0,
        breathable=True,
        source=src,
    )

    Rule.objects.create(
        id="RUL-001",
        name="Oxidation Rule",
        condition="fat_pct >= 10.0",
        rationale="Lipid oxidation requires low OTR.",
        source=src,
    )


@pytest.mark.django_db
def test_health_check(api_client):
    response = api_client.get("/api/health/")
    assert response.status_code == 200
    assert response.json()["status"] == "healthy"


@pytest.mark.django_db
def test_commodities_list(api_client, seed_test_db):
    response = api_client.get("/api/commodities/")
    assert response.status_code == 200
    data = response.json()
    assert len(data) >= 2
    assert any(c["name"] == "Fresh Tomato" for c in data)


@pytest.mark.django_db
def test_recommend_endpoint_tomato(api_client, seed_test_db):
    payload = {
        "commodity_name": "Fresh Tomato",
        "category": "produce",
        "is_respiring": True,
        "resp_o2": 15.0,
        "resp_co2": 18.0,
        "rq": 1.2,
        "q10": 2.1,
        "o2_target": 4.0,
        "co2_tolerance": 4.0,
        "temp_c": 12.0,
        "humidity_rh": 90.0,
        "shelf_life_days": 14,
    }
    response = api_client.post("/api/recommend/", data=payload, format="json")
    assert response.status_code == 200
    res = response.json()
    assert res["is_produce"] is True
    assert len(res["recommendations"]) > 0
    top_rec = res["recommendations"][0]
    assert top_rec["breathable"] is True
    assert "explanation" in top_rec


@pytest.mark.django_db
def test_recommend_endpoint_biscuits(api_client, seed_test_db):
    payload = {
        "commodity_name": "Biscuits",
        "category": "dry",
        "moisture": 3.0,
        "critical_moisture": 6.0,
        "fat": 16.0,
        "ph": 7.0,
        "is_respiring": False,
        "shelf_life_days": 180,
        "temp_c": 25.0,
        "humidity_rh": 65.0,
    }
    response = api_client.post("/api/recommend/", data=payload, format="json")
    assert response.status_code == 200
    res = response.json()
    assert res["is_produce"] is False
    assert len(res["recommendations"]) > 0
    top_rec = res["recommendations"][0]
    assert top_rec["offered_wvtr"] < 2.0
    assert "explanation" in top_rec
