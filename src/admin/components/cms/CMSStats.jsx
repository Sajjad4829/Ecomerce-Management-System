import { motion } from 'framer-motion';

export default function CMSStats({ title, value, label, icon: Icon, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay, duration: 0.4 }}
      className="bg-white p-5 rounded-xl border border-black/5 flex items-center gap-4"
    >
      <div className="w-12 h-12 rounded-full bg-[#F7F5F2] border border-black/5 flex items-center justify-center shrink-0">
        <Icon className="text-lg text-[#1A1A1A]" />
      </div>
      <div>
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-2xl font-serif font-bold text-[#1A1A1A]">{value}</span>
          <span className="text-[10px] uppercase tracking-widest text-gray-400">{label}</span>
        </div>
        <div className="text-xs text-gray-500 font-medium">{title}</div>
      </div>
    </motion.div>
  );
}
