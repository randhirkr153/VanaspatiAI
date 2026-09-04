import React from 'react';
import { Stethoscope, Sprout, ShieldCheck } from 'lucide-react';
import { DiseaseReport } from '../types/prediction';

interface AdviceCardProps {
  report: DiseaseReport;
}

export const AdviceCard: React.FC<AdviceCardProps> = ({ report }) => {
  return (
    <div className="space-y-4">
      {/* Symptoms Card */}
      <div className="bg-emerald-50/70 border border-emerald-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
            <Stethoscope className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-emerald-950">Symptoms</h4>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-emerald-900/90 pl-1">
          {report.symptoms.map((symptom, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-emerald-500 font-bold mt-0.5">•</span>
              <span>{symptom}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Plant Care & Treatment Guidance */}
      <div className="bg-amber-50/70 border border-amber-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shadow-sm">
            <Sprout className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-amber-950">Plant Care & Treatment</h4>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-amber-900/90 pl-1">
          {report.management.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-amber-500 font-bold mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Prevention Recommendations */}
      <div className="bg-green-50/70 border border-green-200/80 rounded-2xl p-5 space-y-3">
        <div className="flex items-center space-x-2.5">
          <div className="w-8 h-8 rounded-xl bg-green-700 text-white flex items-center justify-center shadow-sm">
            <ShieldCheck className="w-4 h-4" />
          </div>
          <h4 className="text-base font-bold text-green-950">Prevention Recommendations</h4>
        </div>
        <ul className="space-y-2 text-xs sm:text-sm text-green-900/90 pl-1">
          {report.prevention.map((item, idx) => (
            <li key={idx} className="flex items-start space-x-2">
              <span className="text-green-600 font-bold mt-0.5">•</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};
