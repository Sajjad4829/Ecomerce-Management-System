import { useState } from 'react';
import { FiShare2, FiImage, FiTwitter, FiFacebook, FiEdit3 } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function SocialPreview({
  ogTitle,
  ogDescription,
  ogImage,
  slug,
  baseUrl = "https://aurelianfurniture.com",
  onSelectImageClick
}) {
  const [platform, setPlatform] = useState('facebook'); // 'facebook' | 'twitter'

  const displayTitle = ogTitle || "Aurelian Luxury Furniture Collection";
  const displayDesc = ogDescription || "Handcrafted Italian leather & velvet furniture for high-end residential interiors.";
  const displayImage = ogImage || "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80";

  return (
    <div className="bg-white border border-black/10 rounded-xl p-4 shadow-2xs space-y-3">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-2.5">
        <div className="flex items-center gap-2">
          <FiShare2 className="text-gray-400" size={14} />
          <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider">
            Social Media Sharing Preview
          </span>
        </div>

        <div className="flex items-center bg-gray-100 p-1 rounded-lg border border-black/5">
          <button
            type="button"
            onClick={() => setPlatform('facebook')}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
              platform === 'facebook' ? "bg-white text-blue-600 shadow-2xs font-bold" : "text-gray-500 hover:text-black"
            )}
          >
            <FiFacebook size={12} />
            <span>Open Graph / FB</span>
          </button>
          <button
            type="button"
            onClick={() => setPlatform('twitter')}
            className={cn(
              "px-2.5 py-1 rounded-md text-[11px] font-semibold flex items-center gap-1.5 transition-all cursor-pointer",
              platform === 'twitter' ? "bg-white text-[#1DA1F2] shadow-2xs font-bold" : "text-gray-500 hover:text-black"
            )}
          >
            <FiTwitter size={12} />
            <span>X / Twitter Card</span>
          </button>
        </div>
      </div>

      {/* Social Card Preview Container */}
      {platform === 'facebook' ? (
        /* Facebook / OpenGraph Style Card */
        <div className="border border-gray-200 rounded-xl overflow-hidden bg-[#F0F2F5] shadow-xs">
          <div className="relative aspect-[1.91/1] bg-gray-200 overflow-hidden group">
            <img
              src={displayImage}
              alt="OG Share Banner"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={onSelectImageClick}
              className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-xs text-[#1A1A1A] px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-white transition-all cursor-pointer opacity-90 hover:opacity-100"
            >
              <FiImage size={14} />
              <span>Change OG Image</span>
            </button>
          </div>

          <div className="p-3.5 bg-white border-t border-gray-100">
            <div className="text-[10px] font-mono text-gray-400 uppercase tracking-wider mb-1">
              AURELIANFURNITURE.COM
            </div>
            <h4 className="font-bold text-sm text-[#1C1E21] leading-tight line-clamp-1">
              {displayTitle}
            </h4>
            <p className="text-xs text-[#606770] line-clamp-2 mt-1 leading-relaxed">
              {displayDesc}
            </p>
          </div>
        </div>
      ) : (
        /* Twitter / X Large Summary Card */
        <div className="border border-gray-200 rounded-2xl overflow-hidden bg-white shadow-xs max-w-lg mx-auto">
          <div className="relative aspect-[1.91/1] bg-gray-200 overflow-hidden">
            <img
              src={displayImage}
              alt="Twitter Card Banner"
              className="w-full h-full object-cover"
            />
            <button
              type="button"
              onClick={onSelectImageClick}
              className="absolute bottom-3 right-3 bg-black/80 backdrop-blur-xs text-white px-3 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 shadow-md hover:bg-black transition-all cursor-pointer"
            >
              <FiImage size={14} />
              <span>Change Card Media</span>
            </button>
          </div>

          <div className="p-3.5">
            <div className="flex items-center gap-1 text-[11px] text-gray-500 mb-0.5">
              <span>aurelianfurniture.com</span>
            </div>
            <h4 className="font-bold text-xs text-[#0F1419] leading-snug line-clamp-1">
              {displayTitle}
            </h4>
            <p className="text-[11px] text-[#536471] line-clamp-2 mt-0.5">
              {displayDesc}
            </p>
          </div>
        </div>
      )}

      {/* Image Specs Indicator */}
      <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 bg-gray-50 p-2 rounded-lg border border-black/5">
        <span>Recommended Dimensions: <strong className="text-black">1200 x 630 px</strong></span>
        <span>Aspect Ratio: <strong className="text-black">1.91:1</strong></span>
      </div>
    </div>
  );
}
