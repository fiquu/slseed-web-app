/**
 * API service module.
 *
 * @module service/api
 */


import cacheAdapter from 'axios-cache-adapter';
import localforage from 'localforage';
import axios from 'axios';

import config from '@/configs/api';
import { name } from '@/../package.json';

const store = localforage.createInstance({
  driver: [localforage.INDEXEDDB, localforage.LOCALSTORAGE],
  name
});

const cache = cacheAdapter.setupCache({
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
