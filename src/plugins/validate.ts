/**
 * Validate plugin module.
 *
 * @module plugins/validate
 */

import { configure, ValidationProvider, ValidationObserver } from 'vee-validate';
import Vue from 'vue';

import config from '../configs/validate';

configure(config);

// These are components but the module is a plugin...
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
