import SectionCard from './SectionCard';
import { cn } from '../../../../utils/cn';

export default function SectionGrid({ sections, view, onPreview }) {
  return (
    <div className={cn(
      "grid gap-6",
      view === 'grid' 
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" 
        : "grid-cols-1 xl:grid-cols-2"
    )}>
      {sections.map(section => (
        <SectionCard 
          key={section.id} 
          section={section} 
          view={view} 
          onPreview={onPreview} 
        />
      ))}
    </div>
  );
}
