from django.urls import path
from apps.api.views import (
    HealthCheckView,
    CommodityListView,
    MaterialListView,
    RecommendView,
)

urlpatterns = [
    path("health/", HealthCheckView.as_view(), name="health"),
    path("commodities/", CommodityListView.as_view(), name="commodity-list"),
    path("materials/", MaterialListView.as_view(), name="material-list"),
    path("recommend/", RecommendView.as_view(), name="recommend"),
]
