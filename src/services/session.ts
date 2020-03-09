/**
 * Session service module.
 *
 * @module service/session
 */

import Vue from 'vue';

import config from '../configs/session';
import router from './router';
import auth from './auth';
import api from './api';

export interface SessionConfig {
  root?: string;
}

export interface SessionData {
  loaded: boolean;
  data: any | null;
  root: string;
}

export default new Vue({
  data(): SessionData {
    return {
      root: config && config.root || '/',
      loaded: false,
      data: null
    };
  },

  created(): void {
    // Resolve session data
    router.beforeEach(async (to, from, next) => {
      const signedIn = auth.isSignedIn();

      if (!signedIn) {
        // Just delete session data if not signed in
        this.data = null;
      } else if (!this.data) {
        // Fetch session data if signed in and not present
        try {
          const res = await api.get('session');

          this.data = res.data;
        } catch (err) {
          if (signedIn) {
            auth.signOut();
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
    });
  }
});
