import React from 'react';
import { FiTrendingUp, FiAlertCircle, FiExternalLink, FiRepeat, FiChevronsUp, FiMapPin, FiEyeOff } from 'react-icons/fi';

const PageTemplate = ({ title, description, icon: Icon, children }) => (
  <div className="p-8 max-w-6xl mx-auto space-y-8">
    <div className="flex items-center gap-4">
      <div className="w-12 h-12 bg-stone-100 rounded-xl flex items-center justify-center text-stone-900">
        <Icon size={24} />
      </div>
      <div>
        <h1 className="text-3xl font-light text-[#1A1A1A] tracking-wide mb-1">{title}</h1>
        <p className="text-sm text-stone-500">{description}</p>
      </div>
    </div>
    <div className="bg-white rounded-2xl shadow-sm border border-stone-100 p-8">
      {children}
    </div>
  </div>
);

export function SearchAnalytics() {
  return (
    <PageTemplate title="Search Analytics" description="Global search volume, conversions, and metrics." icon={FiTrendingUp}>
      <div className="text-center py-12 text-stone-500">
        Analytics dashboard foundation. Ready for backend telemetry integration.
      </div>
    </PageTemplate>
  );
}

export function ZeroResultAnalysis() {
  return (
    <PageTemplate title="Zero Results Analysis" description="Queries that returned no results." icon={FiAlertCircle}>
      <div className="text-center py-12 text-stone-500">
        Zero-result tracking foundation. Will display queries failing to match any module.
      </div>
    </PageTemplate>
  );
}

export function SearchRedirects() {
  return (
    <PageTemplate title="Search Redirects" description="Redirect specific queries to target URLs." icon={FiExternalLink}>
      <div className="text-center py-12 text-stone-500">
        Redirect configuration foundation.
      </div>
    </PageTemplate>
  );
}

export function SearchSynonyms() {
  return (
    <PageTemplate title="Search Synonyms" description="Manage equivalencies across search terms." icon={FiRepeat}>
      <div className="text-center py-12 text-stone-500">
        Synonym configuration foundation. (e.g. sofa ↔ couch)
      </div>
    </PageTemplate>
  );
}

export function SearchBoosts() {
  return (
    <PageTemplate title="Search Boosts" description="Boost specific resource types or fields." icon={FiChevronsUp}>
      <div className="text-center py-12 text-stone-500">
        Ranking boost configuration foundation.
      </div>
    </PageTemplate>
  );
}

export function SearchPins() {
  return (
    <PageTemplate title="Search Pins" description="Pin specific results for specific queries." icon={FiMapPin}>
      <div className="text-center py-12 text-stone-500">
        Result pinning configuration foundation.
      </div>
    </PageTemplate>
  );
}

export function SearchExclusions() {
  return (
    <PageTemplate title="Search Exclusions" description="Exclude certain resources from global search." icon={FiEyeOff}>
      <div className="text-center py-12 text-stone-500">
        Exclusion rules foundation (e.g., hiding archived products).
      </div>
    </PageTemplate>
  );
}
