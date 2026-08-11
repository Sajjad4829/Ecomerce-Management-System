import { FiRotateCcw, FiEye, FiCheck } from 'react-icons/fi';

const VERSIONS = [
  { id: 'v1.4.0', status: 'published', date: 'Oct 24, 2024, 2:30 PM', author: 'Sarah Jenkins', description: 'Updated typography scale for mobile devices.' },
  { id: 'v1.3.2', status: 'archived', date: 'Oct 15, 2024, 11:15 AM', author: 'Mike Chen', description: 'Adjusted button border radius to be slightly more rounded.' },
  { id: 'v1.3.1', status: 'archived', date: 'Oct 10, 2024, 4:45 PM', author: 'Sarah Jenkins', description: 'Fixed contrast issue on the secondary button.' },
  { id: 'v1.3.0', status: 'archived', date: 'Sep 28, 2024, 9:00 AM', author: 'System', description: 'Major update: Switch to Playfair Display.' },
  { id: 'v1.2.0', status: 'archived', date: 'Sep 15, 2024, 3:20 PM', author: 'Mike Chen', description: 'Initial Autumn theme setup.' },
];

export default function VersionTimeline() {
  return (
    <div className="bg-surface border border-black/5 rounded-xl p-8 shadow-sm max-w-4xl">
      <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-8 border-b border-black/5 pb-2">
        Version History
      </h3>
      
      <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-black/10 pl-8">
        {VERSIONS.map((v, i) => (
          <div key={v.id} className="relative">
            {/* Timeline dot */}
            <div className={`absolute -left-[37px] top-1 w-6 h-6 rounded-full border-[3px] border-white flex items-center justify-center ${v.status === 'published' ? 'bg-success-soft0' : 'bg-gray-300'}`}>
              {v.status === 'published' && <FiCheck className="text-white w-3 h-3" />}
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
               <div>
                  <div className="flex items-center gap-3 mb-1">
                     <span className="text-sm font-bold text-text-primary">{v.id}</span>
                     {v.status === 'published' && (
                       <span className="px-2 py-0.5 bg-success-soft text-success text-[9px] font-bold uppercase tracking-widest rounded">
                         Current Live
                       </span>
                     )}
                  </div>
                  <div className="text-xs text-text-muted font-mono mb-2">{v.date}</div>
                  <p className="text-sm text-text-secondary">{v.description}</p>
                  <div className="text-xs text-text-muted mt-2">Published by <span className="font-semibold text-text-secondary">{v.author}</span></div>
               </div>
               
               <div className="flex items-center gap-2 shrink-0">
                  <button className="p-2 border border-black/10 rounded-lg text-text-muted hover:text-text-primary hover:bg-background transition-colors" title="Preview Version">
                    <FiEye size={14} />
                  </button>
                  {v.status !== 'published' && (
                    <button className="px-3 py-2 border border-black/10 rounded-lg text-xs font-semibold text-text-secondary hover:text-text-primary hover:bg-background transition-colors flex items-center gap-2">
                      <FiRotateCcw size={14} /> Restore
                    </button>
                  )}
               </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
