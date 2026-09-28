import json
from pathlib import Path
from django.core.management.base import BaseCommand
from django.conf import settings
from apps.catalog.models import Source, Commodity, Material, Rule


class Command(BaseCommand):
    help = "Seed database with initial commodities, materials, rules, and sources."

    def handle(self, *args, **options):
        seed_dir = settings.ROOT_DIR / "data" / "seed"
        if not seed_dir.exists():
            self.stderr.write(f"Seed directory not found at {seed_dir}")
            return

        # 1. Sources
        sources_file = seed_dir / "sources.json"
        if sources_file.exists():
            with open(sources_file, "r", encoding="utf-8") as f:
                sources_data = json.load(f)
            for item in sources_data:
                Source.objects.update_or_create(
                    id=item["id"],
                    defaults={
                        "title": item["title"],
                        "url": item.get("url", ""),
                        "year": item.get("year"),
                    },
                )
            self.stdout.write(self.style.SUCCESS(f"Loaded {len(sources_data)} sources."))

        # 2. Commodities
        commodities_file = seed_dir / "commodities.json"
        if commodities_file.exists():
            with open(commodities_file, "r", encoding="utf-8") as f:
                commodities_data = json.load(f)
            for item in commodities_data:
                source = Source.objects.filter(id=item.get("source_id")).first()
                Commodity.objects.update_or_create(
                    id=item["id"],
                    defaults={
                        "name": item["name"],
                        "category": item.get("category", "dry"),
                        "moisture": item["moisture"],
                        "fat": item.get("fat", 0.0),
                        "ph": item.get("ph", 7.0),
                        "is_respiring": item.get("is_respiring", False),
                        "resp_o2": item.get("resp_o2", 0.0),
                        "resp_co2": item.get("resp_co2", 0.0),
                        "rq": item.get("rq", 1.0),
                        "q10": item.get("q10", 2.0),
                        "o2_target": item.get("o2_target", 4.0),
                        "co2_tolerance": item.get("co2_tolerance", 5.0),
                        "critical_moisture": item.get("critical_moisture", item["moisture"] + 2.0),
                        "typical_shelf_life_days": item.get("typical_shelf_life_days", 30),
                        "default_temp_c": item.get("default_temp_c", 25.0),
                        "default_humidity_rh": item.get("default_humidity_rh", 65.0),
                        "description": item.get("description", ""),
                        "source": source,
                    },
                )
            self.stdout.write(self.style.SUCCESS(f"Loaded {len(commodities_data)} commodities."))

        # 3. Materials
        materials_file = seed_dir / "materials.json"
        if materials_file.exists():
            with open(materials_file, "r", encoding="utf-8") as f:
                materials_data = json.load(f)
            for item in materials_data:
                source = Source.objects.filter(id=item.get("source_id")).first()
                Material.objects.update_or_create(
                    id=item["id"],
                    defaults={
                        "name": item["name"],
                        "structure": item["structure"],
                        "thickness_range_um": item.get("thickness_range_um", "30-50 µm"),
                        "typical_thickness_um": item.get("typical_thickness_um", 40.0),
                        "otr_ml_m2_day_atm": item["otr_ml_m2_day_atm"],
                        "wvtr_g_m2_day": item["wvtr_g_m2_day"],
                        "co2_perm_ml_m2_day_atm": item.get("co2_perm_ml_m2_day_atm", 0.0),
                        "seal_type": item.get("seal_type", "Heat seal"),
                        "mechanical_strength": item.get("mechanical_strength", "Standard"),
                        "breathable": item.get("breathable", False),
                        "recyclable": item.get("recyclable", False),
                        "biodegradable": item.get("biodegradable", False),
                        "cost_tier": item.get("cost_tier", "Moderate"),
                        "estimated": item.get("estimated", False),
                        "description": item.get("description", ""),
                        "source": source,
                    },
                )
            self.stdout.write(self.style.SUCCESS(f"Loaded {len(materials_data)} materials."))

        # 4. Rules
        rules_file = seed_dir / "rules.json"
        if rules_file.exists():
            with open(rules_file, "r", encoding="utf-8") as f:
                rules_data = json.load(f)
            for item in rules_data:
                source = Source.objects.filter(id=item.get("source_id")).first()
                Rule.objects.update_or_create(
                    id=item["id"],
                    defaults={
                        "name": item["name"],
                        "condition": item["condition"],
                        "target_property": item.get("target_property", ""),
                        "rationale": item["rationale"],
                        "source": source,
                    },
                )
            self.stdout.write(self.style.SUCCESS(f"Loaded {len(rules_data)} rules."))
