import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useCategories } from '../../../admin/context/commerce/CategoryContext';

export default function StorefrontMegaMenu({ data, onClose }) {
  const { categories } = useCategories();

  if (!data || !data.columns) return null;

  const resolveItem = (item) => {
    let resolvedTitle = item.title;
    let resolvedLink = item.link || '#';

    if (item.referenceType === 'category') {
      const cat = categories.find(c => c.id === item.referenceId);
      if (cat) {
        resolvedTitle = cat.name;
        resolvedLink = `/categories/${cat.slug}`;
      }
    }
    return { title: resolvedTitle || 'Unknown', link: resolvedLink };
  };

  return (
    <div 
      className="absolute top-full left-0 w-full bg-white border-t border-gray-100 shadow-xl overflow-hidden transition-all duration-300 origin-top opacity-0 invisible group-hover:opacity-100 group-hover:visible"
      style={{ zIndex: 100 }}
    >
      <div className="max-w-7xl mx-auto flex w-full">
        {/* Columns Area */}
        <div className="flex-1 p-8 grid gap-8" style={{ gridTemplateColumns: `repeat(${data.columns.length}, minmax(0, 1fr))` }}>
          {data.columns.map((col, colIdx) => (
            <div key={col.id || colIdx} className="flex flex-col gap-8">
              {(col.groups || []).map((group, groupIdx) => {
                const groupResolved = resolveItem(group);
                return (
                  <div key={group.id || groupIdx}>
                    {groupResolved.title && groupResolved.title !== 'Unknown' && (
                      <Link 
                        to={groupResolved.link}
                        onClick={onClose}
                        className="font-bold text-gray-900 text-sm mb-3 block hover:text-black hover:underline"
                      >
                        {groupResolved.title}
                      </Link>
                    )}
                    <ul className="space-y-2">
                      {(group.items || []).map((item, itemIdx) => {
                        const itemResolved = resolveItem(item);
                        return (
                          <li key={item.id || itemIdx}>
                            <Link 
                              to={itemResolved.link}
                              onClick={onClose}
                              className="text-gray-500 hover:text-black text-sm transition-colors block py-0.5"
                            >
                              {itemResolved.title}
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Promo Banner Area */}
        {data.promoBanner && data.promoBanner.imageUrl && (
          <div className="w-[320px] shrink-0 bg-gray-50 p-6 flex flex-col justify-end relative overflow-hidden group/promo">
            <img 
              src={data.promoBanner.imageUrl} 
              alt={data.promoBanner.title || 'Promo'}
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/promo:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
            <div className="relative z-10 text-white">
              {data.promoBanner.title && (
                <h4 className="text-xl font-bold mb-2">{data.promoBanner.title}</h4>
              )}
              {data.promoBanner.description && (
                <p className="text-white/80 text-sm mb-4">{data.promoBanner.description}</p>
              )}
              {data.promoBanner.cta && (
                <Link 
                  to={data.promoBanner.link || '#'}
                  onClick={onClose}
                  className="inline-flex items-center text-sm font-semibold uppercase tracking-wider hover:text-white"
                >
                  <span className="border-b border-white pb-0.5">{data.promoBanner.cta}</span>
                  <ArrowRight size={16} className="ml-2 transform group-hover/promo:translate-x-1 transition-transform" />
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
