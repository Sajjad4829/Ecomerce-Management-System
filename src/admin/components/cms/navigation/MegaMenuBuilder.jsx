import { FiPlus, FiTrash2, FiMove, FiImage, FiSettings } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

const MEGA_MENU_COLUMNS = [
  { id: 'c1', title: 'Sofas & Sectionals', items: ['Sectionals', 'Loveseats', 'Sleeper Sofas', 'Modular Sofas'] },
  { id: 'c2', title: 'Chairs', items: ['Accent Chairs', 'Recliners', 'Chaise Lounges', 'Benches'] },
  { id: 'c3', title: 'Tables', items: ['Coffee Tables', 'Side Tables', 'Console Tables', 'Ottomans'] },
];

export default function MegaMenuBuilder() {
  return (
    <div className="bg-white border border-black/5 rounded-xl flex flex-col h-full overflow-hidden shadow-sm">
      <div className="p-4 border-b border-black/5 shrink-0 bg-gray-50/50 flex justify-between items-center">
        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest">Mega Menu Layout Builder</h3>
        <div className="flex gap-2">
           <button className="px-3 py-1.5 bg-white border border-black/10 rounded-md text-xs font-semibold hover:bg-gray-50 shadow-sm flex items-center gap-1">
             <FiSettings size={12} /> Layout Settings
           </button>
           <button className="px-3 py-1.5 bg-[#1A1A1A] text-white rounded-md text-xs font-bold uppercase tracking-widest hover:bg-black/80 shadow-sm flex items-center gap-1">
             <FiPlus size={12} /> Add Column
           </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto overflow-y-hidden custom-scrollbar bg-[#F7F5F2] p-8">
        
        <div className="flex gap-6 h-full items-start min-w-max">
           
           {MEGA_MENU_COLUMNS.map((col) => (
             <div key={col.id} className="w-64 bg-white rounded-xl shadow-sm border border-black/5 flex flex-col h-[500px]">
                <div className="p-3 border-b border-black/5 bg-gray-50/50 rounded-t-xl flex justify-between items-center group cursor-grab active:cursor-grabbing">
                   <div className="flex items-center gap-2">
                     <FiMove className="text-gray-400" size={14} />
                     <input 
                       type="text" 
                       defaultValue={col.title} 
                       className="font-bold text-sm text-[#1A1A1A] bg-transparent focus:outline-none focus:ring-2 focus:ring-blue-500 rounded px-1 w-32"
                     />
                   </div>
                   <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                     <FiTrash2 size={14} />
                   </button>
                </div>
                
                <div className="flex-1 p-3 space-y-2 overflow-y-auto custom-scrollbar">
                   {col.items.map((item, i) => (
                     <div key={i} className="group flex items-center justify-between p-2 rounded-lg border border-transparent hover:border-black/5 hover:bg-gray-50 cursor-grab">
                        <span className="text-sm text-gray-700">{item}</span>
                        <FiMove className="text-gray-300 opacity-0 group-hover:opacity-100 transition-opacity" size={12} />
                     </div>
                   ))}
                   
                   <div className="mt-4 p-4 border-2 border-dashed border-black/10 rounded-lg flex flex-col items-center justify-center text-center text-gray-400 hover:bg-gray-50 hover:text-[#1A1A1A] hover:border-black/20 cursor-pointer transition-colors">
                      <FiPlus size={16} className="mb-1" />
                      <span className="text-[10px] font-bold uppercase tracking-widest">Add Item</span>
                   </div>
                </div>
             </div>
           ))}

           {/* Promotional Block Column */}
           <div className="w-80 bg-white rounded-xl shadow-sm border border-black/5 flex flex-col h-[500px]">
              <div className="p-3 border-b border-black/5 bg-purple-50/50 rounded-t-xl flex justify-between items-center group cursor-grab">
                 <div className="flex items-center gap-2">
                   <FiMove className="text-purple-400" size={14} />
                   <span className="font-bold text-sm text-purple-900">Promotional Block</span>
                 </div>
                 <button className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                   <FiTrash2 size={14} />
                 </button>
              </div>
              <div className="flex-1 p-4 flex flex-col gap-4">
                 <div className="aspect-[4/3] bg-gray-100 rounded-lg border border-black/5 flex flex-col items-center justify-center text-gray-400 relative overflow-hidden group cursor-pointer hover:bg-gray-200 transition-colors">
                    <FiImage size={24} className="mb-2" />
                    <span className="text-xs font-semibold">Upload Image</span>
                 </div>
                 
                 <input type="text" placeholder="Promo Title" defaultValue="Summer Collection" className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm font-bold text-[#1A1A1A] focus:outline-none focus:border-black/30" />
                 
                 <textarea placeholder="Description" rows={2} className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs text-gray-600 focus:outline-none focus:border-black/30 resize-none">Explore our new premium outdoor living sets.</textarea>
                 
                 <div className="flex gap-2">
                   <input type="text" placeholder="CTA Label" defaultValue="Shop Now" className="w-1/2 px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-bold text-[#1A1A1A] focus:outline-none focus:border-black/30" />
                   <input type="text" placeholder="URL" defaultValue="/collections/summer" className="w-1/2 px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-mono text-gray-600 focus:outline-none focus:border-black/30" />
                 </div>
              </div>
           </div>

        </div>
      </div>
    </div>
  );
}
