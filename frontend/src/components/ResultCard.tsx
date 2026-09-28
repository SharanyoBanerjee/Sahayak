import React, { useState } from 'react';
import { Recommendation } from '../lib/types';
import {
  Layers,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  Leaf,
  Recycle,
  Shield,
  BookOpen,
} from 'lucide-react';

interface ResultCardProps {
  rank: number;
  recommendation: Recommendation;
}

export const ResultCard: React.FC<ResultCardProps> = ({
  rank,
  recommendation,
}) => {
  const [showExplanation, setShowExplanation] = useState(rank === 1);

  const getScoreColor = (score: number) => {
    if (score >= 70) return 'text-emerald-700 bg-emerald-50 border-emerald-300';
    if (score >= 40) return 'text-amber-700 bg-amber-50 border-amber-300';
    return 'text-rose-700 bg-rose-50 border-rose-300';
  };

  const getBarColor = (score: number) => {
    if (score >= 70) return 'bg-emerald-600';
    if (score >= 40) return 'bg-amber-500';
    return 'bg-rose-500';
  };

  return (
    <div className="bg-surface rounded-xl border border-gray-200 shadow-sm overflow-hidden transition-all hover:shadow-md mb-4">
      {/* Top Banner / Rank & Title */}
      <div className="p-5 border-b border-gray-100">
        <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
          <div className="flex items-start space-x-3">
            <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/10 text-primary font-bold flex items-center justify-center text-sm border border-primary/20">
              #{rank}
            </span>
            <div>
              <div className="flex flex-wrap items-center gap-2">
                <h4 className="text-base font-bold text-primary-dark">
                  {recommendation.material_name}
                </h4>
                {/* Badges */}
                {recommendation.biodegradable && (
                  <span className="inline-flex items-center space-x-1 text-[11px] font-medium bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200">
                    <Leaf className="w-3 h-3" />
                    <span>Compostable</span>
                  </span>
                )}
                {recommendation.recyclable && (
                  <span className="inline-flex items-center space-x-1 text-[11px] font-medium bg-blue-50 text-blue-700 px-2 py-0.5 rounded border border-blue-200">
                    <Recycle className="w-3 h-3" />
                    <span>Recyclable</span>
                  </span>
                )}
                <span
                  className={`text-[11px] font-medium px-2 py-0.5 rounded border ${
                    recommendation.estimated
                      ? 'bg-amber-50 text-amber-800 border-amber-200'
                      : 'bg-emerald-50 text-emerald-800 border-emerald-200'
                  }`}
                >
                  {recommendation.estimated ? 'Data: Estimated' : 'Data: Sourced'}
                </span>
              </div>
              <p className="text-xs text-muted mt-1 font-mono flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-muted flex-shrink-0" />
                <span>Structure: {recommendation.structure}</span>
              </p>
            </div>
          </div>

          {/* Fit Score Badge */}
          <div className="flex sm:flex-col items-end justify-between sm:justify-start gap-1">
            <div
              className={`flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border ${getScoreColor(
                recommendation.fit_score
              )}`}
            >
              {recommendation.fit_score >= 70 ? (
                <CheckCircle2 className="w-3.5 h-3.5" />
              ) : (
                <AlertCircle className="w-3.5 h-3.5" />
              )}
              <span>Fit Score: {recommendation.fit_score}%</span>
            </div>
            <span className="text-[11px] text-muted font-medium text-right">
              {recommendation.fit_status}
            </span>
          </div>
        </div>

        {/* Visual Fit Progress Bar */}
        <div className="w-full bg-gray-100 rounded-full h-2 mt-3 overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-500 ${getBarColor(
              recommendation.fit_score
            )}`}
            style={{ width: `${recommendation.fit_score}%` }}
          />
        </div>
      </div>

      {/* Barrier & Physical Specs Grid */}
      <div className="px-5 py-4 bg-gray-50/50 border-b border-gray-100">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          {/* OTR Spec */}
          <div className="bg-surface p-2.5 rounded-lg border border-gray-200">
            <span className="text-muted block text-[11px]">Oxygen Transmission (OTR)</span>
            <span className="font-mono font-bold text-sm text-body">
              {recommendation.offered_otr.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted block">mL/m²·day·atm</span>
          </div>

          {/* WVTR Spec */}
          <div className="bg-surface p-2.5 rounded-lg border border-gray-200">
            <span className="text-muted block text-[11px]">Water Vapour (WVTR)</span>
            <span className="font-mono font-bold text-sm text-body">
              {recommendation.offered_wvtr.toLocaleString()}
            </span>
            <span className="text-[10px] text-muted block">g/m²·day</span>
          </div>

          {/* Thickness Range */}
          <div className="bg-surface p-2.5 rounded-lg border border-gray-200">
            <span className="text-muted block text-[11px]">Thickness Range</span>
            <span className="font-mono font-bold text-sm text-body">
              {recommendation.thickness_range_um}
            </span>
            <span className="text-[10px] text-muted block">nominal gauge</span>
          </div>

          {/* Cost & Mechanical */}
          <div className="bg-surface p-2.5 rounded-lg border border-gray-200">
            <span className="text-muted block text-[11px]">Cost Tier & Seal</span>
            <span className="font-semibold text-body block truncate">
              {recommendation.cost_tier} Cost
            </span>
            <span className="text-[10px] text-muted block truncate">
              {recommendation.seal_type}
            </span>
          </div>
        </div>
      </div>

      {/* Accordion Toggle for Explanation */}
      <div className="px-5 py-2.5 bg-surface flex items-center justify-between">
        <button
          type="button"
          onClick={() => setShowExplanation(!showExplanation)}
          className="flex items-center space-x-1.5 text-xs font-semibold text-primary hover:text-primary-dark transition-colors"
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>{showExplanation ? 'Hide Reasoning & Source' : 'Why this packaging was selected?'}</span>
          {showExplanation ? (
            <ChevronUp className="w-3.5 h-3.5" />
          ) : (
            <ChevronDown className="w-3.5 h-3.5" />
          )}
        </button>

        {recommendation.source?.url && (
          <a
            href={recommendation.source.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center space-x-1 text-xs text-info hover:underline"
          >
            <span>Literature Ref</span>
            <ExternalLink className="w-3 h-3" />
          </a>
        )}
      </div>

      {/* Expandable Explanation Panel */}
      {showExplanation && (
        <div className="p-5 bg-page border-t border-gray-200 text-xs space-y-3">
          {/* Plain Language Summary */}
          {recommendation.explanation?.summary && (
            <div className="bg-surface p-3 rounded-lg border border-gray-200">
              <span className="font-semibold text-primary-dark block mb-1">
                Plain-Language Engineering Rationale:
              </span>
              <p className="text-body leading-relaxed">
                {recommendation.explanation.summary}
              </p>
            </div>
          )}

          {/* Triggered Rules */}
          {recommendation.explanation?.rules_fired &&
            recommendation.explanation.rules_fired.length > 0 && (
              <div>
                <span className="font-semibold text-muted block mb-1.5 uppercase text-[10px] tracking-wider">
                  Active Engineering Rules Applied:
                </span>
                <div className="space-y-1.5">
                  {recommendation.explanation.rules_fired.map((rule) => (
                    <div
                      key={rule.rule_id}
                      className="bg-surface p-2.5 rounded border border-gray-200 text-xs"
                    >
                      <div className="font-semibold text-primary-dark flex items-center space-x-1">
                        <Shield className="w-3 h-3 text-primary" />
                        <span>{rule.name}</span>
                      </div>
                      <p className="text-muted mt-0.5">{rule.rationale}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

          {/* Authoritative Citation */}
          {recommendation.source && (
            <div className="flex items-start space-x-2 text-[11px] text-muted pt-1 border-t border-gray-200">
              <BookOpen className="w-3.5 h-3.5 text-muted mt-0.5 flex-shrink-0" />
              <div>
                <span className="font-semibold text-body">Authoritative Citation: </span>
                <span>{recommendation.source.title}</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
