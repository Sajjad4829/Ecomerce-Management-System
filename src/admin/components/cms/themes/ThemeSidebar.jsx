import { cn } from '../../../../utils/cn';

const THEME_SECTIONS = [
  { id: 'brand', label: 'Brand Identity', group: 'Settings' },
  { id: 'colors', label: 'Color Scheme', group: 'Settings' },
  { id: 'typography', label: 'Typography', group: 'Settings' },
  { id: 'layout', label: 'Global Layout', group: 'Settings' },
  { id: 'buttons', label: 'Buttons', group: 'Components' },
  { id: 'cards', label: 'Cards', group: 'Components' },
  { id: 'forms', label: 'Forms', group: 'Components' },
  { id: 'presets', label: 'Theme Presets', group: 'Management' },
  { id: 'versions', label: 'Version History', group: 'Management' },
];

export default function ThemeSidebar({ activeSection, setActiveSection }) {
  const groups = [...new Set(THEME_SECTIONS.map(s => s.group))];

  return (
    <div className="w-56 shrink-0 pr-6 hidden lg:block border-r border-black/5 mr-8">
      <div className="sticky top-24">
        <ul className="space-y-6 custom-scrollbar max-h-[calc(100vh-12rem)] overflow-y-auto">
          {groups.map(group => (
            <li key={group}>
              <h3 className="text-[10px] uppercase tracking-[0.2em] font-semibold text-text-muted mb-3 pl-3">
                {group}
              </h3>
              <ul className="space-y-1">
                {THEME_SECTIONS.filter(s => s.group === group).map(section => (
                  <li key={section.id}>
                    <button
                      onClick={() => setActiveSection(section.id)}
                      className={cn(
                        "w-full text-left px-3 py-2 rounded-lg text-sm transition-colors font-medium flex items-center justify-between",
                        activeSection === section.id 
                          ? "bg-[#1A1A1A] text-white shadow-sm" 
                          : "text-text-secondary hover:bg-black/5 hover:text-text-primary"
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
