export const validateSlug = (slug, reservedPaths = ['admin', 'api', 'login', 'checkout', 'cart', 'account']) => {
  if (!slug) return { valid: false, error: 'Slug cannot be empty' };
  if (reservedPaths.includes(slug)) return { valid: false, error: 'This slug is reserved' };
  
  const regex = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;
  if (!regex.test(slug)) return { valid: false, error: 'Invalid characters in slug' };
  
  return { valid: true };
};

export const generateSlug = (text) => {
  return text
    .toString()
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w\-]+/g, '')
    .replace(/\-\-+/g, '-');
};

export const validateSEO = (seoData) => {
  const errors = [];
  if (seoData.title && seoData.title.length > 60) errors.push('Title is over 60 characters');
  if (seoData.description && seoData.description.length > 160) errors.push('Description is over 160 characters');
  if (!seoData.title) errors.push('Title is missing');
  return { valid: errors.length === 0, errors };
};

export const analyzeSEOContent = (seoData, content) => {
  return {
    titleScore: seoData.title ? (seoData.title.length > 50 && seoData.title.length <= 60 ? 100 : 70) : 0,
    descriptionScore: seoData.description ? (seoData.description.length > 120 && seoData.description.length <= 160 ? 100 : 70) : 0,
    headingScore: 80,
    imageScore: 90,
    urlScore: 100,
    keywordGuidance: 'Ensure primary keyword appears in the title, description, and H1.',
    recommendations: ['Add more internal links', 'Improve alt text for images']
  };
};
