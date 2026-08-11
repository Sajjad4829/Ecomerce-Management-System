import { useMemo } from 'react';
import { FiCheckCircle, FiAlertTriangle, FiXCircle, FiAward } from 'react-icons/fi';
import { cn } from '../../../../utils/cn';

export default function SEOScoreCard({
  title = '',
  description = '',
  focusKeyword = '',
  slug = '',
  canonicalUrl = '',
  ogImage = '',
  hasSchema = false,
  hasAltText = true
}) {
  // Real-time evaluation rule engine
  const evaluation = useMemo(() => {
    const checks = [];
    let scorePoints = 0;
    const maxScore = 100;

    // 1. Title length (30-60 chars) - 20 pts
    const titleLen = title.trim().length;
    if (titleLen >= 30 && titleLen <= 60) {
      scorePoints += 20;
      checks.push({ status: 'pass', msg: `Title length is optimal (${titleLen} characters)` });
    } else if (titleLen > 0 && titleLen < 30) {
      scorePoints += 10;
      checks.push({ status: 'warn', msg: `Title is too short (${titleLen} chars). Aim for 30-60 characters.` });
    } else if (titleLen > 60) {
      scorePoints += 10;
      checks.push({ status: 'warn', msg: `Title is too long (${titleLen} chars). May truncate in Google search results.` });
    } else {
      checks.push({ status: 'fail', msg: 'Missing SEO Title.' });
    }

    // 2. Meta description length (120-160 chars) - 20 pts
    const descLen = description.trim().length;
    if (descLen >= 120 && descLen <= 160) {
      scorePoints += 20;
      checks.push({ status: 'pass', msg: `Meta description length is ideal (${descLen} characters)` });
    } else if (descLen > 0 && descLen < 120) {
      scorePoints += 10;
      checks.push({ status: 'warn', msg: `Meta description is short (${descLen} chars). Expand to ~150 chars for better CTR.` });
    } else if (descLen > 160) {
      scorePoints += 10;
      checks.push({ status: 'warn', msg: `Meta description is long (${descLen} chars). Might be truncated.` });
    } else {
      checks.push({ status: 'fail', msg: 'Missing Meta Description.' });
    }

    // 3. Focus keyword in Title & Description - 20 pts
    if (focusKeyword.trim()) {
      const kw = focusKeyword.toLowerCase().trim();
      const inTitle = title.toLowerCase().includes(kw);
      const inDesc = description.toLowerCase().includes(kw);

      if (inTitle && inDesc) {
        scorePoints += 20;
        checks.push({ status: 'pass', msg: `Focus keyword "${focusKeyword}" appears in both Title and Meta Description.` });
      } else if (inTitle || inDesc) {
        scorePoints += 10;
        checks.push({ status: 'warn', msg: `Focus keyword "${focusKeyword}" found in ${inTitle ? 'Title' : 'Meta Description'} only.` });
      } else {
        checks.push({ status: 'fail', msg: `Focus keyword "${focusKeyword}" is missing from Title and Description.` });
      }
    } else {
      checks.push({ status: 'warn', msg: 'No focus keyword defined for performance evaluation.' });
    }

    // 4. URL Slug optimization - 15 pts
    if (slug.trim()) {
      const isClean = /^[a-z0-9-]+$/.test(slug);
      if (isClean) {
        scorePoints += 15;
        checks.push({ status: 'pass', msg: 'URL Slug is clean, lowercase, and hyphens-separated.' });
      } else {
        scorePoints += 5;
        checks.push({ status: 'warn', msg: 'URL Slug contains uppercase characters or special symbols.' });
      }
    } else {
      checks.push({ status: 'fail', msg: 'Missing URL slug.' });
    }

    // 5. OpenGraph Image - 10 pts
    if (ogImage.trim()) {
      scorePoints += 10;
      checks.push({ status: 'pass', msg: 'Open Graph social image is set.' });
    } else {
      checks.push({ status: 'warn', msg: 'Missing custom Open Graph image. Will fallback to default logo.' });
    }

    // 6. Structured Data / Schema Markup - 15 pts
    if (hasSchema) {
      scorePoints += 15;
      checks.push({ status: 'pass', msg: 'Structured Data JSON-LD schema is attached.' });
    } else {
      checks.push({ status: 'warn', msg: 'No Structured Data schema configured for rich snippet eligibility.' });
    }

    return {
      score: Math.min(scorePoints, maxScore),
      checks
    };
  }, [title, description, focusKeyword, slug, canonicalUrl, ogImage, hasSchema, hasAltText]);

  // Score color gauge logic
  const getScoreBadge = (score) => {
    if (score >= 80) return { label: 'Excellent', bg: 'bg-green-100 text-green-800 border-green-200', stroke: 'stroke-green-600' };
    if (score >= 50) return { label: 'Needs Improvement', bg: 'bg-amber-100 text-amber-800 border-amber-200', stroke: 'stroke-amber-500' };
    return { label: 'Poor SEO', bg: 'bg-red-100 text-red-800 border-red-200', stroke: 'stroke-red-500' };
  };

  const badge = getScoreBadge(evaluation.score);

  return (
    <div className="bg-white border border-black/10 rounded-xl p-5 shadow-2xs space-y-4">
      {/* Top Score Gauge Header */}
      <div className="flex items-center justify-between border-b border-black/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="relative w-14 h-14 flex items-center justify-center shrink-0">
            {/* SVG Circular Score Bar */}
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
              <path
                className="text-gray-100"
                strokeWidth="3.5"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
              <path
                className={cn("transition-all duration-700 ease-out", badge.stroke)}
                strokeDasharray={`${evaluation.score}, 100`}
                strokeWidth="3.5"
                strokeLinecap="round"
                stroke="currentColor"
                fill="none"
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
              />
            </svg>
            <span className="absolute font-serif font-bold text-base text-[#1A1A1A]">
              {evaluation.score}
            </span>
          </div>

          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-serif font-bold text-base text-[#1A1A1A]">SEO Health Score</h4>
              <span className={cn("px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider border", badge.bg)}>
                {badge.label}
              </span>
            </div>
            <p className="text-xs text-gray-500 mt-0.5">
              Live automated audit analyzing search rankings potential and meta completeness.
            </p>
          </div>
        </div>
      </div>

      {/* Rules Breakdown Checklist */}
      <div className="space-y-2">
        <h5 className="text-xs font-bold text-gray-700 uppercase tracking-wider">
          Automated Audit Findings ({evaluation.checks.length})
        </h5>

        <div className="space-y-1.5 max-h-56 overflow-y-auto custom-scrollbar pr-1">
          {evaluation.checks.map((chk, idx) => (
            <div key={idx} className="flex items-start gap-2 text-xs p-2 rounded-lg bg-gray-50 border border-black/5">
              {chk.status === 'pass' && <FiCheckCircle className="text-green-600 shrink-0 mt-0.5" size={14} />}
              {chk.status === 'warn' && <FiAlertTriangle className="text-amber-500 shrink-0 mt-0.5" size={14} />}
              {chk.status === 'fail' && <FiXCircle className="text-red-500 shrink-0 mt-0.5" size={14} />}
              <span className="text-gray-700 leading-snug">{chk.msg}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
