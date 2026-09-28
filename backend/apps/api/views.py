import logging
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from apps.catalog.models import Commodity, Material, Rule, Source
from apps.catalog.serializers import CommoditySerializer, MaterialSerializer, RuleSerializer
from apps.api.serializers import RecommendRequestSerializer
from apps.engine.requirements import calculate_dry_food_requirements
from apps.engine.respiration import calculate_map_requirements
from apps.engine.ranker import rank_materials
from apps.engine.explain import generate_explanation

logger = logging.getLogger(__name__)


class HealthCheckView(APIView):
    """Simple health check endpoint."""
    def get(self, request):
        return Response({
            "status": "healthy",
            "service": "Sahayak Packaging Engine",
            "version": "1.0.0-prototype"
        })


class CommodityListView(APIView):
    """Retrieve all standard food commodities."""
    def get(self, request):
        commodities = Commodity.objects.all().select_related("source").order_by("name")
        serializer = CommoditySerializer(commodities, many=True)
        return Response(serializer.data)


class MaterialListView(APIView):
    """Retrieve catalog of available packaging materials and films."""
    def get(self, request):
        materials = Material.objects.all().select_related("source").order_by("name")
        serializer = MaterialSerializer(materials, many=True)
        return Response(serializer.data)


class RecommendView(APIView):
    """
    Main recommendation endpoint.
    Accepts food properties and storage conditions, calculates barrier limits / MAP
    equilibrium, ranks matching materials, and returns top recommendations with plain reasons.
    """
    def post(self, request):
        serializer = RecommendRequestSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(
                {"error": "Invalid food parameters", "details": serializer.errors},
                status=status.HTTP_400_BAD_REQUEST,
            )

        data = serializer.validated_data
        is_produce = data.get("is_respiring", False) or data.get("category") == "produce"
        
        try:
            # 1. Calculate barrier requirements
            if is_produce:
                reqs = calculate_map_requirements(
                    resp_o2_ref=data.get("resp_o2", 15.0),
                    resp_co2_ref=data.get("resp_co2", 18.0),
                    rq=data.get("rq", 1.0),
                    q10=data.get("q10", 2.0),
                    o2_target_pct=data.get("o2_target", 4.0),
                    co2_tolerance_pct=data.get("co2_tolerance", 5.0),
                    temp_c=data.get("temp_c", 12.0),
                    pack_weight_kg=data.get("pack_weight_kg", 0.5),
                    pack_area_m2=data.get("pack_area_m2", 0.08),
                )
            else:
                reqs = calculate_dry_food_requirements(
                    moisture_pct=data.get("moisture", 5.0),
                    critical_moisture_pct=data.get("critical_moisture", 7.0),
                    fat_pct=data.get("fat", 0.0),
                    shelf_life_days=data.get("shelf_life_days", 30),
                    pack_weight_kg=data.get("pack_weight_kg", 0.25),
                    pack_area_m2=data.get("pack_area_m2", 0.05),
                    humidity_rh=data.get("humidity_rh", 65.0),
                    temp_c=data.get("temp_c", 25.0),
                )

            # 2. Fetch candidate materials and rank
            all_materials = list(Material.objects.all().select_related("source"))
            ranked_results = rank_materials(
                materials=all_materials,
                is_produce=is_produce,
                requirements=reqs,
                top_n=3,
            )

            # 3. Attach explanations and citations for each recommendation
            recommendations = []
            for item in ranked_results:
                explain_data = generate_explanation(
                    material_result=item,
                    food_params=data,
                    reqs=reqs,
                    is_produce=is_produce,
                )
                item["explanation"] = explain_data
                recommendations.append(item)

            return Response({
                "commodity_name": data.get("commodity_name", "Food Product"),
                "category": data.get("category", "dry"),
                "is_produce": is_produce,
                "input_summary": {
                    "moisture_pct": data.get("moisture"),
                    "fat_pct": data.get("fat"),
                    "ph": data.get("ph"),
                    "shelf_life_days": data.get("shelf_life_days"),
                    "temp_c": data.get("temp_c"),
                    "humidity_rh": data.get("humidity_rh"),
                    "storage_type": data.get("storage_type"),
                },
                "requirements_derived": reqs,
                "recommendations": recommendations,
                "total_candidates_evaluated": len(all_materials),
            })

        except Exception as e:
            logger.exception("Error calculating packaging recommendations: %s", str(e))
            return Response(
                {"error": "Failed to calculate packaging recommendations", "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
