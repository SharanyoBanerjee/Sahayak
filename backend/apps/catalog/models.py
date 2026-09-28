from django.db import models


class Source(models.Model):
    """Authoritative scientific or standard organization source."""
    id = models.CharField(max_length=32, primary_key=True)
    title = models.CharField(max_length=255)
    url = models.URLField(max_length=500, blank=True)
    year = models.PositiveIntegerField(null=True, blank=True)

    def __str__(self):
        return f"[{self.id}] {self.title}"


class Commodity(models.Model):
    """Food commodity specifications and baseline biological parameters."""
    CATEGORY_CHOICES = [
        ("produce", "Fresh Produce"),
        ("dry", "Dry / Packaged Food"),
    ]

    id = models.CharField(max_length=32, primary_key=True)
    name = models.CharField(max_length=128, unique=True)
    category = models.CharField(max_length=32, choices=CATEGORY_CHOICES, default="dry")
    moisture = models.FloatField(help_text="Moisture percentage (% w/w)")
    fat = models.FloatField(default=0.0, help_text="Fat/oil content percentage (% w/w)")
    ph = models.FloatField(default=7.0, help_text="Typical pH value")
    is_respiring = models.BooleanField(default=False)
    
    # Respiration parameters (applicable if is_respiring is True)
    resp_o2 = models.FloatField(default=0.0, help_text="Reference O2 consumption (mL/kg·h at reference temp)")
    resp_co2 = models.FloatField(default=0.0, help_text="Reference CO2 evolution (mL/kg·h at reference temp)")
    rq = models.FloatField(default=1.0, help_text="Respiratory quotient (CO2 / O2)")
    q10 = models.FloatField(default=2.0, help_text="Temperature sensitivity coefficient Q10")
    o2_target = models.FloatField(default=4.0, help_text="Target internal equilibrium O2 percentage (%)")
    co2_tolerance = models.FloatField(default=5.0, help_text="Maximum internal CO2 tolerance limit (%)")
    
    # Shelf life and critical quality bounds
    critical_moisture = models.FloatField(help_text="Critical moisture limit before unacceptable texture/microbial spoilage (%)")
    typical_shelf_life_days = models.PositiveIntegerField(default=30)
    default_temp_c = models.FloatField(default=25.0)
    default_humidity_rh = models.FloatField(default=65.0)
    description = models.TextField(blank=True)
    
    source = models.ForeignKey(Source, on_delete=models.SET_NULL, null=True, related_name="commodities")

    def __str__(self):
        return self.name


class Material(models.Model):
    """Packaging film, laminate, or bio-substrate specs."""
    COST_TIER_CHOICES = [
        ("Low", "Low"),
        ("Moderate", "Moderate"),
        ("Premium", "Premium"),
    ]

    id = models.CharField(max_length=32, primary_key=True)
    name = models.CharField(max_length=128)
    structure = models.CharField(max_length=255, help_text="Layer configuration (e.g. 12µm PET / 9µm Alu / 50µm PE)")
    thickness_range_um = models.CharField(max_length=64, help_text="Thickness range string, e.g. 45 - 65 µm")
    typical_thickness_um = models.FloatField(default=40.0)
    
    # Barrier transmission parameters
    otr_ml_m2_day_atm = models.FloatField(help_text="Oxygen Transmission Rate in mL/m²·day·atm at 23°C, 0% RH")
    wvtr_g_m2_day = models.FloatField(help_text="Water Vapour Transmission Rate in g/m²·day at 38°C, 90% RH")
    co2_perm_ml_m2_day_atm = models.FloatField(default=0.0, help_text="CO2 Transmission Rate in mL/m²·day·atm at 23°C")
    
    # Material characteristics
    seal_type = models.CharField(max_length=128)
    mechanical_strength = models.CharField(max_length=255)
    breathable = models.BooleanField(default=False)
    recyclable = models.BooleanField(default=False)
    biodegradable = models.BooleanField(default=False)
    cost_tier = models.CharField(max_length=32, choices=COST_TIER_CHOICES, default="Moderate")
    estimated = models.BooleanField(default=False, help_text="True if values are theoretical estimates rather than lab-certified")
    description = models.TextField(blank=True)
    
    source = models.ForeignKey(Source, on_delete=models.SET_NULL, null=True, related_name="materials")

    def __str__(self):
        return self.name


class Rule(models.Model):
    """Packaging engineering decision rules and rationales."""
    id = models.CharField(max_length=32, primary_key=True)
    name = models.CharField(max_length=128)
    condition = models.CharField(max_length=255)
    target_property = models.CharField(max_length=64)
    rationale = models.TextField()
    source = models.ForeignKey(Source, on_delete=models.SET_NULL, null=True, related_name="rules")

    def __str__(self):
        return f"[{self.id}] {self.name}"
