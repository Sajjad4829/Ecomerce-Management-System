import { FiArrowRight, FiCheckCircle, FiInfo, FiAlertCircle } from 'react-icons/fi';

export default function ComponentPreview() {
  return (
    <div className="space-y-8">
      
      {/* Buttons */}
      <div className="bg-white border border-black/5 rounded-xl p-8 shadow-sm">
        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-6 border-b border-black/5 pb-2">
          Button Components
        </h3>
        <div className="flex flex-wrap gap-8 items-center">
           <div className="space-y-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Primary</div>
              <button className="px-6 py-3 bg-[#1A1A1A] text-white text-sm font-bold uppercase tracking-widest rounded-none hover:bg-black/80 transition-colors shadow-lg shadow-black/10 flex items-center gap-2">
                Action Button <FiArrowRight />
              </button>
           </div>
           
           <div className="space-y-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Secondary</div>
              <button className="px-6 py-3 bg-transparent border-2 border-[#1A1A1A] text-[#1A1A1A] text-sm font-bold uppercase tracking-widest rounded-none hover:bg-black/5 transition-colors flex items-center gap-2">
                Secondary Action
              </button>
           </div>
           
           <div className="space-y-4">
              <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">Tertiary (Ghost)</div>
              <button className="px-6 py-3 bg-transparent text-gray-600 text-sm font-bold uppercase tracking-widest rounded-none hover:text-[#1A1A1A] hover:bg-black/5 transition-colors flex items-center gap-2">
                Ghost Button
              </button>
           </div>
        </div>
      </div>

      {/* Forms & Inputs */}
      <div className="bg-white border border-black/5 rounded-xl p-8 shadow-sm">
        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-6 border-b border-black/5 pb-2">
          Form Elements
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl">
           <div className="space-y-2">
             <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">First Name</label>
             <input type="text" placeholder="Enter your first name" className="w-full px-4 py-3 bg-gray-50 border border-black/10 rounded-md text-sm focus:outline-none focus:bg-white focus:border-black/30 transition-all" />
           </div>
           
           <div className="space-y-2">
             <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Status <span className="text-red-500">*</span></label>
             <select className="w-full px-4 py-3 bg-gray-50 border border-red-500 rounded-md text-sm focus:outline-none focus:bg-white transition-all appearance-none text-red-900">
                <option>Please select an option</option>
             </select>
             <p className="text-xs text-red-500 mt-1">This field is required.</p>
           </div>
           
           <div className="col-span-1 md:col-span-2 space-y-2">
             <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Message</label>
             <textarea rows={4} placeholder="Type your message here..." className="w-full px-4 py-3 bg-gray-50 border border-black/10 rounded-md text-sm focus:outline-none focus:bg-white focus:border-black/30 transition-all resize-none"></textarea>
           </div>
        </div>
      </div>

      {/* Badges & Chips */}
      <div className="bg-white border border-black/5 rounded-xl p-8 shadow-sm">
        <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-6 border-b border-black/5 pb-2">
          Badges & Status
        </h3>
        <div className="flex flex-wrap gap-4 items-center">
           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700 border border-green-200">
             <FiCheckCircle /> Success
           </span>
           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700 border border-blue-200">
             <FiInfo /> Information
           </span>
           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-700 border border-yellow-200">
             <FiAlertCircle /> Warning
           </span>
           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700 border border-red-200">
             <FiAlertCircle /> Error
           </span>
           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-gray-100 text-gray-600 border border-black/10">
             Neutral Tag
           </span>
           <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-[10px] font-bold uppercase tracking-widest bg-[#1A1A1A] text-white">
             Brand Tag
           </span>
        </div>
      </div>
      
    </div>
  );
}
