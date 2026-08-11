import { FiDownload, FiUpload, FiMonitor, FiTablet, FiSmartphone, FiEye, FiSave } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function LayoutToolbar({ activeSection, device, setDevice }) {
  return (
    <div className="bg-white p-4 rounded-xl border border-black/5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm sticky top-0 z-20 mb-6">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <h2 className="text-lg font-bold font-serif text-[#1A1A1A] capitalize">{activeSection.replace('-', ' ')}</h2>
        <div className="h-6 w-px bg-black/10"></div>
        <div className="text-xs font-semibold text-gray-500 bg-gray-100 px-2 py-1 rounded">
          Active Layout: <span className="text-[#1A1A1A]">Luxury Commerce</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {/* Device Switcher */}
        <div className="hidden md:flex items-center p-1 bg-gray-50 rounded-lg border border-black/5 mr-2">
          <button 
            onClick={() => setDevice('desktop')}
            className={cn(
              "p-1.5 rounded-md transition-all",
              device === 'desktop' ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-400 hover:text-[#1A1A1A]"
            )}
            title="Desktop"
          >
            <FiMonitor size={16} />
          </button>
          <button 
            onClick={() => setDevice('tablet')}
            className={cn(
              "p-1.5 rounded-md transition-all",
              device === 'tablet' ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-400 hover:text-[#1A1A1A]"
            )}
            title="Tablet"
          >
            <FiTablet size={16} />
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={cn(
              "p-1.5 rounded-md transition-all",
              device === 'mobile' ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-400 hover:text-[#1A1A1A]"
            )}
            title="Mobile"
          >
            <FiSmartphone size={16} />
          </button>
        </div>

        <button className="p-2 border border-black/10 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors" title="Export Layout">
          <FiDownload size={16} />
        </button>
        <button className="p-2 border border-black/10 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors" title="Import Layout">
          <FiUpload size={16} />
        </button>
        <div className="hidden md:block h-6 w-px bg-black/10 mx-1"></div>
        <button className="px-4 py-2 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 hover:bg-gray-50 transition-colors flex items-center gap-2">
          <FiEye size={14} /> Live Preview
        </button>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-lg flex items-center gap-2">
          <FiSave size={14} /> Publish
        </button>
      </div>
    </div>
  );
}
