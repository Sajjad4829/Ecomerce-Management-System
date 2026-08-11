import { FiEye, FiCopy, FiDownload } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

const PRESETS = [
  { id: 'luxury', name: 'Luxury Default', description: 'The standard premium furniture theme with Playfair Display and warm neutrals.', updated: '2 days ago', active: true, image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&q=80&w=400' },
  { id: 'minimal', name: 'Modern Minimal', description: 'Ultra-clean sans-serif look with sharp edges and stark contrasts.', updated: '1 week ago', active: false, image: 'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&q=80&w=400' },
  { id: 'scandi', name: 'Scandinavian', description: 'Light woods, soft curves, and muted pastel accents.', updated: '2 weeks ago', active: false, image: 'https://images.unsplash.com/photo-1598300042247-d088f8ab3a91?auto=format&fit=crop&q=80&w=400' },
  { id: 'dark', name: 'Midnight Premium', description: 'A dark mode variant for high-end luxury products.', updated: '1 month ago', active: false, image: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?auto=format&fit=crop&q=80&w=400' },
];

export default function ThemePresets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {PRESETS.map(preset => (
        <div key={preset.id} className={cn(
          "bg-white border rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col",
          preset.active ? "border-[#1A1A1A] shadow-md" : "border-black/5"
        )}>
          <div className="w-full aspect-[16/9] bg-gray-100 relative">
             {preset.image ? (
               <img src={preset.image} alt={preset.name} className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" />
             ) : (
               <div className="w-full h-full flex items-center justify-center text-gray-300 bg-[#F7F5F2]">No Preview</div>
             )}
             
             {preset.active && (
               <div className="absolute top-3 right-3 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-sm">
                 Active Theme
               </div>
             )}

             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3">
                <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#1A1A1A] hover:scale-110 transition-transform shadow-lg" title="Preview Theme">
                  <FiEye size={18} />
                </button>
             </div>
          </div>
          
          <div className="p-5 flex flex-col flex-1">
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-[#1A1A1A] font-serif">{preset.name}</h3>
             </div>
             <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed mb-6">
                {preset.description}
             </p>

             <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/5">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest">
                  Updated {preset.updated}
                </span>
                
                <div className="flex items-center gap-1">
                  {!preset.active && (
                     <button className="px-3 py-1 bg-gray-100 text-[#1A1A1A] text-xs font-semibold rounded hover:bg-gray-200 transition-colors mr-2">
                       Apply
                     </button>
                  )}
                  <button className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 rounded" title="Duplicate">
                    <FiCopy size={14} />
                  </button>
                  <button className="p-1.5 text-gray-400 hover:text-[#1A1A1A] hover:bg-gray-100 rounded" title="Export">
                    <FiDownload size={14} />
                  </button>
                </div>
             </div>
          </div>
        </div>
      ))}
    </div>
  );
}
