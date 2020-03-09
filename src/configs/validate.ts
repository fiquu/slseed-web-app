import { VeeValidateConfig } from 'vee-validate/dist/types/config';

const config: VeeValidateConfig = {
  defaultMessage: "{_field_} is not valid.",
  useConstraintAttrs: true,
  skipOptional: true,
  mode: 'aggressive',
  bails: true,
  classes: {
    invalid: 'error'
  }
};

export default config;
