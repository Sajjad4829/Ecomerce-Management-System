import { motion } from 'framer-motion';

export default function CombinationPreview({ combinations }) {
  if (combinations.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center p-8">
        <p className="text-text-muted text-sm">No combinations to preview. Go back and select some attributes.</p>
      </div>
    );
  }

  return (
    <div className="p-8 overflow-y-auto max-w-5xl mx-auto w-full">
      <h3 className="text-sm font-bold text-text-primary mb-2">Generated Combinations</h3>
      <p className="text-xs text-text-muted mb-6">These {combinations.length} variants will be created. You can edit SKU, Price, and Stock later.</p>
      
      <div className="bg-surface border border-border rounded-xl overflow-hidden shadow-sm">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-background border-b border-border">
              <th className="p-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider w-12 text-center">#</th>
              <th className="p-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Variant Name</th>
              <th className="p-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider">Generated SKU</th>
              <th className="p-3 text-[10px] font-mono font-bold text-text-muted uppercase tracking-wider text-right">Price</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-stone-100">
            {combinations.map((combo, index) => {
              const name = combo.attributes.map(a => a.valueLabel).join(' / ');
              
              return (
                <tr key={combo.id} className="hover:bg-background">
                  <td className="p-3 text-xs text-text-muted font-mono text-center">{index + 1}</td>
                  <td className="p-3 text-sm font-medium text-text-primary">
                    {name}
                  </td>
                  <td className="p-3">
                    <span className="font-mono text-xs text-text-muted bg-stone-100 px-2 py-1 rounded">{combo.sku}</span>
                  </td>
                  <td className="p-3 text-sm text-text-secondary text-right">
                    ${combo.price.toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
