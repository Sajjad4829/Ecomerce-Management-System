import { useState } from 'react';
import { FiSliders, FiEyeOff, FiLink, FiAlertCircle, FiCheck, FiInfo } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function RobotsCanonicalEditor({
  indexStatus = 'index', // 'index' | 'noindex'
  followStatus = 'follow', // 'follow' | 'nofollow'
  canonicalMode = 'auto', // 'auto' | 'custom'
  customCanonical = '',
  slug = 'aurelian-modular-velvet-sofa',
  baseUrl = 'https://aurelianfurniture.com',
  onChangeRobots,
  onChangeCanonical
}) {
  const [isNoIndex, setIsNoIndex] = useState(indexStatus === 'noindex');
  const [isNoFollow, setIsNoFollow] = useState(followStatus === 'nofollow');
  const [canMode, setCanMode] = useState(canonicalMode);
  const [customUrl, setCustomUrl] = useState(customCanonical);

  const calculatedCanonical = canMode === 'auto'
    ? `${baseUrl}/products/${slug}`
    : customUrl || `${baseUrl}/products/${slug}`;

  const generatedMetaTag = `<meta name="robots" content="${isNoIndex ? 'noindex' : 'index'}, ${isNoFollow ? 'nofollow' : 'follow'}" />`;
  const generatedCanonicalTag = `<link rel="canonical" href="${calculatedCanonical}" />`;

  return (
    <div className="bg-white border border-black/10 rounded-xl p-5 shadow-2xs space-y-5">
      {/* Header */}
      <div className="border-b border-black/5 pb-3">
        <div className="flex items-center gap-2">
          <FiSliders size={16} className="text-blue-600" />
          <h4 className="font-serif font-bold text-base text-[#1A1A1A]">
            Robots Directives & Canonical URLs
          </h4>
        </div>
        <p className="text-xs text-gray-500 mt-0.5">
          Control search engine crawler indexing instructions and prevent duplicate content penalties.
        </p>
      </div>

      {/* Grid: Robots Controls Left / Canonical Right */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        
        {/* Robots Directives Panel */}
        <div className="bg-gray-50/60 p-4 border border-black/5 rounded-xl space-y-4">
          <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <FiEyeOff size={13} />
            <span>Search Crawler Directives</span>
          </h5>

          {/* Toggle 1: Index / Noindex */}
          <div className="flex items-center justify-between p-3 bg-white border border-black/10 rounded-lg">
            <div>
              <div className="text-xs font-bold text-[#1A1A1A]">Index Page</div>
              <div className="text-[11px] text-gray-500">Allow Google to include this page in search results</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsNoIndex(!isNoIndex);
                if (onChangeRobots) onChangeRobots({ noindex: !isNoIndex, nofollow: isNoFollow });
              }}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer",
                !isNoIndex ? "bg-green-600" : "bg-red-500"
              )}
            >
              <span className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                !isNoIndex ? "translate-x-6" : "translate-x-1"
              )} />
            </button>
          </div>

          {/* Toggle 2: Follow / Nofollow */}
          <div className="flex items-center justify-between p-3 bg-white border border-black/10 rounded-lg">
            <div>
              <div className="text-xs font-bold text-[#1A1A1A]">Follow Links</div>
              <div className="text-[11px] text-gray-500">Pass PageRank and link equity through hyperlinks</div>
            </div>
            <button
              type="button"
              onClick={() => {
                setIsNoFollow(!isNoFollow);
                if (onChangeRobots) onChangeRobots({ noindex: isNoIndex, nofollow: !isNoFollow });
              }}
              className={cn(
                "relative inline-flex h-6 w-11 items-center rounded-full transition-colors cursor-pointer",
                !isNoFollow ? "bg-green-600" : "bg-amber-500"
              )}
            >
              <span className={cn(
                "inline-block h-4 w-4 transform rounded-full bg-white transition-transform",
                !isNoFollow ? "translate-x-6" : "translate-x-1"
              )} />
            </button>
          </div>

          {/* Warning Banner if Noindexed */}
          {isNoIndex && (
            <div className="p-2.5 bg-red-50 border border-red-200 rounded-lg text-xs text-red-800 flex items-center gap-2">
              <FiAlertCircle size={15} className="shrink-0 text-red-600" />
              <span>
                <strong>Warning:</strong> Noindex prevents this page from appearing in organic search traffic.
              </span>
            </div>
          )}
        </div>

        {/* Canonical URL Configurator */}
        <div className="bg-gray-50/60 p-4 border border-black/5 rounded-xl space-y-4">
          <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider flex items-center gap-1.5">
            <FiLink size={13} />
            <span>Canonical Link Setup</span>
          </h5>

          {/* Mode Selector */}
          <div className="flex items-center gap-2 bg-white p-1 rounded-lg border border-black/10">
            <button
              type="button"
              onClick={() => setCanMode('auto')}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer text-center",
                canMode === 'auto' ? "bg-[#1A1A1A] text-white shadow-2xs" : "text-gray-500 hover:text-black"
              )}
            >
              Automatic Self-Canonical
            </button>
            <button
              type="button"
              onClick={() => setCanMode('custom')}
              className={cn(
                "flex-1 py-1.5 text-xs font-bold rounded-md transition-all cursor-pointer text-center",
                canMode === 'custom' ? "bg-[#1A1A1A] text-white shadow-2xs" : "text-gray-500 hover:text-black"
              )}
            >
              Custom External Canonical
            </button>
          </div>

          {/* Custom URL Input if Custom Mode */}
          {canMode === 'custom' ? (
            <div className="space-y-1">
              <label className="text-[11px] font-bold text-gray-600 uppercase block">Custom Canonical Target URL</label>
              <input
                type="url"
                placeholder="https://aurelianfurniture.com/original-product-page"
                value={customUrl}
                onChange={(e) => setCustomUrl(e.target.value)}
                className="w-full px-3 py-2 bg-white border border-black/10 rounded-lg text-xs font-mono focus:outline-none focus:border-black/30"
              />
            </div>
          ) : (
            <div className="p-3 bg-white border border-black/10 rounded-lg text-xs font-mono text-gray-600 break-all">
              <span className="text-gray-400 block text-[9px] uppercase font-sans">Resolved Auto Canonical:</span>
              <strong className="text-black">{calculatedCanonical}</strong>
            </div>
          )}
        </div>

      </div>

      {/* Code Snippet Tag Preview */}
      <div className="bg-[#1e1e1e] text-amber-300 font-mono text-[11px] p-3 rounded-xl border border-black/20 space-y-1">
        <div className="text-gray-500 text-[10px] uppercase font-sans">HTML Head Output Directive Preview</div>
        <div>{generatedMetaTag}</div>
        <div>{generatedCanonicalTag}</div>
      </div>
    </div>
  );
}
