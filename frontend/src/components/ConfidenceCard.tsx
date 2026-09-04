import React from 'react';
import { ShieldAlert, Info } from 'lucide-react';

interface ConfidenceCardProps {
  confidence: number;
  confidenceLevel: 'High' | 'Moderate' | 'Low' | string;
  warning?: string | null;
}

export const ConfidenceCard: React.FC<ConfidenceCardProps> = ({
  confidence,
  confidenceLevel,
  warning,
}) => {
  const getBadgeStyle = () => {
    if (confidence >= 80) return 'bg-emerald-100 text-emerald-800 border-emerald-300';
    if (confidence >= 60) return 'bg-amber-100 text-amber-800 border-amber-300';
    return 'bg-rose-100 text-rose-800 border-rose-300';
  };

  const getBarColor = () => {
    if (confidence >= 80) return 'bg-gradient-to-r from-emerald-500 to-green-500';
    if (confidence >= 60) return 'bg-gradient-to-r from-amber-400 to-amber-500';
    return 'bg-gradient-to-r from-rose-400 to-rose-500';
  };

  return (
    <div className="bg-sky-50/60 border border-sky-100 rounded-2xl p-5 space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Model Confidence</span>
          <span className="group relative cursor-pointer">
            <Info className="w-3.5 h-3.5 text-slate-400" />
            <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 bottom-full mb-1 hidden w-48 rounded bg-slate-800 p-2 text-[10px] text-white group-hover:block shadow-lg z-30">
              Confidence score represents prediction probability for this specific image, distinct from overall model benchmark accuracy.
            </span>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-2xl font-extrabold text-slate-800 font-mono">{confidence.toFixed(1)}%</span>
          <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full border ${getBadgeStyle()}`}>
            {confidenceLevel} Confidence
          </span>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full bg-slate-200 h-3 rounded-full overflow-hidden p-0.5 border border-slate-300/40">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${getBarColor()}`}
          style={{ width: `${Math.min(100, Math.max(0, confidence))}%` }}
        />
      </div>

      {/* Warning Notice if low confidence */}
      {warning && (
        <div className="flex items-start space-x-2 bg-amber-50 border border-amber-200 p-3 rounded-xl text-xs text-amber-800">
          <ShieldAlert className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <span>{warning}</span>
        </div>
      )}
    </div>
  );
};
