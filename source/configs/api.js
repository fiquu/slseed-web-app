/**
 * API config module.
 *
 * @module configs/api
 */

export default {
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  cache: {
    maxAge: 15 * 60 * 1000
  }
};
