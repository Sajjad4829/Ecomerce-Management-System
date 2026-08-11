import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export function CustomerRoute({ children }) {
  const { isAuthenticated, sessionStatus } = useAuth();
  const location = useLocation();

  if (sessionStatus === 'loading') {
    return <div className="min-h-screen flex items-center justify-center bg-[#F7F5F2]">
      <div className="animate-spin w-6 h-6 border-2 border-black border-t-transparent rounded-full"></div>
    </div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/account/login" state={{ from: location }} replace />;
  }

  return children;
}
