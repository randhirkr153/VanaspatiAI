import React, { useState } from 'react';
import { UploadCard } from '../components/UploadCard';
import { ImagePreview } from '../components/ImagePreview';
import { AnalysisResult } from '../components/AnalysisResult';
import { PredictResponse } from '../types/prediction';
import { predictDisease } from '../services/api';
import { ErrorState } from '../components/ErrorState';
import { ChatContext } from '../types/chat';

interface DetectProps {
  onOpenChatWithContext?: (ctx: ChatContext, openDrawer?: boolean) => void;
}

export const Detect: React.FC<DetectProps> = ({ onOpenChatWithContext }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState<PredictResponse | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setErrorMsg(null);
    setResult(null);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setResult(null);
    setErrorMsg(null);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) return;

    setIsAnalyzing(true);
    setErrorMsg(null);

    try {
      const data = await predictDisease(selectedFile);
      setResult(data);

      // Automatically sync active context with parent/chatbot upon new prediction
      if (onOpenChatWithContext && data && data.prediction) {
        onOpenChatWithContext({
          plant: data.prediction.plant,
          disease: data.prediction.disease,
          confidence: data.prediction.confidence,
          symptoms: data.report.symptoms,
        }, false); // Keep drawer closed or open based on user click
      }
    } catch (err: any) {
      console.error('Detection error:', err);
      const detail = err.response?.data?.detail || 'Unable to analyze this image. Please ensure you upload a clear photograph of a plant leaf and try again.';
      setErrorMsg(detail);
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleOpenChat = () => {
    if (result && onOpenChatWithContext) {
      onOpenChatWithContext({
        plant: result.prediction.plant,
        disease: result.prediction.disease,
        confidence: result.prediction.confidence,
        symptoms: result.report.symptoms,
      }, true); // Open drawer on explicit button click
    }
  };

  return (
    <div className="py-10 bg-[#F8FAF7] min-h-[calc(100vh-80px)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Page Header */}
        <div className="space-y-2 text-center sm:text-left">
          <span className="text-xs font-bold text-emerald-600 uppercase tracking-widest">
            Computer Vision Inference
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-forest tracking-tight">
            Disease Detection
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-2xl">
            Upload a clear leaf photo for instant plant identification, disease classification, symptoms, and organic treatment guidance.
          </p>
        </div>

        {/* 2-Column Responsive Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* LEFT COLUMN: Upload & Preview Card */}
          <div className="lg:col-span-5 bg-white border border-emerald-900/10 rounded-3xl p-6 sm:p-8 space-y-6 shadow-sm">
            <div className="border-b border-slate-100 pb-4">
              <h2 className="text-xl font-bold text-forest">Upload Leaf Image</h2>
              <p className="text-xs text-slate-500">Select or drop a clear photograph of your plant leaf</p>
            </div>

            {!previewUrl ? (
              <UploadCard onFileSelect={handleFileSelect} disabled={isAnalyzing} />
            ) : (
              <ImagePreview
                imageSrc={previewUrl}
                isAnalyzing={isAnalyzing}
                onReplace={() => {
                  handleRemove();
                }}
                onRemove={handleRemove}
                onAnalyze={handleAnalyze}
              />
            )}

            {errorMsg && (
              <div className="pt-2">
                <ErrorState
                  title="Analysis Failed"
                  message={errorMsg}
                  onRetry={handleAnalyze}
                />
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Analysis Result */}
          <div className="lg:col-span-7">
            <AnalysisResult
              data={result}
              onOpenChatWithContext={handleOpenChat}
            />
          </div>

        </div>
      </div>
    </div>
  );
};
