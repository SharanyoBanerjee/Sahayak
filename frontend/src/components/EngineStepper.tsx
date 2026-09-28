import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';

interface EngineStepperProps {
  onComplete?: () => void;
}

const STEPS = [
  'Reading commodity specifications & ambient conditions',
  'Deriving barrier requirement targets & equilibrium kinetics',
  'Screening certified packaging substrate library',
  'Composing engineering rationale & literature citations',
] as const;

export const EngineStepper: React.FC<EngineStepperProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length) {
          return prev + 1;
        }
        clearInterval(timer);
        onComplete?.();
        return prev;
      });
    }, 160);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="space-y-5">
      {/* Stepper Card */}
      <div className="card p-5 relative overflow-hidden">
        {/* Progress rule along top edge */}
        <div className="absolute top-0 left-0 right-0">
          <div className="progress-rule" />
        </div>

        {/* Card header */}
        <div className="card-header mb-4">
          <span className="label">Rules Engine Active</span>
          <span className="caption">Evaluating Substrates</span>
        </div>

        {/* Step list */}
        <div className="space-y-2.5">
          {STEPS.map((label, idx) => {
            const isDone    = currentStep > idx;
            const isCurrent = currentStep === idx;

            return (
              <div
                key={label}
                className={`flex items-center gap-3 px-3 py-2 border border-rule rounded text-xs transition-opacity duration-150 ${
                  isDone
                    ? 'bg-card text-ink'
                    : isCurrent
                    ? 'bg-wash/40 text-ink font-medium'
                    : 'text-mute/60 border-rule/50'
                }`}
              >
                <div
                  className="w-4 h-4 flex items-center justify-center border border-rule rounded-sm flex-shrink-0 bg-paper"
                >
                  {isDone ? (
                    <Check className="w-3 h-3 text-ink" strokeWidth={2} aria-hidden="true" />
                  ) : isCurrent ? (
                    <Loader2 className="w-2.5 h-2.5 text-ink animate-spin" aria-hidden="true" />
                  ) : (
                    <span className="font-mono text-[9px] text-mute">{idx + 1}</span>
                  )}
                </div>
                <span className="font-mono text-[11px]">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skeleton Placeholder Cards */}
      <div className="space-y-4">
        {[1, 2].map((k) => (
          <div key={k} className="card p-5 space-y-4 border-rule">
            <div className="flex justify-between items-center pb-3 border-b border-rule">
              <div className="w-48 h-4 placeholder-bar" />
              <div className="w-20 h-4 placeholder-bar" />
            </div>
            <div className="h-2 w-full placeholder-bar" />
            <div className="grid grid-cols-4 gap-2">
              {[1, 2, 3, 4].map((j) => (
                <div key={j} className="h-12 placeholder-bar" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
