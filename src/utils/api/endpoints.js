import { getApiEndpoint } from './config'

export const API_ENDPOINTS = {
  generate: () => `${getApiEndpoint()}/generate`,
  verify: () => `${getApiEndpoint()}/verify`
}