import { useState } from 'react';
import { FiGlobe, FiShare2, FiCode, FiFileText, FiSave, FiCheck, FiImage } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function GlobalSEOSettings({ onSelectMediaClick }) {
  const [activeTab, setActiveTab] = useState('defaults'); // 'defaults' | 'org' | 'sitemap'
  const [saved, setSaved] = useState(false);

  const [globalDefaults, setGlobalDefaults] = useState({
    siteName: "Aurelian Luxury Furniture",
    titleTemplate: "%s | Aurelian Luxury Furniture",
    defaultDescription: "Aurelian is an Italian luxury furniture house crafting bespoke velvet sofas, marble dining tables, and solid oak bed frames.",
    defaultOgImage: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1200&q=80",
    twitterHandle: "@aurelianfurniture"
  });

  const [orgData, setOrgData] = useState({
    orgName: "Aurelian Furniture Corp",
    logoUrl: "https://aurelianfurniture.com/assets/logo.png",
    phone: "+1-800-555-0199",
    email: "support@aurelianfurniture.com",
    street: "740 Madison Avenue",
    city: "New York",
    state: "NY",
    zip: "10065",
    country: "US"
  });

  const [sitemapConfig, setSitemapConfig] = useState({
    enabled: true,
    includeProducts: true,
    includeCategories: true,
    includeCollections: true,
    includeBrands: true,
    includeBlog: true,
    productPriority: "0.9",
    categoryPriority: "0.8",
    changeFreq: "daily"
  });

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="bg-white border border-black/10 rounded-xl overflow-hidden shadow-2xs">
      
      {/* Header Tabs */}
      <div className="flex items-center border-b border-black/5 px-6 bg-gray-50/60 text-xs font-bold text-gray-500">
        <button
          onClick={() => setActiveTab('defaults')}
          className={cn(
            "py-3.5 border-b-2 font-serif transition-all mr-6 flex items-center gap-2 cursor-pointer",
            activeTab === 'defaults' ? "border-[#1A1A1A] text-[#1A1A1A] font-bold" : "border-transparent hover:text-black"
          )}
        >
          <FiGlobe size={14} />
          <span>Global SEO Defaults</span>
        </button>

        <button
          onClick={() => setActiveTab('org')}
          className={cn(
            "py-3.5 border-b-2 font-serif transition-all mr-6 flex items-center gap-2 cursor-pointer",
            activeTab === 'org' ? "border-[#1A1A1A] text-[#1A1A1A] font-bold" : "border-transparent hover:text-black"
          )}
        >
          <FiCode size={14} />
          <span>Organization Schema Info</span>
        </button>

        <button
          onClick={() => setActiveTab('sitemap')}
          className={cn(
            "py-3.5 border-b-2 font-serif transition-all flex items-center gap-2 cursor-pointer",
            activeTab === 'sitemap' ? "border-[#1A1A1A] text-[#1A1A1A] font-bold" : "border-transparent hover:text-black"
          )}
        >
          <FiFileText size={14} />
          <span>XML Sitemap Settings</span>
        </button>
      </div>

      {/* Form Workspace */}
      <div className="p-6 space-y-6">
        
        {/* TAB 1: Global SEO Defaults */}
        {activeTab === 'defaults' && (
          <div className="space-y-4 max-w-2xl">
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Website Brand Name
              </label>
              <input
                type="text"
                value={globalDefaults.siteName}
                onChange={(e) => setGlobalDefaults({ ...globalDefaults, siteName: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-bold"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Default Title Template
              </label>
              <input
                type="text"
                value={globalDefaults.titleTemplate}
                onChange={(e) => setGlobalDefaults({ ...globalDefaults, titleTemplate: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-mono"
              />
              <span className="text-[10px] text-gray-400 block">Use <code>%s</code> as placeholder for page title.</span>
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Fallback Meta Description
              </label>
              <textarea
                rows={3}
                value={globalDefaults.defaultDescription}
                onChange={(e) => setGlobalDefaults({ ...globalDefaults, defaultDescription: e.target.value })}
                className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs resize-none"
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">
                Fallback Open Graph Social Sharing Image
              </label>
              <div className="flex items-center gap-3">
                <div className="w-24 h-14 bg-gray-100 rounded-lg overflow-hidden border border-black/10 shrink-0">
                  <img src={globalDefaults.defaultOgImage} alt="OG Default" className="w-full h-full object-cover" />
                </div>
                <button
                  type="button"
                  onClick={onSelectMediaClick}
                  className="px-3 py-2 bg-white border border-black/10 rounded-lg text-xs font-bold flex items-center gap-1.5 hover:bg-gray-50 cursor-pointer"
                >
                  <FiImage size={14} /> Change Fallback Image
                </button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: Organization Schema Info */}
        {activeTab === 'org' && (
          <div className="space-y-4 max-w-2xl">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Organization Legal Name</label>
                <input
                  type="text"
                  value={orgData.orgName}
                  onChange={(e) => setOrgData({ ...orgData, orgName: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-bold"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block mb-1">Customer Support Phone</label>
                <input
                  type="text"
                  value={orgData.phone}
                  onChange={(e) => setOrgData({ ...orgData, phone: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">Street Address</label>
                <input
                  type="text"
                  value={orgData.street}
                  onChange={(e) => setOrgData({ ...orgData, street: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">City</label>
                <input
                  type="text"
                  value={orgData.city}
                  onChange={(e) => setOrgData({ ...orgData, city: e.target.value })}
                  className="w-full px-3 py-2 bg-gray-50 border border-black/10 rounded-lg text-xs"
                />
              </div>
              <div>
                <label className="text-xs font-bold text-gray-700 uppercase block mb-1">ZIP / Country</label>
                <input
                  type="text"
                  value={`${orgData.zip}, ${orgData.country}`}
                  readOnly
                  className="w-full px-3 py-2 bg-gray-100 border border-black/10 rounded-lg text-xs font-mono text-gray-500"
                />
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: XML Sitemap Config */}
        {activeTab === 'sitemap' && (
          <div className="space-y-4 max-w-2xl">
            <div className="flex items-center justify-between p-3 bg-gray-50 border border-black/10 rounded-xl">
              <div>
                <div className="text-xs font-bold text-[#1A1A1A]">XML Sitemap Generation</div>
                <div className="text-[11px] text-gray-500">Expose /sitemap.xml automatically to Google & Bing crawlers</div>
              </div>
              <input
                type="checkbox"
                checked={sitemapConfig.enabled}
                onChange={(e) => setSitemapConfig({ ...sitemapConfig, enabled: e.target.checked })}
                className="w-5 h-5 rounded border-black/20 cursor-pointer"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="text-xs font-bold text-gray-700 uppercase tracking-wider block">Included Collections</label>
              <div className="grid grid-cols-2 gap-3 text-xs">
                <label className="flex items-center gap-2 p-2 bg-gray-50 border border-black/5 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={sitemapConfig.includeProducts} onChange={(e) => setSitemapConfig({ ...sitemapConfig, includeProducts: e.target.checked })} />
                  <span>Product Catalog (PDPs)</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-gray-50 border border-black/5 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={sitemapConfig.includeCategories} onChange={(e) => setSitemapConfig({ ...sitemapConfig, includeCategories: e.target.checked })} />
                  <span>Category Pages (PLPs)</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-gray-50 border border-black/5 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={sitemapConfig.includeBlog} onChange={(e) => setSitemapConfig({ ...sitemapConfig, includeBlog: e.target.checked })} />
                  <span>Blog Articles</span>
                </label>
                <label className="flex items-center gap-2 p-2 bg-gray-50 border border-black/5 rounded-lg cursor-pointer">
                  <input type="checkbox" checked={sitemapConfig.includeBrands} onChange={(e) => setSitemapConfig({ ...sitemapConfig, includeBrands: e.target.checked })} />
                  <span>Brand Landing Pages</span>
                </label>
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Footer Save Button */}
      <div className="p-4 border-t border-black/5 bg-gray-50/50 flex items-center justify-between">
        <span className="text-xs text-gray-400">Global site settings will apply across all un-overridden resources</span>
        <button
          onClick={handleSave}
          className="px-5 py-2 bg-[#1A1A1A] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-all shadow-md flex items-center gap-1.5 cursor-pointer"
        >
          {saved ? <FiCheck size={14} className="text-green-400" /> : <FiSave size={14} />}
          <span>{saved ? "Settings Saved" : "Save Global Defaults"}</span>
        </button>
      </div>

    </div>
  );
}
