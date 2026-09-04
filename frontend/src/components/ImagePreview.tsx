import React from 'react';
import { RefreshCw, Trash2, Search, Cpu, Sparkles } from 'lucide-react';

interface ImagePreviewProps {
  imageSrc: string;
  isAnalyzing: boolean;
  onReplace: () => void;
  onRemove: () => void;
  onAnalyze: () => void;
}

export const ImagePreview: React.FC<ImagePreviewProps> = ({
  imageSrc,
  isAnalyzing,
  onReplace,
  onRemove,
  onAnalyze,
}) => {
  return (
    <div className="space-y-4">
      {/* Image Container with Scanning Overlay */}
      <div className="relative rounded-3xl overflow-hidden border border-emerald-900/10 shadow-md bg-slate-900 aspect-video sm:aspect-[4/3] flex items-center justify-center">
        <img
          src={imageSrc}
          alt="Selected leaf preview"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isAnalyzing ? 'opacity-40 blur-[1px]' : 'opacity-100'
          }`}
        />

        {/* Scanning Animation Line during analyzing state */}
        {isAnalyzing && (
          <>
            <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-emerald-400 via-green-300 to-emerald-400 shadow-[0_0_15px_#22C55E] animate-scan z-10" />
            
            {/* Center Loading Status Badge */}
            <div className="absolute z-20 flex flex-col items-center space-y-3 bg-forest/90 backdrop-blur-md px-6 py-4 rounded-2xl border border-emerald-500/40 shadow-2xl">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center animate-spin">
                <Cpu className="w-6 h-6" />
              </div>
              <div className="text-center">
                <p className="text-white font-bold text-base flex items-center justify-center space-x-2">
                  <span>Analyzing your plant...</span>
                  <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
                </p>
                <p className="text-emerald-300 text-xs mt-0.5 font-mono">
                  Hugging Face Vision Inference
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Control Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={onReplace}
            disabled={isAnalyzing}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-slate-300 bg-white text-slate-700 hover:bg-slate-50 font-medium text-xs shadow-sm transition-colors disabled:opacity-50"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Replace Image</span>
          </button>
          <button
            type="button"
            onClick={onRemove}
            disabled={isAnalyzing}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 px-4 py-2.5 rounded-xl border border-rose-200 bg-white text-rose-600 hover:bg-rose-50 font-medium text-xs shadow-sm transition-colors disabled:opacity-50"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Remove</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onAnalyze}
          disabled={isAnalyzing}
          className="w-full sm:w-auto inline-flex items-center justify-center space-x-2 bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-500 hover:to-green-500 text-white font-bold text-sm px-6 py-3 rounded-xl shadow-md hover:shadow-emerald-600/30 transition-all disabled:opacity-60 active:scale-95"
        >
          <Search className="w-4 h-4" />
          <span>{isAnalyzing ? 'Analyzing...' : 'Detect Disease'}</span>
        </button>
      </div>
    </div>
  );
};
