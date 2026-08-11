import React, { useState } from 'react';
import { FiSave, FiFileText } from 'react-icons/fi';

export function RobotsManager() {
  const [robotsContent, setRobotsContent] = useState(
`User-agent: *
Disallow: /admin/
Disallow: /checkout/
Disallow: /cart/
Disallow: /account/

Sitemap: https://aurorafurniture.com/sitemap.xml`
  );

  return (
    <div className="p-8 max-w-4xl space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Robots.txt</h2>
          <p className="text-sm text-text-muted">Manage crawling directives for search engine bots.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors">
          <FiSave /> Save Robots.txt
        </button>
      </div>

      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-border bg-background flex items-center justify-between">
          <h3 className="font-bold text-text-primary flex items-center gap-2"><FiFileText /> Edit robots.txt</h3>
        </div>
        <div className="p-6">
          <textarea
            value={robotsContent}
            onChange={(e) => setRobotsContent(e.target.value)}
            rows={12}
            className="w-full font-mono text-sm p-4 bg-background border border-border rounded-lg focus:outline-none focus:border-primary"
            spellCheck="false"
          />
          <p className="text-sm text-text-muted mt-4">
            Be careful when modifying this file. Incorrect directives can prevent search engines from indexing your site. 
            Modifications here are saved conceptually and would require a backend deployment to take effect on the live server.
          </p>
        </div>
      </div>
    </div>
  );
}
