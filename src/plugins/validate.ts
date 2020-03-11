/**
 * Validate plugin module.
 *
 * @module plugins/validate
 */

import { extend, configure, ValidationProvider, ValidationObserver } from 'vee-validate';
import { ValidationRule } from 'vee-validate/dist/types/types';
import * as rules from 'vee-validate/dist/rules';
import Vue from 'vue';

import config from '../configs/validate';

// Automatically load all validation rules.
// NOTE: You may want to load the one by one.
const _rules: Map<string, ValidationRule> = new Map(Object.entries(rules));

for (const [name, schema] of _rules) {
  extend(name, schema);
}

configure(config);

// These are components but the module is a plugin...
Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
