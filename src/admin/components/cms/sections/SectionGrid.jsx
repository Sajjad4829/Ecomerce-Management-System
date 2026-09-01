import SectionCard from './SectionCard';
import { cn } from '../../../../utils/cn';
import { resolveSectionPreview } from './sectionPreviewResolver';

export default function SectionGrid({ sections, view, onPreview, onEdit, pageSectionsDraft, sectionPreviewMap = {} }) {
  const getUsageCount = (sectionType) => {
    if (!pageSectionsDraft) return 0;
    return Object.values(pageSectionsDraft).flat().filter(s => s.type === sectionType).length;
  };

  return (
    <div className={cn(
      "grid gap-6",
      view === 'grid' 
        ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3" 
        : "grid-cols-1 xl:grid-cols-2"
    )}>
      {sections.map(section => {
        const resolvedSection = resolveSectionPreview(section, sectionPreviewMap);
        return (
          <SectionCard 
            key={section.id} 
            section={resolvedSection || section} 
            view={view} 
            onPreview={onPreview} 
            onEdit={onEdit}
            usageCount={getUsageCount(section.type)}
          />
        );
      })}
    </div>
  );
}
