const fs = require('fs');
let authContent = fs.readFileSync('src/auth/context/AuthContext.jsx', 'utf8');

authContent = authContent.replace(
  /const hasRole = \(roleName\) => {[\s\S]*?};/,
  `const hasRole = (roleName) => {
    if (!user || !user.role) return false;
    return user.role === roleName;
  };

  const hasAnyPermission = (perms) => {
    if (!user || !user.permissions) return false;
    return perms.some(p => user.permissions.includes(p));
  };

  const hasAllPermissions = (perms) => {
    if (!user || !user.permissions) return false;
    return perms.every(p => user.permissions.includes(p));
  };

  const hasModuleAccess = (module) => {
    if (!user || !user.permissions) return false;
    if (user.permissions.includes('*')) return true;
    return user.permissions.some(p => p.startsWith(module + '.'));
  };`
);

authContent = authContent.replace(
  /hasPermission,\s*hasRole/g,
  'hasPermission,\n    hasRole,\n    hasAnyPermission,\n    hasAllPermissions,\n    hasModuleAccess,\n    staffProfile: user,\n    roles: user ? [user.role] : [],\n    permissions: user ? user.permissions : []'
);

fs.writeFileSync('src/auth/context/AuthContext.jsx', authContent);
