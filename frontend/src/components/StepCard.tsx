import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StepCardProps {
  stepNumber: number;
  icon: LucideIcon;
  title: string;
  description: string;
}

export const StepCard: React.FC<StepCardProps> = ({ stepNumber, icon: Icon, title, description }) => {
  return (
    <div className="relative group p-6 bg-white rounded-2xl border border-emerald-900/10 shadow-sm hover:shadow-xl hover:border-emerald-500/40 transition-all duration-300 transform hover:-translate-y-1">
      {/* Step Badge */}
      <div className="absolute -top-3.5 right-6 bg-gradient-to-r from-emerald-600 to-green-600 text-white text-xs font-bold px-3 py-1 rounded-full shadow-md">
        Step 0{stepNumber}
      </div>

      {/* Icon Container */}
      <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-5 group-hover:bg-emerald-600 group-hover:text-white transition-colors duration-300 shadow-sm">
        <Icon className="w-7 h-7" />
      </div>

      {/* Step Title & Description */}
      <h3 className="text-xl font-bold text-forest mb-2 group-hover:text-emerald-700 transition-colors">
        {title}
      </h3>
      <p className="text-slate-600 text-sm leading-relaxed">
        {description}
      </p>
    </div>
  );
};
