/**
 * server/cache/cmsCache.js
 * 
 * Centralized Server-Side Memory Cache for the CMS API.
 * Reduces MongoDB load by caching frequent GET requests with TTL and deduplication.
 */

const CACHE_TTL = 5 * 60 * 1000; // 5 minutes in milliseconds

const cmsMemoryCache = {
  data: {},
  timestamp: {}
};

const pendingRequests = {};

/**
 * Check if a specific cache key exists and is valid (not expired).
 */
export const has = (key) => {
  if (!cmsMemoryCache.data[key]) return false;
  
  const age = Date.now() - (cmsMemoryCache.timestamp[key] || 0);
  return age < CACHE_TTL;
};

/**
 * Get the age of a cached item in milliseconds.
 */
export const getAge = (key) => {
  if (!cmsMemoryCache.timestamp[key]) return -1;
  return Date.now() - cmsMemoryCache.timestamp[key];
};

/**
 * Get data from cache.
 * Returns null if not found or expired.
 */
export const get = (key) => {
  if (has(key)) {
    return cmsMemoryCache.data[key];
  }
  
  // Clean up expired cache
  if (cmsMemoryCache.data[key]) {
    delete cmsMemoryCache.data[key];
    delete cmsMemoryCache.timestamp[key];
  }
  
  return null;
};

/**
 * Save data to cache.
 */
export const set = (key, data) => {
  cmsMemoryCache.data[key] = data;
  cmsMemoryCache.timestamp[key] = Date.now();
  console.log(`[CACHE SET] ${key}`);
};

/**
 * Invalidate specific cache key.
 */
export const invalidate = (key) => {
  if (cmsMemoryCache.data[key]) {
    delete cmsMemoryCache.data[key];
    delete cmsMemoryCache.timestamp[key];
    console.log(`[CACHE INVALIDATED] ${key}`);
  }
};

/**
 * Invalidate multiple cache keys that match a condition or prefix.
 */
export const invalidatePrefix = (prefix) => {
  Object.keys(cmsMemoryCache.data).forEach(key => {
    if (key.startsWith(prefix)) {
      invalidate(key);
    }
  });
}

/**
 * Invalidate all cache keys (e.g. for complete reset).
 */
export const invalidateAll = () => {
  cmsMemoryCache.data = {};
  cmsMemoryCache.timestamp = {};
  console.log(`[CACHE INVALIDATED] All`);
};

/**
 * Helper to fetch data, prioritizing cache.
 * Implements deduplication to prevent simultaneous MongoDB queries.
 * 
 * @param {string} cacheKey - The unique key for this cache entry
 * @param {Function} asyncDatabaseFunction - Async function to run if cache misses
 */
export const getOrSetCache = async (cacheKey, asyncDatabaseFunction) => {
  // 1. Check valid cache
  if (has(cacheKey)) {
    console.log(`[CACHE HIT] ${cacheKey}`);
    return get(cacheKey);
  }

  // 2. Check pending request for deduplication
  if (pendingRequests[cacheKey]) {
    console.log(`[CACHE WAIT] ${cacheKey}`);
    return await pendingRequests[cacheKey];
  }

  console.log(`[CACHE MISS] ${cacheKey}`);

  // 3. Create new promise and store in pendingRequests
  const fetchPromise = (async () => {
    try {
      const data = await asyncDatabaseFunction();
      set(cacheKey, data);
      return data;
    } finally {
      // Remove from pending once resolved/rejected
      delete pendingRequests[cacheKey];
    }
  })();

  pendingRequests[cacheKey] = fetchPromise;
  
  return await fetchPromise;
};
