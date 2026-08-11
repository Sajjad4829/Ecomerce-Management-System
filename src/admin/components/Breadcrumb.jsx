import { useLocation, Link } from 'react-router-dom';
import { FiChevronRight, FiHome } from 'react-icons/fi';

export default function Breadcrumb() {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <nav className="flex items-center text-[11px] uppercase tracking-[0.2em] font-medium text-text-muted">
      <Link to="/admin" className="hover:text-text-primary transition-colors flex items-center gap-1">
        <FiHome className="text-[13px] mb-[2px]" />
      </Link>
      
      {pathnames.map((value, index) => {
        if (value === 'admin' && index === 0) return null;
        
        const to = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const formattedValue = value.replace(/-/g, ' ');

        return (
          <div key={to} className="flex items-center">
            <FiChevronRight className="mx-2 text-text-muted" />
            {isLast ? (
              <span className="text-text-primary font-bold">{formattedValue}</span>
            ) : (
              <Link to={to} className="hover:text-text-primary transition-colors">
                {formattedValue}
              </Link>
            )}
          </div>
        );
      })}
    </nav>
  );
}
