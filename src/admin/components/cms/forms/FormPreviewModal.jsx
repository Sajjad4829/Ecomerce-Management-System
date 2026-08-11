import { useState } from 'react';
import { FiX, FiMonitor, FiTablet, FiSmartphone, FiCheckCircle, FiRefreshCw } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import FormField from './FormField';

export default function FormPreviewModal({
  isOpen,
  onClose,
  formName = 'Form Preview',
  fields = [],
  settings = {}
}) {
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'tablet' | 'mobile'
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col border border-black/10 overflow-hidden">
        
        {/* Top Header */}
        <div className="p-4 bg-gray-50 border-b border-black/5 flex items-center justify-between shrink-0">
          <div>
            <h3 className="font-serif font-bold text-base text-[#1A1A1A]">
              Live Preview — {formName}
            </h3>
            <p className="text-xs text-gray-500">Interactive frontend simulation with device layout frames.</p>
          </div>

          {/* Device Switcher */}
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

        {/* Device Frame Viewport Container */}
        <div className="flex-1 overflow-y-auto custom-scrollbar p-6 bg-gray-100 flex justify-center items-start">
          <div className={cn(
            "bg-white rounded-2xl border border-black/10 shadow-lg transition-all duration-300 p-6 my-auto",
            device === 'desktop' && "w-full max-w-2xl",
            device === 'tablet' && "w-[580px]",
            device === 'mobile' && "w-[360px]"
          )}>
            
            {submitted ? (
              <div className="text-center py-12 space-y-4 animate-in zoom-in-95">
                <div className="w-14 h-14 bg-green-100 text-green-700 rounded-full flex items-center justify-center mx-auto">
                  <FiCheckCircle size={32} />
                </div>
                <h4 className="font-serif font-bold text-xl text-[#1A1A1A]">Submission Received!</h4>
                <p className="text-xs text-gray-600 leading-relaxed max-w-md mx-auto">
                  {settings.successMessage || 'Thank you for your inquiry. Our interior consultants will respond shortly.'}
                </p>
                <button
                  type="button"
                  onClick={() => setSubmitted(false)}
                  className="px-4 py-2 bg-gray-100 border border-black/10 rounded-lg text-xs font-bold text-gray-700 flex items-center gap-1.5 mx-auto hover:bg-gray-200 cursor-pointer"
                >
                  <FiRefreshCw size={13} /> Reset Test Submission
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="border-b border-black/10 pb-3 mb-2">
                  <h3 className="font-serif font-bold text-lg text-[#1A1A1A]">{formName}</h3>
                  <p className="text-xs text-gray-500">Please fill in all requested specifications below.</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  {fields.map((field) => (
                    <FormField
                      key={field.id}
                      field={field}
                      isSelected={false}
                      isPreview={true}
                    />
                  ))}
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#1A1A1A] hover:bg-black text-white rounded-xl text-xs font-bold uppercase tracking-wider transition-all shadow-md mt-4 cursor-pointer"
                >
                  {settings.submitText || 'Submit Inquiry'}
                </button>
              </form>
            )}

          </div>
        </div>

      </div>
    </div>
  );
}
