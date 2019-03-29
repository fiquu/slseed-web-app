/**
 * API service module.
 *
 * @module service/api
 */

import pkg from '@/../package.json';
import config from '@/configs/api';

import { setupCache } from 'axios-cache-adapter';
import localforage from 'localforage';
import axios from 'axios';

// Create `localforage` instance
const store = localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name: pkg.name
});

// Create `axios-cache-adapter` instance
const cache = setupCache({
  maxAge: config.cache.maxAge,
  store
});

export default axios.create({
  baseURL: config.baseURL,
  adapter: cache.adapter,
  withCredentials: true,
  headers: {
    ...axios.defaults.headers,
    ...config.headers
  }
});
