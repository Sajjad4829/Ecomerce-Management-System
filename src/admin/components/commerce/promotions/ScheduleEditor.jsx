export default function ScheduleEditor({ formData, setFormData }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-lg font-serif font-bold text-[#1A1A1A] mb-1">Active Dates</h2>
        <p className="text-sm text-gray-500">When this promotion will be available to customers.</p>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Start Date</label>
            <input 
              type="date" 
              value={formData.startDate}
              onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
              className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:bg-white transition-all text-sm font-medium text-[#1A1A1A]"
            />
          </div>
          <div>
            <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">Start Time</label>
            <input 
              type="time" 
              value={formData.startTime}
              onChange={(e) => setFormData(prev => ({ ...prev, startTime: e.target.value }))}
              className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:bg-white transition-all text-sm font-medium text-[#1A1A1A]"
            />
          </div>
        </div>

        <div className="pt-4 border-t border-black/5">
          <label className="flex items-center gap-3 cursor-pointer mb-6">
            <input 
              type="checkbox" 
              checked={formData.hasEndDate}
              onChange={(e) => setFormData(prev => ({ ...prev, hasEndDate: e.target.checked }))}
              className="w-4 h-4 rounded border-gray-300 text-[#1A1A1A] focus:ring-[#1A1A1A]" 
            />
            <span className="text-sm font-bold text-[#1A1A1A]">Set end date</span>
          </label>

          {formData.hasEndDate && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">End Date</label>
                <input 
                  type="date" 
                  value={formData.endDate}
                  onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:bg-white transition-all text-sm font-medium text-[#1A1A1A]"
                />
              </div>
              <div>
                <label className="block text-xs font-mono font-bold text-gray-500 uppercase mb-2">End Time</label>
                <input 
                  type="time" 
                  value={formData.endTime}
                  onChange={(e) => setFormData(prev => ({ ...prev, endTime: e.target.value }))}
                  className="w-full px-4 py-2.5 bg-[#F7F5F2] border-transparent rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 focus:bg-white transition-all text-sm font-medium text-[#1A1A1A]"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
