import { FiImage } from 'react-icons/fi';

export default function NavigationInspector({ selectedItemId }) {
  
  if (!selectedItemId) {
    return (
      <div className="bg-white border border-black/5 rounded-xl h-full shadow-sm flex flex-col items-center justify-center p-6 text-center">
        <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4 border border-black/5">
          <FiImage className="text-gray-300" size={24} />
        </div>
        <h3 className="text-sm font-bold text-[#1A1A1A]">No Item Selected</h3>
        <p className="text-xs text-gray-500 mt-2">Select a navigation item from the tree to edit its properties.</p>
      </div>
    );
  }

  // Placeholder data based on selected type (normally driven by state)
  const isMegaMenu = selectedItemId === '1';

  return (
    <div className="bg-white border border-black/5 rounded-xl flex flex-col h-full overflow-hidden shadow-sm">
      <div className="p-4 border-b border-black/5 shrink-0 bg-gray-50/50">
        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest">Item Settings</h3>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
        
        {/* Basic Settings */}
        <div className="space-y-4">
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Navigation Label</label>
            <input 
              type="text" 
              defaultValue={isMegaMenu ? "Living Room" : "Item Label"}
              className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Link Destination URL</label>
            <div className="flex gap-2">
              <input 
                type="text" 
                defaultValue={isMegaMenu ? "/collections/living-room" : "/"}
                className="flex-1 px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-sm font-mono text-gray-600 focus:outline-none focus:border-black/30 transition-colors"
              />
              <button className="px-3 py-2 bg-gray-100 border border-black/10 rounded-lg text-xs font-semibold hover:bg-gray-200">
                Browse
              </button>
            </div>
          </div>
        </div>

        <hr className="border-black/5" />

        {/* Display Settings */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Display Options</h4>
          
          <div className="space-y-3">
             <label className="flex items-center gap-3 cursor-pointer group">
               <div className="w-4 h-4 rounded border border-black/20 group-hover:border-black/40 flex items-center justify-center bg-blue-500 border-blue-500">
                  <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>
               </div>
               <span className="text-sm text-gray-700 font-medium">Visible in Menu</span>
             </label>
             <label className="flex items-center gap-3 cursor-pointer group">
               <div className="w-4 h-4 rounded border border-black/20 group-hover:border-black/40 flex items-center justify-center"></div>
               <span className="text-sm text-gray-700 font-medium">Open in new tab</span>
             </label>
          </div>

          <div className="space-y-1.5 pt-2">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Highlight Badge (Optional)</label>
            <input 
              type="text" 
              placeholder="e.g. Sale, New, Hot"
              className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
        </div>

        <hr className="border-black/5" />

        {/* Advanced SEO */}
        <div className="space-y-4">
          <h4 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Advanced</h4>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Title Attribute (SEO)</label>
            <input 
              type="text" 
              placeholder="Descriptive title"
              className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
          
          <div className="space-y-1.5">
            <label className="text-xs font-bold text-gray-700 uppercase tracking-widest">Custom CSS Class</label>
            <input 
              type="text" 
              placeholder="my-custom-class"
              className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-sm font-mono focus:outline-none focus:border-black/30 transition-colors"
            />
          </div>
        </div>

      </div>
    </div>
  );
}
