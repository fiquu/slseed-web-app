<i18n>
en:
  PLACEHOLDER: Enter your email...
  LABEL: Email
  VALIDATION:
    REQUIRED: Please input an email address.
    EMAIL: Please input a valid email address.
es:
  PLACEHOLDER: Ingresa tu correo electrónico...
  LABEL: Email
  VALIDATION:
    REQUIRED: Ingresa una dirección de correo electrónico.
    EMAIL: Ingresa una dirección de correo electrónico válida.
</i18n>

<template lang="pug">
el-form-item(
  :label="$t('LABEL')",
  :rules="rules",
  prop="email"
)
  el-input(
    @input="(value) => $emit('input', value)",
    :placeholder="$t('PLACEHOLDER')",
    autocomplete="username",
    :disabled="disabled",
    :value="value",
    minlength="6",
    name="email",
    type="email",
    required
  )
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  rules: unknown[];
}

interface Props {
  disabled: boolean;
  value: string;
}

export default Vue.extend<Data, unknown, unknown, Props>({
  props: {
    disabled: {
      type: Boolean
    },
    value: {
      type: String,
      required: true
    }
  },

  data() {
    return {
      rules: [{
        required: true,
        trigger: 'blur',
        message: String(this.$t('VALIDATION.REQUIRED'))
      }, {
        type: 'email',
        trigger: ['blur', 'change'],
        message: String(this.$t('VALIDATION.EMAIL'))
      }]
    };
  }
});
</script>
