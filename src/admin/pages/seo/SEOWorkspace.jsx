import { motion } from 'framer-motion';
import { FiSearch, FiCode, FiCompass, FiAlertCircle, FiSettings, FiFileText, FiLink } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const SEO_MODULES = [
  { id: 'entities', title: 'Entity SEO', description: 'Manage SEO for Products, Categories, Collections, and Pages.', icon: FiSearch, path: '/admin/seo/entities', count: 482 },
  { id: 'schema', title: 'Structured Data', description: 'Manage JSON-LD Schemas (Product, Article, Organization).', icon: FiCode, path: '/admin/seo/schema', count: 5 },
  { id: 'redirects', title: 'Redirects', description: 'Manage 301/302 redirects and 404 monitoring.', icon: FiLink, path: '/admin/seo/redirects', count: 124 },
  { id: 'audit', title: 'SEO Audit', description: 'Find missing metadata, broken links, and SEO errors.', icon: FiAlertCircle, path: '/admin/seo/audit', count: 12 },
  { id: 'sitemap', title: 'Sitemap & Robots', description: 'Configure XML sitemaps and robots.txt rules.', icon: FiCompass, path: '/admin/seo/sitemap', count: 2 },
  { id: 'settings', title: 'SEO Settings', description: 'Global SEO templates, default images, and site identity.', icon: FiSettings, path: '/admin/seo/settings' }
];

const METRICS = [
  { label: 'Total Indexed Entities', value: '482' },
  { label: 'SEO Optimized', value: '85%', textClass: 'text-success' },
  { label: 'Needs Improvement', value: '45', textClass: 'text-warning' },
  { label: 'Critical Errors', value: '12', textClass: 'text-danger' }
];

export default function SEOWorkspace() {
  return (
    <div className="max-w-7xl mx-auto space-y-8 pb-12">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 rounded bg-blue-100 text-blue-900 font-mono text-[10px] uppercase font-bold">
            SEO & Discovery
          </span>
        </div>
        <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">SEO Engine</h1>
        <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
          Manage technical SEO, structured data, redirects, and global search engine visibility settings.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {METRICS.map((metric, idx) => (
          <div key={idx} className="bg-surface p-5 rounded-xl border border-black/5 shadow-sm">
            <p className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">{metric.label}</p>
            <p className={`text-2xl font-bold mt-1 ${metric.textClass || 'text-text-primary'}`}>{metric.value}</p>
          </div>
        ))}
      </div>

      {/* Modules Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {SEO_MODULES.map((module) => {
          const Icon = module.icon;
          return (
            <Link 
              key={module.id} 
              to={module.path}
              className="bg-surface rounded-xl border border-black/5 p-6 hover:border-black/20 hover:shadow-md transition-all group block"
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-12 h-12 bg-background rounded-xl flex items-center justify-center group-hover:bg-[#1A1A1A] group-hover:text-white transition-colors">
                  <Icon size={20} />
                </div>
                {module.count !== undefined && (
                  <span className="px-2.5 py-1 bg-gray-100 text-text-secondary rounded-lg text-xs font-bold">
                    {module.count}
                  </span>
                )}
              </div>
              <h3 className="text-lg font-bold text-text-primary mb-2">{module.title}</h3>
              <p className="text-sm text-text-muted leading-relaxed">{module.description}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
