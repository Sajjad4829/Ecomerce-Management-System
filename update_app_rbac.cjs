const fs = require('fs');

let appContent = fs.readFileSync('src/App.jsx', 'utf8');

const newImports = `
import StaffManager from './admin/pages/settings/staff/StaffManager';
import StaffForm from './admin/pages/settings/staff/StaffForm';
import StaffDetail from './admin/pages/settings/staff/StaffDetail';
import StaffActivity from './admin/pages/settings/staff/StaffActivity';
import StaffInvitations from './admin/pages/settings/staff/StaffInvitations';
import RoleManager from './admin/pages/settings/roles/RoleManager';
import RoleCreator from './admin/pages/settings/roles/RoleCreator';
import RoleDetail from './admin/pages/settings/roles/RoleDetail';
import PermissionMatrix from './admin/pages/settings/roles/PermissionMatrix';
import PermissionManager from './admin/pages/settings/permissions/PermissionManager';
import AccessReview from './admin/pages/settings/access-review/AccessReview';
import AccessRequests from './admin/pages/settings/access-requests/AccessRequests';
import TemporaryAccess from './admin/pages/settings/temporary-access/TemporaryAccess';
import RBACAnalytics from './admin/pages/settings/access-analytics/RBACAnalytics';
import SecuritySettings from './admin/pages/settings/security/SecuritySettings';
import SessionManager from './admin/pages/settings/security/SessionManager';
`;

appContent = appContent.replace('// Other imports', '// Other imports\n' + newImports);

// Let's remove the old RoleManager and AdminUserManager imports
appContent = appContent.replace(/import RoleManager from '.\/admin\/pages\/roles\/RoleManager';\n/, '');
appContent = appContent.replace(/import RoleEditor from '.\/admin\/pages\/roles\/RoleEditor';\n/, '');
appContent = appContent.replace(/import AdminUserManager from '.\/admin\/pages\/users\/AdminUserManager';\n/, '');
appContent = appContent.replace(/import AdminUserEditor from '.\/admin\/pages\/users\/AdminUserEditor';\n/, '');

// Replace old routes with new settings routes
const oldRoutesRegex = /<Route path="roles" element={<RoleManager \/>} \/>[\s\S]*?<Route path="users\/:id\/edit" element={<AdminUserEditor \/>} \/>/;

const newRoutes = `          <Route path="settings">
            <Route path="staff">
              <Route index element={<StaffManager />} />
              <Route path="new" element={<StaffForm />} />
              <Route path="invitations" element={<StaffInvitations />} />
              <Route path=":staffId" element={<StaffDetail />} />
              <Route path=":staffId/activity" element={<StaffActivity />} />
            </Route>
            <Route path="roles">
              <Route index element={<RoleManager />} />
              <Route path="new" element={<RoleCreator />} />
              <Route path=":roleId" element={<RoleDetail />} />
              <Route path=":roleId/permissions" element={<PermissionMatrix />} />
            </Route>
            <Route path="permissions" element={<PermissionManager />} />
            <Route path="access-review" element={<AccessReview />} />
            <Route path="access-requests" element={<AccessRequests />} />
            <Route path="temporary-access" element={<TemporaryAccess />} />
            <Route path="access-analytics" element={<RBACAnalytics />} />
            <Route path="security">
              <Route index element={<SecuritySettings />} />
              <Route path="sessions" element={<SessionManager />} />
            </Route>
          </Route>`;

appContent = appContent.replace(oldRoutesRegex, newRoutes);

fs.writeFileSync('src/App.jsx', appContent);
