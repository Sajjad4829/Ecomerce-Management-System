export function validateRole(roleName, permissions) {
  if (!roleName || roleName.trim() === '') {
    throw new Error('Role name is required');
  }
  if (roleName.toLowerCase() === 'super admin') {
    throw new Error('Cannot create a role with the reserved system name "Super Admin"');
  }
  return true;
}

export function validateStaff(email, department, role) {
  if (!email || !email.includes('@')) throw new Error('Valid email is required');
  if (!department) throw new Error('Department is required');
  if (!role) throw new Error('At least one role must be assigned');
  return true;
}

export function validatePermissionAssignment(staffRoles, requestedPermission) {
  // Check for dangerous combos
  if (requestedPermission === 'settings.security.manage' && !staffRoles.includes('super_admin')) {
    console.warn('Warning: Assigning security management to non-super-admin');
  }
  return true;
}

export function validateTemporaryAccess(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);
  if (start >= end) {
    throw new Error('End date must be after start date');
  }
  if (start < new Date()) {
    throw new Error('Start date cannot be in the past');
  }
  return true;
}
