import { getApiEndpoint } from './config'

export const API_ENDPOINTS = {
  generate: () => `${getApiEndpoint()}/generate`,
  // The 'verify' endpoint is now 'status' for checking login state
  status: () => `${getApiEndpoint()}/status`,
  // New authentication endpoints
  login: () => `${getApiEndpoint()}/login`,
  register: () => `${getApiEndpoint()}/register`,
  logout: () => `${getApiEndpoint()}/logout`
}