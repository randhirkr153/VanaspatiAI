import React from 'react';
import { Loader2, Sprout } from 'lucide-react';

interface LoadingStateProps {
  message?: string;
}

export const LoadingState: React.FC<LoadingStateProps> = ({ message = 'Loading plant data...' }) => {
  return (
    <div className="flex flex-col items-center justify-center p-12 text-center space-y-4">
      <div className="relative">
        <div className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center animate-spin">
          <Loader2 className="w-7 h-7" />
        </div>
        <Sprout className="w-6 h-6 text-emerald-600 absolute inset-0 m-auto" />
      </div>
      <p className="text-sm font-semibold text-slate-600 animate-pulse">{message}</p>
    </div>
  );
};
