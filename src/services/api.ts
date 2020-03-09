/**
 * API service module.
 *
 * @module service/api
 */

import localforage, { INDEXEDDB, LOCALSTORAGE } from 'localforage';
import cacheAdapter from 'axios-cache-adapter';
import Axios from 'axios';

import config from '../configs/api';

const store = localforage.createInstance({
  name: `${process.env.NAME}-api-cache`,
  driver: [INDEXEDDB, LOCALSTORAGE]
});

const cache = cacheAdapter.setupCache({
  maxAge: config.cache ? config.cache.maxAge : 0,
  store
});

export default Axios.create({
  adapter: cache.adapter,
  ...config
});
