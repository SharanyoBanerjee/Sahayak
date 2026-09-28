import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PresetBar } from './components/PresetBar';
import { FoodForm } from './components/FoodForm';
import { RequirementStrip } from './components/RequirementStrip';
import { ResultCard } from './components/ResultCard';
import { EngineStepper } from './components/EngineStepper';
import { BreathingPackDiagram } from './components/Illustrations';
import { Footer } from './components/Footer';
import {
  Commodity,
  FoodFormState,
  RecommendResponse,
} from './lib/types';
import { PRESET_TOMATO } from './lib/presets';
import { fetchCommodities, getRecommendations, checkHealth } from './lib/api';
import { AlertTriangle, Layers } from 'lucide-react';

export const App: React.FC = () => {
  const [formState, setFormState] = useState<FoodFormState>(PRESET_TOMATO);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  const [results, setResults] = useState<RecommendResponse | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [serverHealthy, setServerHealthy] = useState<boolean>(true);
  const [activePreset, setActivePreset] = useState<string | null>('CMD-001');

  // Load initial data
  useEffect(() => {
    const init = async () => {
      const health = await checkHealth();
      setServerHealthy(health.status === 'healthy');

      const comms = await fetchCommodities();
      if (comms.length > 0) {
        setCommodities(comms);
      }

      // Initial run for default tomato preset
      try {
        setIsLoading(true);
        const res = await getRecommendations(PRESET_TOMATO);
        // Ensure at least 600ms display for smooth initial feel
        setTimeout(() => {
          setResults(res);
          setIsLoading(false);
        }, 600);
      } catch (err: any) {
        setIsLoading(false);
        console.warn('Initial calculation error:', err);
      }
    };

    init();
  }, []);

  const handleFormChange = (updates: Partial<FoodFormState>) => {
    setFormState((prev) => {
      const next = { ...prev, ...updates };
      if (updates.commodity_id) {
        setActivePreset(updates.commodity_id);
      } else {
        setActivePreset(null);
      }
      return next;
    });
  };

  const handleSelectPreset = async (preset: FoodFormState) => {
    setFormState(preset);
    setActivePreset(preset.commodity_id);
    setError(null);
    setIsLoading(true);

    const startTime = Date.now();
    try {
      const res = await getRecommendations(preset);
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 650 - elapsed);
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

    const startTime = Date.now();
    try {
      const res = await getRecommendations(formState);
      const elapsed = Date.now() - startTime;
      const delay = Math.max(0, 650 - elapsed);
      setTimeout(() => {
        setResults(res);
        setIsLoading(false);
      }, delay);
    } catch (err: any) {
      setIsLoading(false);
      setError(err.message || 'Failed to calculate recommendations');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-paper relative overflow-x-hidden">
      {/* Parallax Decorative Stickers in Background */}
      <div className="absolute top-28 left-4 w-8 h-8 rounded-full bg-sun border-2 border-ink opacity-40 -rotate-12 pointer-events-none hidden xl:block" />
      <div className="absolute top-96 right-6 w-10 h-10 bg-lilac rounded-lg border-2 border-ink opacity-40 rotate-12 pointer-events-none hidden xl:block" />
      <div className="absolute bottom-40 left-8 w-12 h-12 bg-sky rounded-full border-2 border-ink opacity-30 pointer-events-none hidden xl:block" />

      <Header serverHealthy={serverHealthy} />

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 z-10">
        {/* Error Alert */}
        {error && (
          <div className="mb-6 p-4 bg-tomato text-ink border-3 border-ink rounded-brutal shadow-brutal flex items-start space-x-3 text-sm font-extrabold">
            <AlertTriangle className="w-6 h-6 text-ink flex-shrink-0 mt-0.5" />
            <div>
              <span className="block text-base">Error Notice:</span>
              <p className="font-semibold text-xs mt-0.5">{error}</p>
            </div>
          </div>
        )}

        {/* Instant Demo Presets Bar */}
        <PresetBar onSelectPreset={handleSelectPreset} activePreset={activePreset} />

        {/* Main 2-Column Neo-Brutalist Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Food Parameters Form (Sticky on Desktop) */}
          <div className="lg:col-span-5 lg:sticky lg:top-20">
            <FoodForm
              formState={formState}
              onChange={handleFormChange}
              commodities={commodities}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Engine Targets & Recommendations */}
          <div className="lg:col-span-7 space-y-6">
            {isLoading ? (
              <EngineStepper />
            ) : results ? (
              <div className="space-y-6">
                {/* Derived Barrier Requirement Strip (Sticky under header) */}
                <RequirementStrip
                  requirements={results.requirements_derived}
                  isProduce={results.is_produce}
                />

                {/* Hero Breathing Pack Diagram (Shown for produce cases) */}
                {results.is_produce && (
                  <BreathingPackDiagram
                    targetOtr={results.requirements_derived.target_otr_ml_m2_day_atm}
                    rO2={results.requirements_derived.r_o2_at_storage_temp}
                    tempC={results.requirements_derived.storage_temp_c}
                  />
                )}

                {/* Recommendations Section Header */}
                <div className="flex items-center justify-between border-b-3 border-ink pb-2">
                  <div>
                    <h3 className="text-xl font-extrabold text-ink tracking-tight">
                      Recommended Packaging Substrates
                    </h3>
                    <p className="text-xs text-ink font-semibold">
                      Ranked by barrier matching, mechanical protection, and seal integrity
                    </p>
                  </div>
                  <span className="bg-sun text-ink font-mono font-bold text-xs px-3 py-1 rounded-lg border-2 border-ink shadow-brutal-sm">
                    TOP {results.recommendations.length} MATCHES
                  </span>
                </div>

                {/* Result Cards */}
                <div>
                  {results.recommendations.map((rec, index) => (
                    <ResultCard
                      key={rec.material_id}
                      rank={index + 1}
                      recommendation={rec}
                    />
                  ))}
                </div>
              </div>
            ) : (
              <div className="brutal-card p-10 bg-card border-3 border-ink rounded-brutal shadow-brutal text-center space-y-3">
                <Layers className="w-12 h-12 text-ink mx-auto" />
                <h4 className="text-lg font-extrabold text-ink">
                  Ready to Calculate
                </h4>
                <p className="text-xs text-ink/80 font-medium max-w-md mx-auto">
                  Pick a commodity on the left or select one of the demo presets above to see the packaging recommendations.
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
