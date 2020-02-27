/**
 * API config module.
 *
 * @module configs/api
 */

export default {
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  headers: {},
  cache: {
    maxAge: process.env.NODE_ENV === 'local'
    ? 0 // Let's not wait while developing...
    : 1 * 60 * 1000 // 1 minute
  }
};
