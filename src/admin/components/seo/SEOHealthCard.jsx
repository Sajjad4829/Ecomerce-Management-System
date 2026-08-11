import React from 'react';
import { FiCheckCircle, FiAlertTriangle, FiXCircle } from 'react-icons/fi';

export function SEOHealthCard({ title, score, issues, good }) {
  const isGood = score >= 80;
  const isWarning = score >= 50 && score < 80;
  const isError = score < 50;

  return (
    <div className="bg-white border border-stone-200 rounded-xl p-5 shadow-sm">
      <div className="flex justify-between items-start mb-4">
        <h3 className="font-bold text-stone-900">{title}</h3>
        <div className={`flex items-center gap-1 font-bold ${isGood ? 'text-green-600' : isWarning ? 'text-amber-500' : 'text-red-500'}`}>
          {isGood && <FiCheckCircle />}
          {isWarning && <FiAlertTriangle />}
          {isError && <FiXCircle />}
          <span>{score}/100</span>
        </div>
      </div>
      <div className="space-y-2 text-sm">
        {issues.length > 0 ? (
          issues.map((issue, idx) => (
            <div key={idx} className="flex items-center gap-2 text-stone-600">
              <span className="w-1.5 h-1.5 rounded-full bg-red-400"></span>
              {issue}
            </div>
          ))
        ) : (
          good.map((g, idx) => (
             <div key={idx} className="flex items-center gap-2 text-stone-600">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
              {g}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
