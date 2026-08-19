// Mock Search Utilities
export const normalizeQuery = (query) => {
  return query.trim().toLowerCase().replace(/\s+/g, ' ');
};

export const rankResults = (results, query) => {
  // Mock ranking
  return results.sort((a, b) => (b.score || 0) - (a.score || 0));
};

export const groupResults = (results) => {
  return results.reduce((acc, curr) => {
    if (!acc[curr.type]) acc[curr.type] = [];
    acc[curr.type].push(curr);
    return acc;
  }, {});
};
