import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { PresetBar } from './components/PresetBar';
import { FoodForm } from './components/FoodForm';
import { RequirementStrip } from './components/RequirementStrip';
import { ResultCard } from './components/ResultCard';
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

  // Load catalog on mount
  useEffect(() => {
    const initApp = async () => {
      const health = await checkHealth();
      setServerHealthy(health.status === 'healthy');

      const comms = await fetchCommodities();
      if (comms.length > 0) {
        setCommodities(comms);
      }

      // Automatically run initial recommendation for default tomato preset
      try {
        setIsLoading(true);
        const initialRes = await getRecommendations(PRESET_TOMATO);
        setResults(initialRes);
      } catch (err: any) {
        console.warn('Initial calculation error:', err);
      } finally {
        setIsLoading(false);
      }
    };

    initApp();
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
    try {
      const res = await getRecommendations(preset);
      setResults(res);
    } catch (err: any) {
      setError(err.message || 'Failed to calculate recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsLoading(true);
    try {
      const res = await getRecommendations(formState);
      setResults(res);
    } catch (err: any) {
      setError(err.message || 'Failed to calculate recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-page">
      <Header serverHealthy={serverHealthy} />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Error Alert if any */}
        {error && (
          <div className="mb-6 p-4 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl flex items-start space-x-3 text-sm">
            <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Calculation Notice:</span>
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Instant Demo Presets Bar */}
        <PresetBar onSelectPreset={handleSelectPreset} activePreset={activePreset} />

        {/* Main 2-Column Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Food & Storage Form (5 cols on lg) */}
          <div className="lg:col-span-5">
            <FoodForm
              formState={formState}
              onChange={handleFormChange}
              commodities={commodities}
              onSubmit={handleSubmit}
              isLoading={isLoading}
            />
          </div>

          {/* Right Column: Derived Requirements & Ranked Results (7 cols on lg) */}
          <div className="lg:col-span-7">
            {isLoading ? (
              <div className="bg-surface rounded-xl p-8 border border-gray-200 shadow-sm text-center space-y-4">
                <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto" />
                <div>
                  <h4 className="font-bold text-base text-primary-dark">
                    Running Thermodynamic & Biological Engine...
                  </h4>
                  <p className="text-xs text-muted mt-1">
                    Matching moisture limits, oxidation thresholds, and respiration equilibrium.
                  </p>
                </div>
              </div>
            ) : results ? (
              <div>
                {/* Requirements Summary Strip */}
                <RequirementStrip
                  requirements={results.requirements_derived}
                  isProduce={results.is_produce}
                />

                {/* Results Header */}
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h3 className="text-base font-bold text-primary-dark">
                      Recommended Packaging Materials
                    </h3>
                    <p className="text-xs text-muted">
                      Ranked by barrier compliance and packaging suitability
                    </p>
                  </div>
                  <span className="text-xs font-semibold bg-primary/10 text-primary-dark px-2.5 py-1 rounded border border-primary/20">
                    Top {results.recommendations.length} of {results.total_candidates_evaluated} Evaluated
                  </span>
                </div>

                {/* Result Cards */}
                {results.recommendations.map((rec, index) => (
                  <ResultCard
                    key={rec.material_id}
                    rank={index + 1}
                    recommendation={rec}
                  />
                ))}
              </div>
            ) : (
              <div className="bg-surface rounded-xl p-8 border border-gray-200 text-center space-y-3">
                <Layers className="w-10 h-10 text-muted mx-auto" />
                <h4 className="font-bold text-base text-primary-dark">
                  Ready to Calculate
                </h4>
                <p className="text-xs text-muted max-w-sm mx-auto">
                  Select a food commodity on the left or click one of the demo presets above to see the packaging recommendations.
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
