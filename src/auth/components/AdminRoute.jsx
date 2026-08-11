import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import AccessDenied from '../../admin/pages/auth/AccessDenied';

export function AdminRoute({ children }) {
  const { isAuthenticated, sessionStatus, user } = useAuth();
  const location = useLocation();

  if (sessionStatus === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
      <div className="animate-spin w-6 h-6 border-2 border-black border-t-transparent rounded-full"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  // Very basic check - real app would check if user has actual admin privileges
  if (user?.role === 'Customer') {
     return <AccessDenied />;
  }

  return children;
}
