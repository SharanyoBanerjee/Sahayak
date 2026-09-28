import React, { useState } from 'react';
import { Recommendation } from '../lib/types';
import {
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Check,
  AlertCircle,
  X,
  BookOpen,
} from 'lucide-react';
import { FilmLayerStack } from './Illustrations';

interface ResultCardProps {
  rank: number;
  recommendation: Recommendation;
  isFailing?: boolean;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  rank,
  recommendation,
  isFailing = false,
}) => {
  const [showExplanation, setShowExplanation] = useState(rank === 1 && !isFailing);

  const isPass = recommendation.fit_score >= 70 && !isFailing;
  const isMarginal = recommendation.fit_score >= 40 && recommendation.fit_score < 70 && !isFailing;

  const fitFillClass = isPass
    ? 'fit-fill--pass'
    : isMarginal
    ? 'fit-fill--marginal'
    : '';

  const fitStatusText = isPass
    ? 'Meets targets'
    : isMarginal
    ? 'Partial fit'
    : 'Fails limit';

  const FitIcon = isPass ? Check : isMarginal ? AlertCircle : X;

  const fitIconColor = isPass ? 'text-accent' : isMarginal ? 'text-[#B87333]' : 'text-red-600';

  return (
    <div
      className={`card card--interactive ${
        rank === 1 && !isFailing ? 'card--framed' : ''
      } mb-4 reveal in`}
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2 pb-3 border-b border-rule">
        <div className="flex items-baseline gap-3">
          {/* Rank marker */}
          <span className="font-serif italic text-base text-ink flex-shrink-0">
            {isFailing ? '—' : `No. ${rank}`}
          </span>

          <div>
            <h4 className="font-serif text-lg text-ink">
              {recommendation.material_name}
            </h4>
            <p className="text-xs text-mute font-mono mt-0.5">
              {recommendation.thickness_range_um} · {recommendation.seal_type}
            </p>
          </div>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-1.5 flex-wrap">
          {recommendation.biodegradable && (
            <span className="badge badge--outline">
              Compostable
            </span>
          )}
          {recommendation.recyclable && (
            <span className="badge badge--outline">
              Recyclable
            </span>
          )}
          <span
            className={`badge ${
              recommendation.estimated ? 'badge--estimated' : 'badge--sourced'
            }`}
          >
            {recommendation.estimated ? 'Estimated' : 'Sourced'}
          </span>
        </div>
      </div>

      {/* Body Content */}
      <div className="pt-4 space-y-4">
        {/* Film Layer Cross-Section */}
        <FilmLayerStack structure={recommendation.structure} />

        {/* Fit Indicator */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-xs">
            <div className="flex items-center gap-1.5">
              <FitIcon className={`w-3.5 h-3.5 ${fitIconColor}`} strokeWidth={2} aria-hidden="true" />
              <span className="text-[11px] font-semibold text-ink-2">{fitStatusText}</span>
            </div>
            <span className="font-mono text-xs font-medium text-ink">
              {recommendation.fit_score}% Compliance
            </span>
          </div>

          <div className="fit-track" role="progressbar" aria-valuenow={recommendation.fit_score} aria-valuemin={0} aria-valuemax={100}>
            <div
              className={fitFillClass}
              style={{ width: `${Math.max(0, Math.min(100, recommendation.fit_score))}%` }}
            />
          </div>
        </div>

        {/* Specs Table / Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div className="bg-paper rounded-lg p-3">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-accent block">Offered OTR</span>
            <span className="font-mono font-medium text-ink block mt-1">
              {recommendation.offered_otr.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono text-mute">mL / m²·d·atm</span>
          </div>
          <div className="bg-paper rounded-lg p-3">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-accent block">Offered WVTR</span>
            <span className="font-mono font-medium text-ink block mt-1">
              {recommendation.offered_wvtr.toLocaleString()}
            </span>
            <span className="text-[10px] font-mono text-mute">g / m²·day</span>
          </div>
          <div className="bg-paper rounded-lg p-3">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-accent block">Mechanical Integrity</span>
            <span className="font-mono font-medium text-ink block mt-1">
              {recommendation.mechanical_strength}
            </span>
            <span className="text-[10px] font-mono text-mute">{recommendation.cost_tier} cost</span>
          </div>
          <div className="bg-paper rounded-lg p-3">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-accent block">Substrate Type</span>
            <span className="font-mono font-medium text-ink block mt-1 truncate">
              {recommendation.breathable ? 'Breathable Film' : 'Barrier Laminate'}
            </span>
            <span className="text-[10px] font-mono text-mute">{recommendation.seal_type}</span>
          </div>
        </div>

        {/* Accordion Toggle */}
        <div className="flex items-center justify-between pt-1 border-t border-rule/60">
          <button
            type="button"
            onClick={() => setShowExplanation(!showExplanation)}
            className="btn-secondary text-xs"
          >
            <span>{showExplanation ? 'Hide engineering rationale' : 'Why this material?'}</span>
            {showExplanation ? (
              <ChevronUp className="w-3.5 h-3.5" aria-hidden="true" />
            ) : (
              <ChevronDown className="w-3.5 h-3.5" aria-hidden="true" />
            )}
          </button>

          {recommendation.source?.url && (
            <a
              href={recommendation.source.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-accent hover:text-ink flex items-center gap-1 font-mono underline underline-offset-2"
            >
              <span>Citation</span>
              <ExternalLink className="w-3 h-3" aria-hidden="true" />
            </a>
          )}
        </div>

        {/* Accordion Body */}
        {showExplanation && (
          <div className="border border-rule rounded-lg p-4 space-y-3 bg-paper text-xs">
            {recommendation.explanation?.summary && (
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent block mb-1">Engineering Rationale</span>
                <p className="text-ink-2 leading-relaxed font-normal">
                  {recommendation.explanation.summary}
                </p>
              </div>
            )}

            {recommendation.explanation?.rules_fired && recommendation.explanation.rules_fired.length > 0 && (
              <div>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-accent block mb-1.5">Governing Rules Fired</span>
                <div className="space-y-1.5">
                  {recommendation.explanation.rules_fired.map((rule) => (
                    <div
                      key={rule.rule_id}
                      className="border border-rule rounded-lg px-3 py-2 bg-white text-xs"
                    >
                      <div className="flex items-baseline justify-between font-mono font-medium text-ink">
                        <span>{rule.name}</span>
                        <span className="text-[10px] text-mute font-normal">[{rule.rule_id}]</span>
                      </div>
                      <p className="text-ink-2 text-[11px] mt-0.5 leading-snug">{rule.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {recommendation.source && (
              <div className="flex items-start gap-2 pt-2 border-t border-rule text-[11px] text-mute">
                <BookOpen className="w-3.5 h-3.5 text-accent flex-shrink-0 mt-0.5" aria-hidden="true" />
                <span>Source: {recommendation.source.title}</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
