import { FiSearch, FiSave, FiEye, FiArrowLeft, FiMonitor, FiSmartphone, FiColumns } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { cn } from '../../../../utils/cn';

export default function NavigationToolbar({ menuName, device, setDevice, viewMode, setViewMode }) {
  const navigate = useNavigate();

  return (
    <div className="bg-surface p-4 rounded-xl border border-black/5 flex flex-col md:flex-row gap-4 justify-between items-center shadow-sm sticky top-0 z-20 mb-6">
      <div className="flex items-center gap-4 w-full md:w-auto">
        <button 
          onClick={() => navigate('/admin/cms/navigation')}
          className="p-2 -ml-2 text-text-muted hover:text-text-primary transition-colors"
        >
          <FiArrowLeft size={20} />
        </button>
        <h2 className="text-lg font-bold font-serif text-text-primary">{menuName}</h2>
        <div className="h-6 w-px bg-black/10"></div>
        <div className="text-xs font-semibold text-text-muted bg-gray-100 px-2 py-1 rounded">
          Status: <span className="text-success">Active</span>
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full md:w-auto justify-end">
        {/* View Mode (Builder vs Mega Menu Editor) */}
        <div className="hidden md:flex items-center p-1 bg-background rounded-lg border border-black/5 mr-2">
          <button 
            onClick={() => setViewMode('builder')}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all",
              viewMode === 'builder' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
            )}
          >
            Tree View
          </button>
          <button 
            onClick={() => setViewMode('mega-menu')}
            className={cn(
              "px-3 py-1.5 text-xs font-semibold rounded-md transition-all flex items-center gap-1",
              viewMode === 'mega-menu' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
            )}
          >
            <FiColumns size={12} /> Mega Menu
          </button>
        </div>

        {/* Device Preview */}
        <div className="hidden md:flex items-center p-1 bg-background rounded-lg border border-black/5 mx-1">
          <button 
            onClick={() => setDevice('desktop')}
            className={cn(
              "p-1.5 rounded-md transition-all",
              device === 'desktop' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
            )}
            title="Desktop Preview"
          >
            <FiMonitor size={16} />
          </button>
          <button 
            onClick={() => setDevice('mobile')}
            className={cn(
              "p-1.5 rounded-md transition-all",
              device === 'mobile' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
            )}
            title="Mobile Drawer Preview"
          >
            <FiSmartphone size={16} />
          </button>
        </div>

        <button className="px-4 py-2 border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:bg-background transition-colors flex items-center gap-2">
          <FiEye size={14} /> Preview
        </button>
        <button className="px-4 py-2 bg-[#1A1A1A] text-white text-xs font-bold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-lg flex items-center gap-2">
          <FiSave size={14} /> Save Menu
        </button>
      </div>
    </div>
  );
}
