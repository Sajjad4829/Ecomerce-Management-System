// Mock Media Validation
export const validateAssetMetadata = (data) => {
  if (!data.filename) return false;
  return true;
};

export const validateMediaFile = (file) => {
  const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'application/pdf', 'video/mp4'];
  if (!allowedTypes.includes(file.type)) return false;
  if (file.size > 50 * 1024 * 1024) return false; // 50MB
  return true;
};
