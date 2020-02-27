/**
 * API config module.
 *
 * @module configs/api
 */

export const baseURL = process.env.VUE_APP_API_ENDPOINT;
export const headers = {};
export const cache = {
  maxAge: 15 * 60 * 1000 // 15 minutes
};

export default {
  baseUrl,
  headers,
  cache
};
