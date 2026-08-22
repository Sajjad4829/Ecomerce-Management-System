import { useCMS } from '../../../admin/context/cms/CMSContext';
import SectionRenderer from '../../components/sections/SectionRenderer';

export default function Home() {
  const { getPageSections, pages } = useCMS();
  
  // Find the homepage (slug === '/')
  const homePage = pages.find(p => p.slug === '/');
  // Fallback to 'PG-001' in case the page lookup somehow fails
  const sections = getPageSections(homePage?.id || 'PG-001');

  return (
    <div className="w-full bg-white animate-in fade-in duration-1000">
      <SectionRenderer sections={sections} />
    </div>
  );
}
