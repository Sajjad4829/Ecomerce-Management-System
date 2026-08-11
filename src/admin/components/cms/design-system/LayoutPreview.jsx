import { useState } from 'react';

const SPACING_TOKENS = [
  { id: 'xs', name: 'Extra Small', value: '0.25rem', px: '4px' },
  { id: 'sm', name: 'Small', value: '0.5rem', px: '8px' },
  { id: 'md', name: 'Medium', value: '1rem', px: '16px' },
  { id: 'lg', name: 'Large', value: '1.5rem', px: '24px' },
  { id: 'xl', name: 'Extra Large', value: '2rem', px: '32px' },
  { id: '2xl', name: '2X Large', value: '3rem', px: '48px' },
  { id: '3xl', name: '3X Large', value: '4rem', px: '64px' },
  { id: '4xl', name: '4X Large', value: '6rem', px: '96px' },
];

const RADIUS_TOKENS = [
  { id: 'none', name: 'None', value: '0px' },
  { id: 'sm', name: 'Small', value: '0.125rem' },
  { id: 'DEFAULT', name: 'Default', value: '0.25rem' },
  { id: 'md', name: 'Medium', value: '0.375rem' },
  { id: 'lg', name: 'Large', value: '0.5rem' },
  { id: 'xl', name: 'Extra Large', value: '0.75rem' },
  { id: 'full', name: 'Full', value: '9999px' },
];

export default function LayoutPreview() {
  const [globalRadius, setGlobalRadius] = useState('0px');

  return (
    <div className="space-y-8">
      
      {/* Border Radius */}
      <div className="bg-white border border-black/5 rounded-xl p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6 border-b border-black/5 pb-2">
           <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest">
             Border Radius (Shape)
           </h3>
           <select 
              value={globalRadius}
              onChange={(e) => setGlobalRadius(e.target.value)}
              className="px-3 py-1.5 bg-gray-50 border border-black/10 rounded-md text-xs font-semibold focus:outline-none focus:bg-white appearance-none"
            >
              <option value="0px">Sharp (0px)</option>
              <option value="4px">Slight (4px)</option>
              <option value="8px">Rounded (8px)</option>
              <option value="16px">Soft (16px)</option>
            </select>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-6">
          {RADIUS_TOKENS.map(token => (
            <div key={token.id} className="flex flex-col items-center">
               <div 
                 className="w-16 h-16 bg-[#1A1A1A] mb-3 transition-all"
                 style={{ borderRadius: token.value }}
               ></div>
               <div className="text-xs font-bold text-[#1A1A1A]">{token.name}</div>
               <div className="text-[10px] text-gray-500 font-mono">{token.value}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Spacing System */}
      <div className="bg-white border border-black/5 rounded-xl p-8 shadow-sm">
        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-6 border-b border-black/5 pb-2">
          Spacing Scale
        </h3>
        <div className="space-y-6">
          {SPACING_TOKENS.map(token => (
            <div key={token.id} className="flex items-center gap-6">
               <div className="w-24 shrink-0 text-right">
                  <div className="text-xs font-bold text-[#1A1A1A]">{token.name}</div>
                  <div className="text-[10px] text-gray-500 font-mono">{token.px} / {token.value}</div>
               </div>
               <div className="flex-1 bg-gray-50 border border-black/5 rounded-md p-2 flex items-center">
                 <div 
                   className="bg-[#A69076]/40 border border-[#A69076] h-6 rounded-sm"
                   style={{ width: token.value }}
                 ></div>
               </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
