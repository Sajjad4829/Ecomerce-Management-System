import { useState } from 'react';
import { 
  FiX, FiMonitor, FiTablet, FiSmartphone, FiCheck, 
  FiShoppingBag, FiStar, FiSliders, FiList, FiImage, FiGrid, FiArrowLeft
} from 'react-icons/fi';
import StatusBadge from './StatusBadge';

export default function TemplatePreviewModal({ template, isOpen, onClose }) {
  const [device, setDevice] = useState('desktop');

  if (!isOpen || !template) return null;

  const deviceWidths = {
    desktop: 'w-full max-w-5xl',
    tablet: 'w-[768px]',
    mobile: 'w-[375px]'
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between overflow-hidden">
      {/* Top Controls Bar */}
      <div className="h-14 bg-stone-900 border-b border-stone-800 px-6 flex items-center justify-between text-white shrink-0">
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-white rounded-lg transition-colors flex items-center gap-1 text-xs font-semibold"
          >
            <FiArrowLeft size={16} /> Back to Dashboard
          </button>
          <div className="h-4 w-px bg-stone-800" />
          <div className="flex items-center gap-2">
            <h3 className="font-serif font-bold text-sm text-stone-100">{template.name}</h3>
            <span className="text-[10px] font-mono uppercase bg-amber-950 text-amber-300 border border-amber-800 px-2 py-0.5 rounded font-bold">
              {template.type} Preview
            </span>
          </div>
        </div>

        {/* Viewport Switcher */}
        <div className="flex items-center gap-1 bg-stone-950 p-1 rounded-lg border border-stone-800">
          <button
            onClick={() => setDevice('desktop')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
              device === 'desktop' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
            }`}
          >
            <FiMonitor size={14} /> Desktop
          </button>
          <button
            onClick={() => setDevice('tablet')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
              device === 'tablet' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
            }`}
          >
            <FiTablet size={14} /> Tablet
          </button>
          <button
            onClick={() => setDevice('mobile')}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs font-medium transition-all ${
              device === 'mobile' ? 'bg-amber-500 text-stone-950 font-bold' : 'text-stone-400 hover:text-white'
            }`}
          >
            <FiSmartphone size={14} /> Mobile
          </button>
        </div>

        <button
          onClick={onClose}
          className="p-2 text-stone-400 hover:text-white rounded-lg transition-colors"
        >
          <FiX size={20} />
        </button>
      </div>

      {/* Main Preview Frame */}
      <div className="flex-1 overflow-y-auto p-6 bg-stone-950 flex items-start justify-center">
        <div className={`bg-white shadow-2xl rounded-t-xl overflow-hidden transition-all duration-300 ${deviceWidths[device]} my-2 min-h-[700px]`}>
          
          {/* Mock Global Header */}
          <header className="bg-stone-900 text-stone-100 p-4 border-b border-stone-800 flex items-center justify-between text-xs">
            <div className="font-serif font-bold text-base tracking-widest text-amber-200 uppercase">
              Aurelian & Co.
            </div>
            <nav className="hidden sm:flex items-center gap-6 text-[11px] font-mono text-stone-300 uppercase tracking-wider">
              <span>Sanctuary</span>
              <span>Dining</span>
              <span>Living</span>
              <span>Bespoke Trade</span>
            </nav>
            <div className="flex items-center gap-3">
              <span className="p-1.5 rounded-full bg-stone-800 text-amber-300">
                <FiShoppingBag size={14} />
              </span>
            </div>
          </header>

          {/* Template Dynamic Content Mock Rendering */}
          <div className="p-8 space-y-8">
            {template.type === 'Commerce' ? (
              /* Product Detail Page Mock */
              <div className="space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Left: Product Gallery Placeholder */}
                  <div className="space-y-3">
                    <div className="h-96 bg-stone-100 rounded-xl border-2 border-dashed border-amber-300 p-4 flex flex-col items-center justify-center text-center relative">
                      <FiImage size={36} className="text-amber-600 mb-2" />
                      <span className="font-serif font-bold text-stone-900 text-sm">Product Gallery Dynamic Slot</span>
                      <span className="text-xs text-stone-500 mt-1">
                        [PRODUCT_GALLERY] Dynamic high-res carousel & 3D model viewport
                      </span>
                      <span className="absolute bottom-3 right-3 bg-amber-100 text-amber-900 text-[10px] font-mono font-bold px-2 py-0.5 rounded">
                        Runtime Data
                      </span>
                    </div>
                    <div className="grid grid-cols-4 gap-2">
                      {[1, 2, 3, 4].map((i) => (
                        <div key={i} className="h-16 bg-stone-50 border border-stone-200 rounded-lg flex items-center justify-center text-[10px] text-stone-400 font-mono">
                          Thumb {i}
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Right: Product Purchase Meta Placeholder */}
                  <div className="space-y-4">
                    <div className="p-4 bg-amber-50/40 border-2 border-dashed border-amber-300 rounded-xl space-y-2">
                      <div className="text-[10px] font-mono uppercase text-amber-800 font-bold">
                        [PRODUCT_TITLE & PRICING]
                      </div>
                      <h1 className="font-serif font-bold text-2xl text-stone-900">
                        The Aurelian Sovereign Curved Sofa
                      </h1>
                      <div className="flex items-center gap-3">
                        <span className="text-xl font-serif font-bold text-stone-900">$12,850 USD</span>
                        <span className="text-xs text-emerald-700 bg-emerald-100 font-mono font-bold px-2 py-0.5 rounded">
                          In Stock • Trade Discount Eligible
                        </span>
                      </div>
                    </div>

                    <div className="p-4 border-2 border-dashed border-amber-300 rounded-xl bg-amber-50/20 space-y-2">
                      <div className="text-[10px] font-mono uppercase text-amber-800 font-bold">
                        [PRODUCT_VARIANTS & SWATCHES]
                      </div>
                      <div className="text-xs text-stone-700 font-medium">Material: Italian Bouclé (Cream)</div>
                      <div className="flex gap-2">
                        <div className="w-8 h-8 rounded-full bg-stone-200 border-2 border-stone-900 ring-2 ring-stone-900/20" />
                        <div className="w-8 h-8 rounded-full bg-stone-800" />
                        <div className="w-8 h-8 rounded-full bg-amber-900" />
                      </div>
                    </div>

                    <button className="w-full py-3.5 bg-stone-900 text-white font-mono text-xs uppercase tracking-widest font-bold rounded-xl shadow-lg">
                      Request Bespoke Consultation
                    </button>
                  </div>
                </div>

                {/* Specs Table Placeholder */}
                <div className="p-6 bg-stone-50 border-2 border-dashed border-stone-300 rounded-xl space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="font-serif font-bold text-stone-900 text-sm">
                      [PRODUCT_SPECS] Craftsmanship & Technical Specs
                    </span>
                    <span className="text-xs font-mono text-stone-500">Dynamic Slot</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4 text-xs font-mono text-stone-600">
                    <div>Timber: Kiln-dried FSC Oak</div>
                    <div>Martindale Rub Count: 100,000+</div>
                    <div>Origin: Florence, Italy</div>
                  </div>
                </div>
              </div>
            ) : (
              /* Collection / Page Generic Mock */
              <div className="space-y-6">
                <div className="p-12 bg-stone-900 text-white rounded-2xl border-2 border-dashed border-amber-400 text-center space-y-3">
                  <span className="text-[10px] font-mono text-amber-400 uppercase font-bold tracking-widest">
                    [COLLECTION_HEADER] Dynamic Hero Banner
                  </span>
                  <h1 className="font-serif text-3xl font-bold text-amber-100">
                    The Sanctuary Collection
                  </h1>
                  <p className="text-xs text-stone-300 max-w-lg mx-auto">
                    Hand-curated Scandinavian walnut & tailored bouclé furnishings designed for luxury residences.
                  </p>
                </div>

                {/* Grid Placeholder */}
                <div className="p-6 border-2 border-dashed border-amber-300 rounded-xl bg-amber-50/20 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono font-bold text-stone-900">
                    <span>[PRODUCT_GRID] Catalog Grid Slot</span>
                    <span>showing 12 items</span>
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((idx) => (
                      <div key={idx} className="h-44 bg-stone-100 border border-stone-200 rounded-lg p-3 flex flex-col justify-between">
                        <div className="h-24 bg-stone-200 rounded" />
                        <div className="h-3 bg-stone-300 rounded w-3/4" />
                        <div className="h-3 bg-stone-300 rounded w-1/2" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Mock Global Footer */}
          <footer className="bg-stone-950 text-stone-400 p-8 border-t border-stone-800 text-xs text-center font-mono">
            Aurelian Global Storefront Architecture • Dynamic Hydration Ready
          </footer>
        </div>
      </div>
    </div>
  );
}
