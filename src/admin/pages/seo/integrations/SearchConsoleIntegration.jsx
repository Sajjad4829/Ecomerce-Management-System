import React, { useState } from 'react';
import { FiSearch, FiCheckCircle } from 'react-icons/fi';
import { SEOIntegrationAdapter } from '../../../services/seo/SEOIntegrationAdapter';

export function SearchConsoleIntegration() {
  const [connecting, setConnecting] = useState(false);
  const [connected, setConnected] = useState(false);

  const handleConnect = async () => {
    setConnecting(true);
    await SEOIntegrationAdapter.syncSearchConsole();
    setConnected(true);
    setConnecting(false);
  };

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-text-primary mb-1">Search Console Integration</h2>
          <p className="text-sm text-text-muted">Connect Google Search Console to import organic traffic and indexation data.</p>
        </div>
      </div>

      <div className="bg-surface border border-border rounded-xl p-8 shadow-sm text-center max-w-lg mx-auto mt-12">
        <div className="w-16 h-16 bg-stone-100 rounded-full flex items-center justify-center mx-auto mb-6">
          {connected ? <FiCheckCircle className="text-green-500" size={32} /> : <FiSearch className="text-text-muted" size={32} />}
        </div>
        <h3 className="text-xl font-bold text-text-primary mb-2">
          {connected ? 'Search Console Connected' : 'Connect Search Console'}
        </h3>
        <p className="text-sm text-text-muted mb-8">
          {connected 
            ? 'Your property is successfully linked. Data will sync automatically every 24 hours.' 
            : 'Authenticate with Google to link your property and enable advanced SEO analytics.'}
        </p>
        
        {!connected && (
          <button 
            onClick={handleConnect}
            disabled={connecting}
            className="px-6 py-3 bg-primary text-white text-sm font-medium rounded-lg hover:bg-primary-hover transition-colors disabled:bg-stone-400"
          >
            {connecting ? 'Connecting...' : 'Connect Google Account'}
          </button>
        )}
      </div>
    </div>
  );
}
