const PUBLIC_BACKEND_URL = import.meta.env.VITE_PUBLIC_BACKEND_URL;

export function getApiEndpoint() {
  // In development, connect to your local Flask backend
  if (import.meta.env.DEV) {
    return 'http://127.0.0.1:5001/api'; 
  }
  // In production (on Render), use the configured public backend URL
  if (!PUBLIC_BACKEND_URL) {
    // This error should ideally only happen if you forget to set the env var on Render
    console.error('VITE_PUBLIC_BACKEND_URL is not set for production environment.');
    throw new Error('Backend URL not configured.');
  }
  return `${PUBLIC_BACKEND_URL}/api`;
}