import { cn } from '../../../../utils/cn';

export default function PopupLayoutInspector({
  layout = {},
  onChangeLayout
}) {
  const {
    popupType = 'Modal', // 'Modal' | 'Slide-in' | 'Fullscreen' | 'Bottom Bar' | 'Announcement'
    backgroundColor = '#1A1A1A',
    textColor = '#FFFFFF',
    overlay = true,
    borderRadius = '16px',
    width = '600px'
  } = layout;

  const handleChange = (key, val) => {
    onChangeLayout({ ...layout, [key]: val });
  };

  return (
    <div className="bg-white border border-black/10 rounded-xl p-4 shadow-2xs space-y-4">
      <div className="border-b border-black/5 pb-2">
        <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">Popup Layout & Styling</h4>
        <p className="text-[11px] text-gray-400">Configure modal format, background colors, radii, and backdrops.</p>
      </div>

      <div className="space-y-3.5 text-xs">
        
        {/* Popup Type Selector */}
        <div className="space-y-1">
          <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Campaign Popup Format</label>
          <div className="grid grid-cols-2 gap-2">
            {['Modal', 'Slide-in', 'Announcement', 'Bottom Bar', 'Fullscreen'].map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => handleChange('popupType', type)}
                className={cn(
                  "py-2 px-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer text-center",
                  popupType === type ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-2xs" : "bg-gray-50 text-gray-600 border-black/10 hover:bg-gray-100"
                )}
              >
                {type}
              </button>
            ))}
          </div>
        </div>

        {/* Color Palette */}
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Background Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="w-8 h-8 rounded border border-black/10 cursor-pointer"
              />
              <input
                type="text"
                value={backgroundColor}
                onChange={(e) => handleChange('backgroundColor', e.target.value)}
                className="flex-1 px-2 py-1 bg-gray-50 border border-black/10 rounded text-xs font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Text Color</label>
            <div className="flex items-center gap-2">
              <input
                type="color"
                value={textColor}
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="w-8 h-8 rounded border border-black/10 cursor-pointer"
              />
              <input
                type="text"
                value={textColor}
                onChange={(e) => handleChange('textColor', e.target.value)}
                className="flex-1 px-2 py-1 bg-gray-50 border border-black/10 rounded text-xs font-mono"
              />
            </div>
          </div>
        </div>

        {/* Overlay Backdrop */}
        <div className="p-3 bg-gray-50 border border-black/5 rounded-lg flex items-center justify-between">
          <div>
            <span className="font-bold text-gray-800 block text-xs">Dim Backdrop Overlay</span>
            <span className="text-[10px] text-gray-400">Darken page background behind popup card</span>
          </div>
          <input
            type="checkbox"
            checked={overlay}
            onChange={(e) => handleChange('overlay', e.target.checked)}
            className="w-4 h-4 rounded border-black/20 cursor-pointer"
          />
        </div>

        {/* Border Radius */}
        <div className="space-y-1">
          <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Corner Radius ({borderRadius})</label>
          <select
            value={borderRadius}
            onChange={(e) => handleChange('borderRadius', e.target.value)}
            className="w-full px-2.5 py-1.5 bg-gray-50 border border-black/10 rounded-lg text-xs font-semibold"
          >
            <option value="0px font-mono">0px (Sharp Luxury Edges)</option>
            <option value="8px font-mono">8px (Subtle Radius)</option>
            <option value="16px font-mono">16px (Standard Rounded)</option>
            <option value="24px font-mono">24px (Soft Pillow Corners)</option>
          </select>
        </div>

      </div>
    </div>
  );
}
