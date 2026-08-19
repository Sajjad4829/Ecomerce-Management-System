import { useAuth } from '../context/AuthContext';
import AccessDenied from '../../admin/pages/auth/AccessDenied';

export function RoleGate({ role, children, fallback }) {
  const { hasRole, sessionStatus } = useAuth();

  if (sessionStatus === 'loading') {
    return null;
  }

  if (!hasRole(role)) {
    if (fallback !== undefined) {
      return fallback;
    }
    return <AccessDenied />;
  }

  return children;
}
