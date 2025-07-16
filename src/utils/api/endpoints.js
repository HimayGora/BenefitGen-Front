import { getApiEndpoint } from './config';

export const API_ENDPOINTS = {
  // Your existing endpoints
  generate: () => `${getApiEndpoint()}/generate`,
  status: () => `${getApiEndpoint()}/status`,
  login: () => `${getApiEndpoint()}/login`,
  register: () => `${getApiEndpoint()}/register`,
  logout: () => `${getApiEndpoint()}/logout`,

  // Endpoints for Stripe and Admin Panel
  createCheckoutSession: () => `${getApiEndpoint()}/create-checkout-session`,
  adminGetAllUsers: () => `${getApiEndpoint()}/admin/users`,
  adminUpdateUser: (userId) => `${getApiEndpoint()}/admin/users/${userId}`,
  adminGetSiteStats: () => `${getApiEndpoint()}/admin/stats`,
};