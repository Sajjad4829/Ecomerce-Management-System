import React from 'react';
import PieChart from './PieChart';

export default function DonutChart(props) {
  return <PieChart {...props} innerRadius={props.height ? props.height / 2 - 60 : 90} />;
}
