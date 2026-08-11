import { useCommerce } from '../../context/CommerceContext';
import { FiAlertCircle, FiX } from 'react-icons/fi';
import { useState, useEffect } from 'react';

export default function CartValidation() {
  const { cartValidation } = useCommerce();
  const [visibleWarnings, setVisibleWarnings] = useState([]);

  useEffect(() => {
    setVisibleWarnings(cartValidation);
  }, [cartValidation]);

  if (!visibleWarnings || visibleWarnings.length === 0) return null;

  return (
    <div className="mb-8 space-y-3">
      {visibleWarnings.map((warning, index) => (
        <div key={index} className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex items-start gap-3">
          <FiAlertCircle className="text-amber-600 shrink-0 mt-0.5" />
          <div className="flex-1 text-sm text-amber-900">
            {warning.message}
          </div>
          <button 
            onClick={() => setVisibleWarnings(prev => prev.filter((_, i) => i !== index))}
            className="text-amber-600 hover:text-amber-800"
          >
            <FiX />
          </button>
        </div>
      ))}
    </div>
  );
}
