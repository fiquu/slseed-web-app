import { VeeValidateConfig } from 'vee-validate/dist/types/config';

/**
 * @see https://logaretm.github.io/vee-validate/configuration.html
 */
const config: VeeValidateConfig = {
  defaultMessage: '{_field_} is not valid.',
  useConstraintAttrs: true,
  skipOptional: true,
  mode: 'aggressive',
  bails: true,
  classes: {
    invalid: 'p-invalid'
  }
};

export default config;
