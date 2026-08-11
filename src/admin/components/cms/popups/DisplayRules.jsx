import { FiGlobe, FiSmartphone, FiClock, FiCheck } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function DisplayRules({
  rules = {},
  onChangeRules
}) {
  const {
    targetPages = 'all', // 'all' | 'products' | 'categories' | 'collections' | 'cart'
    devices = ['desktop', 'tablet', 'mobile'],
    frequency = 'once_per_session' // 'once_per_session' | 'once_per_day' | 'once_per_visitor' | 'always'
  } = rules;

  const handleDeviceToggle = (dev) => {
    const updated = devices.includes(dev)
      ? devices.filter(d => d !== dev)
      : [...devices, dev];
    onChangeRules({ ...rules, devices: updated });
  };

  const handleChange = (key, val) => {
    onChangeRules({ ...rules, [key]: val });
  };

  return (
    <div className="bg-white border border-black/10 rounded-xl p-4 shadow-2xs space-y-4">
      <div className="border-b border-black/5 pb-2">
        <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">Display Audience & Frequency Rules</h4>
        <p className="text-[11px] text-gray-400">Control target store routes, device responsiveness, and re-display frequency.</p>
      </div>

      <div className="space-y-3.5 text-xs">
        
        {/* Page Target Selector */}
        <div className="space-y-1">
          <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Target Store Routes</label>
          <select
            value={targetPages}
            onChange={(e) => handleChange('targetPages', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs font-semibold focus:bg-white focus:outline-none"
          >
            <option value="all">All Store Pages (Sitewide)</option>
            <option value="products">Product Detail Pages (PDPs) Only</option>
            <option value="categories">Category Collection Pages (PLPs) Only</option>
            <option value="cart">Cart & Checkout Pages Only</option>
          </select>
        </div>

        {/* Device Target Checkboxes */}
        <div className="space-y-1">
          <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Device Targeting</label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'desktop', label: 'Desktop' },
              { id: 'tablet', label: 'Tablet' },
              { id: 'mobile', label: 'Mobile' }
            ].map((d) => {
              const isActive = devices.includes(d.id);
              return (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => handleDeviceToggle(d.id)}
                  className={cn(
                    "py-1.5 px-2 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center justify-center gap-1.5",
                    isActive ? "bg-black text-white border-black" : "bg-gray-50 text-gray-500 border-black/10"
                  )}
                >
                  {isActive && <FiCheck size={12} className="text-green-400" />}
                  <span>{d.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Impression Frequency */}
        <div className="space-y-1">
          <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Re-display Frequency Limit</label>
          <select
            value={frequency}
            onChange={(e) => handleChange('frequency', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs font-semibold focus:bg-white focus:outline-none"
          >
            <option value="once_per_session">Once Per Browsing Session</option>
            <option value="once_per_day">Once Every 24 Hours</option>
            <option value="once_per_visitor">Once Per Unique Visitor (Cookie Lifetime)</option>
            <option value="always">Always Show on Matching Page Loads</option>
          </select>
        </div>

      </div>
    </div>
  );
}
