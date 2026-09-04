import React, { useRef, useState } from 'react';
import { UploadCloud, FileImage, AlertCircle } from 'lucide-react';

interface UploadCardProps {
  onFileSelect: (file: File) => void;
  disabled?: boolean;
}

export const UploadCard: React.FC<UploadCardProps> = ({ onFileSelect, disabled = false }) => {
  const [isDragOver, setIsDragOver] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateAndPass = (file: File) => {
    setErrorMsg(null);

    // Format validation
    const allowed = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const ext = file.name.split('.').pop()?.toLowerCase();
    const validExts = ['jpg', 'jpeg', 'png', 'webp'];

    if (!allowed.includes(file.type) && (!ext || !validExts.includes(ext))) {
      setErrorMsg('Unsupported file format. Please upload JPG, PNG, or WEBP.');
      return;
    }

    // Size validation (Max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setErrorMsg('File size exceeds 5MB limit. Please upload a smaller image.');
      return;
    }

    onFileSelect(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    if (!disabled) setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    if (disabled) return;

    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      validateAndPass(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      validateAndPass(e.target.files[0]);
    }
  };

  return (
    <div className="space-y-4">
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => !disabled && fileInputRef.current?.click()}
        className={`relative border-2 border-dashed rounded-3xl p-8 text-center cursor-pointer transition-all duration-300 ${
          disabled
            ? 'opacity-60 cursor-not-allowed border-slate-300 bg-slate-50'
            : isDragOver
            ? 'border-emerald-500 bg-emerald-50/80 scale-[1.01] shadow-lg'
            : 'border-emerald-800/20 bg-white hover:border-emerald-500/60 hover:bg-emerald-50/30 hover:shadow-md'
        }`}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/jpeg,image/png,image/webp"
          disabled={disabled}
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center space-y-4">
          <div className={`w-16 h-16 rounded-2xl flex items-center justify-center transition-colors ${
            isDragOver ? 'bg-emerald-500 text-white' : 'bg-emerald-100 text-emerald-700'
          }`}>
            <UploadCloud className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <p className="text-base font-bold text-forest">
              Click to upload or drag and drop
            </p>
            <p className="text-xs text-slate-500">
              Clear photograph of a plant leaf (JPG, PNG, WEBP — Max 5MB)
            </p>
          </div>

          <div className="inline-flex items-center space-x-2 bg-emerald-50 text-emerald-800 border border-emerald-200 px-3.5 py-1.5 rounded-full text-xs font-semibold">
            <FileImage className="w-3.5 h-3.5 text-emerald-600" />
            <span>High resolution leaf close-ups yield best accuracy</span>
          </div>
        </div>
      </div>

      {errorMsg && (
        <div className="flex items-center space-x-2 bg-rose-50 border border-rose-200 text-rose-700 p-3 rounded-xl text-xs font-medium">
          <AlertCircle className="w-4 h-4 flex-shrink-0 text-rose-600" />
          <span>{errorMsg}</span>
        </div>
      )}
    </div>
  );
};
