const fs = require('fs');
const path = require('path');

const pages = [
  { path: 'staff/StaffManager', title: 'Staff Management', desc: 'Manage enterprise staff and access' },
  { path: 'staff/StaffForm', title: 'Staff Creator', desc: 'Create a new staff profile' },
  { path: 'staff/StaffDetail', title: 'Staff Profile', desc: 'View staff details and access' },
  { path: 'staff/StaffActivity', title: 'Staff Activity', desc: 'View staff activity log' },
  { path: 'staff/StaffInvitations', title: 'Staff Invitations', desc: 'Manage staff invitations' },
  { path: 'roles/RoleManager', title: 'Role Management', desc: 'Manage enterprise roles' },
  { path: 'roles/RoleCreator', title: 'Role Creator', desc: 'Create a new role' },
  { path: 'roles/RoleDetail', title: 'Role Detail', desc: 'View role details and assignments' },
  { path: 'roles/PermissionMatrix', title: 'Permission Matrix', desc: 'Configure role permissions' },
  { path: 'permissions/PermissionManager', title: 'Permission Manager', desc: 'Manage system permissions' },
  { path: 'access-review/AccessReview', title: 'Access Review', desc: 'Review staff access and high-risk permissions' },
  { path: 'access-requests/AccessRequests', title: 'Access Requests', desc: 'Manage access requests' },
  { path: 'temporary-access/TemporaryAccess', title: 'Temporary Access', desc: 'Manage temporary access assignments' },
  { path: 'security/SecuritySettings', title: 'Security Settings', desc: 'Manage enterprise security policies' },
  { path: 'security/SessionManager', title: 'Session Manager', desc: 'Manage staff sessions' },
  { path: 'access-analytics/RBACAnalytics', title: 'Access Analytics', desc: 'Analyze system access and permissions' },
];

pages.forEach(page => {
  const fullPath = path.join(__dirname, `src/admin/pages/settings/${page.path}.jsx`);
  const componentName = page.path.split('/').pop();
  
  if (!fs.existsSync(fullPath)) {
    const dir = path.dirname(fullPath);
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    
    fs.writeFileSync(fullPath, `import React from 'react';
import PlaceholderPage from '../../inventory/PlaceholderPage';

export default function ${componentName}() {
  return <PlaceholderPage title="${page.title}" description="${page.desc}" />;
}
`);
  }
});
