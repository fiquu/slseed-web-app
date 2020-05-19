import { graphqlOperation } from '@aws-amplify/api';
import gql from 'graphql-tag';
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
  getSessionData(): Promise<SessionData>;
  signOut(): Promise<void>;
}

export default new Vue({
  data(): SessionComponentData {
    return {
      root: config && config.root || '/',
      signedIn: false,
      loading: false,
      data: {}
    };
  },

  created(): void {
    // Resolve session data
    router.beforeEach(async (to, from, next) => {
      if (to.meta.requiresAuth) {
        this.loading = true;

        try {
          this.signedIn = await this.getSignedIn();

          if (this.signedIn && this.$is.empty(this.data)) {
            this.data = await this.getSessionData();
          }
        } catch (err) {
          this.$emit('error', err);
          this.signedIn = false;
          this.data = {};

          return next(false);
        }
      }

      this.loading = false;

      if (!this.signedIn && to.meta.requiresAuth && to.path !== config.signIn) {
        return next(config.signIn);
      }

      next();
    });
  },

  methods: {
    /**
     * Sets the signed in property.
     */
    async getSignedIn(): Promise<boolean> {
      try {
        return Boolean(await auth.currentAuthenticatedUser());
      } catch (err) {
        return false;
      }
    },

    /**
     * @returns {object} The session data.
     */
    async getSessionData(): Promise<SessionData> {
      const { data } = await api.graphql(graphqlOperation(gql`
        query Session {
          session {
            _id
            name
          }
        }
      `)) as unknown as SessionResponse;

      return data.session;
    },

    /**
     * Signs the user out.
     */
    async signOut(): Promise<void> {
      this.signedIn = false;
      this.loading = true;
      this.data = {};

      // This will trigger a page reload
      await this.$auth.signOut();
    }
  }
});
