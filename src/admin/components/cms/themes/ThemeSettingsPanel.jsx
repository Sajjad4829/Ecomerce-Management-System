import { cn } from '../../../../utils/cn';
import { FiLink } from 'react-icons/fi';

export default function ThemeSettingsPanel({ activeSection }) {
  
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

  const TokenLink = ({ label }) => (
    <div className="text-[10px] text-blue-600 font-semibold uppercase tracking-widest flex items-center gap-1 mt-1 cursor-pointer hover:underline">
      <FiLink size={10} /> Linked to Design System
    </div>
  );

  const renderContent = () => {
    switch (activeSection) {
      case 'brand':
        return (
          <SettingsGroup title="Brand Identity">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Primary Logo</label>
              <div className="flex items-center gap-4">
                 <div className="w-24 h-12 bg-gray-100 border border-black/10 rounded flex items-center justify-center text-xs text-gray-400 font-serif font-bold italic">Logo</div>
                 <button className="px-4 py-2 bg-white border border-black/10 rounded text-xs font-semibold hover:bg-gray-50">Upload</button>
              </div>
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Favicon</label>
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 bg-gray-100 border border-black/10 rounded flex items-center justify-center text-xs text-gray-400">Fav</div>
                 <button className="px-4 py-2 bg-white border border-black/10 rounded text-xs font-semibold hover:bg-gray-50">Upload</button>
              </div>
            </div>
          </SettingsGroup>
        );
      
      case 'colors':
        return (
          <SettingsGroup title="Color Scheme Mappings">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Primary Brand Color</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>--color-primary (#1A1A1A)</option>
              </select>
              <TokenLink />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Accent Color</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>--color-accent (#A69076)</option>
              </select>
              <TokenLink />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Body Background</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>--color-bg (#FFFFFF)</option>
              </select>
              <TokenLink />
            </div>
          </SettingsGroup>
        );

      case 'typography':
        return (
          <SettingsGroup title="Typography Mappings">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Heading Font</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>Playfair Display</option>
              </select>
              <TokenLink />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Body Font</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>Inter</option>
              </select>
              <TokenLink />
            </div>
            <div className="space-y-2 col-span-1 md:col-span-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Base Font Size</label>
              <input type="text" value="16px" readOnly className="w-full md:w-1/2 px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none font-mono text-gray-500 cursor-not-allowed" />
              <TokenLink />
            </div>
          </SettingsGroup>
        );
        
      case 'layout':
        return (
          <SettingsGroup title="Global Layout Constraints">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Max Content Width</label>
              <input type="text" defaultValue="1440px" className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white" />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Section Vertical Padding</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>--spacing-3xl (4rem)</option>
              </select>
              <TokenLink />
            </div>
          </SettingsGroup>
        );

      case 'buttons':
        return (
          <SettingsGroup title="Button Component Settings">
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Border Radius</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>--radius-none (0px)</option>
                <option>--radius-sm (2px)</option>
                <option>--radius-md (4px)</option>
              </select>
              <TokenLink />
            </div>
            <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Text Transform</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none">
                <option>Uppercase</option>
                <option>None (Normal)</option>
              </select>
            </div>
             <div className="space-y-2">
              <label className="block text-xs font-bold text-[#1A1A1A] uppercase tracking-widest">Primary Button Background</label>
              <select className="w-full px-4 py-2.5 bg-gray-50 border border-black/10 rounded-lg text-sm focus:outline-none focus:bg-white appearance-none font-mono">
                <option>--color-primary</option>
                <option>--color-accent</option>
              </select>
              <TokenLink />
            </div>
          </SettingsGroup>
        );
        
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
