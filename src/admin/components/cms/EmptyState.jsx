import { motion } from 'framer-motion';

export default function EmptyState({ icon: Icon, title, message, actionLabel, onAction }) {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.4 }}
      className="flex flex-col items-center justify-center py-16 px-4 text-center bg-surface border border-black/5 rounded-xl border-dashed"
    >
      <div className="w-16 h-16 bg-background rounded-2xl flex items-center justify-center text-text-muted mb-6">
        <Icon className="text-3xl" />
      </div>
      <h3 className="text-xl font-serif font-bold text-text-primary mb-2">{title}</h3>
      <p className="text-sm text-text-muted max-w-sm mx-auto mb-8 leading-relaxed">
        {message}
      </p>
      <button 
        onClick={onAction}
        className="px-6 py-3 bg-[#1A1A1A] text-white text-xs font-semibold uppercase tracking-widest rounded-lg hover:bg-black/80 transition-colors shadow-lg shadow-black/10"
      >
        {actionLabel}
      </button>
    </motion.div>
  );
}
