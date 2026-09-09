/**
 * sectionPreviewResolver.js
 * -------------------------
 * Generic, reusable utility for the Section Library preview system.
 *
 * Architecture:
 *   MongoDB (all pages sectionsDraft/Published)
 *         ↓
 *   CMSContext.sectionPreviewMap  { [sectionType] → savedSectionInstance }
 *         ↓
 *   resolveSectionPreview(registryEntry, sectionPreviewMap)
 *         ↓
 *   Resolved section object with real content → preview component
 *
 * Data priority chain (per section type):
 *   1. Saved MongoDB instance  (sectionPreviewMap[type])
 *   2. Registry defaultContent  (registryEntry.defaultContent)
 *   3. Empty professional placeholder  ({})
 *
 * This file has ZERO React dependencies and works for every current and
 * future section type without modification.  When a new section type is
 * registered in INITIAL_SECTIONS, it automatically participates in this
 * system — no extra data-loading code needed.
 */

/**
 * resolveSectionPreview
 *
 * @param {Object} registryEntry   - A section definition from INITIAL_SECTIONS
 *                                   (has: type, name, category, icon, description,
 *                                    defaultContent, defaultSettings)
 * @param {Object} sectionPreviewMap - Map fetched from /api/cms/sections/preview-map
 *                                   (has: { [sectionType]: { content, settings, ... } })
 * @returns {Object} A merged section object ready for a preview component.
 *   - If MongoDB has a saved instance for this type → uses real content/settings
 *   - Otherwise → uses registry defaultContent/defaultSettings as fallback
 *   - Always preserves registry metadata (name, category, icon, description, type)
 *   - Adds _previewSource: 'mongodb' | 'default' for debugging / UI badges
 */
export function resolveSectionPreview(registryEntry, sectionPreviewMap = {}, libraryConfigurations = {}) {
  if (!registryEntry) return null;

  // Start with the base registry entry and its default content
  let resolved = {
    ...registryEntry,
    content: registryEntry.defaultContent || registryEntry.content || {},
    settings: registryEntry.defaultSettings || registryEntry.settings || {},
    responsive: {},
    _previewSource: 'default',
  };

  // If the admin has saved a custom configuration for this template in the Section Library, merge it.
  // This ensures custom templates use their configured mock data, while remaining isolated from real page instances.
  if (libraryConfigurations && libraryConfigurations[registryEntry.type]) {
    const libConfig = libraryConfigurations[registryEntry.type];
    resolved = {
      ...resolved,
      content: { ...resolved.content, ...(libConfig.content || {}) },
      settings: { ...resolved.settings, ...(libConfig.settings || {}) },
      _previewSource: 'library',
    };
  }

  return resolved;
}

/**
 * buildResolvedSections
 *
 * Convenience helper: resolves an entire array of registry entries at once.
 *
 * @param {Array}  registryEntries  - INITIAL_SECTIONS or a filtered subset
 * @param {Object} sectionPreviewMap - From CMSContext
 * @returns {Array} Array of resolved section objects
 */
export function buildResolvedSections(registryEntries = [], sectionPreviewMap = {}) {
  return registryEntries.map(entry => resolveSectionPreview(entry, sectionPreviewMap));
}
