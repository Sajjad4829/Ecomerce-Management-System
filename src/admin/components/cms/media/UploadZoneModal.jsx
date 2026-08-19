import { useState } from 'react';
import { FiX, FiUploadCloud, FiCheck, FiFile, FiImage, FiAlertCircle } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function UploadZoneModal({ isOpen, onClose, onUploadComplete, currentFolder }) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadingFiles, setUploadingFiles] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const handleSimulatedDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    // Simulate files dropped
    const mockFiles = [
      { name: 'luxury_velvet_sofa_cream_hd.webp', size: '3.4 MB', type: 'image/webp', progress: 100, status: 'complete' },
      { name: 'scandi_dining_table_oak.jpg', size: '2.1 MB', type: 'image/jpeg', progress: 85, status: 'uploading' },
      { name: 'product_catalog_spec_sheet_2025.pdf', size: '4.8 MB', type: 'application/pdf', progress: 40, status: 'uploading' }
    ];

    setUploadingFiles(mockFiles);
    setIsProcessing(true);

    setTimeout(() => {
      setUploadingFiles(prev => prev.map(f => ({ ...f, progress: 100, status: 'complete' })));
      setIsProcessing(false);
    }, 1500);
  };

  const handleFinish = () => {
    onUploadComplete();
    onClose();
    setUploadingFiles([]);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      
      <div className="bg-surface rounded-2xl border border-black/10 shadow-2xl w-full max-w-xl overflow-hidden flex flex-col">
        
        {/* Header */}
        <div className="p-4 border-b border-black/5 flex items-center justify-between bg-background/50">
          <div>
            <h3 className="font-serif font-bold text-base text-text-primary">Upload Media Assets</h3>
            <p className="text-xs text-text-muted">
              Target folder: <span className="font-semibold text-black">{currentFolder || 'Root / General'}</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-text-muted hover:text-text-primary hover:bg-black/5 rounded-lg transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Drag and Drop Zone */}
        <div className="p-6 space-y-6">
          <div
            onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleSimulatedDrop}
            onClick={handleSimulatedDrop}
            className={cn(
              "border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center cursor-pointer transition-all duration-200",
              isDragging
                ? "border-black bg-black/5 scale-[1.01]"
                : "border-black/15 bg-background/60 hover:border-black/30 hover:bg-surface"
            )}
          >
            <div className="w-14 h-14 rounded-full bg-surface shadow-sm border border-black/5 flex items-center justify-center text-text-secondary mb-3">
              <FiUploadCloud size={28} />
            </div>
            <h4 className="text-sm font-bold text-text-primary">Drag & Drop media files here</h4>
            <p className="text-xs text-text-muted mt-1 max-w-xs">
              Supports High-Res WebP, PNG, JPG, MP4, and PDF documents up to 50MB per file.
            </p>
            <button className="mt-4 px-4 py-2 bg-surface border border-black/15 rounded-lg text-xs font-bold uppercase tracking-wider text-text-primary shadow-xs hover:bg-background">
              Browse Local Files
            </button>
          </div>

          {/* Upload Queue Item Status */}
          {uploadingFiles.length > 0 && (
            <div className="space-y-3">
              <h5 className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                Upload Queue ({uploadingFiles.length})
              </h5>

              <ul className="space-y-2 max-h-40 overflow-y-auto custom-scrollbar">
                {uploadingFiles.map((f, index) => (
                  <li key={index} className="p-2.5 bg-background border border-black/5 rounded-lg text-xs flex items-center justify-between">
                    <div className="flex items-center gap-3 truncate max-w-[280px]">
                      <FiImage size={16} className="text-text-muted shrink-0" />
                      <div>
                        <div className="font-bold text-text-primary truncate">{f.name}</div>
                        <div className="text-[10px] text-text-muted font-mono">{f.size}</div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      {f.status === 'complete' ? (
                        <span className="flex items-center gap-1 text-[10px] font-bold text-success bg-success-soft px-2 py-0.5 rounded">
                          <FiCheck size={12} /> Ready
                        </span>
                      ) : (
                        <span className="text-[10px] font-mono font-semibold text-primary">
                          {f.progress}%
                        </span>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-black/5 bg-background/50 flex items-center justify-between">
          <span className="text-[11px] text-text-muted">Automatic WebP optimization enabled</span>
          <div className="flex gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:bg-surface"
            >
              Cancel
            </button>
            <button
              onClick={handleFinish}
              disabled={uploadingFiles.length === 0 || isProcessing}
              className={cn(
                "px-5 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all shadow-md",
                uploadingFiles.length > 0 && !isProcessing
                  ? "bg-[#1A1A1A] text-white hover:bg-black/80"
                  : "bg-gray-200 text-text-muted cursor-not-allowed"
              )}
            >
              Confirm Import
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}
