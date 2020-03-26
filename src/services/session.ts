import { graphqlOperation } from '@aws-amplify/api';
import Vue from 'vue';

import router from './router';
import auth from './auth';
import api from './api';

import config from '@/configs/session';

export interface SessionConfig {
  signIn: string;
  root?: string;
}

export interface SessionComponentData {
  signedIn: boolean;
  loading: boolean;
  loaded: boolean;
  data: object;
  root: string;
}

export interface SessionData {
  name: string;
  _id: string;
}

interface SessionResponse {
  data: {
    session: SessionData;
  };
}

export interface SessionService extends SessionComponentData, Vue {
  signOut(): Promise<void>;
}

export default new Vue({
  data(): SessionComponentData {
    return {
      root: config && config.root || '/',
      signedIn: false,
      loading: false,
      loaded: false,
      data: {}
    };
  },

  created(): void {
    // Resolve session data
    router.beforeEach(async (to, from, next) => {
      this.loading = true;

      this.$emit('update');

      this.signedIn = await this.setSignedIn();

      const redirect = await this.getRedirect(to);

      this.loading = false;
      this.loaded = true;

      this.$emit('update');

      next(redirect);
    });
  },

  methods: {
    /**
     * Resolves the redirect path.
     *
     * @param {object} to The `to` route.
     *
     * @returns {Promise<string|void>} A promise to the redirection path.
     */
    async getRedirect(to): Promise<string | void> {
      if (this.signedIn) {
        // Check if session data is set
        if (Object.keys(this.data).length > 0) {
          return;
        }

        // Try and fetch session data
        try {
          this.data = await this.getSessionData();

          return;
        } catch (err) {
          console.error(err);

          await this.signOut();
        }
      }

      this.data = {}; // Just clear session data if not signed in

      if (to.meta.requiresAuth && to.path !== config.signIn) {
        return config.signIn;
      }
    },

    /**
     * Sets the signed in property.
     */
    async setSignedIn(): Promise<boolean> {
      try {
        return !!(await auth.currentSession());
      } catch (err) {
        return false;
      }
    },

    /**
     * @returns {object} The session data.
     */
    async getSessionData(): Promise<SessionData> {
      const { data } = await api.graphql(graphqlOperation('{ session { _id name } }')) as unknown as SessionResponse;

      return data.session;
    },

    /**
     * Signs the user out.
     */
    async signOut(): Promise<void> {
      await this.$auth.signOut();

      this.signedIn = false;

      this.$emit('signed-out', config.signIn);
    }
  }
});
