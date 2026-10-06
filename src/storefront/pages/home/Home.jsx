import { useCMS } from '../../../admin/context/cms/CMSContext';
import { useCollections } from '../../../admin/context/commerce/CollectionContext';
import SectionRenderer from '../../components/sections/SectionRenderer';
import CollectionGridSection from '../../components/home/CollectionGridSection';

export default function Home() {
  const { getPageSections, pages } = useCMS();
  const { collections } = useCollections();
  
  // Find the homepage (slug === '/')
  const homePage = pages.find(p => p.slug === '/');
  // Fallback to 'PG-001' in case the page lookup somehow fails
  const sections = getPageSections(homePage?.id || 'PG-001');

  // Find dynamically featured collections (published and marked as featured)
  const featuredCollections = collections.filter(c => c.featured && c.status === 'published');

  // Split CMS sections so we can insert featured collections before the last 2 sections
  const splitIndex = Math.max(0, sections.length - 2);
  const firstSections = sections.slice(0, splitIndex);
  const lastSections = sections.slice(splitIndex);

  return (
    <div className="w-full bg-white animate-in fade-in duration-1000">
      <SectionRenderer sections={firstSections} />

      {/* Dynamically render featured collections and their products from the Admin Panel */}
      {featuredCollections.map((collection) => (
        <CollectionGridSection 
          key={collection.id}
          title={collection.name}
          subtitle={collection.description || "Featured Collection"}
          linkTo={`/collections/${collection.slug}`}
          products={collection.resolvedProducts}
        />
      ))}

      <SectionRenderer sections={lastSections} />
    </div>
  );
}
