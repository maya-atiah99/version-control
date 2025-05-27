import { cleanToken } from './utils';

const securityHeaders = () => {
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Security-Policy':
      "default-src 'self'; script-src 'self'; object-src 'none'; frame-ancestors 'none';",
    'X-Frame-Options': 'DENY',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'no-referrer',
    'Permissions-Policy':
      'geolocation=(self), microphone=(), camera=(), autoplay=()',
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains; preload',
    'X-XSS-Protection': '1; mode=block',
    'Expect-CT': 'max-age=86400, enforce',
    'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
  };

  if (token) {
    headers.Authorization = `Bearer ${cleanToken(token)}`;
  }

  return headers;
};

export { securityHeaders };
