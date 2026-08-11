import { useMemo } from 'react';
import ProductStatusBadge from '../ProductStatusBadge';
import { FiEdit2 } from 'react-icons/fi';

export default function VariantMatrix({ variants, attributes, onEdit }) {
  // If there are less than 2 attributes, matrix view isn't very useful, 
  // but we'll adapt. If > 2, we group by the first two.
  
  const { rowAttr, colAttr, matrixData, rowVals, colVals } = useMemo(() => {
    if (attributes.length === 0) return { matrixData: null };
    
    const rowAttr = attributes[0];
    const colAttr = attributes.length > 1 ? attributes[1] : null;

    // Get unique values for rows and cols from the generated variants
    const rowVals = [...new Set(variants.map(v => {
      const a = v.attributes.find(a => a.attrId === rowAttr.id);
      return a ? a.valueLabel : 'Default';
    }))];

    let colVals = ['Default'];
    if (colAttr) {
      colVals = [...new Set(variants.map(v => {
        const a = v.attributes.find(a => a.attrId === colAttr.id);
        return a ? a.valueLabel : 'Default';
      }))];
    }

    // Build matrix
    const matrixData = {};
    for (const r of rowVals) {
      matrixData[r] = {};
      for (const c of colVals) {
        // Find variant that matches this row and col
        const matchingVariant = variants.find(v => {
          const vRow = v.attributes.find(a => a.attrId === rowAttr.id)?.valueLabel || 'Default';
          const vCol = colAttr ? (v.attributes.find(a => a.attrId === colAttr.id)?.valueLabel || 'Default') : 'Default';
          return vRow === r && vCol === c;
        });
        matrixData[r][c] = matchingVariant;
      }
    }

    return { rowAttr, colAttr, matrixData, rowVals, colVals };
  }, [variants, attributes]);

  if (!matrixData) {
    return (
      <div className="p-8 text-center text-text-muted text-sm bg-surface rounded-xl border border-border">
        Matrix view requires at least one variant attribute.
      </div>
    );
  }

  return (
    <div className="bg-surface border border-border rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr>
              <th className="bg-background p-4 border-b border-r border-border min-w-[150px]">
                <div className="text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider mb-1">
                  {colAttr ? `↓ ${rowAttr.name} / → ${colAttr.name}` : `↓ ${rowAttr.name}`}
                </div>
              </th>
              {colVals.map(c => (
                <th key={c} className="bg-background p-4 border-b border-r border-border min-w-[200px]">
                  <span className="text-sm font-bold text-text-primary">{c}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rowVals.map(r => (
              <tr key={r}>
                <th className="bg-background p-4 border-b border-r border-border align-top">
                  <span className="text-sm font-bold text-text-primary">{r}</span>
                </th>
                {colVals.map(c => {
                  const variant = matrixData[r][c];
                  return (
                    <td key={c} className="p-4 border-b border-r border-stone-100 hover:bg-background transition-colors align-top group relative">
                      {variant ? (
                        <div className="space-y-3">
                          <div className="flex items-start justify-between">
                            <span className="font-mono text-xs text-text-muted bg-stone-100 px-2 py-0.5 rounded">{variant.sku}</span>
                            <ProductStatusBadge status={variant.status} />
                          </div>
                          
                          <div className="flex justify-between items-end">
                            <div>
                              <p className="text-sm font-medium text-text-primary">${variant.price.toLocaleString()}</p>
                              <p className="text-xs text-text-muted mt-0.5">{variant.stock} in stock</p>
                            </div>
                          </div>

                          <button 
                            onClick={() => onEdit(variant)}
                            className="absolute inset-0 w-full h-full opacity-0 flex items-center justify-center bg-primary/5 group-hover:opacity-100 transition-opacity z-10"
                          >
                            <span className="flex items-center gap-2 bg-surface shadow-sm border border-border px-3 py-1.5 rounded-lg text-xs font-semibold text-text-secondary">
                              <FiEdit2 size={12} /> Edit Variant
                            </span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex items-center justify-center h-full min-h-[80px]">
                          <span className="text-xs text-text-muted italic">N/A</span>
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
