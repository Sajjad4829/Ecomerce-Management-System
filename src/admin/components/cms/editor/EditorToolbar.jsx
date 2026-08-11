import { motion } from 'framer-motion';
import { 
  FiArrowLeft, FiMonitor, FiTablet, FiSmartphone, 
  FiRotateCcw, FiRotateCw, FiPlay, FiSettings, FiCheck, FiMoreVertical 
} from 'react-icons/fi';
import { cn } from '../../../../utils/cn';
import { Link } from 'react-router-dom';

export default function EditorToolbar({ device, setDevice, onOpenSettings }) {
  return (
    <div className="h-16 bg-white border-b border-black/10 flex items-center justify-between px-4 shrink-0 z-20 sticky top-0">
      {/* Left: Back & Title */}
      <div className="flex items-center gap-4 w-1/3">
        <Link 
          to="/admin/cms/pages" 
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <FiArrowLeft size={18} />
        </Link>
        <div className="h-6 w-px bg-black/10"></div>
        <div>
          <h1 className="text-sm font-bold text-[#1A1A1A] font-serif">Home Page V2</h1>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-yellow-500"></span>
            <span className="text-[10px] text-gray-500 font-medium uppercase tracking-wider">Draft - Last saved 2m ago</span>
          </div>
        </div>
      </div>

      {/* Center: Device Switcher & History */}
      <div className="flex items-center gap-6 justify-center w-1/3">
        <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-lg border border-black/5">
          <button 
            onClick={() => setDevice('desktop')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              device === 'desktop' ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-500 hover:text-[#1A1A1A]"
            )}
            title="Desktop view"
          >
            <FiMonitor size={16} />
          </button>
          <button 
            onClick={() => setDevice('tablet')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              device === 'tablet' ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-500 hover:text-[#1A1A1A]"
            )}
            title="Tablet view"
          >
            <FiTablet size={16} />
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={cn(
              "p-1.5 rounded-md transition-colors",
              device === 'mobile' ? "bg-white text-[#1A1A1A] shadow-sm" : "text-gray-500 hover:text-[#1A1A1A]"
            )}
            title="Mobile view"
          >
            <FiSmartphone size={16} />
          </button>
        </div>

        <div className="h-5 w-px bg-black/10"></div>

        <div className="flex items-center gap-2 text-gray-400">
          <button className="p-1.5 hover:text-[#1A1A1A] hover:bg-gray-100 rounded-md transition-colors" title="Undo">
            <FiRotateCcw size={16} />
          </button>
          <button className="p-1.5 hover:text-[#1A1A1A] hover:bg-gray-100 rounded-md transition-colors" title="Redo">
            <FiRotateCw size={16} />
          </button>
        </div>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3 w-1/3 justify-end">
        <button 
          onClick={onOpenSettings}
          className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors"
          title="Page Settings"
        >
          <FiSettings size={18} />
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors" title="Preview Live">
          <FiPlay size={18} />
        </button>
        
        <div className="h-6 w-px bg-black/10 mx-1"></div>

        <button className="px-4 py-2 text-xs font-semibold text-gray-600 hover:text-[#1A1A1A] transition-colors">
          Save Draft
        </button>
        <button className="px-5 py-2 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-sm flex items-center gap-2">
          <FiCheck /> Publish
        </button>
        <button className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors">
          <FiMoreVertical size={18} />
        </button>
      </div>
    </div>
  );
}
