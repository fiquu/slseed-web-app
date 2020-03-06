/**
 * HTTP service module.
 *
 * @module services/http
 */

import axios from 'axios';

import config from '../configs/http';

export default axios.create({
  baseURL: config.baseURL,
  headers: {
    ...axios.defaults.headers,
    ...config.headers
  }
});
