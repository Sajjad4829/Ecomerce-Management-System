import React, { useState, useRef } from 'react';
import { FiUploadCloud, FiX, FiPlus, FiImage, FiSettings } from 'react-icons/fi';

export default function MediaUploader({ media, onChange }) {
  const [dragActive, setDragActive] = useState(false);
  const fileInputRef = useRef(null);
  
  // Convert local file to object URL just for preview purposes (assuming no real backend yet)
  const handleFiles = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const urls = validFiles.map(file => URL.createObjectURL(file));
    
    if (urls.length > 0) {
      if (!media.primaryImage && urls.length === 1 && media.gallery.length === 0) {
        onChange('primaryImage', urls[0]);
      } else {
        onChange('gallery', [...media.gallery, ...urls]);
      }
    }
  };

  const onDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const onDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const removeImage = (url, isPrimary) => {
    if (isPrimary) {
      // If primary is removed, promote first gallery image if exists
      if (media.gallery.length > 0) {
        onChange('primaryImage', media.gallery[0]);
        onChange('gallery', media.gallery.slice(1));
      } else {
        onChange('primaryImage', '');
      }
    } else {
      onChange('gallery', media.gallery.filter(i => i !== url));
    }
  };

  const setAsPrimary = (url) => {
    const oldPrimary = media.primaryImage;
    onChange('primaryImage', url);
    onChange('gallery', [...media.gallery.filter(i => i !== url), oldPrimary].filter(Boolean));
  };
  
  // 360 viewer frames handlers
  const handle360Files = (files) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    const urls = validFiles.map(file => URL.createObjectURL(file));
    
    if (urls.length > 0) {
      onChange('view360', { ...media.view360, frames: [...media.view360.frames, ...urls] });
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-[#E5E7F2] shadow-[0_2px_12px_rgba(0,0,0,0.02)] p-6 md:p-8">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 bg-[#111A4A] text-white rounded-lg"><FiImage size={16} /></div>
        <h2 className="text-lg font-bold text-[#111A4A]">Product Images & Media</h2>
      </div>
      <p className="text-sm text-[#7C849F] mb-6 ml-11">Upload high quality images and videos</p>

      {/* Main Uploader */}
      <div 
        className={`border-2 border-dashed rounded-2xl p-10 flex flex-col items-center justify-center text-center transition-colors ${
          dragActive ? 'border-[#4F46FF] bg-[#4F46FF]/5' : 'border-[#4F46FF]/30 bg-[#EEF0FF]/30'
        }`}
        onDragEnter={onDrag}
        onDragLeave={onDrag}
        onDragOver={onDrag}
        onDrop={onDrop}
      >
        <div className="w-14 h-14 bg-white rounded-full shadow-[0_4px_12px_rgba(79,70,255,0.1)] flex items-center justify-center text-[#4F46FF] mb-5">
          <FiUploadCloud size={28} />
        </div>
        <h3 className="text-[#111A4A] font-bold text-lg mb-1">Drag & drop images here</h3>
        <p className="text-[#7C849F] text-sm mb-5">or click to browse</p>
        <button 
          onClick={() => fileInputRef.current?.click()}
          className="px-8 py-2.5 bg-gradient-to-r from-[#4F46FF] to-[#6D63FF] text-white text-sm font-semibold rounded-xl hover:opacity-90 transition-opacity shadow-[0_4px_14px_rgba(79,70,255,0.3)]"
        >
          Choose Files
        </button>
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          className="hidden" 
          ref={fileInputRef} 
          onChange={(e) => handleFiles(e.target.files)}
        />
        <p className="text-[#7C849F] text-xs mt-5">Supports: JPG, PNG, WebP (Max 10MB each)</p>
      </div>

      {/* Gallery Previews */}
      {(media.primaryImage || media.gallery.length > 0) && (
        <div className="mt-8 space-y-4">
          <h3 className="text-sm font-bold text-[#111A4A]">Uploaded Media</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            
            {/* Primary Image */}
            {media.primaryImage && (
              <div className="aspect-[4/3] rounded-2xl overflow-hidden border-2 border-[#4F46FF] bg-stone-50 relative group">
                <img src={media.primaryImage} alt="Primary" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                  <button onClick={() => removeImage(media.primaryImage, true)} className="p-2 bg-white/20 hover:bg-red-500 rounded-full text-white backdrop-blur">
                    <FiX size={16} />
                  </button>
                </div>
                <div className="absolute top-2 left-2 px-2 py-1 bg-[#4F46FF] text-white text-[10px] font-bold uppercase rounded-md shadow-sm">
                  Primary
                </div>
              </div>
            )}

            {/* Gallery Images */}
            {media.gallery.map((img, idx) => (
              <div key={idx} className="aspect-[4/3] rounded-2xl overflow-hidden border border-[#E5E7F2] bg-stone-50 relative group">
                <img src={img} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2 flex-col">
                  <button onClick={() => setAsPrimary(img)} className="px-3 py-1.5 bg-white text-[#111A4A] text-xs font-bold rounded-lg shadow-sm hover:bg-[#EEF0FF]">
                    Set Primary
                  </button>
                  <button onClick={() => removeImage(img, false)} className="p-2 bg-white/20 hover:bg-red-500 rounded-full text-white backdrop-blur">
                    <FiX size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* 360 Viewer Settings */}
      <div className="mt-8 pt-8 border-t border-[#E5E7F2]">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-sm font-bold text-[#111A4A]">360° Product Viewer</h3>
            <p className="text-xs text-[#7C849F]">Upload 36 frames for a smooth 360 rotation</p>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input 
              type="checkbox" 
              className="sr-only peer" 
              checked={media.view360?.enabled}
              onChange={(e) => onChange('view360', { ...media.view360, enabled: e.target.checked })}
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#4F46FF]"></div>
          </label>
        </div>

        {media.view360?.enabled && (
          <div className="space-y-4">
             <div className="border border-dashed border-[#E5E7F2] rounded-xl p-4 flex flex-col items-center justify-center relative bg-stone-50">
               <input 
                 type="file" 
                 multiple 
                 accept="image/*" 
                 className="absolute inset-0 w-full h-full opacity-0 cursor-pointer" 
                 onChange={(e) => handle360Files(e.target.files)}
               />
               <FiUploadCloud size={24} className="text-[#7C849F] mb-2" />
               <span className="text-sm font-semibold text-[#111A4A]">Upload 360° Frames</span>
             </div>
             
             {media.view360.frames.length > 0 && (
                <div>
                   <div className="text-xs font-bold text-[#111A4A] mb-2">Uploaded Frames ({media.view360.frames.length})</div>
                   <div className="flex gap-2 overflow-auto no-scrollbar pb-2">
                     {media.view360.frames.map((frame, i) => (
                       <div key={i} className="w-16 h-16 shrink-0 rounded-lg overflow-hidden border border-[#E5E7F2] relative group">
                         <img src={frame} alt={`Frame ${i}`} className="w-full h-full object-cover" />
                         <button 
                           onClick={() => onChange('view360', { ...media.view360, frames: media.view360.frames.filter((_, idx) => idx !== i) })}
                           className="absolute inset-0 bg-red-500/80 text-white flex items-center justify-center opacity-0 group-hover:opacity-100"
                         >
                           <FiX size={14} />
                         </button>
                       </div>
                     ))}
                   </div>
                </div>
             )}
          </div>
        )}
      </div>

    </div>
  );
}
