const RENDER_BASE = import.meta.env.VITE_ONRENDER
const RENDER_IPS = import.meta.env.VITE_RENDER_IPS?.split(',') || []

export function getApiEndpoint() {
  if (import.meta.env.DEV) {
    return `${RENDER_BASE}/api`
  }

  if (RENDER_IPS.length === 0) {
    throw new Error('No Render IPs configured')
  }
  const randomIndex = Math.floor(Math.random() * RENDER_IPS.length)
  return `https://${RENDER_IPS[randomIndex]}/api`
}