import { getResponsiveValue } from '../../../../utils/responsiveUtils';
import { useCategories } from '../../../../context/commerce/CategoryContext';
import { useMemo } from 'react';

export default function CategoryGridPreview({ section, device = 'desktop' }) {
  const { categories: allCategories } = useCategories();
  const content = section?.content || {};
  const settings = section?.settings || {};
  
  const columns = getResponsiveValue(section, 'columns', device) || '3';
  const paddingTopSetting = getResponsiveValue(section, 'paddingTop', device) || 'medium';
  const paddingBottomSetting = getResponsiveValue(section, 'paddingBottom', device) || 'medium';

  const gridColsClass = {
    '1': 'grid-cols-1',
    '2': 'grid-cols-2',
    '3': 'grid-cols-3',
    '4': 'grid-cols-4'
  }[columns] || 'grid-cols-3';

  const ptClass = { none: 'pt-0', small: 'pt-12', medium: 'pt-24', large: 'pt-32', xlarge: 'pt-48' }[paddingTopSetting] || 'pt-24';
  const pbClass = { none: 'pb-0', small: 'pb-12', medium: 'pb-24', large: 'pb-32', xlarge: 'pb-48' }[paddingBottomSetting] || 'pb-24';

  const mockCategories = [
    { title: 'Category 1', image: '' },
    { title: 'Category 2', image: '' },
    { title: 'Category 3', image: '' },
    { title: 'Category 4', image: '' },
  ].slice(0, parseInt(columns, 10));

  const getCategoryById = (id) => allCategories.find(c => (c._id || c.id) === id);

  const categories = useMemo(() => {
    if (content.categories && content.categories.length > 0) {
      return content.categories.map(catItem => {
        const globalCat = getCategoryById(catItem.id);
        return {
          name: catItem.customName || globalCat?.name || 'Category',
          image: catItem.image || globalCat?.image || globalCat?.bannerImage || ''
        };
      });
    }
    return mockCategories;
  }, [content.categories, allCategories]);

  return (
    <div className={`${ptClass} ${pbClass} px-8 md:px-16 bg-surface`}>
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-serif font-bold text-text-primary mb-12 text-center">{content.title || 'Categories'}</h2>
        <div className={`grid ${gridColsClass} gap-6`}>
          {categories.map((cat, idx) => (
            <div key={idx} className="group relative w-[200px] h-[200px] mx-auto overflow-hidden cursor-pointer bg-gray-200">
              {cat.image ? (
                <img 
                  src={cat.image} 
                  alt={cat.name || cat.title}
                  className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
              ) : null}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <h3 className="text-2xl font-serif font-bold text-white tracking-wide">{cat.name || cat.title}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
