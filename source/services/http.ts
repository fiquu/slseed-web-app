/**
 * HTTP service module.
 *
 * @module services/http
 */

import axios from 'axios';

import config from '../configs/http';

export default axios.create(config);
