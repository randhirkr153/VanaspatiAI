import React from 'react';
import { Camera, Upload, CheckCircle2, BotMessageSquare } from 'lucide-react';
import { StepCard } from './StepCard';
import { Link } from 'react-router-dom';

export const HowItWorks: React.FC = () => {
  const steps = [
    {
      stepNumber: 1,
      icon: Camera,
      title: "Click a Pic",
      description: "Take a clear, focused photograph of the affected plant leaf under good lighting.",
    },
    {
      stepNumber: 2,
      icon: Upload,
      title: "Upload to Plant AI",
      description: "Upload the image securely for instant Computer Vision image classification.",
    },
    {
      stepNumber: 3,
      icon: CheckCircle2,
      title: "Get AI Analysis",
      description: "Our Hugging Face model identifies the plant and probable disease with confidence metrics.",
    },
    {
      stepNumber: 4,
      icon: BotMessageSquare,
      title: "Chat with AI",
      description: "Ask follow-up care, spray, and treatment questions with our Plant Assistant bot.",
    },
  ];

  return (
    <section className="py-20 bg-emerald-50/50 border-y border-emerald-900/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="inline-block px-3.5 py-1.5 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold uppercase tracking-wider">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-forest tracking-tight">
            How Plant AI Works
          </h2>
          <p className="text-slate-600 text-base sm:text-lg">
            From raw foliage photograph to actionable agricultural guidance in seconds.
          </p>
        </div>

        {/* 4 Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {steps.map((step) => (
            <StepCard
              key={step.stepNumber}
              stepNumber={step.stepNumber}
              icon={step.icon}
              title={step.title}
              description={step.description}
            />
          ))}
        </div>

        {/* "How To Apply:" Instruction banner directly inspired by Reference Image 3 */}
        <div className="bg-slate-100/90 border border-slate-200 rounded-3xl p-8 sm:p-10 space-y-6">
          <div className="text-center">
            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight inline-block relative">
              <span className="border-b-2 border-[#FF652F] pb-1">How To Apply Analysis:</span>
            </h3>
          </div>

          <div className="max-w-4xl mx-auto space-y-4 text-xs sm:text-sm text-slate-700 leading-relaxed">
            <p className="flex items-start space-x-2">
              <span className="font-bold text-slate-900 flex-shrink-0">-</span>
              <span>
                Please upload your plant leaf photo on the{' '}
                <Link to="/detect" className="text-[#FF652F] underline font-semibold hover:text-[#E5531D]">
                  Disease Detection online page
                </Link>{' '}
                and thoroughly study the detailed AI pathology requirements and symptoms report. Once you confirm a strong match, apply the recommended organic treatment plan.
              </span>
            </p>

            <p className="flex items-start space-x-2">
              <span className="font-bold text-slate-900 flex-shrink-0">-</span>
              <span>
                Please also mention any observed environmental factors (watering frequency, sunlight, soil moisture, or fertilizer used) in the AI Plant Assistant chat for tailored care advice.
              </span>
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
