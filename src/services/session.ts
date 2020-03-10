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
  signedIn: boolean;
  data: object | null;
  loaded: boolean;
  root: string;
}

export type SessionService = SessionData;

export default new Vue({
  data(): SessionData {
    return {
      root: config && config.root || '/',
      signedIn: false,
      loaded: false,
      data: null
    };
  },

  created(): void {
    // Resolve session data
    router.beforeEach(async (to, from, next) => {
      this.signedIn = Boolean(await auth.currentSession());

      if (!this.signedIn) {
        // Just delete session data if not signed in
        this.data = null;
      } else if (!this.data) {
        // Fetch session data if signed in and not present
        try {
          const res = await api.get('session');

          this.data = res.data;
        } catch (err) {
          if (this.signedIn) {
            await auth.signOut();
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
