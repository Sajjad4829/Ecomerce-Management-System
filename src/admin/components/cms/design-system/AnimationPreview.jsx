import { motion } from 'framer-motion';

const EASING_TOKENS = [
  { id: 'linear', name: 'Linear', value: 'cubic-bezier(0, 0, 1, 1)' },
  { id: 'ease-in', name: 'Ease In', value: 'cubic-bezier(0.4, 0, 1, 1)' },
  { id: 'ease-out', name: 'Ease Out', value: 'cubic-bezier(0, 0, 0.2, 1)' },
  { id: 'ease-in-out', name: 'Ease In Out', value: 'cubic-bezier(0.4, 0, 0.2, 1)' },
  { id: 'spring', name: 'Spring', value: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)' },
];

const DURATION_TOKENS = [
  { id: 'fast', name: 'Fast', value: '150ms' },
  { id: 'normal', name: 'Normal', value: '300ms' },
  { id: 'slow', name: 'Slow', value: '500ms' },
];

export default function AnimationPreview() {
  return (
    <div className="space-y-8">
      
      {/* Durations */}
      <div className="bg-surface border border-black/5 rounded-xl p-8 shadow-sm">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-6 border-b border-black/5 pb-2">
          Animation Durations
        </h3>
        <div className="space-y-6">
          {DURATION_TOKENS.map(token => (
            <div key={token.id} className="flex items-center gap-6">
               <div className="w-32 shrink-0 text-right">
                  <div className="text-xs font-bold text-text-primary">{token.name}</div>
                  <div className="text-[10px] text-text-muted font-mono">{token.value}</div>
               </div>
               <div className="flex-1 bg-background border border-black/5 rounded-md p-4 overflow-hidden relative h-16 group">
                 <motion.div 
                   className="w-8 h-8 bg-[#A69076] rounded-md absolute left-4 group-hover:left-[calc(100%-3rem)]"
                   transition={{ duration: parseFloat(token.value) / 1000, repeat: Infinity, repeatType: "reverse", ease: "easeInOut" }}
                 />
               </div>
            </div>
          ))}
        </div>
      </div>

      {/* Easings */}
      <div className="bg-surface border border-black/5 rounded-xl p-8 shadow-sm">
        <h3 className="text-sm font-bold text-text-primary uppercase tracking-widest mb-6 border-b border-black/5 pb-2">
          Easing Functions
        </h3>
        <div className="space-y-6">
          {EASING_TOKENS.map(token => (
            <div key={token.id} className="flex items-center gap-6">
               <div className="w-32 shrink-0 text-right">
                  <div className="text-xs font-bold text-text-primary">{token.name}</div>
                  <div className="text-[10px] text-text-muted font-mono text-xs">{token.value}</div>
               </div>
               <div className="flex-1 bg-background border border-black/5 rounded-md p-4 overflow-hidden relative h-16 group">
                 <motion.div 
                   className="w-8 h-8 bg-[#1A1A1A] rounded-md absolute left-4 group-hover:left-[calc(100%-3rem)]"
                   transition={{ 
                     duration: 1.5, 
                     repeat: Infinity, 
                     repeatType: "reverse", 
                     ease: token.id === 'spring' ? [0.175, 0.885, 0.32, 1.275] : 
                           token.id === 'linear' ? "linear" : 
                           token.id === 'ease-in' ? "easeIn" : 
                           token.id === 'ease-out' ? "easeOut" : "easeInOut"
                   }}
                 />
               </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
