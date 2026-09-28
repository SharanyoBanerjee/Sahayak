import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PresetBar } from './components/PresetBar';
import { FoodForm } from './components/FoodForm';
import { RequirementStrip } from './components/RequirementStrip';
import { ResultCard } from './components/ResultCard';
import { EngineStepper } from './components/EngineStepper';
import { BreathingPackDiagram, SpecimenTrayIllustration } from './components/Illustrations';
import { Footer } from './components/Footer';
import {
  Commodity,
  FoodFormState,
  RecommendResponse,
} from './lib/types';
import { PRESET_TOMATO } from './lib/presets';
import { fetchCommodities, getRecommendations, checkHealth } from './lib/api';
import { AlertCircle } from 'lucide-react';

export const App: React.FC = () => {
  const [formState, setFormState] = useState<FoodFormState>(PRESET_TOMATO);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [results, setResults] = useState<RecommendResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [serverHealthy, setServerHealthy] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<string | null>('CMD-001');

  useEffect(() => {
    const init = async () => {
      const health = await checkHealth();
      setServerHealthy(health.status === 'healthy');

      const comms = await fetchCommodities();
      if (comms.length > 0) setCommodities(comms);

      // Run default preset on load with minimum readable delay
      try {
        setIsLoading(true);
        const res = await getRecommendations(PRESET_TOMATO);
        setTimeout(() => {
          setResults(res);
          setIsLoading(false);
        }, 550);
      } catch {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const handleFormChange = (updates: Partial<FoodFormState>) => {
    setFormState((prev) => {
      if (updates.commodity_id) setActivePreset(updates.commodity_id);
      else setActivePreset(null);
      return { ...prev, ...updates };
    });
  };

  const handleSelectPreset = async (preset: FoodFormState) => {
    setFormState(preset);
    setActivePreset(preset.commodity_id);
    setError(null);
    setIsLoading(true);

    const t0 = Date.now();
    try {
      const res = await getRecommendations(preset);
      const elapsed = Date.now() - t0;
      const delay = Math.max(0, 550 - elapsed);
      setTimeout(() => {
        setResults(res);
        setIsLoading(false);
      }, delay);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Failed to calculate recommendations');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);

    const t0 = Date.now();
    try {
      const res = await getRecommendations(formState);
      const elapsed = Date.now() - t0;
      const delay = Math.max(0, 550 - elapsed);
      setTimeout(() => {
        setResults(res);
        setIsLoading(false);
      }, delay);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Failed to calculate recommendations');
    }
  };

  // Partition recommendations into passing / compliant vs did not meet requirements
  const passingRecommendations = results?.recommendations.filter(
    (r) => r.fit_score >= 40 && r.fit_status !== 'Unsuitable' && r.fit_status !== 'fail'
  ) ?? [];

  const failingRecommendations = results?.recommendations.filter(
    (r) => r.fit_score < 40 || r.fit_status === 'Unsuitable' || r.fit_status === 'fail'
  ) ?? [];

  return (
    <div className="min-h-screen flex flex-col bg-paper">
      <Header serverHealthy={serverHealthy} />

      <main className="flex-1 max-w-[1240px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error notification */}
        {error && (
          <div
            className="card mb-6 p-4 border-ink flex items-start gap-3 text-xs text-ink"
            role="alert"
          >
            <AlertCircle className="w-4 h-4 text-ink flex-shrink-0 mt-0.5" aria-hidden="true" />
            <div>
              <span className="label text-ink block mb-0.5">Evaluation Error</span>
              <p className="text-ink-2">{error}</p>
            </div>
          </div>
        )}

        {/* Reference cases */}
        <PresetBar onSelectPreset={handleSelectPreset} activePreset={activePreset} />

        {/* Main 12-column layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Form (Sticky on desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <FoodForm
              formState={formState}
              onChange={handleFormChange}
              commodities={commodities}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Calculations & Results */}
          <div className="lg:col-span-7 space-y-6">
            {isLoading ? (
              <EngineStepper />
            ) : results ? (
              <div className="space-y-6">
                {/* Derived requirements strip */}
                <RequirementStrip
                  requirements={results.requirements_derived}
                  isProduce={results.is_produce}
                />

                {/* Hero Gas exchange schematic (Fig. 1) — produce only */}
                {results.is_produce && (
                  <BreathingPackDiagram
                    targetOtr={results.requirements_derived.target_otr_ml_m2_day_atm}
                    rO2={results.requirements_derived.r_o2_at_storage_temp}
                    tempC={results.requirements_derived.storage_temp_c}
                  />
                )}

                {/* Results Section Header */}
                <div className="flex items-baseline justify-between pb-2 border-b border-rule">
                  <div>
                    <h3 className="font-serif text-xl font-medium text-ink tracking-tight">
                      Recommended Packaging Substrates
                    </h3>
                    <p className="text-xs text-mute mt-0.5">
                      Screened against equilibrium transmission equations and certified substrate limits
                    </p>
                  </div>
                  <span className="font-mono text-xs text-mute">
                    {passingRecommendations.length} viable of {results.total_candidates_evaluated || results.recommendations.length}
                  </span>
                </div>

                {/* Passing Result Cards */}
                <div className="space-y-4">
                  {passingRecommendations.map((rec, idx) => (
                    <ResultCard
                      key={rec.material_id}
                      rank={idx + 1}
                      recommendation={rec}
                    />
                  ))}
                </div>

                {/* Failing / Unmet Requirements Section */}
                {failingRecommendations.length > 0 && (
                  <div className="pt-6 border-t border-rule space-y-4">
                    <div className="flex items-baseline justify-between">
                      <div>
                        <h4 className="font-serif text-base font-medium text-mute tracking-tight">
                          Did Not Meet Requirements
                        </h4>
                        <p className="text-xs text-mute/80">
                          Substrates violating hard barrier limits (excessive OTR/WVTR or insufficient gas permeability)
                        </p>
                      </div>
                      <span className="font-mono text-xs text-mute">
                        {failingRecommendations.length} excluded
                      </span>
                    </div>

                    <div className="space-y-3 opacity-80">
                      {failingRecommendations.map((rec, idx) => (
                        <ResultCard
                          key={rec.material_id}
                          rank={passingRecommendations.length + idx + 1}
                          recommendation={rec}
                          isFailing={true}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ) : (
              /* Empty state */
              <div className="card p-12 text-center space-y-3">
                <div className="flex justify-center" aria-hidden="true">
                  <SpecimenTrayIllustration className="w-16 h-16" />
                </div>
                <h4 className="font-serif text-lg font-medium text-ink tracking-tight">
                  Awaiting Specimen Input
                </h4>
                <p className="text-xs text-mute max-w-sm mx-auto leading-relaxed">
                  Select a standard reference case above or customize chemical and physical properties on the left to compute transmission targets.
                </p>
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};
