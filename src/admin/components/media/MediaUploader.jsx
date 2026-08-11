import React, { useState, useCallback } from 'react';
import { FiX, FiUploadCloud, FiFile, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';
import { useMedia } from '../../context/media/MediaContext';

export default function MediaUploader({ onClose }) {
  const { addAsset } = useMedia();
  const [dragActive, setDragActive] = useState(false);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const handleDrag = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  }, []);

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleChange = (e) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFiles(e.target.files);
    }
  };

  const handleFiles = (newFiles) => {
    const fileArray = Array.from(newFiles).map(file => ({
      file,
      id: Math.random().toString(36).substring(7),
      progress: 0,
      status: 'pending' // pending, uploading, success, error
    }));
    setFiles(prev => [...prev, ...fileArray]);
  };

  const removeFile = (id) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const startUpload = () => {
    setUploading(true);
    // Mock upload process
    const pendingFiles = files.filter(f => f.status === 'pending');
    
    pendingFiles.forEach((fileObj, index) => {
      setTimeout(() => {
        setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'uploading', progress: 50 } : f));
        
        setTimeout(() => {
          // Finish upload
          setFiles(prev => prev.map(f => f.id === fileObj.id ? { ...f, status: 'success', progress: 100 } : f));
          
          // Add to mock store
          addAsset({
            filename: fileObj.file.name,
            title: fileObj.file.name.split('.')[0],
            altText: '',
            type: fileObj.file.type.startsWith('image/') ? 'Image' : 'Document',
            mimeType: fileObj.file.type || 'application/octet-stream',
            size: fileObj.file.size,
            url: 'https://placehold.co/800x800/1a1a1a/ffffff?text=New+Upload', // Mock URL
            folderId: 'all',
            collectionIds: [],
            tags: []
          });

          // If last file, close after a delay
          if (index === pendingFiles.length - 1) {
            setTimeout(() => {
              onClose();
            }, 1000);
          }
        }, 800);
      }, index * 500); // Stagger uploads slightly
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-stone-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl overflow-hidden flex flex-col max-h-[90vh]">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone-100">
          <h2 className="text-lg font-bold text-stone-900">Upload Media</h2>
          <button onClick={onClose} className="p-2 text-stone-400 hover:text-stone-900 rounded-lg transition-colors">
            <FiX size={20} />
          </button>
        </div>

        <div className="p-6 overflow-y-auto flex-1">
          <div 
            className={`border-2 border-dashed rounded-xl p-10 flex flex-col items-center justify-center text-center transition-colors ${
              dragActive ? 'border-stone-900 bg-stone-50' : 'border-stone-200 hover:border-stone-300'
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <FiUploadCloud size={48} className={`mb-4 ${dragActive ? 'text-stone-900' : 'text-stone-300'}`} />
            <h3 className="text-lg font-medium text-stone-900 mb-2">Drag and drop your files here</h3>
            <p className="text-sm text-stone-500 mb-6">Support for JPG, PNG, WebP, MP4, PDF up to 50MB</p>
            
            <label className="px-6 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors cursor-pointer">
              Browse Files
              <input type="file" multiple className="hidden" onChange={handleChange} />
            </label>
          </div>

          {files.length > 0 && (
            <div className="mt-8 space-y-3">
              <h4 className="text-xs font-bold text-stone-900 uppercase tracking-widest">Upload Queue ({files.length})</h4>
              {files.map(fileObj => (
                <div key={fileObj.id} className="bg-stone-50 border border-stone-200 rounded-lg p-3 flex items-center gap-4">
                  <div className="w-10 h-10 rounded bg-white border border-stone-200 flex items-center justify-center shrink-0 text-stone-500">
                    <FiFile />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-1">
                      <span className="text-sm font-medium text-stone-900 truncate">{fileObj.file.name}</span>
                      {fileObj.status === 'success' ? (
                        <FiCheckCircle className="text-green-500 shrink-0" />
                      ) : fileObj.status === 'error' ? (
                        <FiAlertCircle className="text-red-500 shrink-0" />
                      ) : (
                        <span className="text-xs text-stone-500">{(fileObj.file.size / 1024 / 1024).toFixed(2)} MB</span>
                      )}
                    </div>
                    {fileObj.status === 'uploading' || fileObj.status === 'success' ? (
                      <div className="w-full bg-stone-200 rounded-full h-1.5 overflow-hidden">
                        <div 
                          className="bg-stone-900 h-1.5 rounded-full transition-all duration-300" 
                          style={{ width: `${fileObj.progress}%` }}
                        ></div>
                      </div>
                    ) : null}
                  </div>
                  {fileObj.status === 'pending' && !uploading && (
                    <button onClick={() => removeFile(fileObj.id)} className="p-2 text-stone-400 hover:text-red-500 transition-colors shrink-0">
                      <FiX />
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="px-6 py-4 border-t border-stone-100 bg-stone-50 flex justify-end gap-3">
          <button onClick={onClose} className="px-4 py-2 text-stone-600 font-medium text-sm hover:text-stone-900">
            Cancel
          </button>
          <button 
            onClick={startUpload} 
            disabled={files.length === 0 || uploading}
            className={`px-6 py-2 rounded-lg text-sm font-medium transition-colors ${
              files.length === 0 || uploading 
                ? 'bg-stone-200 text-stone-400 cursor-not-allowed' 
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            {uploading ? 'Uploading...' : 'Upload Files'}
          </button>
        </div>
      </div>
    </div>
  );
}
