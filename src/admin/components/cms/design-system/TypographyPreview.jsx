import { useState } from 'react';

const TYPOGRAPHY_SCALES = [
  { id: 'h1', name: 'Heading 1', size: '3.75rem', weight: '700', lineHeight: '1.2', family: 'Playfair Display' },
  { id: 'h2', name: 'Heading 2', size: '3rem', weight: '700', lineHeight: '1.2', family: 'Playfair Display' },
  { id: 'h3', name: 'Heading 3', size: '2.25rem', weight: '700', lineHeight: '1.3', family: 'Playfair Display' },
  { id: 'h4', name: 'Heading 4', size: '1.875rem', weight: '600', lineHeight: '1.3', family: 'Playfair Display' },
  { id: 'h5', name: 'Heading 5', size: '1.5rem', weight: '600', lineHeight: '1.4', family: 'Playfair Display' },
  { id: 'h6', name: 'Heading 6', size: '1.25rem', weight: '600', lineHeight: '1.4', family: 'Playfair Display' },
  { id: 'body', name: 'Body Large', size: '1.125rem', weight: '400', lineHeight: '1.6', family: 'Inter' },
  { id: 'body-sm', name: 'Body Small', size: '0.875rem', weight: '400', lineHeight: '1.5', family: 'Inter' },
  { id: 'caption', name: 'Caption', size: '0.75rem', weight: '500', lineHeight: '1.5', family: 'Inter', uppercase: true, tracking: '0.1em' },
];

export default function TypographyPreview() {
  const [fontFamilyHeading, setFontFamilyHeading] = useState('Playfair Display');
  const [fontFamilyBody, setFontFamilyBody] = useState('Inter');
  const [baseSize, setBaseSize] = useState('16px');

  return (
    <div className="space-y-8">
      {/* Global Typography Settings */}
      <div className="bg-white border border-black/5 rounded-xl p-6 shadow-sm">
        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-6 border-b border-black/5 pb-2">
          Global Font Families
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Heading Font</label>
            <select 
              value={fontFamilyHeading}
              onChange={(e) => setFontFamilyHeading(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/30 transition-all appearance-none"
            >
              <option value="Playfair Display">Playfair Display (Serif)</option>
              <option value="Merriweather">Merriweather (Serif)</option>
              <option value="Inter">Inter (Sans)</option>
              <option value="Roboto">Roboto (Sans)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Body Font</label>
            <select 
              value={fontFamilyBody}
              onChange={(e) => setFontFamilyBody(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/30 transition-all appearance-none"
            >
              <option value="Inter">Inter (Sans)</option>
              <option value="Roboto">Roboto (Sans)</option>
              <option value="Open Sans">Open Sans (Sans)</option>
              <option value="Lora">Lora (Serif)</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold text-gray-500 uppercase tracking-widest mb-2">Base Root Size</label>
            <input 
              type="text" 
              value={baseSize}
              onChange={(e) => setBaseSize(e.target.value)}
              className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white focus:border-black/30 transition-all"
            />
          </div>
        </div>
      </div>

      {/* Typography Scale Preview */}
      <div className="bg-white border border-black/5 rounded-xl p-6 shadow-sm overflow-hidden">
        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-6 border-b border-black/5 pb-2">
          Typography Scale
        </h3>
        
        <div className="space-y-8">
          {TYPOGRAPHY_SCALES.map(scale => (
            <div key={scale.id} className="flex flex-col md:flex-row md:items-center gap-6 border-b border-black/5 pb-8 last:border-0 last:pb-0">
              <div className="w-full md:w-48 shrink-0">
                <div className="text-sm font-bold text-[#1A1A1A] mb-1">{scale.name}</div>
                <div className="text-xs text-gray-500 font-mono space-y-1">
                  <div>Size: {scale.size}</div>
                  <div>Weight: {scale.weight}</div>
                  <div>Line Height: {scale.lineHeight}</div>
                </div>
              </div>
              <div className="flex-1 overflow-hidden">
                <div 
                  className="text-[#1A1A1A] truncate"
                  style={{
                    fontSize: scale.size,
                    fontWeight: scale.weight,
                    lineHeight: scale.lineHeight,
                    fontFamily: scale.family === 'Playfair Display' ? fontFamilyHeading : fontFamilyBody,
                    textTransform: scale.uppercase ? 'uppercase' : 'none',
                    letterSpacing: scale.tracking || 'normal'
                  }}
                >
                  The quick brown fox jumps over the lazy dog
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
