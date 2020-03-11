/**
 * Session service module.
 *
 * @module service/session
 */

import Vue from 'vue';

import router from './router';
import auth from './auth';
import api from './api';

import config from '@/configs/session';

export interface SessionConfig {
  signIn: string;
  root?: string;
}

export interface SessionData {
  data: object | null;
  signedIn: boolean;
  loading: boolean;
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
      loading: false,
      loaded: false,
      data: null
    };
  },

  created(): void {
    // Resolve session data
    router.beforeEach(async (to, from, next) => {
      this.loading = true;

      this.$emit('update');

      let redirect: string | void;

      try {
        this.signedIn = !!(await auth.currentSession());
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
          const res = await api.get('WebApi', '/session', {});

          this.data = res.data;
        } catch (err) {
          if (this.signedIn) {
            await this.signOut();

            if (to.meta.requiresAuth) {
              redirect = config.signIn;
            }
          } else if (to.path !== this.root) {
            redirect = this.root;
          }
        }
      }

      this.loading = false;
      this.loaded = true;

      this.$emit('update');

      next(redirect);
    });
  },

  methods: {
    async signOut(): Promise<void> {
      await this.$auth.signOut();

      this.signedIn = false;

      this.$emit('signed-out', config.signIn);
    }
  }
});
