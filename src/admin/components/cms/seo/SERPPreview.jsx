import { useState } from 'react';
import { FiMonitor, FiSmartphone, FiGlobe, FiExternalLink } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function SERPPreview({
  title = "Aurelian Modular Velvet Sofa | Luxury Living Room",
  description = "Discover the Aurelian modular velvet sofa in cream. Hand-crafted in Italy with sustainable solid oak frame and stain-resistant performance velvet. Free white-glove delivery.",
  slug = "aurelian-modular-velvet-sofa",
  baseUrl = "https://aurelianfurniture.com",
  resourceType = "products"
}) {
  const [device, setDevice] = useState('desktop'); // 'desktop' | 'mobile'

  // Formatted URL path
  const fullPath = `${baseUrl}/${resourceType}/${slug}`.replace(/([^:]\/)\/+/g, "$1");
  const displayUrl = `${baseUrl} > ${resourceType} > ${slug.replace(/-/g, ' ')}`;

  // Truncation helpers
  const truncatedTitle = title.length > 60 ? title.substring(0, 57) + "..." : title;
  const truncatedDesc = description.length > 155 ? description.substring(0, 152) + "..." : description;

  return (
    <div className="bg-surface border border-black/10 rounded-xl p-4 shadow-2xs space-y-3">
      {/* Device Switcher Header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
        <div className="flex items-center gap-2">
          <FiGlobe className="text-text-muted" size={14} />
          <span className="text-xs font-bold text-text-primary uppercase tracking-wider">
            Google Search Preview
          </span>
        </div>

        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-black/5">
          <button
            type="button"
            onClick={() => setDevice('desktop')}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
              device === 'desktop' ? "bg-surface text-text-primary shadow-2xs font-bold" : "text-text-muted hover:text-black"
            )}
          >
            <FiMonitor size={12} />
            <span>Desktop</span>
          </button>
          <button
            type="button"
            onClick={() => setDevice('mobile')}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
              device === 'mobile' ? "bg-surface text-text-primary shadow-2xs font-bold" : "text-text-muted hover:text-black"
            )}
          >
            <FiSmartphone size={12} />
            <span>Mobile</span>
          </button>
        </div>
      </div>

      {/* Simulated Search Engine Container */}
      <div className={cn(
        "bg-[#F8F9FA] border border-border rounded-xl p-4 transition-all duration-200 font-sans",
        device === 'mobile' ? "max-w-sm mx-auto shadow-md" : "w-full"
      )}>
        {/* SERP Item Card */}
        <div className="space-y-1">
          {/* Favicon & Breadcrumb */}
          <div className="flex items-center gap-2 text-xs text-[#202124]">
            <div className="w-4 h-4 rounded-full bg-[#1A1A1A] text-white flex items-center justify-center text-[9px] font-bold font-serif shrink-0">
              A
            </div>
            <div className="flex flex-col">
              <span className="text-[12px] font-semibold text-[#202124] leading-tight">
                Aurelian Furniture
              </span>
              <span className="text-[11px] text-[#4d5156] font-mono truncate max-w-[280px]">
                {fullPath}
              </span>
            </div>
          </div>

          {/* Clickable Title Link */}
          <h3 className={cn(
            "text-[#1a0dab] hover:underline cursor-pointer font-normal leading-snug tracking-normal pt-1",
            device === 'mobile' ? "text-base font-medium" : "text-lg"
          )}>
            {truncatedTitle || <span className="italic text-text-muted">Specify SEO Title...</span>}
          </h3>

          {/* Description Snippet */}
          <p className="text-[#4d5156] text-xs leading-relaxed max-w-2xl pt-0.5">
            {truncatedDesc || <span className="italic text-text-muted">Add meta description snippet...</span>}
          </p>
        </div>
      </div>

      {/* Length Validation Metrics */}
      <div className="grid grid-cols-2 gap-3 pt-1 text-[11px]">
        <div className="flex items-center justify-between px-2.5 py-1.5 bg-background rounded-lg border border-black/5">
          <span className="text-text-muted">Title Length:</span>
          <span className={cn(
            "font-mono font-bold",
            title.length === 0 ? "text-text-muted" :
            title.length >= 30 && title.length <= 60 ? "text-success" : "text-warning"
          )}>
            {title.length} / 60 chars
          </span>
        </div>

        <div className="flex items-center justify-between px-2.5 py-1.5 bg-background rounded-lg border border-black/5">
          <span className="text-text-muted">Description Length:</span>
          <span className={cn(
            "font-mono font-bold",
            description.length === 0 ? "text-text-muted" :
            description.length >= 120 && description.length <= 160 ? "text-success" : "text-warning"
          )}>
            {description.length} / 160 chars
          </span>
        </div>
      </div>
    </div>
  );
}
