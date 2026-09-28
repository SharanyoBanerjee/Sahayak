import React, { useState, useEffect } from 'react';
import { Check, Loader2 } from 'lucide-react';
import { MascotBox } from './Illustrations';

interface EngineStepperProps {
  onComplete?: () => void;
}

const STEPS = [
  'Reading your food properties',
  'Working out barrier targets',
  'Matching 8 certified packaging materials',
  'Formulating plain-language reasons',
];

export const EngineStepper: React.FC<EngineStepperProps> = ({ onComplete }) => {
  const [currentStep, setCurrentStep] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentStep((prev) => {
        if (prev < STEPS.length) {
          return prev + 1;
        }
        clearInterval(timer);
        if (onComplete) onComplete();
        return prev;
      });
    }, 180);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <div className="space-y-6">
      {/* Stepper Card */}
      <div className="brutal-card p-6 bg-card border-3 border-ink relative overflow-hidden">
        <div className="flex items-center justify-between mb-4 border-b-3 border-ink pb-3">
          <div className="flex items-center space-x-3">
            <MascotBox className="w-10 h-10" />
            <div>
              <h4 className="text-base font-extrabold text-ink">
                Sahayak Packaging Engine Active
              </h4>
              <p className="text-xs text-ink font-semibold">
                Executing thermodynamic & respiration rules...
              </p>
            </div>
          </div>
          <span className="bg-sun text-ink font-mono text-xs font-bold px-2.5 py-1 rounded border-2 border-ink shadow-brutal-sm">
            {Math.min(100, Math.round((currentStep / STEPS.length) * 100))}%
          </span>
        </div>

        {/* Steps List */}
        <div className="space-y-3">
          {STEPS.map((label, idx) => {
            const isDone = currentStep > idx;
            const isCurrent = currentStep === idx;

            return (
              <div
                key={label}
                className={`flex items-center space-x-3 p-2.5 rounded-lg border-2 border-ink transition-all ${
                  isDone
                    ? 'bg-green text-ink font-bold'
                    : isCurrent
                    ? 'bg-sun text-ink font-bold'
                    : 'bg-paper text-ink/60 opacity-60 font-medium'
                }`}
              >
                <div className="w-6 h-6 rounded-full bg-card border-2 border-ink flex items-center justify-center flex-shrink-0">
                  {isDone ? (
                    <Check className="w-3.5 h-3.5 text-ink animate-pop-check" strokeWidth={3.5} />
                  ) : isCurrent ? (
                    <Loader2 className="w-3.5 h-3.5 text-ink animate-spin" />
                  ) : (
                    <span className="text-[10px] font-mono font-bold">{idx + 1}</span>
                  )}
                </div>
                <span className="text-xs">{label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Skeleton Result Cards with sliding diagonal stripes */}
      <div className="space-y-4">
        {[1, 2].map((k) => (
          <div
            key={k}
            className="brutal-card p-5 border-3 border-ink bg-card rounded-brutal shadow-brutal space-y-3"
          >
            <div className="flex items-center justify-between">
              <div className="w-48 h-6 rounded border-2 border-ink skeleton-striped" />
              <div className="w-24 h-6 rounded-full border-2 border-ink skeleton-striped" />
            </div>
            <div className="w-full h-3 rounded-full border-2 border-ink bg-paper" />
            <div className="grid grid-cols-4 gap-2 pt-2">
              <div className="h-12 rounded border-2 border-ink skeleton-striped" />
              <div className="h-12 rounded border-2 border-ink skeleton-striped" />
              <div className="h-12 rounded border-2 border-ink skeleton-striped" />
              <div className="h-12 rounded border-2 border-ink skeleton-striped" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
