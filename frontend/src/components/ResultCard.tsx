import React, { useState } from 'react';
import { Recommendation } from '../lib/types';
import {
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Leaf,
  Recycle,
  BookOpen,
} from 'lucide-react';
import { FilmLayerStack } from './Illustrations';

interface ResultCardProps {
  rank: number;
  recommendation: Recommendation;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  rank,
  recommendation,
}) => {
  const [showExplanation, setShowExplanation] = useState(rank === 1);

  // FitBar color based on score thresholds: >70 green, 40-70 sun, <40 tomato
  const getBarColor = (score: number) => {
    if (score >= 70) return 'bg-green';
    if (score >= 40) return 'bg-sun';
    return 'bg-tomato';
  };

  const getRankBadgeColor = (r: number) => {
    if (r === 1) return 'bg-sun';
    if (r === 2) return 'bg-sky';
    return 'bg-lilac';
  };

  return (
    <div className="brutal-card p-5 sm:p-6 bg-card border-3 border-ink rounded-brutal shadow-brutal mb-5 transition-all reveal">
      {/* Top Header Row with Rank Sticker */}
      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 border-b-3 border-ink pb-4">
        <div className="flex items-start space-x-3.5">
          {/* Rank Sticker */}
          <div
            className={`w-11 h-11 rounded-full ${getRankBadgeColor(
              rank
            )} border-3 border-ink shadow-brutal-sm flex items-center justify-center font-extrabold text-ink text-base -rotate-6 flex-shrink-0`}
          >
            #{rank}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-2">
              <h4 className="text-lg sm:text-xl font-extrabold text-ink">
                {recommendation.material_name}
              </h4>

              {/* Eco & Data Tags */}
              {recommendation.biodegradable && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-extrabold bg-green text-ink px-2 py-0.5 rounded border-2 border-ink shadow-brutal-sm">
                  <Leaf className="w-3 h-3 text-ink" />
                  <span>Compostable</span>
                </span>
              )}
              {recommendation.recyclable && (
                <span className="inline-flex items-center space-x-1 text-[11px] font-extrabold bg-sky text-ink px-2 py-0.5 rounded border-2 border-ink shadow-brutal-sm">
                  <Recycle className="w-3 h-3 text-ink" />
                  <span>Recyclable</span>
                </span>
              )}
              <span
                className={`text-[11px] font-mono font-bold px-2 py-0.5 rounded border-2 border-ink shadow-brutal-sm ${
                  recommendation.estimated ? 'bg-sun text-ink' : 'bg-paper text-ink'
                }`}
              >
                {recommendation.estimated ? 'Data: Estimated' : 'Data: Sourced'}
              </span>
            </div>

            <p className="text-xs text-ink/80 font-medium mt-1">
              {recommendation.mechanical_strength} • {recommendation.seal_type}
            </p>
          </div>
        </div>

        {/* Fit Score & Status */}
        <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1">
          <span className="text-xs font-extrabold text-ink font-mono bg-paper px-2.5 py-1 rounded border-2 border-ink shadow-brutal-sm">
            {recommendation.fit_status}
          </span>
        </div>
      </div>

      {/* Visual Film Layer Stack */}
      <FilmLayerStack structure={recommendation.structure} />

      {/* FitBar with text label directly on track */}
      <div className="my-3">
        <div className="flex justify-between items-center text-xs font-extrabold text-ink uppercase tracking-wider mb-1">
          <span>Barrier Compliance Fit:</span>
          <span className="font-mono">{recommendation.fit_score}% FIT</span>
        </div>
        <div className="w-full h-5 bg-paper rounded-full border-3 border-ink overflow-hidden relative shadow-brutal-sm">
          <div
            className={`h-full border-r-3 border-ink transition-all duration-500 flex items-center justify-end pr-2 text-[10px] font-extrabold font-mono text-ink ${getBarColor(
              recommendation.fit_score
            )}`}
            style={{ width: `${Math.max(12, recommendation.fit_score)}%` }}
          >
            {recommendation.fit_score}%
          </div>
        </div>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3 text-xs">
        <div className="bg-paper p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm">
          <span className="text-[10px] font-extrabold uppercase text-ink/80 block">
            Oxygen Trans. (OTR)
          </span>
          <span className="font-mono font-extrabold text-sm text-ink block">
            {recommendation.offered_otr.toLocaleString()}
          </span>
          <span className="text-[9px] text-ink/70 font-mono">mL/m²·day·atm</span>
        </div>

        <div className="bg-paper p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm">
          <span className="text-[10px] font-extrabold uppercase text-ink/80 block">
            Water Vapour (WVTR)
          </span>
          <span className="font-mono font-extrabold text-sm text-ink block">
            {recommendation.offered_wvtr.toLocaleString()}
          </span>
          <span className="text-[9px] text-ink/70 font-mono">g/m²·day</span>
        </div>

        <div className="bg-paper p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm">
          <span className="text-[10px] font-extrabold uppercase text-ink/80 block">
            Thickness Range
          </span>
          <span className="font-mono font-extrabold text-sm text-ink block">
            {recommendation.thickness_range_um}
          </span>
          <span className="text-[9px] text-ink/70 font-mono">gauge</span>
        </div>

        <div className="bg-paper p-2.5 rounded-lg border-2 border-ink shadow-brutal-sm">
          <span className="text-[10px] font-extrabold uppercase text-ink/80 block">
            Cost & Substrate
          </span>
          <span className="font-extrabold text-sm text-ink block truncate">
            {recommendation.cost_tier} Cost
          </span>
          <span className="text-[9px] text-ink/70 font-mono">
            {recommendation.breathable ? 'Breathable MAP' : 'Barrier Laminate'}
          </span>
        </div>
      </div>

      {/* Accordion Toggle */}
      <div className="pt-2 flex items-center justify-between border-t-2 border-ink">
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="brutal-btn px-3 py-1 text-xs flex items-center space-x-1.5 bg-paper hover:bg-sun"
        >
          <HelpCircle className="w-3.5 h-3.5 text-ink" />
          <span>{showExplanation ? 'Hide Reasoning' : 'Why this material?'}</span>
          {showExplanation ? (
            <ChevronUp className="w-3.5 h-3.5 text-ink" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5 text-ink" />
          )}
        </button>

        {recommendation.source?.url && (
          <a
            href={recommendation.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center space-x-1 text-xs font-bold text-ink underline hover:text-sky transition-colors"
          >
            <span>Source Reference</span>
            <ExternalLink className="w-3 h-3 text-ink" />
          </a>
        )}
      </div>

      {/* Expandable Explanation Panel */}
      {showExplanation && (
        <div className="mt-3 p-4 bg-paper rounded-xl border-2 border-ink text-xs space-y-3 shadow-brutal-sm">
          {recommendation.explanation?.summary && (
            <div className="p-3 bg-card rounded-lg border-2 border-ink">
              <span className="font-extrabold text-ink uppercase tracking-wide block mb-1">
                Plain-Language Engineering Rationale:
              </span>
              <p className="text-ink leading-relaxed font-medium">
                {recommendation.explanation.summary}
              </p>
            </div>
          )}

          {/* Triggered Rules */}
          {recommendation.explanation?.rules_fired &&
            recommendation.explanation.rules_fired.length > 0 && (
              <div className="space-y-1.5">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-ink block">
                  Active Decision Rules:
                </span>
                {recommendation.explanation.rules_fired.map((rule) => (
                  <div
                    key={rule.rule_id}
                    className="p-2.5 bg-card rounded-lg border-2 border-ink text-xs"
                  >
                    <div className="font-extrabold text-ink flex items-center space-x-1.5">
                      <span className="w-2 h-2 rounded-full bg-green border border-ink" />
                      <span>{rule.name}</span>
                    </div>
                    <p className="text-ink/80 font-medium mt-0.5">{rule.rationale}</p>
                  </div>
                ))}
              </div>
            )}

          {/* Citation */}
          {recommendation.source && (
            <div className="flex items-start space-x-2 text-[11px] text-ink font-semibold pt-1 border-t-2 border-ink">
              <BookOpen className="w-3.5 h-3.5 text-ink flex-shrink-0 mt-0.5" />
              <div>
                <span>Literature Citation: </span>
                <span className="text-ink/80">{recommendation.source.title}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
