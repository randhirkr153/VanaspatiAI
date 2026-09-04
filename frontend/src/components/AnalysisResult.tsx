import React, { useState } from 'react';
import { PredictResponse } from '../types/prediction';
import { ConfidenceCard } from './ConfidenceCard';
import { AdviceCard } from './AdviceCard';
import { Leaf, ChevronDown, ChevronUp, AlertCircle, Bot } from 'lucide-react';

interface AnalysisResultProps {
  data: PredictResponse | null;
  onOpenChatWithContext?: () => void;
}

export const AnalysisResult: React.FC<AnalysisResultProps> = ({ data, onOpenChatWithContext }) => {
  const [showAlternatives, setShowAlternatives] = useState(false);

  if (!data) {
    return (
      <div className="h-full min-h-[400px] flex flex-col items-center justify-center p-8 bg-white border border-emerald-900/10 rounded-3xl text-center space-y-4 shadow-sm">
        <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
          <Leaf className="w-8 h-8 opacity-60" />
        </div>
        <div className="space-y-1 max-w-sm">
          <h3 className="text-lg font-bold text-forest">Analysis Result</h3>
          <p className="text-xs text-slate-500">
            Upload a clear plant leaf photo on the left and click "Detect Disease" to generate your comprehensive AI report.
          </p>
        </div>
      </div>
    );
  }

  const { prediction, alternatives, report, warning } = data;
  const isHealthy = prediction.disease.toLowerCase() === 'healthy';

  return (
    <div className="bg-white border border-emerald-900/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="text-xl font-bold text-forest">Analysis Result</h3>
          <p className="text-xs text-slate-500">AI-powered pathology breakdown</p>
        </div>
        
        {onOpenChatWithContext && (
          <button
            onClick={onOpenChatWithContext}
            className="inline-flex items-center space-x-1.5 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-semibold px-3 py-1.5 rounded-xl shadow-sm transition-colors"
          >
            <Bot className="w-3.5 h-3.5" />
            <span>Ask AI Assistant</span>
          </button>
        )}
      </div>

      {/* Disease Identified Card */}
      <div className={`p-5 rounded-2xl border transition-all ${
        isHealthy
          ? 'bg-emerald-50/90 border-emerald-200 text-emerald-950'
          : 'bg-emerald-50/60 border-emerald-200/90 text-emerald-950'
      }`}>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-700">
              Condition Identified
            </span>
            <h2 className="text-2xl font-extrabold text-forest">
              {prediction.plant} — <span className={isHealthy ? 'text-emerald-700' : 'text-emerald-800'}>{prediction.disease}</span>
            </h2>
            <p className="text-xs text-slate-600 leading-relaxed pt-1">
              {report.description}
            </p>
          </div>

          <span className={`text-xs font-bold px-3 py-1 rounded-full border whitespace-nowrap ${
            isHealthy
              ? 'bg-emerald-200 text-emerald-800 border-emerald-400'
              : 'bg-amber-100 text-amber-900 border-amber-300'
          }`}>
            Severity: {report.severity}
          </span>
        </div>
      </div>

      {/* Confidence Score Card */}
      <ConfidenceCard
        confidence={prediction.confidence}
        confidenceLevel={prediction.confidence_level}
        warning={warning}
      />

      {/* Symptoms, Care Guidance, and Prevention */}
      <AdviceCard report={report} />

      {/* Top 3 Alternative Predictions Toggle */}
      {alternatives && alternatives.length > 0 && (
        <div className="border border-slate-200 rounded-2xl overflow-hidden">
          <button
            onClick={() => setShowAlternatives(!showAlternatives)}
            className="w-full flex items-center justify-between p-4 bg-slate-50 hover:bg-slate-100/80 text-xs font-semibold text-slate-700 transition-colors"
          >
            <span>View Alternative Model Predictions ({alternatives.length})</span>
            {showAlternatives ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>

          {showAlternatives && (
            <div className="p-4 bg-white space-y-2 border-t border-slate-200 text-xs">
              {alternatives.map((alt, idx) => (
                <div key={idx} className="flex items-center justify-between py-1.5 border-b last:border-0 border-slate-100">
                  <span className="font-medium text-slate-800">
                    {alt.plant} — {alt.disease}
                  </span>
                  <span className="font-mono text-slate-500 font-semibold">
                    {alt.confidence.toFixed(1)}%
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* AI Agricultural Disclaimer */}
      <div className="flex items-start space-x-2 bg-slate-50 border border-slate-200 p-3.5 rounded-xl text-[11px] text-slate-600">
        <AlertCircle className="w-4 h-4 text-slate-400 flex-shrink-0 mt-0.5" />
        <span>{report.disclaimer}</span>
      </div>
    </div>
  );
};
