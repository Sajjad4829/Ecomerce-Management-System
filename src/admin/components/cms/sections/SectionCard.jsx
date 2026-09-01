import { motion } from 'framer-motion';
import { FiPlus, FiEye, FiEdit2, FiLayout, FiGrid, FiStar, FiTrendingUp, FiBox, FiFlag, FiTag, FiZap, FiClock, FiMousePointer, FiType, FiAward, FiBarChart2, FiMessageSquare, FiShield, FiImage, FiVideo, FiMail, FiHelpCircle, FiPhone } from 'react-icons/fi';
import FavoriteButton from './FavoriteButton';
import { cn } from '../../../../utils/cn';

const ICON_MAP = {
  FiLayout, FiGrid, FiStar, FiTrendingUp, FiBox, FiFlag, FiTag, FiZap, FiClock, FiMousePointer, FiType, FiAward, FiBarChart2, FiMessageSquare, FiShield, FiImage, FiVideo, FiMail, FiHelpCircle, FiPhone
};

const CATEGORY_COLORS = {
  'HERO': 'text-indigo-600 border-indigo-600',
  'PRODUCTS': 'text-purple-600 border-purple-600',
  'CATEGORIES': 'text-blue-500 border-blue-500',
  'MARKETING': 'text-green-600 border-green-600',
  'PROMO': 'text-green-600 border-green-600',
  'SPLIT': 'text-purple-600 border-purple-600',
  'FEATURES': 'text-orange-500 border-orange-500',
  'TESTIMONIALS': 'text-teal-500 border-teal-500',
  'NEWSLETTER': 'text-green-700 border-green-700',
  'SOCIAL PROOF': 'text-pink-500 border-pink-500',
  'SOCIAL': 'text-pink-500 border-pink-500',
  'CONTENT': 'text-gray-600 border-gray-600',
  'MEDIA': 'text-sky-500 border-sky-500',
  'ENGAGEMENT': 'text-emerald-500 border-emerald-500'
};

export default function SectionCard({ section, view, onPreview, onEdit, usageCount = 0 }) {
  const isList = view === 'list';
  const IconComponent = ICON_MAP[section.icon] || FiLayout;
  
  // Find a matching color for the category or use a fallback
  const catUpper = (section.category || '').toUpperCase();
  const colorClass = CATEGORY_COLORS[catUpper] || 'text-gray-600 border-gray-600';

  // Extract the first available image from the section's saved content to use as preview
  const getPreviewImage = () => {
    // 1. Check common content structures
    if (section.content?.slides?.[0]?.image) return section.content.slides[0].image;
    if (section.content?.image) return section.content.image;
    if (section.content?.backgroundImage) return section.content.backgroundImage;
    if (section.content?.media?.url) return section.content.media.url;
    
    // 2. Deep search for any image URL in the content
    const searchForImage = (obj) => {
      if (!obj) return null;
      if (typeof obj === 'string' && (obj.startsWith('http') || obj.startsWith('data:image'))) return obj;
      if (typeof obj === 'object') {
        for (const key in obj) {
          if (key === 'icon') continue; // skip lucide icons
          const res = searchForImage(obj[key]);
          if (res) return res;
        }
      }
      return null;
    };
    const found = searchForImage(section.content);
    if (found) return found;

    // 3. Fallback to default section image
    return section.image;
  };

  const displayImage = getPreviewImage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        "bg-white border border-black/5 rounded-xl overflow-hidden hover:shadow-lg transition-all group flex relative",
        isList ? "flex-row items-stretch" : "flex-col"
      )}
    >
      {/* Thumbnail */}
      <div className={cn(
        "bg-gray-50 relative shrink-0 overflow-hidden",
        isList ? "w-64" : "w-full aspect-[16/9]"
      )}>
        {displayImage ? (
          <img src={displayImage} alt={section.name} className="w-full h-full object-cover object-top opacity-90 group-hover:opacity-100 transition-opacity" />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-gray-300">
            <div className="text-xs uppercase tracking-widest font-bold">Preview</div>
            <div className="text-[10px] uppercase tracking-widest">{section.category}</div>
          </div>
        )}
        
        {/* Hover overlay actions (centered) */}
        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 z-20">
          <button 
            onClick={() => onPreview(section)}
            className="w-10 h-10 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all shadow-lg"
            title="Preview Section"
          >
            <FiEye size={18} />
          </button>
          <button 
            onClick={() => onEdit(section)}
            className="w-10 h-10 bg-white/10 backdrop-blur border border-white/20 rounded-full flex items-center justify-center text-white hover:bg-white hover:text-black hover:scale-110 transition-all shadow-lg"
            title="Edit Template"
          >
            <FiEdit2 size={18} />
          </button>
          <button 
            className="w-10 h-10 bg-indigo-500 text-white rounded-full flex items-center justify-center hover:bg-indigo-400 hover:scale-110 transition-all shadow-lg"
            title="Add to Page"
          >
            <FiPlus size={18} />
          </button>
        </div>
      </div>

      {/* Content */}
      <div className={cn("p-5 flex flex-col flex-1", isList && "justify-between")}>
        <div className="flex justify-between items-start mb-2">
          <div className="flex items-center gap-2">
            <IconComponent className="text-text-muted" size={16} />
            <h3 className="text-sm font-bold text-text-primary">{section.name}</h3>
          </div>
          {/* Badge moved here: inside the card, outside the preview image */}
          <div className={cn("border px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider", colorClass)}>
            {section.category}
          </div>
        </div>
        <p className="text-xs text-text-muted line-clamp-2 leading-relaxed mb-4">
          {section.description || "No description provided."}
        </p>

        <div className="flex items-center justify-between mt-auto pt-4">
          <span className="text-xs text-text-muted font-medium">Used in {usageCount} pages</span>
          <span className="text-[10px] font-bold bg-green-50 text-green-700 px-3 py-1 rounded-full tracking-wide">
            Saved
          </span>
        </div>
      </div>
    </motion.div>
  );
}
