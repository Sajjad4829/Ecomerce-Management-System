import { useState } from 'react';
import { FiX, FiMonitor, FiTablet, FiSmartphone, FiCheckCircle } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import PopupCanvas from './PopupCanvas';

export default function PopupPreviewModal({
  isOpen,
  onClose,
  campaignName = 'Campaign Preview',
  popupType = 'Modal',
  content = {},
  layout = {}
}) {
  const [device, setDevice] = useState('desktop');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-black/10 overflow-hidden">
        
        {/* Header */}
        <div className="p-4 bg-gray-50 border-b border-black/5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
              Live Popup Campaign Preview — {campaignName}
            </h3>
            <p className="text-xs text-gray-500">Simulating popup card appearance inside store front page layout.</p>
          </div>

          <div className="flex items-center gap-1 bg-gray-200/80 p-1 rounded-xl border border-black/5">
            <button
              type="button"
              onClick={() => setDevice('desktop')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                device === 'desktop' ? "bg-white text-black shadow-2xs" : "text-gray-600 hover:text-black"
              )}
            >
              <FiMonitor size={14} /> Desktop
            </button>
            <button
              type="button"
              onClick={() => setDevice('tablet')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                device === 'tablet' ? "bg-white text-black shadow-2xs" : "text-gray-600 hover:text-black"
              )}
            >
              <FiTablet size={14} /> Tablet
            </button>
            <button
              type="button"
              onClick={() => setDevice('mobile')}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer",
                device === 'mobile' ? "bg-white text-black shadow-2xs" : "text-gray-600 hover:text-black"
              )}
            >
              <FiSmartphone size={14} /> Mobile
            </button>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-gray-400 hover:text-black hover:bg-black/5 rounded-lg transition-colors"
          >
            <FiX size={18} />
          </button>
        </div>

        {/* Viewport simulation */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-200 flex justify-center items-center">
          <div className={cn(
            "bg-stone-100 rounded-2xl border border-black/10 shadow-lg relative min-h-[460px] flex flex-col justify-between overflow-hidden transition-all duration-300",
            device === 'desktop' && "w-full max-w-3xl",
            device === 'tablet' && "w-[580px]",
            device === 'mobile' && "w-[360px]"
          )}>
            
            {/* Mock website header background */}
            <div className="p-4 bg-white border-b border-black/5 flex items-center justify-between text-xs text-gray-400">
              <span className="font-serif font-bold text-black text-sm">AURELIAN MILANO</span>
              <div className="flex items-center gap-4">
                <span>Living</span>
                <span>Dining</span>
                <span>Showrooms</span>
              </div>
            </div>

            {/* Simulated Popup Canvas Element */}
            <div className="p-4 my-auto">
              <PopupCanvas
                popupType={popupType}
                title={content.title}
                description={content.description}
                imageUrl={content.imageUrl}
                buttonText={content.buttonText}
                secondaryButtonText={content.secondaryButtonText}
                showForm={content.showForm}
                backgroundColor={layout.backgroundColor}
                textColor={layout.textColor}
                overlay={layout.overlay}
                borderRadius={layout.borderRadius}
              />
            </div>

            {/* Mock website footer */}
            <div className="p-3 bg-stone-200 text-[10px] text-gray-500 text-center">
              Aurelian Luxury House © 2025 • Simulated Front Store Preview
            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
