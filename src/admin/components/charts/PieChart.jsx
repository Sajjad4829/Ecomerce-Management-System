import React from 'react';
import { PieChart as RechartsPieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function PieChart({ data, height = 300, nameKey = 'name', dataKey = 'value', innerRadius = 0, colors = ['#1A1A1A', '#4A4A4A', '#8B8B8B', '#CCCCCC', '#E5E5E5'] }) {
  if (!data || data.length === 0) {
    return (
      <div className="flex items-center justify-center w-full bg-gray-50 rounded-lg" style={{ height }}>
        <p className="text-gray-400">No data available</p>
      </div>
    );
  }

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={innerRadius}
            outerRadius={height / 2 - 40}
            fill="#8884d8"
            paddingAngle={2}
            dataKey={dataKey}
            nameKey={nameKey}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
}
