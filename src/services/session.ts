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
  signIn: string;
  root?: string;
}

export interface SessionData {
  signedIn: boolean;
  data: object | null;
  loaded: boolean;
  root: string;
}

export interface SessionService extends SessionData, Vue {
  signOut(): Promise<void>;
}

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
      let redirect: string | void;

      try {
        const user = await auth.currentSession();

        console.info(user);

        this.signedIn = true;
      } catch (err) {
        this.signedIn = false;
      }

      if (!this.signedIn) {
        this.data = null; // Just delete session data if not signed in

        if (to.meta.requiresAuth) {
          redirect = config.signIn;
        }
      } else if (!this.data) {
        // Fetch session data if signed in and not present
        try {
          const res = await api.get('session');

          this.data = res.data;
        } catch (err) {
          if (this.signedIn) {
            await this.signOut();

            this.signedIn = false;

            if (to.meta.requiresAuth) {
              redirect = config.signIn;
            }
          } else if (to.path !== this.root) {
            redirect = this.root;
          }
        }
      }

      this.loaded = true;

      next(redirect);
    });
  },

  methods: {
    async signOut(): Promise<void> {
      await this.$auth.signOut();

      this.signedIn = false;

      this.$emit('signedOut');
    }
  }
});
