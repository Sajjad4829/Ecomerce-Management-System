import { useAuth } from '../context/AuthContext';
import AccessDenied from '../../admin/pages/auth/AccessDenied';

export function PermissionGate({ permission, children, fallback }) {
  const { hasPermission, sessionStatus } = useAuth();

  if (sessionStatus === 'loading') {
    return null; // Or a small skeleton loader
  }

  if (!hasPermission(permission)) {
    if (fallback !== undefined) {
      return fallback;
    }
    return <AccessDenied requiredPermission={permission} />;
  }

  return children;
}
