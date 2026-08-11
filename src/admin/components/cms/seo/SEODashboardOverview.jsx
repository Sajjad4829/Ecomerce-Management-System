import { motion } from 'framer-motion';
import { FiCheckCircle, FiAlertTriangle, FiXCircle, FiGlobe, FiSearch, FiFileText, FiImage, FiCode, FiLayers, FiTrendingUp } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function SEODashboardOverview({
  totalResources = 148,
  indexedCount = 136,
  missingTitleCount = 4,
  missingDescCount = 7,
  missingAltCount = 12,
  noIndexCount = 5,
  schemaCoveragePct = 92,
  avgSeoScore = 88,
  onFixIssuesClick
}) {
  return (
    <div className="space-y-6">
      
      {/* Top Banner KPI Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        
        {/* Total Indexed */}
        <div className="bg-white border border-black/5 rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Indexed Pages</span>
            <FiGlobe size={14} className="text-blue-600" />
          </div>
          <div className="text-xl font-serif font-bold text-[#1A1A1A]">
            {indexedCount} <span className="text-xs font-sans text-gray-400 font-normal">/ {totalResources}</span>
          </div>
          <div className="text-[10px] text-green-600 font-semibold mt-1 flex items-center gap-1">
            <FiCheckCircle size={10} /> 92% Coverage
          </div>
        </div>

        {/* Avg SEO Score */}
        <div className="bg-white border border-black/5 rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Avg SEO Score</span>
            <FiTrendingUp size={14} className="text-green-600" />
          </div>
          <div className="text-xl font-serif font-bold text-[#1A1A1A]">
            {avgSeoScore} <span className="text-xs font-sans text-gray-400 font-normal">/ 100</span>
          </div>
          <div className="text-[10px] text-green-600 font-semibold mt-1">
            +3.2% vs last month
          </div>
        </div>

        {/* Missing Titles */}
        <div className="bg-white border border-black/5 rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Missing Titles</span>
            <FiAlertTriangle size={14} className="text-amber-500" />
          </div>
          <div className="text-xl font-serif font-bold text-amber-600">
            {missingTitleCount}
          </div>
          <div className="text-[10px] text-gray-400 font-medium mt-1">
            Needs attention
          </div>
        </div>

        {/* Missing Descriptions */}
        <div className="bg-white border border-black/5 rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Missing Descs</span>
            <FiFileText size={14} className="text-amber-500" />
          </div>
          <div className="text-xl font-serif font-bold text-amber-600">
            {missingDescCount}
          </div>
          <div className="text-[10px] text-gray-400 font-medium mt-1">
            Needs attention
          </div>
        </div>

        {/* Missing Alt Text */}
        <div className="bg-white border border-black/5 rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Missing Alt Text</span>
            <FiImage size={14} className="text-purple-600" />
          </div>
          <div className="text-xl font-serif font-bold text-[#1A1A1A]">
            {missingAltCount}
          </div>
          <div className="text-[10px] text-gray-400 font-medium mt-1">
            Media library images
          </div>
        </div>

        {/* Schema Markup */}
        <div className="bg-white border border-black/5 rounded-xl p-3.5 shadow-2xs">
          <div className="flex items-center justify-between text-gray-400 mb-1">
            <span className="text-[10px] font-bold uppercase tracking-wider font-mono">Schema JSON-LD</span>
            <FiCode size={14} className="text-emerald-600" />
          </div>
          <div className="text-xl font-serif font-bold text-emerald-700">
            {schemaCoveragePct}%
          </div>
          <div className="text-[10px] text-gray-400 font-medium mt-1">
            Rich results ready
          </div>
        </div>

      </div>

      {/* Main Audit Alert Section */}
      <div className="bg-white border border-black/5 rounded-xl p-5 shadow-2xs flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-amber-50 border border-amber-200 text-amber-600 flex items-center justify-center shrink-0">
            <FiAlertTriangle size={20} />
          </div>
          <div>
            <h4 className="font-serif font-bold text-base text-[#1A1A1A]">
              11 Resources Require SEO Optimization
            </h4>
            <p className="text-xs text-gray-500 mt-0.5 max-w-xl leading-relaxed">
              4 product catalog items have missing SEO titles and 7 category landing pages lack meta descriptions. Fixing these will improve SERP search rankings.
            </p>
          </div>
        </div>

        <button
          onClick={onFixIssuesClick}
          className="px-4 py-2 bg-[#1A1A1A] text-white rounded-lg text-xs font-bold uppercase tracking-wider hover:bg-black/80 transition-all shadow-md shrink-0 cursor-pointer"
        >
          Fix High Priority Issues
        </button>
      </div>

    </div>
  );
}
