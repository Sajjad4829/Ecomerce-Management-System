import { cn } from '../../../../utils/cn';

const LAYOUT_SECTIONS = [
  { id: 'announcement', label: 'Announcement Bar', group: 'Header Regions' },
  { id: 'topbar', label: 'Top Bar', group: 'Header Regions' },
  { id: 'header', label: 'Main Header', group: 'Header Regions' },
  { id: 'sticky-header', label: 'Sticky Header', group: 'Header Regions' },
  { id: 'mega-menu', label: 'Mega Menu Container', group: 'Navigation' },
  { id: 'footer', label: 'Global Footer', group: 'Footer Regions' },
  { id: 'presets', label: 'Layout Presets', group: 'Management' },
  { id: 'versions', label: 'Version History', group: 'Management' },
];

export default function LayoutSidebar({ activeSection, setActiveSection }) {
  const groups = [...new Set(LAYOUT_SECTIONS.map(s => s.group))];

  return (
    <div className="w-56 shrink-0 pr-6 hidden lg:block border-r border-black/5 mr-8">
      <div className="sticky top-24">
        <ul className="space-y-6 custom-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto">
          {groups.map(group => (
            <li key={group}>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-gray-400 mb-3 pl-3">
                {group}
              </h3>
              <ul className="space-y-1">
                {LAYOUT_SECTIONS.filter(s => s.group === group).map(section => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium flex items-center justify-between",
                        activeSection === section.id 
                          ? "bg-[#1A1A1A] text-white shadow-sm" 
                          : "text-gray-600 hover:bg-black/5 hover:text-[#1A1A1A]"
                      )}
                    >
                      {section.label}
                    </button>
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
