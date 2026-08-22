import { FiChevronDown, FiSettings, FiCheck } from 'react-icons/fi';
import { Link } from 'react-router-dom';

export default function EditorToolbar({ page, onSaveDraft, onPublish }) {
  return (
    <div className="h-20 bg-surface border-b border-gray-200 flex items-center justify-between px-8 shrink-0 z-20">
      {/* Left: Title */}
      <div>
        <h1 className="text-xl font-bold text-gray-900 font-sans">Page Builder</h1>
        <p className="text-sm text-gray-500 mt-1">Design and build your page using sections and live preview.</p>
      </div>

      {/* Center: Page Selector */}
      <div className="flex items-center gap-4">
        <div className="flex items-center text-sm">
          <span className="text-gray-500 mr-3">Current Page:</span>
          <button className="flex items-center justify-between w-40 px-3 py-1.5 bg-white border border-gray-200 rounded-lg text-gray-900 hover:border-gray-300 transition-colors">
            <span className="font-medium truncate">{page?.name || 'Home Page'}</span>
            <FiChevronDown className="text-gray-400" />
          </button>
        </div>
        <Link
          to="/admin/cms/pages"
          className="px-4 py-1.5 text-sm font-medium text-[#635BFF] bg-[#635BFF]/10 hover:bg-[#635BFF]/20 rounded-lg transition-colors flex items-center gap-2"
        >
          <FiSettings size={14} />
          Manage Pages
        </Link>
      </div>

      {/* Right: Actions */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onSaveDraft} 
          className="px-5 py-2 text-sm font-medium text-gray-600 bg-white border border-gray-200 hover:bg-gray-50 rounded-lg transition-colors shadow-sm"
        >
          Save Draft
        </button>
        <button 
          onClick={onPublish} 
          className="px-5 py-2 bg-[#635BFF] text-white text-sm font-medium rounded-lg hover:bg-[#524be0] transition-colors shadow-sm flex items-center gap-2"
        >
          Publish <FiChevronDown size={14} />
        </button>
      </div>
    </div>
  );
}
