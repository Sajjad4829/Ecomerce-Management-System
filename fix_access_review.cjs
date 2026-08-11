const fs = require('fs');
let content = fs.readFileSync('src/admin/pages/settings/access-review/AccessReview.jsx', 'utf8');

// Remove the injected import
content = content.replace('import { FiShield } from "react-icons/fi";', '');
// Add it to the top
content = content.replace('import { FiAlertTriangle, FiCheckCircle, FiClock } from \'react-icons/fi\';', 'import { FiAlertTriangle, FiCheckCircle, FiClock, FiShield } from \'react-icons/fi\';');

fs.writeFileSync('src/admin/pages/settings/access-review/AccessReview.jsx', content);
