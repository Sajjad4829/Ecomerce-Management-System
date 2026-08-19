const fs = require('fs');

const pages = [
  'AnalyticsDashboard.jsx',
  'SalesAnalytics.jsx',
  'OrderAnalytics.jsx',
  'CustomerAnalytics.jsx',
  'ProductAnalytics.jsx',
];

pages.forEach(page => {
  let content = fs.readFileSync(`src/admin/pages/analytics/${page}`, 'utf-8');
  content = content.replace(
    `import { FiDownload`,
    `import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';\nimport { FiDownload`
  );
  content = content.replace(
    `</div>\n\n      <div className="grid`,
    `</div>\n      <AnalyticsTabs />\n\n      <div className="grid`
  );
  content = content.replace(
    `</div>\n\n      <div className="bg-white`,
    `</div>\n      <AnalyticsTabs />\n\n      <div className="bg-white`
  );
  fs.writeFileSync(`src/admin/pages/analytics/${page}`, content);
});

// Also patch ReportManager.jsx
let reportContent = fs.readFileSync('src/admin/pages/analytics/reports/ReportManager.jsx', 'utf-8');
reportContent = reportContent.replace(
  `import { FiPlus } from 'react-icons/fi';`,
  `import { FiPlus } from 'react-icons/fi';\nimport AnalyticsTabs from '../../../components/analytics/AnalyticsTabs';`
);
reportContent = reportContent.replace(
  `</div>\n\n      <div className="bg-white`,
  `</div>\n      <AnalyticsTabs />\n\n      <div className="bg-white`
);
fs.writeFileSync('src/admin/pages/analytics/reports/ReportManager.jsx', reportContent);
