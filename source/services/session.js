/**
 * Session service module.
 *
 * @module service/session
 */

import Vue from 'vue';

import config from '@/configs/session';

import router from './router';
import api from './api';

export default new Vue({
  data () {
    return {
      root: (config && config.root) || '/',
      loaded: false,
      data: null
    };
  },

  created () {
    /* Resolve session data */
    router.beforeEach(this.validateSession);
  },

  methods: {
    async validateSession (to, from, next) {
      const signedIn = this.$auth.isSignedIn();

      if (!signedIn) {
        /* Just delete session data if not signed in */
        this.data = null;
      } else if (!this.data) {
        /* Fetch session data if signed in and not present */
        try {
          const res = await api.get('session');

          this.data = res.data;
        } catch (err) {
          if (signedIn) {
            this.$auth.signOut();
            return;
          }

          if (to.path === this.root) {
            next();
          } else {
            next(this.root);
          }
        }
      }

      this.loaded = true;

      next();
    }
  }
});
