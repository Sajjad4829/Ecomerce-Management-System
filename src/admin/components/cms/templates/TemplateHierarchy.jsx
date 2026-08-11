import { 
  FiLayers, FiLayout, FiGrid, FiBox, FiCheckCircle, FiChevronRight, FiSliders
} from 'react-icons/fi';

export default function TemplateHierarchy({ template }) {
  if (!template) return null;

  const hierarchySteps = [
    {
      level: 1,
      title: 'Active Theme',
      name: template.theme || 'Aurelian Luxury Gold',
      icon: FiSliders,
      badge: 'Design System Tokens',
      bg: 'bg-primary text-white',
      border: 'border-stone-800'
    },
    {
      level: 2,
      title: 'Global Layout',
      name: template.layout || 'Standard Commerce (Header + Footer)',
      icon: FiLayout,
      badge: 'Global Structure',
      bg: 'bg-stone-800 text-stone-100',
      border: 'border-stone-700'
    },
    {
      level: 3,
      title: 'Page Template Blueprint',
      name: template.name || 'Master Product Detail Blueprint',
      icon: FiLayers,
      badge: `${template.type || 'Commerce'} Template`,
      bg: 'bg-amber-950/90 text-amber-100',
      border: 'border-amber-800/50'
    },
    {
      level: 4,
      title: 'Page Sections',
      name: `${(template.sections || []).length} Sections Attached`,
      icon: FiGrid,
      badge: 'Modular Content',
      bg: 'bg-background text-text-primary',
      border: 'border-border'
    },
    {
      level: 5,
      title: 'Global Blocks & Dynamic Data',
      name: `${(template.placeholders || []).length} Dynamic Bindings`,
      icon: FiBox,
      badge: 'Runtime Hydration',
      bg: 'bg-warning-soft text-amber-950',
      border: 'border-amber-200'
    }
  ];

  return (
    <div className="bg-surface rounded-xl border border-border p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-border">
        <div>
          <h3 className="font-serif font-bold text-text-primary text-sm">Template Architecture Hierarchy</h3>
          <p className="text-xs text-text-muted">Structural resolution order from theme tokens down to runtime data binding</p>
        </div>
        <span className="text-[10px] font-mono uppercase bg-stone-100 text-text-secondary px-2 py-1 rounded font-bold">
          v{template.version || '1.0.0'}
        </span>
      </div>

      <div className="relative space-y-3 pt-1">
        {/* Connecting line */}
        <div className="absolute left-5 top-5 bottom-5 w-0.5 bg-stone-200 -z-0" />

        {hierarchySteps.map((step, idx) => {
          const Icon = step.icon;
          return (
            <div key={step.level} className="relative z-10 flex items-center gap-3">
              <div className={`p-2 rounded-lg border shadow-sm ${step.bg} ${step.border} shrink-0`}>
                <Icon size={16} />
              </div>
              <div className="flex-1 min-w-0 bg-background/80 border border-border/80 rounded-lg p-2.5 flex items-center justify-between gap-2 hover:border-amber-400 transition-colors">
                <div className="truncate">
                  <div className="flex items-center gap-2">
                    <span className="text-[9px] font-mono text-text-muted font-bold uppercase tracking-wider">
                      L{step.level}: {step.title}
                    </span>
                  </div>
                  <div className="font-medium text-xs text-text-primary truncate mt-0.5">
                    {step.name}
                  </div>
                </div>
                <span className="text-[10px] font-mono bg-surface px-2 py-0.5 rounded border border-border text-text-secondary font-semibold shrink-0">
                  {step.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
