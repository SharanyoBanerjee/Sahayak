from rest_framework import serializers


class RecommendRequestSerializer(serializers.Serializer):
    """Input serializer for food properties, storage conditions, and pack parameters."""
    commodity_id = serializers.CharField(required=False, allow_blank=True, default="")
    commodity_name = serializers.CharField(required=False, allow_blank=True, default="Custom Product")
    category = serializers.ChoiceField(choices=["produce", "dry"], default="dry")
    
    # Food physical / chemical properties
    moisture = serializers.FloatField(min_value=0.0, max_value=100.0, default=5.0)
    critical_moisture = serializers.FloatField(min_value=0.0, max_value=100.0, required=False)
    fat = serializers.FloatField(min_value=0.0, max_value=100.0, default=0.0)
    ph = serializers.FloatField(min_value=1.0, max_value=14.0, default=7.0)
    
    # Fresh produce respiration parameters
    is_respiring = serializers.BooleanField(default=False)
    resp_o2 = serializers.FloatField(min_value=0.0, default=0.0)
    resp_co2 = serializers.FloatField(min_value=0.0, default=0.0)
    rq = serializers.FloatField(min_value=0.1, max_value=3.0, default=1.0)
    q10 = serializers.FloatField(min_value=1.0, max_value=4.0, default=2.0)
    o2_target = serializers.FloatField(min_value=1.0, max_value=20.0, default=4.0)
    co2_tolerance = serializers.FloatField(min_value=1.0, max_value=30.0, default=5.0)
    
    # Storage & Logistics conditions
    shelf_life_days = serializers.IntegerField(min_value=1, max_value=1000, default=30)
    temp_c = serializers.FloatField(min_value=-30.0, max_value=60.0, default=25.0)
    humidity_rh = serializers.FloatField(min_value=10.0, max_value=100.0, default=65.0)
    storage_type = serializers.ChoiceField(choices=["ambient", "chilled", "frozen"], default="ambient")
    transport_conditions = serializers.ChoiceField(choices=["ambient", "cold_chain", "long_haul"], default="ambient")
    
    # Pack dimensions
    pack_weight_kg = serializers.FloatField(min_value=0.01, max_value=50.0, required=False)
    pack_area_m2 = serializers.FloatField(min_value=0.001, max_value=5.0, required=False)

    def validate(self, attrs):
        # Set intelligent defaults for critical moisture if omitted
        if "critical_moisture" not in attrs or attrs["critical_moisture"] is None:
            if attrs.get("is_respiring"):
                attrs["critical_moisture"] = min(99.0, attrs["moisture"] + 3.0)
            else:
                attrs["critical_moisture"] = min(100.0, attrs["moisture"] + 2.5)

        # Set default pack weight and surface area based on produce vs dry
        if "pack_weight_kg" not in attrs or attrs["pack_weight_kg"] is None:
            attrs["pack_weight_kg"] = 0.5 if attrs.get("is_respiring") else 0.25

        if "pack_area_m2" not in attrs or attrs["pack_area_m2"] is None:
            attrs["pack_area_m2"] = 0.08 if attrs.get("is_respiring") else 0.05

        return attrs
