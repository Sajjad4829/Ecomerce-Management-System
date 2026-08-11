import React from 'react';
import { BarChart as RechartsBarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function BarChart({ data, bars, height = 300, xAxisKey = 'name' }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center w-full bg-background rounded-lg" style={{ height }}>
        <p className="text-text-muted">No data available for this period</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsBarChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
          <XAxis 
            dataKey={xAxisKey} 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#888', fontSize: 12 }} 
            dy={10}
          />
          <YAxis 
            axisLine={false} 
            tickLine={false} 
            tick={{ fill: '#888', fontSize: 12 }} 
            width={80}
            tickFormatter={(value) => {
              if (value >= 1000) return `${(value / 1000).toFixed(0)}k`;
              return value;
            }}
          />
          <Tooltip 
            cursor={{ fill: '#f9fafb' }}
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          {bars.map((bar, idx) => (
            <Bar 
              key={bar.key} 
              dataKey={bar.key} 
              name={bar.name || bar.key}
              fill={bar.color || '#1A1A1A'} 
              radius={[4, 4, 0, 0]}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
}
