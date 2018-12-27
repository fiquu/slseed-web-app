/**
 * Realtime config module.
 *
 * @module configs/realtime
 */

export default {
  key: process.env.VUE_APP_ABLY_REALTIME_CLIENT_KEY,
  namespace: 'clients:users'
};
