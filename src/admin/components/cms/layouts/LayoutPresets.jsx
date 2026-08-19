import { FiEye, FiCopy, FiDownload } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

const PRESETS = [
  { id: 'luxury-commerce', name: 'Luxury Commerce', description: 'Standard top announcement bar, centered logo header, and 4-column rich footer.', updated: '2 days ago', active: true },
  { id: 'minimal-portfolio', name: 'Minimal Catalog', description: 'Hidden announcement bar, left-aligned logo with minimal navigation, simple centered footer.', updated: '1 week ago', active: false },
  { id: 'mega-store', name: 'Mega Store', description: 'Double top bar for contacts, robust mega menu layout, and expansive footer with newsletter.', updated: '2 weeks ago', active: false },
];

export default function LayoutPresets() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
      {PRESETS.map(preset => (
        <div key={preset.id} className={cn(
          "bg-surface border rounded-xl overflow-hidden hover:shadow-lg transition-all group flex flex-col",
          preset.active ? "border-[#1A1A1A] shadow-md" : "border-black/5"
        )}>
          <div className="w-full aspect-[16/9] bg-background border-b border-black/5 relative p-4 flex flex-col justify-between">
             {/* Abstract Wireframe Representation */}
             <div className="w-full h-3 bg-gray-300 rounded-full opacity-50 mb-2"></div>
             <div className="flex justify-between items-center mb-auto">
               <div className="w-16 h-4 bg-gray-400 rounded-full opacity-60"></div>
               <div className="flex gap-2">
                 <div className="w-8 h-2 bg-gray-300 rounded-full opacity-50"></div>
                 <div className="w-8 h-2 bg-gray-300 rounded-full opacity-50"></div>
                 <div className="w-8 h-2 bg-gray-300 rounded-full opacity-50"></div>
               </div>
             </div>
             
             <div className="w-full h-16 bg-gray-200 rounded mt-4 opacity-40"></div>
             
             {preset.active && (
               <div className="absolute top-3 right-3 bg-[#1A1A1A] text-white text-[10px] font-bold uppercase tracking-widest px-2 py-1 rounded shadow-sm">
                 Active Layout
               </div>
             )}

             <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 rounded-t-xl">
                <button className="w-10 h-10 bg-surface rounded-full flex items-center justify-center text-text-primary hover:scale-110 transition-transform shadow-lg" title="Preview Layout">
                  <FiEye size={18} />
                </button>
             </div>
          </div>
          
          <div className="p-5 flex flex-col flex-1">
             <div className="flex justify-between items-start mb-2">
                <h3 className="text-sm font-bold text-text-primary font-serif">{preset.name}</h3>
             </div>
             <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-6">
                {preset.description}
             </p>

             <div className="mt-auto flex items-center justify-between pt-4 border-t border-black/5">
                <span className="text-[10px] font-semibold text-text-muted uppercase tracking-widest">
                  Updated {preset.updated}
                </span>
                
                <div className="flex items-center gap-1">
                  {!preset.active && (
                     <button className="px-3 py-1 bg-gray-100 text-text-primary text-xs font-semibold rounded hover:bg-gray-200 transition-colors mr-2">
                       Apply
                     </button>
                  )}
                  <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-gray-100 rounded" title="Duplicate">
                    <FiCopy size={14} />
                  </button>
                  <button className="p-1.5 text-text-muted hover:text-text-primary hover:bg-gray-100 rounded" title="Export">
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
