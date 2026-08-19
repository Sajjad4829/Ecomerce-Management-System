import { motion } from 'framer-motion';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function CMSCard({ title, description, icon: Icon, count, delay, link }) {
  const content = (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.4, ease: "easeOut" }}
      className="bg-surface border border-black/5 rounded-xl p-6 group cursor-pointer hover:shadow-md hover:border-black/10 transition-all flex flex-col justify-between h-full"
    >
      <div className="flex items-start justify-between mb-8">
        <div className="w-12 h-12 bg-background rounded-lg flex items-center justify-center text-text-primary group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors duration-300">
          <Icon className="text-xl" />
        </div>
        <div className="bg-background border border-black/5 px-2.5 py-1 rounded-full text-xs font-semibold text-text-muted">
          {count} Items
        </div>
      </div>
      
      <div>
        <h3 className="text-lg font-serif font-bold text-text-primary mb-2">{title}</h3>
        <p className="text-sm text-text-muted leading-relaxed mb-6 line-clamp-2">
          {description}
        </p>
      </div>

      <div className="flex items-center text-xs font-semibold uppercase tracking-widest text-text-primary mt-auto">
        <span>Manage {title}</span>
        <FiArrowRight className="ml-2 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300" />
      </div>
    </motion.div>
  );

  if (link) {
    return <Link to={link} className="block h-full">{content}</Link>;
  }

  return content;
}
