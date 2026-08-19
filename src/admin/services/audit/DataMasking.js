export function maskSensitiveValue(key, value) {
  if (!value) return value;
  
  const sensitiveKeys = [
    'password', 'token', 'secret', 'apikey', 'api_key', 
    'card', 'cvv', 'credit_card', 'auth', 'credentials'
  ];
  
  const isSensitive = sensitiveKeys.some(k => key.toLowerCase().includes(k));
  
  if (isSensitive) {
    return '********';
  }
  
  // Partial masking for emails if needed
  if (key.toLowerCase().includes('email') && typeof value === 'string') {
    const parts = value.split('@');
    if (parts.length === 2) {
      return `${parts[0].substring(0, 2)}***@${parts[1]}`;
    }
  }

  return value;
}

export function maskObject(obj) {
  if (!obj || typeof obj !== 'object') return obj;
  
  const masked = { ...obj };
  for (const [key, value] of Object.entries(masked)) {
    if (typeof value === 'object') {
      masked[key] = maskObject(value);
    } else {
      masked[key] = maskSensitiveValue(key, value);
    }
  }
  return masked;
}
