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
export function resolveSectionPreview(registryEntry, sectionPreviewMap = {}) {
  if (!registryEntry) return null;

  const savedInstance = sectionPreviewMap[registryEntry.type];

  // ── Priority 1: Real saved MongoDB data ──────────────────────────────────
  if (savedInstance) {
    const hasRealContent =
      savedInstance.content && Object.keys(savedInstance.content).length > 0;
    const hasRealSettings =
      savedInstance.settings && Object.keys(savedInstance.settings).length > 0;

    if (hasRealContent || hasRealSettings) {
      return {
        // Preserve registry metadata for the card UI
        ...registryEntry,
        // Override with real saved data, merged with defaults for missing fields
        content: { ...(registryEntry.defaultContent || {}), ...(savedInstance.content || {}) },
        settings: { ...(registryEntry.defaultSettings || {}), ...(savedInstance.settings || {}) },
        responsive: savedInstance.responsive || {},
        // Debug/UI indicator
        _previewSource: 'mongodb',
      };
    }
  }

  // ── Priority 2: Registry defaultContent (fallback) ────────────────────────
  // Used ONLY when no saved MongoDB data exists for this section type.
  return {
    ...registryEntry,
    content: registryEntry.defaultContent || {},
    settings: registryEntry.defaultSettings || {},
    responsive: {},
    _previewSource: 'default',
  };
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
