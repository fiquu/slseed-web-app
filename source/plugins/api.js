/**
 * API plugin module.
 *
 * @module plugins/api
 */

import axios from 'axios';

export default {
  install: (Vue, options) => {
    const value = axios.create({
      baseURL: options.baseURL,
      headers: {
        ...axios.defaults.headers,
        ...options.headers
      }
    });

    Object.defineProperty(Vue.prototype, '$api', {
      value
    });
  }
};
