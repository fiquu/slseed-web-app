/**
 * HTTP config module.
 *
 * @module configs/http
 */

import Axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  headers: {
    ...Axios.defaults.headers
  }
};

export default config;
