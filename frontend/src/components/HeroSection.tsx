import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Sparkles, CheckCircle } from 'lucide-react';

export const HeroSection: React.FC = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#063B22] via-[#08492C] to-[#042817] text-white py-24 lg:py-32 border-b border-emerald-800/40">
      {/* Background Subtle Leafy / Grid Pattern & Gradient Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-emerald-500/20 via-transparent to-transparent pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Text */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Badge */}
            <div className="inline-flex items-center space-x-2 bg-emerald-800/60 border border-emerald-500/30 px-4 py-2 rounded-full text-xs font-semibold text-emerald-200 shadow-inner">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Hugging Face Vision Transformers Integrated</span>
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight leading-[1.15]">
              AI-Powered Plant <br />
              <span className="bg-gradient-to-r from-emerald-300 via-green-300 to-emerald-400 bg-clip-text text-transparent">
                Disease Detection
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-emerald-100/90 text-lg sm:text-xl font-normal max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              Upload a leaf photo and use AI to identify potential plant diseases and get useful plant-care guidance.
            </p>

            {/* CTAs with Orange Accent matching Reference Images */}
            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start space-y-3 sm:space-y-0 sm:space-x-4">
              <Link
                to="/detect"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-3 bg-gradient-to-r from-[#FF652F] to-[#F97316] hover:from-[#E5531D] hover:to-[#EA580C] text-white font-extrabold text-base px-8 py-4 rounded-xl shadow-xl shadow-orange-950/50 hover:shadow-orange-500/30 transition-all transform hover:-translate-y-0.5 active:translate-y-0 border border-orange-400/30 uppercase tracking-wider"
              >
                <span>GET STARTED</span>
                <ArrowRight className="w-5 h-5" />
              </Link>
              <a
                href="#how-it-works"
                className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-emerald-900/60 hover:bg-emerald-800/80 text-emerald-200 border border-emerald-700/50 font-semibold text-base px-7 py-4 rounded-xl transition-all"
              >
                <span>How It Works</span>
              </a>
            </div>

            {/* Feature Highlights */}
            <div className="pt-6 border-t border-emerald-800/40 grid grid-cols-3 gap-4 text-xs sm:text-sm text-emerald-200/80 font-medium">
              <div className="flex items-center space-x-2 justify-center lg:justify-start">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Instant Vision ML</span>
              </div>
              <div className="flex items-center space-x-2 justify-center lg:justify-start">
                <Shield className="w-4 h-4 text-emerald-400" />
                <span>38+ Plant Classes</span>
              </div>
              <div className="flex items-center space-x-2 justify-center lg:justify-start">
                <CheckCircle className="w-4 h-4 text-emerald-400" />
                <span>24/7 AI Assistant</span>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Graphic Card */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-5"
          >
            <div className="relative mx-auto max-w-md lg:max-w-none">
              {/* Decorative Blur Backing */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-emerald-500 to-green-400 blur-xl opacity-30 animate-pulse" />

              <div className="relative bg-gradient-to-b from-[#0B472A] to-[#063B22] p-6 sm:p-8 rounded-3xl border border-emerald-500/30 shadow-2xl space-y-6">
                
                {/* Header preview badge */}
                <div className="flex items-center justify-between border-b border-emerald-800/60 pb-4">
                  <div className="flex items-center space-x-3">
                    <span className="text-2xl">🍃</span>
                    <div>
                      <h4 className="text-sm font-bold text-white">Tomato Leaf Analysis</h4>
                      <p className="text-[11px] text-emerald-300">Sample Prediction</p>
                    </div>
                  </div>
                  <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-xs font-semibold px-3 py-1 rounded-full">
                    94.2% Match
                  </span>
                </div>

                {/* Visual Leaf Graphic Representation */}
                <div className="relative h-56 rounded-2xl bg-emerald-950/80 border border-emerald-800 flex flex-col items-center justify-center p-4 text-center overflow-hidden">
                  <div className="w-24 h-24 rounded-full bg-emerald-600/20 flex items-center justify-center mb-3">
                    <span className="text-6xl animate-bounce">🍂</span>
                  </div>
                  <span className="text-emerald-200 font-bold text-base">Tomato — Late Blight</span>
                  <span className="text-emerald-400 text-xs mt-1 font-mono">Status: Phytophthora Infestans</span>
                </div>

                {/* Report Highlights snippet */}
                <div className="space-y-2 bg-emerald-900/40 p-4 rounded-xl border border-emerald-800/50 text-xs">
                  <div className="flex items-center justify-between text-emerald-200 font-medium">
                    <span>Severity Guidance:</span>
                    <span className="text-amber-400 font-bold">High Priority</span>
                  </div>
                  <p className="text-emerald-300/80 text-[11px]">
                    Recommendation: Prune infected lower foliage immediately and apply copper-based bio-fungicide.
                  </p>
                </div>

              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
