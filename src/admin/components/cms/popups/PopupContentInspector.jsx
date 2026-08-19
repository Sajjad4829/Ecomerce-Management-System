import { useState } from 'react';
import { FiType, FiImage, FiMousePointer, FiFileText, FiLayers } from 'react-icons/fi';

export default function PopupContentInspector({
  content = {},
  onChangeContent,
  onOpenMediaPicker
}) {
  const {
    title = 'Exclusive Private Salon Preview',
    description = 'Enjoy 10% complimentary privilege on your first bespoke modular velvet sofa order.',
    imageUrl = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
    buttonText = 'Claim VIP Offer',
    secondaryButtonText = 'No thanks, continue browsing',
    showForm = true
  } = content;

  const handleChange = (key, val) => {
    onChangeContent({ ...content, [key]: val });
  };

  return (
    <div className="bg-surface border border-black/10 rounded-xl p-4 shadow-2xs space-y-4">
      <div className="border-b border-black/5 pb-2">
        <h4 className="font-serif font-bold text-sm text-text-primary">Campaign Content & Messaging</h4>
        <p className="text-[11px] text-text-muted">Configure headlines, offer terms, banner media, and CTA labels.</p>
      </div>

      <div className="space-y-3.5 text-xs">
        
        {/* Title */}
        <div className="space-y-1">
          <label className="font-bold text-text-secondary uppercase tracking-wider text-[10px]">Headline Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => handleChange('title', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-background border border-black/10 rounded-lg text-xs font-bold focus:bg-surface focus:outline-none"
          />
        </div>

        {/* Description */}
        <div className="space-y-1">
          <label className="font-bold text-text-secondary uppercase tracking-wider text-[10px]">Body / Offer Subtitle</label>
          <textarea
            rows={3}
            value={description}
            onChange={(e) => handleChange('description', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-background border border-black/10 rounded-lg text-xs focus:bg-surface focus:outline-none resize-none"
          />
        </div>

        {/* Image Selection */}
        <div className="space-y-1">
          <label className="font-bold text-text-secondary uppercase tracking-wider text-[10px]">Popup Banner Media Image</label>
          <div className="flex items-center gap-3">
            <div className="w-16 h-12 bg-gray-100 rounded-lg overflow-hidden border border-black/10 shrink-0">
              {imageUrl ? (
                <img src={imageUrl} alt="Banner Preview" className="w-full h-full object-cover" />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-300">
                  <FiImage size={16} />
                </div>
              )}
            </div>
            <button
              type="button"
              onClick={onOpenMediaPicker}
              className="px-3 py-1.5 bg-surface border border-black/10 rounded-lg text-xs font-bold hover:bg-background flex items-center gap-1.5 shadow-2xs cursor-pointer"
            >
              <FiImage size={13} /> Select Image
            </button>
          </div>
        </div>

        {/* Form Embed Toggle */}
        <div className="p-3 bg-background border border-black/5 rounded-lg flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-800 block text-xs">Embed Email Input Field</span>
            <span className="text-[10px] text-text-muted">Capture lead email directly inside popup card</span>
          </div>
          <input
            type="checkbox"
            checked={showForm}
            onChange={(e) => handleChange('showForm', e.target.checked)}
            className="w-4 h-4 rounded border-black/20 cursor-pointer"
          />
        </div>

        {/* Primary CTA Label */}
        <div className="space-y-1">
          <label className="font-bold text-text-secondary uppercase tracking-wider text-[10px]">Primary CTA Button Text</label>
          <input
            type="text"
            value={buttonText}
            onChange={(e) => handleChange('buttonText', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-background border border-black/10 rounded-lg text-xs font-bold focus:bg-surface focus:outline-none"
          />
        </div>

        {/* Secondary Dismiss Text */}
        <div className="space-y-1">
          <label className="font-bold text-text-secondary uppercase tracking-wider text-[10px]">Secondary Dismiss Link Text</label>
          <input
            type="text"
            value={secondaryButtonText}
            onChange={(e) => handleChange('secondaryButtonText', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-background border border-black/10 rounded-lg text-xs text-text-secondary focus:bg-surface focus:outline-none"
          />
        </div>

      </div>
    </div>
  );
}
