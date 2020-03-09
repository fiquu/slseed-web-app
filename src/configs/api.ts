/**
 * API config module.
 *
 * @module configs/api
 */

import Axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_API_ENDPOINT,
  withCredentials: true,
  headers: {
    ...Axios.defaults.headers
  },
  cache: {
    maxAge: process.env.NODE_ENV === 'local'
      ? 0 // Let's not wait while developing...
      : 1 * 60 * 1000 // 1 minute
  }
};

export default config;
