import { useState } from 'react';
import { FiCode, FiCheck, FiSettings, FiEye, FiMoreVertical } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const MOCK_SCHEMAS = [
  { id: 'organization', title: 'Organization', description: 'Defines your brand, logo, and contact info.', status: 'enabled', type: 'Global' },
  { id: 'website', title: 'WebSite', description: 'Enables search box functionality in search results.', status: 'enabled', type: 'Global' },
  { id: 'breadcrumb', title: 'BreadcrumbList', description: 'Shows page hierarchy in search results.', status: 'enabled', type: 'Global' },
  { id: 'product', title: 'Product', description: 'Shows price, availability, and review ratings.', status: 'enabled', type: 'Dynamic' },
  { id: 'article', title: 'Article', description: 'Used for blog posts and news.', status: 'disabled', type: 'Dynamic' },
  { id: 'collection', title: 'CollectionPage', description: 'Used for category and collection listings.', status: 'enabled', type: 'Dynamic' },
];

export default function SchemaManager() {
  const [schemas, setSchemas] = useState(MOCK_SCHEMAS);

  const toggleSchema = (id) => {
    setSchemas(schemas.map(s => 
      s.id === id ? { ...s, status: s.status === 'enabled' ? 'disabled' : 'enabled' } : s
    ));
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2">
            <Link to="/admin/seo" className="text-sm font-medium text-text-muted hover:text-black">SEO Engine</Link>
            <span className="text-gray-300">/</span>
            <span className="text-sm font-medium text-text-primary">Structured Data</span>
          </div>
          <h1 className="text-3xl font-serif font-bold text-text-primary mt-2">Schema Manager</h1>
          <p className="text-sm text-text-muted mt-2 max-w-xl leading-relaxed">
            Manage JSON-LD structured data for rich snippets in search results.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {schemas.map((schema) => (
          <div key={schema.id} className="bg-surface rounded-xl border border-black/5 shadow-sm p-6 flex flex-col">
            <div className="flex justify-between items-start mb-4">
              <div className="w-10 h-10 bg-background rounded-lg flex items-center justify-center text-text-secondary">
                <FiCode size={20} />
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider bg-gray-100 px-2 py-1 rounded">
                  {schema.type}
                </span>
                <button className="text-text-muted hover:text-black">
                  <FiMoreVertical size={16} />
                </button>
              </div>
            </div>
            
            <h3 className="text-lg font-bold text-text-primary mb-2">{schema.title}</h3>
            <p className="text-sm text-text-muted leading-relaxed mb-6 flex-1">
              {schema.description}
            </p>
            
            <div className="flex items-center justify-between pt-4 border-t border-black/5">
              <label className="flex items-center gap-2 cursor-pointer">
                <div className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${schema.status === 'enabled' ? 'bg-[#1A1A1A]' : 'bg-gray-200'}`}>
                  <input
                    type="checkbox"
                    className="sr-only peer"
                    checked={schema.status === 'enabled'}
                    onChange={() => toggleSchema(schema.id)}
                  />
                  <span className={`inline-block h-3.5 w-3.5 transform rounded-full bg-surface transition-transform ${schema.status === 'enabled' ? 'translate-x-4.5' : 'translate-x-1'}`} />
                </div>
                <span className="text-xs font-bold text-text-secondary uppercase tracking-wider">
                  {schema.status === 'enabled' ? 'Active' : 'Inactive'}
                </span>
              </label>
              
              <div className="flex gap-2">
                <button className="p-2 text-text-muted hover:text-primary hover:bg-blue-50 rounded-lg transition-colors" title="Preview Schema">
                  <FiEye size={16} />
                </button>
                <button className="p-2 text-text-muted hover:text-text-primary hover:bg-background rounded-lg transition-colors" title="Configure">
                  <FiSettings size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-background p-6 rounded-xl border border-black/5 flex gap-4 items-start">
        <div className="w-10 h-10 bg-surface rounded-full flex items-center justify-center shrink-0 border border-black/10">
          <FiCode className="text-text-secondary" />
        </div>
        <div>
          <h4 className="text-sm font-bold text-text-primary">About Structured Data</h4>
          <p className="text-sm text-text-secondary mt-1">
            Structured data is added to your store's HTML using JSON-LD format. It helps search engines like Google understand your content and display rich results. 
            Modifying these settings impacts how your site appears in SERPs.
          </p>
        </div>
      </div>
    </div>
  );
}
