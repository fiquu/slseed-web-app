/**
 * HTTP plugin module.
 *
 * @module plugins/http
 */

import axios from 'axios';

export default {
  install: (Vue, options) => {
    axios.defaults.baseURL = options.baseURL;
    axios.defaults.headers = {
      ...axios.defaults.headers,
      ...options.headers
    };

    Object.defineProperty(Vue.prototype, '$http', {
      value: axios
    });
  }
};
