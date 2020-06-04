import { graphqlOperation, GraphQLResult } from '@aws-amplify/api';
import Vue from 'vue';

import router from './router';
import auth from './auth';
import api from './api';

import config from '@/configs/session';

export interface SessionConfig {
  signIn: string;
  root?: string;
  query: string;
}

interface SessionData {
  name: string;
  _id: string;
}

interface Data {
  data: Partial<SessionData>;
  signedIn: boolean;
  loading: boolean;
  root: string;
}

interface SessionResponse {
  session: SessionData;
}

interface Methods {
  getSessionData(): Promise<SessionData | undefined>;
  getSignedIn(): Promise<boolean>;
  signOut(): Promise<void>;
}

export default new Vue<Data, Methods, unknown>({
  data() {
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
            this.data = (await this.getSessionData()) || {};
          }
        } catch (err) {
          this.$emit('error', err);
          this.signedIn = false;
          this.data = {};
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
    async getSignedIn() {
      try {
        return Boolean(await auth.currentAuthenticatedUser());
      } catch (err) {
        return false;
      }
    },

    /**
     * @returns {object} The session data.
     */
    async getSessionData() {
      const { data } = await api.graphql(graphqlOperation(config.query)) as GraphQLResult<SessionResponse>;

      return data && data.session;
    },

    /**
     * Signs the user out.
     */
    async signOut() {
      this.signedIn = false;
      this.loading = true;
      this.data = {};

      // This will trigger a page reload
      await this.$auth.signOut();
    }
  }
});
