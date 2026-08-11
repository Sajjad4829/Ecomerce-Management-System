import { cn } from '../../../../utils/cn';

export default function RegionEditor({ activeSection }) {
  const SettingsGroup = ({ title, children }) => (
    <div className="mb-10">
      <h3 className="text-sm font-bold text-[#1A1A1A] uppercase tracking-widest mb-6 border-b border-black/5 pb-2">
        {title}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {children}
      </div>
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'announcement':
        return (
          <SettingsGroup title="Announcement Bar">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Visibility</label>
              <select className="w-full md:w-1/2 px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none">
                <option>Show on all pages</option>
                <option>Show only on homepage</option>
                <option>Hidden</option>
              </select>
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Message Content</label>
              <input type="text" defaultValue="Free shipping on all orders over $200. Limited time only." className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Background Color</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>--color-primary (#1A1A1A)</option>
                <option>--color-accent (#A69076)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Text Color</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>--color-white (#FFFFFF)</option>
              </select>
            </div>
          </SettingsGroup>
        );

      case 'header':
        return (
          <SettingsGroup title="Main Header Layout">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Header Style</label>
              <div className="grid grid-cols-3 gap-4 mt-2">
                 <div className="border-2 border-[#1A1A1A] rounded-lg p-4 cursor-pointer text-center">
                   <div className="h-2 w-8 bg-black/20 mx-auto mb-2 rounded"></div>
                   <div className="flex justify-between items-center opacity-40">
                     <div className="h-1 w-4 bg-black"></div>
                     <div className="h-1 w-16 bg-black"></div>
                     <div className="h-1 w-6 bg-black"></div>
                   </div>
                   <span className="text-[10px] font-bold mt-3 block">Logo Center</span>
                 </div>
                 <div className="border-2 border-transparent border-black/10 hover:border-black/30 rounded-lg p-4 cursor-pointer text-center transition-colors">
                   <div className="flex justify-between items-center opacity-40 mb-2 mt-1">
                     <div className="h-2 w-8 bg-black"></div>
                     <div className="h-1 w-16 bg-black"></div>
                     <div className="h-1 w-6 bg-black"></div>
                   </div>
                   <span className="text-[10px] font-bold mt-4 block">Logo Left</span>
                 </div>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Include Search</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none">
                <option>Icon Only</option>
                <option>Search Bar</option>
                <option>Hidden</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Cart Icon</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none">
                <option>Shopping Bag</option>
                <option>Cart</option>
                <option>Basket</option>
              </select>
            </div>
          </SettingsGroup>
        );

      case 'footer':
        return (
          <SettingsGroup title="Footer Configuration">
             <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Layout Style</label>
              <select className="w-full md:w-1/2 px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none">
                <option>4 Columns (Standard)</option>
                <option>3 Columns (Wide)</option>
                <option>Minimal (Centered)</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Newsletter Signup</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
             <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Background Color</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>--color-primary (#1A1A1A)</option>
                <option>--color-bg (#FFFFFF)</option>
                <option>--color-surface (#F7F5F2)</option>
              </select>
            </div>
          </SettingsGroup>
        );

      case 'mega-menu':
         return (
          <SettingsGroup title="Mega Menu Settings">
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Menu Type</label>
              <select className="w-full md:w-1/2 px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none">
                <option>Full Width Dropdown</option>
                <option>Standard Dropdown</option>
                <option>Drawer (Sidebar)</option>
              </select>
            </div>
             <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Featured Image Block</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none">
                <option>Enabled</option>
                <option>Disabled</option>
              </select>
            </div>
          </SettingsGroup>
         )

      default:
        return (
          <div className="text-center py-12 text-gray-500">
            <p>Settings for {activeSection} are not configured yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="bg-white border border-black/5 rounded-xl p-8 shadow-sm h-[calc(100vh-14rem)] overflow-y-auto custom-scrollbar">
      {renderContent()}
    </div>
  );
}
