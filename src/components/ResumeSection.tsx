import React, { useState, useEffect, useRef } from 'react';
import { Upload, FileDown, CheckCircle2, AlertCircle, FileText, HardDrive, RefreshCw } from 'lucide-react';
import { StoredResume } from '../types';
import { getActiveResumeInfo, saveResumeFile, downloadActiveResume } from '../utils/resumeStorage';

interface ResumeSectionProps {
  onDownloadResume?: () => void;
  onResumeUpdated?: (resume: StoredResume) => void;
}

export const ResumeSection: React.FC<ResumeSectionProps> = ({ onDownloadResume, onResumeUpdated }) => {
  const [resumeInfo, setResumeInfo] = useState<StoredResume | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    loadResumeMetadata();
  }, []);

  const loadResumeMetadata = async () => {
    try {
      const info = await getActiveResumeInfo();
      setResumeInfo(info);
    } catch {
      // ignore
    }
  };

  const handleFileSelection = async (file: File) => {
    if (!file) return;

    if (file.type !== 'application/pdf' && !file.name.toLowerCase().endsWith('.pdf')) {
      setStatusMessage({
        type: 'error',
        text: 'Invalid file format. Please upload a PDF file only (.pdf).'
      });
      return;
    }

    setIsUploading(true);
    setStatusMessage(null);

    try {
      const updatedInfo = await saveResumeFile(file);
      setResumeInfo(updatedInfo);
      setStatusMessage({
        type: 'success',
        text: `Resume updated successfully! Active file: "${updatedInfo.fileName}" (${(updatedInfo.fileSize / 1024).toFixed(1)} KB)`
      });
      if (onResumeUpdated) {
        onResumeUpdated(updatedInfo);
      }
    } catch (err: any) {
      setStatusMessage({
        type: 'error',
        text: err?.message || 'Failed to process and store resume. Please try again.'
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileSelection(file);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      if (onDownloadResume) {
        onDownloadResume();
      } else {
        await downloadActiveResume();
      }
    } finally {
      setTimeout(() => setIsDownloading(false), 600);
    }
  };

  return (
    <section id="resume" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto border-t border-slate-900">
      <div className="text-center mb-12">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-mono uppercase tracking-wider mb-3">
          <span>Curriculum Vitae</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
          Resume Management
        </h2>
        <p className="mt-3 text-sm sm:text-base text-slate-400 max-w-2xl mx-auto">
          Download the latest official CV or upload an updated PDF directly from your device.
        </p>
      </div>

      <div className="max-w-2xl mx-auto bg-[#0b1120] border border-slate-800/90 rounded-2xl p-6 sm:p-8 shadow-xl shadow-black/30">
        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleInputChange}
          id="resume-pdf-input"
        />

        {/* Current Active File Info */}
        <div className="bg-[#070b14] border border-slate-800 rounded-xl p-4 sm:p-5 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-blue-950/60 border border-blue-600/30 flex items-center justify-center shrink-0">
              <FileText className="w-6 h-6 text-blue-400" />
            </div>

            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono text-slate-400 uppercase tracking-wider">
                  Active Resume File
                </span>
                {resumeInfo?.isCustom ? (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-cyan-950/80 text-cyan-300 border border-cyan-500/30">
                    User Uploaded
                  </span>
                ) : (
                  <span className="px-2 py-0.2 rounded-full text-[10px] font-mono bg-blue-950/80 text-blue-300 border border-blue-500/30">
                    Official Copy
                  </span>
                )}
              </div>

              <h3 className="text-base font-bold text-white truncate mt-0.5">
                {resumeInfo?.fileName || 'Ashish_Bhoite_Resume.pdf'}
              </h3>

              <div className="flex flex-wrap items-center gap-3 text-xs text-slate-400 font-mono mt-1">
                {resumeInfo?.fileSize && (
                  <span>{(resumeInfo.fileSize / 1024).toFixed(1)} KB</span>
                )}
                <span>•</span>
                <span>Target name: Ashish_Bhoite_Resume.pdf</span>
              </div>
            </div>
          </div>
        </div>

        {/* Drag and Drop Zone & Upload Action */}
        <div
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-xl p-6 sm:p-8 text-center cursor-pointer transition-all duration-200 mb-6 ${
            isDragging
              ? 'border-blue-500 bg-blue-600/10'
              : 'border-slate-800 hover:border-blue-500/50 hover:bg-slate-900/50'
          }`}
        >
          <div className="w-12 h-12 rounded-full bg-slate-900 border border-slate-700/80 flex items-center justify-center mx-auto mb-3 text-blue-400">
            {isUploading ? (
              <RefreshCw className="w-6 h-6 animate-spin text-cyan-400" />
            ) : (
              <Upload className="w-6 h-6" />
            )}
          </div>

          <h4 className="text-sm sm:text-base font-semibold text-white">
            {isUploading ? 'Processing Resume PDF...' : 'Click to Upload Resume or Drag & Drop'}
          </h4>
          <p className="text-xs text-slate-400 mt-1 max-w-sm mx-auto">
            Select a PDF document from your device. Only .pdf files are accepted.
          </p>
        </div>

        {/* Two Main Requested Functional Buttons */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Upload Button */}
          <button
            id="upload-resume-action-btn"
            onClick={() => fileInputRef.current?.click()}
            disabled={isUploading}
            className="min-h-[46px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-slate-200 bg-[#0f172a] hover:bg-slate-800 border border-slate-700 hover:border-blue-500/60 shadow-sm transition-all duration-200 cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <Upload className="w-4 h-4 text-cyan-400" />
            <span>{isUploading ? 'Uploading...' : 'Upload Resume'}</span>
          </button>

          {/* Download Button */}
          <button
            id="download-resume-action-btn"
            onClick={handleDownload}
            disabled={isDownloading}
            className="min-h-[46px] flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-semibold text-sm text-white bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-500 hover:to-cyan-400 shadow-md shadow-blue-500/25 transition-all duration-200 cursor-pointer disabled:opacity-50 active:scale-95"
          >
            <FileDown className={`w-4 h-4 ${isDownloading ? 'animate-bounce' : ''}`} />
            <span>{isDownloading ? 'Downloading...' : 'Download Resume'}</span>
          </button>
        </div>

        {/* Status / Success Message */}
        {statusMessage && (
          <div
            className={`mt-5 p-3.5 rounded-xl text-xs sm:text-sm flex items-start gap-2.5 animate-in fade-in duration-200 ${
              statusMessage.type === 'success'
                ? 'bg-emerald-950/40 border border-emerald-500/40 text-emerald-200'
                : 'bg-rose-950/40 border border-rose-500/40 text-rose-200'
            }`}
          >
            {statusMessage.type === 'success' ? (
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            ) : (
              <AlertCircle className="w-4 h-4 text-rose-400 shrink-0 mt-0.5" />
            )}
            <span className="leading-relaxed">{statusMessage.text}</span>
          </div>
        )}

        {/* Technical Architecture Note */}
        <div className="mt-6 pt-4 border-t border-slate-850 flex items-start gap-2 text-[11px] text-slate-500">
          <HardDrive className="w-4 h-4 text-slate-500 shrink-0 mt-0.5" />
          <span>
            Uploaded resumes are preserved locally in browser client-side storage (IndexedDB). No Google Drive or external redirect required. Permanent cloud database sync endpoints are structured for future backend attachment.
          </span>
        </div>
      </div>
    </section>
  );
};
