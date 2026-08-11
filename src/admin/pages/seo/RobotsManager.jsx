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
          <h2 className="text-2xl font-bold text-stone-900 mb-1">Robots.txt</h2>
          <p className="text-sm text-stone-500">Manage crawling directives for search engine bots.</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-stone-900 text-white text-sm font-medium rounded-lg hover:bg-stone-800 transition-colors">
          <FiSave /> Save Robots.txt
        </button>
      </div>

      <div className="bg-white border border-stone-200 rounded-xl overflow-hidden shadow-sm">
        <div className="px-6 py-4 border-b border-stone-200 bg-stone-50 flex items-center justify-between">
          <h3 className="font-bold text-stone-900 flex items-center gap-2"><FiFileText /> Edit robots.txt</h3>
        </div>
        <div className="p-6">
          <textarea
            value={robotsContent}
            onChange={(e) => setRobotsContent(e.target.value)}
            rows={12}
            className="w-full font-mono text-sm p-4 bg-stone-50 border border-stone-200 rounded-lg focus:outline-none focus:border-stone-400"
            spellCheck="false"
          />
          <p className="text-sm text-stone-500 mt-4">
            Be careful when modifying this file. Incorrect directives can prevent search engines from indexing your site. 
            Modifications here are saved conceptually and would require a backend deployment to take effect on the live server.
          </p>
        </div>
      </div>
    </div>
  );
}
