import { FiGrid, FiList } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function ViewSwitcher({ view, setView }) {
  return (
    <div className="flex items-center p-1 bg-gray-100 rounded-lg border border-black/5">
      <button 
        onClick={() => setView('grid')}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          view === 'grid' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
        )}
        title="Grid view"
      >
        <FiGrid size={16} />
      </button>
      <button 
        onClick={() => setView('list')}
        className={cn(
          "p-1.5 rounded-md transition-colors",
          view === 'list' ? "bg-surface text-text-primary shadow-sm" : "text-text-muted hover:text-text-primary"
        )}
        title="List view"
      >
        <FiList size={16} />
      </button>
    </div>
  );
}
