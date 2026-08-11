import { FiClock, FiPercent, FiLogOut, FiMousePointer } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function TriggerSettings({
  trigger = {},
  onChangeTrigger
}) {
  const {
    type = 'delay', // 'load' | 'delay' | 'scroll' | 'exit_intent' | 'click'
    delaySeconds = 5,
    scrollPercent = 50,
    clickSelector = '#vip-offer-btn'
  } = trigger;

  const handleChange = (key, val) => {
    onChangeTrigger({ ...trigger, [key]: val });
  };

  return (
    <div className="bg-white border border-black/10 rounded-xl p-4 shadow-2xs space-y-4">
      <div className="border-b border-black/5 pb-2">
        <h4 className="font-serif font-bold text-sm text-[#1A1A1A]">Campaign Display Triggers</h4>
        <p className="text-[11px] text-gray-400">Select the behavioral event that launches this popup experience.</p>
      </div>

      <div className="space-y-3.5 text-xs">
        
        {/* Trigger Type Selection */}
        <div className="space-y-1">
          <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Launch Trigger Event</label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: 'delay', label: 'Timed Delay', icon: FiClock },
              { id: 'scroll', label: 'Scroll Percentage', icon: FiPercent },
              { id: 'exit_intent', label: 'Exit Intent Cursor', icon: FiLogOut },
              { id: 'click', label: 'On Click Element', icon: FiMousePointer }
            ].map((t) => {
              const Icon = t.icon;
              return (
                <button
                  key={t.id}
                  type="button"
                  onClick={() => handleChange('type', t.id)}
                  className={cn(
                    "py-2 px-2.5 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-2",
                    type === t.id ? "bg-[#1A1A1A] text-white border-[#1A1A1A] shadow-2xs" : "bg-gray-50 text-gray-600 border-black/10 hover:bg-gray-100"
                  )}
                >
                  <Icon size={14} />
                  <span>{t.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Trigger Controls */}
        {type === 'delay' && (
          <div className="space-y-1 bg-gray-50 p-3 rounded-lg border border-black/5">
            <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Delay Duration ({delaySeconds} seconds)</label>
            <input
              type="range"
              min={1}
              max={60}
              value={delaySeconds}
              onChange={(e) => handleChange('delaySeconds', Number(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
            <span className="text-[10px] text-gray-400 block font-mono">Popup displays {delaySeconds}s after visitor arrives on target route.</span>
          </div>
        )}

        {type === 'scroll' && (
          <div className="space-y-1 bg-gray-50 p-3 rounded-lg border border-black/5">
            <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">Scroll Depth ({scrollPercent}%)</label>
            <input
              type="range"
              min={10}
              max={90}
              step={10}
              value={scrollPercent}
              onChange={(e) => handleChange('scrollPercent', Number(e.target.value))}
              className="w-full accent-black cursor-pointer"
            />
            <span className="text-[10px] text-gray-400 block font-mono">Popup fires when user scrolls down {scrollPercent}% of the page length.</span>
          </div>
        )}

        {type === 'exit_intent' && (
          <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg text-amber-900 text-xs">
            <span className="font-bold block">Exit Intent Engine Active</span>
            <p className="text-[11px] text-amber-800/80 mt-0.5">
              Triggers when user moves cursor toward browser tab exit button or URL bar.
            </p>
          </div>
        )}

        {type === 'click' && (
          <div className="space-y-1 bg-gray-50 p-3 rounded-lg border border-black/5">
            <label className="font-bold text-gray-700 uppercase tracking-wider text-[10px]">CSS Element Selector</label>
            <input
              type="text"
              value={clickSelector}
              onChange={(e) => handleChange('clickSelector', e.target.value)}
              className="w-full px-2.5 py-1.5 bg-white border border-black/10 rounded-lg text-xs font-mono"
            />
          </div>
        )}

      </div>
    </div>
  );
}
