/**
 * Session plugin module.
 *
 * @module plugins/session
 */

import router from '@/router';

export default {
  install: (Vue, config) => {
    const $session = new Vue({
      data() {
        return {
          root: (config && config.root) || '/',
          loaded: false,
          data: null
        };
      }
    });

    /* Resolve session data */
    router.beforeEach(async (to, from, next) => {
      const signedIn = $session.$auth.isSignedIn();

      if (!signedIn) {
        /* Just delete session data if not signed in */
        $session.data = null;
      } else if (!$session.data) {
        /* Fetch session data if signed in and not present */
        try {
          const res = await $session.$api.get('session');

          $session.data = res.data;
        } catch (err) {
          if (signedIn) {
            $session.$auth.signOut();
            return;
          }

          if (to.path === $session.root) {
            next();
          } else {
            next($session.root);
          }
        }
      }

      $session.loaded = true;

      next();
    });

    Object.defineProperty(Vue.prototype, '$session', {
      value: $session
    });
  }
};
