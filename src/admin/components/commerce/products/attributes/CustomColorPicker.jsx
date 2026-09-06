import React, { useState, useRef, useEffect } from 'react';
import { HexColorPicker } from 'react-colorful';
import { FiCopy, FiCheck } from 'react-icons/fi';
import { Pipette } from 'lucide-react'; // For the eyedropper icon

const PRESET_COLORS = [
  '#EF4444', '#F97316', '#F59E0B', 
  '#10B981', '#06B6D4', '#3B82F6', 
  '#8B5CF6', '#EC4899', '#4B5563'
];

export default function CustomColorPicker({ color, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const popoverRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText(color);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="relative" ref={popoverRef}>
      {/* Trigger Button - Looks like the pill shape from the screenshot */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="relative w-full h-10 rounded-full overflow-hidden border border-gray-200 shadow-sm flex items-center justify-center transition-all hover:ring-2 hover:ring-blue-500 hover:ring-offset-1 group"
        style={{ backgroundColor: color || '#000000' }}
      >
        <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
          <Pipette className="w-4 h-4 text-white drop-shadow-md" />
        </div>
      </button>

      {/* Popover */}
      {isOpen && (
        <div className="absolute z-50 top-full left-0 mt-3 bg-white rounded-3xl p-5 shadow-[0_20px_40px_-10px_rgba(0,0,0,0.15)] border border-gray-100 w-[260px] animate-in fade-in zoom-in-95 duration-200">
          
          {/* Header */}
          <div className="flex items-center justify-between mb-4 pb-3 border-b border-gray-100">
            <div className="flex items-center gap-2">
              <Pipette className="w-5 h-5 text-gray-700" />
              <span className="text-sm font-semibold text-gray-800 tracking-wide">Color Picker</span>
            </div>
            <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-600">
              <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L11 11M1 11L11 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          <div className="flex gap-4">
            {/* Left: Color Wheel */}
            <div className="w-[140px]">
              <style dangerouslySetInnerHTML={{__html: `
                .react-colorful { width: 100% !important; height: 140px !important; }
                .react-colorful__pointer { width: 16px; height: 16px; }
              `}} />
              <HexColorPicker color={color || '#000000'} onChange={onChange} />
            </div>

            {/* Right: Controls */}
            <div className="flex-1 flex flex-col gap-3">
              {/* Active Color Block */}
              <div 
                className="w-full h-8 rounded-lg shadow-sm border border-gray-200"
                style={{ backgroundColor: color || '#000000' }}
              />

              {/* Hex Input */}
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={color?.toUpperCase() || '#000000'}
                  onChange={(e) => onChange(e.target.value)}
                  className="w-full text-xs font-mono font-medium text-gray-700 pl-2 pr-7 py-1.5 border border-gray-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 uppercase"
                />
                <button 
                  onClick={handleCopy}
                  className="absolute right-1.5 p-1 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {copied ? <FiCheck size={12} className="text-green-500" /> : <FiCopy size={12} />}
                </button>
              </div>

              {/* Presets */}
              <div>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider mb-2">Presets</p>
                <div className="grid grid-cols-3 gap-1.5">
                  {PRESET_COLORS.map(preset => (
                    <button
                      key={preset}
                      onClick={() => onChange(preset)}
                      className={`w-6 h-6 rounded-full shadow-sm transition-transform hover:scale-110 border ${
                        color?.toLowerCase() === preset.toLowerCase() 
                          ? 'border-gray-900 ring-2 ring-gray-900 ring-offset-1' 
                          : 'border-black/5'
                      }`}
                      style={{ backgroundColor: preset }}
                      title={preset}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
