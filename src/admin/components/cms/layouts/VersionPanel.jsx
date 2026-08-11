import { FiRotateCcw, FiEye, FiCheck } from 'react-icons/fi';

const VERSIONS = [
  { id: 'v2.1.0', status: 'published', date: 'Oct 25, 2024, 10:30 AM', author: 'Sarah Jenkins', description: 'Updated header to centered logo layout.' },
  { id: 'v2.0.2', status: 'archived', date: 'Oct 18, 2024, 2:15 PM', author: 'Mike Chen', description: 'Added promotional announcement bar.' },
  { id: 'v2.0.0', status: 'archived', date: 'Sep 30, 2024, 9:00 AM', author: 'System', description: 'Initial Luxury Commerce layout.' },
];

export default function VersionPanel() {
  return (
    <div className="bg-white border border-black/5 rounded-xl p-8 shadow-sm max-w-4xl">
      <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-8 border-b border-black/5 pb-2">
        Layout Version History
      </h3>
      
      <div className="space-y-8 relative before:absolute before:inset-y-0 before:left-[11px] before:w-px before:bg-black/10 pl-8">
        {VERSIONS.map((v, i) => (
          <div key={v.id} className="relative">
            <div className={`absolute -left-[37px] top-1 w-6 h-6 rounded-full border-[3px] border-white flex items-center justify-center ${v.status === 'published' ? 'bg-green-500' : 'bg-gray-300'}`}>
              {v.status === 'published' && <FiCheck className="text-white w-3 h-3" />}
            </div>

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
               <div>
                  <div className="flex items-center gap-3 mb-1">
                     <span className="text-sm font-bold text-[#1A1A1A]">{v.id}</span>
                     {v.status === 'published' && (
                       <span className="px-2 py-0.5 bg-green-100 text-green-700 text-[9px] font-bold uppercase tracking-widest rounded">
                         Current Live
                       </span>
                     )}
                  </div>
                  <div className="text-xs text-gray-500 font-mono mb-2">{v.date}</div>
                  <p className="text-sm text-gray-700">{v.description}</p>
                  <div className="text-xs text-gray-400 mt-2">Published by <span className="font-semibold text-gray-600">{v.author}</span></div>
               </div>
               
               <div className="flex items-center gap-2 shrink-0">
                  <button className="p-2 border border-black/10 rounded-lg text-gray-500 hover:text-[#1A1A1A] hover:bg-gray-50 transition-colors" title="Preview Version">
                    <FiEye size={14} />
                  </button>
                  {v.status !== 'published' && (
                    <button className="px-3 py-2 border border-black/10 rounded-lg text-xs font-semibold text-gray-600 hover:text-[#1A1A1A] hover:bg-gray-50 transition-colors flex items-center gap-2">
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
