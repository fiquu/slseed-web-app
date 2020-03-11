/**
 * Validate plugin module.
 *
 * @see https://logaretm.github.io/vee-validate/guide/rules.html#installing-all-rules
 *
 * @module plugins/validate
 */

import { extend, configure, ValidationProvider, ValidationObserver } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';
import Vue from 'vue';

import config from '../configs/validate';

// Automatically load all validation rules.
// NOTE: You may want to load the one by one.
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, { ...validation });
}

configure(config);

// These are components but the module is a plugin...
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
