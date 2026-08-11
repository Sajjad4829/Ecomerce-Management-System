const fs = require('fs');
let content = fs.readFileSync('src/admin/pages/analytics/PlaceholderAnalytics.jsx', 'utf-8');
content = content.replace(
  `import { FiDownload }`,
  `import AnalyticsTabs from '../../components/analytics/AnalyticsTabs';\nimport { FiDownload }`
);
content = content.replace(
  `</div>\n\n      <div className="grid`,
  `</div>\n      <AnalyticsTabs />\n\n      <div className="grid`
);
fs.writeFileSync('src/admin/pages/analytics/PlaceholderAnalytics.jsx', content);
