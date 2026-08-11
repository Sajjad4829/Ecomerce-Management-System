import { FiX, FiGift, FiBell, FiArrowRight, FiMail } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function PopupCanvas({
  popupType = 'Modal', // 'Modal' | 'Slide-in' | 'Fullscreen' | 'Bottom Bar' | 'Announcement'
  title = 'Exclusive Private Salon Preview',
  description = 'Enjoy 10% complimentary privilege on your first bespoke modular velvet sofa order.',
  imageUrl = 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1200&q=80',
  buttonText = 'Claim VIP Offer',
  secondaryButtonText = 'No thanks, continue browsing',
  showForm = true,
  position = 'center', // 'center' | 'bottom-right' | 'top-bar' | 'bottom-bar'
  backgroundColor = '#1A1A1A',
  textColor = '#FFFFFF',
  overlay = true,
  borderRadius = '16px',
  width = '600px'
}) {
  // Render Announcement Top/Bottom Bar
  if (popupType === 'Announcement' || popupType === 'Bottom Bar') {
    return (
      <div
        style={{ backgroundColor, color: textColor }}
        className="w-full p-3 px-6 shadow-xl flex items-center justify-between text-xs font-medium border-y border-white/10 transition-all"
      >
        <div className="flex items-center gap-3 mx-auto">
          <span className="px-2 py-0.5 rounded bg-amber-400 text-black font-bold uppercase text-[9px] tracking-wider">
            Exclusive
          </span>
          <span className="font-semibold">{title}</span>
          <span className="opacity-80 hidden sm:inline">{description}</span>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            type="button"
            className="px-3 py-1 bg-white text-black font-bold rounded-lg text-xs hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {buttonText}
          </button>
          <button type="button" className="opacity-60 hover:opacity-100">
            <FiX size={16} />
          </button>
        </div>
      </div>
    );
  }

  // Render Slide-in Drawer (e.g. Bottom Right)
  if (popupType === 'Slide-in') {
    return (
      <div className="relative w-full flex justify-end items-end p-4">
        <div
          style={{
            backgroundColor,
            color: textColor,
            borderRadius
          }}
          className="w-full max-w-sm p-6 shadow-2xl border border-white/10 space-y-4 relative animate-in slide-in-from-bottom duration-300"
        >
          <button type="button" className="absolute top-3 right-3 text-current opacity-60 hover:opacity-100">
            <FiX size={16} />
          </button>

          {imageUrl && (
            <div className="w-full h-36 rounded-lg overflow-hidden border border-white/10">
              <img src={imageUrl} alt="Popup visual" className="w-full h-full object-cover" />
            </div>
          )}

          <div className="space-y-1">
            <h4 className="font-serif font-bold text-base leading-snug">{title}</h4>
            <p className="text-xs opacity-80 leading-relaxed">{description}</p>
          </div>

          {showForm && (
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter your email for private invite..."
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs placeholder:text-white/50 text-white focus:outline-none"
              />
            </div>
          )}

          <button
            type="button"
            className="w-full py-2.5 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-lg shadow-md hover:bg-gray-100 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <span>{buttonText}</span>
            <FiArrowRight size={14} />
          </button>
        </div>
      </div>
    );
  }

  // Default Standard Modal
  return (
    <div className="relative w-full flex items-center justify-center p-4 min-h-[400px]">
      {/* Overlay Backdrop */}
      {overlay && (
        <div className="absolute inset-0 bg-black/50 backdrop-blur-xs rounded-xl" />
      )}

      {/* Modal Container */}
      <div
        style={{
          backgroundColor,
          color: textColor,
          borderRadius,
          maxWidth: width
        }}
        className="relative z-10 w-full overflow-hidden shadow-2xl border border-white/10 grid grid-cols-1 md:grid-cols-12 animate-in zoom-in-95 duration-200"
      >
        <button type="button" className="absolute top-3 right-3 z-20 text-current opacity-60 hover:opacity-100 p-1 bg-black/20 rounded-full">
          <FiX size={16} />
        </button>

        {/* Optional Image Banner */}
        {imageUrl && (
          <div className="md:col-span-5 h-48 md:h-auto relative bg-black/20">
            <img src={imageUrl} alt="Popup Visual" className="w-full h-full object-cover" />
          </div>
        )}

        {/* Content Body */}
        <div className={cn(
          "p-6 flex flex-col justify-center space-y-4",
          imageUrl ? "md:col-span-7" : "md:col-span-12"
        )}>
          <div className="space-y-1.5">
            <span className="px-2.5 py-0.5 rounded bg-amber-400 text-black text-[9px] font-bold uppercase tracking-wider font-mono inline-block">
              VIP Private Offer
            </span>
            <h3 className="font-serif font-bold text-xl leading-snug">{title}</h3>
            <p className="text-xs opacity-80 leading-relaxed">{description}</p>
          </div>

          {showForm && (
            <div className="space-y-2">
              <input
                type="email"
                placeholder="Enter email address..."
                className="w-full px-3 py-2 bg-white/10 border border-white/20 rounded-lg text-xs placeholder:text-white/50 text-white focus:outline-none"
              />
            </div>
          )}

          <div className="space-y-2 pt-1">
            <button
              type="button"
              className="w-full py-3 bg-white text-black font-bold text-xs uppercase tracking-wider rounded-xl shadow-md hover:bg-gray-100 transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
            >
              <span>{buttonText}</span>
              <FiArrowRight size={14} />
            </button>

            {secondaryButtonText && (
              <button
                type="button"
                className="w-full text-center text-[11px] opacity-60 hover:opacity-100 py-1 transition-opacity cursor-pointer"
              >
                {secondaryButtonText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
