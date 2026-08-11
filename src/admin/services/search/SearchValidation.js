// Mock Search Validation
export const validateSearchQuery = (query) => {
  if (!query || typeof query !== 'string') return false;
  if (query.length > 255) return false;
  return true;
};

export const validateSavedSearch = (searchData) => {
  return searchData.name && searchData.query;
};

export const validateSearchRule = (ruleData) => {
  return ruleData.field && ruleData.operator && ruleData.value !== undefined;
};
