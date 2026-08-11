import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';
import { ResourceSEOEditor } from '../../components/seo/ResourceSEOEditor';
import { SEOService } from '../../services/seo/SEOService';

export function SEOEditorWrapper() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = React.useState(null);

  useEffect(() => {
    SEOService.getSEO(id).then(setData);
  }, [id]);

  if (!data) return <div className="p-8">Loading SEO data...</div>;

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-6">
      <button onClick={() => navigate('/admin/seo/resources')} className="flex items-center gap-2 text-stone-500 hover:text-stone-900 transition-colors text-sm">
        <FiArrowLeft /> Back to Resources
      </button>
      
      <ResourceSEOEditor 
        resourceType="Product" 
        resourceName="Sample Product" 
        initialData={data} 
        onSave={(updated) => {
          SEOService.updateSEO(updated);
          navigate('/admin/seo/resources');
        }} 
      />
    </div>
  );
}
