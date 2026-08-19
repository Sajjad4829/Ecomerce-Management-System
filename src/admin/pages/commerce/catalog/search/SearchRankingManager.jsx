import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiSave, FiInfo } from 'react-icons/fi';
import { useSearch } from '../../../../../admin/context/SearchContext';
import CMSPageHeader from '../../../../../components/cms/CMSPageHeader';

export default function SearchRankingManager() {
  const { ranking } = useSearch();
  const [weights, setWeights] = useState(
    ranking.reduce((acc, r) => ({ ...acc, [r.id]: r.weight }), {})
  );

  const handleWeightChange = (id, value) => {
    setWeights(prev => ({ ...prev, [id]: parseInt(value) || 0 }));
  };

  const handleSave = () => {
    // In a real app, save to backend
    alert('Ranking weights saved successfully');
  };

  return (
    <div className="space-y-6 pb-12">
      <CMSPageHeader 
        title="Search Ranking Configuration"
        description="Adjust algorithm weights to control how search results are scored and sorted."
        breadcrumbs={[
          { label: 'Catalog', path: '/admin/catalog' },
          { label: 'Search', path: '/admin/catalog/search' },
          { label: 'Ranking' }
        ]}
        actions={
          <button 
            onClick={handleSave}
            className="flex items-center gap-2 bg-black text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-gray-800 transition-colors"
          >
            <FiSave />
            <span>Save Configuration</span>
          </button>
        }
      />
      
      <div className="bg-surface p-6 rounded-xl border border-black/5 shadow-sm max-w-3xl">
        <div className="flex items-start gap-3 p-4 bg-blue-50 text-blue-900 rounded-lg mb-8">
          <FiInfo className="mt-0.5 shrink-0" />
          <div className="text-sm">
            <p className="font-semibold mb-1">How ranking works</p>
            <p className="text-blue-800/80">
              The final product score is a weighted sum of these signals. Higher weights mean that signal has more influence over the final position.
            </p>
          </div>
        </div>

        <div className="space-y-8">
          {ranking.map((signal) => (
            <div key={signal.id} className="space-y-3">
              <div className="flex justify-between items-center">
                <label className="block text-sm font-medium text-text-primary">
                  {signal.signal}
                </label>
                <span className="text-sm font-mono text-text-muted bg-gray-100 px-2 py-0.5 rounded">
                  Weight: {weights[signal.id]}
                </span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={weights[signal.id]}
                onChange={(e) => handleWeightChange(signal.id, e.target.value)}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-black"
              />
              <div className="flex justify-between text-xs text-text-muted">
                <span>0 (Ignored)</span>
                <span>100 (Maximum Influence)</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
