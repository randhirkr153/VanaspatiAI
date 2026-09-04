import React from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { HowItWorks } from '../components/HowItWorks';
import { ShieldCheck, Cpu, ArrowRight, Activity, Award } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="space-y-0">
      <HeroSection />

      <div id="how-it-works">
        <HowItWorks />
      </div>

      {/* Feature Highlights Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
            <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
              Built for Precision
            </span>
            <h2 className="text-3xl font-extrabold text-forest">
              Engineered with Modern AI SaaS Architecture
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-forest">Computer Vision Model</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Powered by Hugging Face Vision Transformers fine-tuned on 38+ plant disease classes with normalized outputs.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Activity className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-forest">Disease Knowledge Service</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Enriches predictions with structured symptoms, organic treatment plans, and preventative measures.
              </p>
            </div>

            <div className="p-8 rounded-3xl bg-slate-50 border border-slate-200/80 space-y-4 hover:border-emerald-500/40 transition-colors">
              <div className="w-12 h-12 rounded-2xl bg-emerald-100 text-emerald-700 flex items-center justify-center">
                <Award className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-forest">Plant Assistant Chatbot</h3>
              <p className="text-sm text-slate-600 leading-relaxed">
                Contextual LLM assistant understands your exact leaf analysis and answers follow-up care questions.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-forest to-emerald-900 text-white">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Ready to Protect Your Crops and Plants?
          </h2>
          <p className="text-emerald-100 text-base sm:text-lg max-w-2xl mx-auto">
            Upload a leaf image today and experience instant AI diagnosis and plant care assistance.
          </p>
          <div>
            <Link
              to="/detect"
              className="inline-flex items-center space-x-2 bg-emerald-500 hover:bg-emerald-400 text-white font-bold px-8 py-4 rounded-2xl shadow-lg transition-transform hover:-translate-y-0.5"
            >
              <span>Analyze Leaf Now</span>
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
