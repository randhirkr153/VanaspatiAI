import React from 'react';
import { ShieldAlert, Sprout, HeartHandshake, CheckCircle2 } from 'lucide-react';

export const About: React.FC = () => {
  return (
    <div className="py-12 bg-[#F8FAF7] min-h-[calc(100vh-80px)]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            About Plant AI
          </span>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-forest tracking-tight">
            Empowering Healthy Crops & Gardens
          </h1>
          <p className="text-slate-600 text-base sm:text-lg max-w-2xl mx-auto">
            Combining state-of-the-art Computer Vision with practical botanical expertise to reduce crop losses and improve plant health.
          </p>
        </div>

        {/* Mission Card */}
        <div className="bg-white border border-emerald-900/10 rounded-3xl p-8 space-y-6 shadow-sm">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
              <Sprout className="w-6 h-6" />
            </div>
            <h2 className="text-2xl font-bold text-forest">Our Mission</h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-sm sm:text-base">
            Plant diseases devastate millions of tons of food crops annually, causing severe financial loss for farmers and gardener frustration. 
            Plant AI provides instant, accessible, and evidence-based diagnostic support directly from leaf photographs.
          </p>
        </div>

        {/* Methodology & Tech Stack Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-forest flex items-center space-x-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-600" />
              <span>Machine Learning Methodology</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our vision models are trained on standard datasets like PlantVillage, covering 38+ plant species and disease classes. 
              Outputs are parsed into structured plant-disease pairs to prevent cryptic raw labels.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-3xl p-6 space-y-3">
            <h3 className="text-lg font-bold text-forest flex items-center space-x-2">
              <HeartHandshake className="w-5 h-5 text-emerald-600" />
              <span>Plant Assistant Chatbot</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
              Our floating assistant uses an LLM abstraction layer to deliver tailored care advice, organic sprays, pruning steps, and watering guidance contextualized with your latest prediction.
            </p>
          </div>
        </div>

        {/* Important Agricultural Medical Disclaimer (Section 18) */}
        <div className="bg-amber-50 border border-amber-200 rounded-3xl p-8 space-y-3">
          <div className="flex items-center space-x-3 text-amber-900 font-bold text-lg">
            <ShieldAlert className="w-6 h-6 text-amber-700 flex-shrink-0" />
            <span>Important Agricultural & Medical UX Notice</span>
          </div>
          <p className="text-xs sm:text-sm text-amber-900/90 leading-relaxed">
            AI predictions provide decision-support and rapid diagnostic screening, but should not be viewed as guaranteed agricultural advice or 100% disease confirmation. 
            For commercial crops or severe regional outbreaks, always consult a qualified agricultural extension officer or professional agronomist.
          </p>
        </div>

      </div>
    </div>
  );
};
