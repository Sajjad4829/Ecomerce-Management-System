import React from 'react';
import { maskSensitiveValue } from '../../services/audit/DataMasking';

export default function ChangeHistory({ oldValue, newValue }) {
  if (!oldValue && !newValue) return <div className="text-sm text-stone-500">No changes recorded.</div>;

  const keys = Array.from(new Set([...Object.keys(oldValue || {}), ...Object.keys(newValue || {})]));

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-lg overflow-hidden">
      <table className="w-full text-left text-sm">
        <thead className="bg-stone-100 border-b border-stone-200">
          <tr>
            <th className="px-4 py-2 font-medium text-stone-600">Field</th>
            <th className="px-4 py-2 font-medium text-stone-600">Old Value</th>
            <th className="px-4 py-2 font-medium text-stone-600">New Value</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-stone-200">
          {keys.map(key => {
            const oldVal = maskSensitiveValue(key, oldValue?.[key]);
            const newVal = maskSensitiveValue(key, newValue?.[key]);
            const isChanged = JSON.stringify(oldVal) !== JSON.stringify(newVal);

            return (
              <tr key={key} className={isChanged ? 'bg-amber-50/30' : ''}>
                <td className="px-4 py-2 font-mono text-xs text-stone-700">{key}</td>
                <td className="px-4 py-2 text-red-700/80 line-through decoration-red-700/30">{JSON.stringify(oldVal)}</td>
                <td className="px-4 py-2 text-emerald-700">{JSON.stringify(newVal)}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
