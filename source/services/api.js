/**
 * API service module.
 *
 * @module service/api
 */


import { createInstance, INDEXEDDB, LOCALSTORAGE } from 'localforage';
import { setupCache } from 'axios-cache-adapter';
import { create } from 'axios';

import { cache, baseURL, headers } from '@/configs/api';
import { name } from '@/../package.json';

const store = createInstance({
  driver: [INDEXEDDB, LOCALSTORAGE],
  name
});

const { adapter } = setupCache({
  maxAge: cache.maxAge,
  store
});

export default create({
  baseURL,
  adapter,
  withCredentials: true,
  headers: {
    ...axios.defaults.headers,
    ...headers
  }
});
