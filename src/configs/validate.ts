/**
 * Validation config module
 *
 * @see https://logaretm.github.io/vee-validate/configuration.html
 *
 * @module configs/validate
 */

import { VeeValidateConfig } from 'vee-validate/dist/types/config';

const config: VeeValidateConfig = {
  defaultMessage: '{_field_} is not valid.',
  useConstraintAttrs: true,
  skipOptional: true,
  mode: 'eager',
  bails: true,
  classes: {
    invalid: 'error'
  }
};

export default config;
