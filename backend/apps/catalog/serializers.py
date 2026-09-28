from rest_framework import serializers
from apps.catalog.models import Source, Commodity, Material, Rule


class SourceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Source
        fields = ["id", "title", "url", "year"]


class CommoditySerializer(serializers.ModelSerializer):
    source = SourceSerializer(read_only=True)

    class Meta:
        model = Commodity
        fields = [
            "id",
            "name",
            "category",
            "moisture",
            "fat",
            "ph",
            "is_respiring",
            "resp_o2",
            "resp_co2",
            "rq",
            "q10",
            "o2_target",
            "co2_tolerance",
            "critical_moisture",
            "typical_shelf_life_days",
            "default_temp_c",
            "default_humidity_rh",
            "description",
            "source",
        ]


class MaterialSerializer(serializers.ModelSerializer):
    source = SourceSerializer(read_only=True)

    class Meta:
        model = Material
        fields = [
            "id",
            "name",
            "structure",
            "thickness_range_um",
            "typical_thickness_um",
            "otr_ml_m2_day_atm",
            "wvtr_g_m2_day",
            "co2_perm_ml_m2_day_atm",
            "seal_type",
            "mechanical_strength",
            "breathable",
            "recyclable",
            "biodegradable",
            "cost_tier",
            "estimated",
            "description",
            "source",
        ]


class RuleSerializer(serializers.ModelSerializer):
    source = SourceSerializer(read_only=True)

    class Meta:
        model = Rule
        fields = ["id", "name", "condition", "target_property", "rationale", "source"]
