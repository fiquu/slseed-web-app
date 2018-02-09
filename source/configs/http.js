/**
 * HTTP config module.
 *
 * Vue resource does not provide proper documentation on this. So this works instead of the documented example:
 * @see https://github.com/pagekit/vue-resource/blob/develop/docs/config.md
 *
 * @module configs/http
 */

export default {
  // IMPORTANT: These values MUST be configured per-app.
  root: process.env.API_ENDPOINT
};
