import { useState } from 'react';
import { 
  FiClock, FiGitCommit, FiRotateCcw, FiCopy, FiCheckCircle, 
  FiEye, FiAlertCircle, FiChevronRight, FiPlus
} from 'react-icons/fi';
import StatusBadge from './StatusBadge';

export default function VersionPanel({ versions = [], currentVersion, onRestore, onDuplicate, onPublish }) {
  const [selectedVersion, setSelectedVersion] = useState(currentVersion || '1.0.0');
  const [comparingVersion, setComparingVersion] = useState(null);

  const mockVersions = versions.length ? versions : [
    {
      version: '1.2.0',
      status: 'published',
      author: 'Evelyn Vance (Lead Designer)',
      timestamp: '2026-08-07 14:32:00',
      changelog: 'Added velvet swatch selector dynamic placeholder & updated hero typography scale.',
      sectionsCount: 6,
      placeholdersCount: 5
    },
    {
      version: '1.1.0',
      status: 'archived',
      author: 'Marcus Sterling',
      timestamp: '2026-08-01 09:15:00',
      changelog: 'Initial commerce page layout setup with standard header.',
      sectionsCount: 5,
      placeholdersCount: 4
    },
    {
      version: '1.0.0',
      status: 'archived',
      author: 'System Initializer',
      timestamp: '2026-07-20 18:00:00',
      changelog: 'Base template created.',
      sectionsCount: 4,
      placeholdersCount: 3
    }
  ];

  return (
    <div className="bg-white rounded-xl border border-stone-200 p-5 shadow-sm space-y-4">
      <div className="flex items-center justify-between pb-3 border-b border-stone-200">
        <div className="flex items-center gap-2">
          <div className="p-2 rounded-lg bg-stone-100 text-stone-800">
            <FiClock size={18} />
          </div>
          <div>
            <h3 className="font-serif font-bold text-stone-900 text-sm">Version Control & Audit Log</h3>
            <p className="text-xs text-stone-500">Track changes, compare revisions, and restore published blueprints</p>
          </div>
        </div>
        <button
          onClick={() => onPublish && onPublish('1.3.0-draft')}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-stone-900 hover:bg-stone-800 text-white rounded-lg text-xs font-semibold transition-colors"
        >
          <FiPlus size={14} />
          Create New Version Draft
        </button>
      </div>

      <div className="space-y-3">
        {mockVersions.map((v) => {
          const isCurrent = v.version === currentVersion;
          return (
            <div
              key={v.version}
              className={`border rounded-xl p-3.5 transition-all ${
                isCurrent 
                  ? 'border-amber-400 bg-amber-50/20 shadow-sm' 
                  : 'border-stone-200 hover:border-stone-300 bg-white'
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2.5">
                  <div className="p-1.5 rounded bg-stone-100 text-stone-700">
                    <FiGitCommit size={15} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold text-stone-900">
                        v{v.version}
                      </span>
                      {isCurrent && (
                        <span className="text-[9px] bg-stone-900 text-white px-1.5 py-0.5 rounded font-mono font-bold uppercase">
                          Active
                        </span>
                      )}
                      <StatusBadge status={v.status} />
                    </div>
                    <div className="text-[11px] text-stone-500 mt-0.5">
                      By <span className="font-medium text-stone-700">{v.author}</span> • {v.timestamp}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5">
                  {!isCurrent && (
                    <button
                      onClick={() => onRestore && onRestore(v.version)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 bg-stone-100 hover:bg-stone-200 text-stone-800 rounded text-xs font-medium transition-colors"
                      title="Restore this version"
                    >
                      <FiRotateCcw size={12} />
                      Restore
                    </button>
                  )}
                  <button
                    onClick={() => onDuplicate && onDuplicate(v.version)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 border border-stone-200 hover:bg-stone-50 text-stone-700 rounded text-xs font-medium transition-colors"
                    title="Duplicate as new draft"
                  >
                    <FiCopy size={12} />
                    Branch
                  </button>
                </div>
              </div>

              <div className="mt-2.5 text-xs text-stone-600 bg-stone-50/80 rounded p-2 border border-stone-100 font-mono">
                {v.changelog}
              </div>

              <div className="mt-2 flex items-center gap-4 text-[11px] text-stone-500">
                <span>{v.sectionsCount} Sections</span>
                <span>•</span>
                <span>{v.placeholdersCount} Dynamic Placeholders</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
