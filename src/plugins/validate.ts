import { extend, configure } from 'vee-validate';
import * as rules from 'vee-validate/dist/rules';

import config from '@/configs/validate';

/**
 * Automatically load all validation rules.
 *
 * NOTE: You may want to load just the ones you need.
 *
 * @see https://logaretm.github.io/vee-validate/guide/rules.html#installing-all-rules
 */
for (const [rule, validation] of Object.entries(rules)) {
  extend(rule, { ...validation });
}

configure(config);
