<i18n>
en:
  PLACEHOLDER: Enter your password...
  LABEL: Password
  VALIDATION:
    REQUIRED: Please input a password.
    MIN: That password is too short.
es:
  PLACEHOLDER: Ingresa tu contraseña...
  LABEL: Contraseña
  VALIDATION:
    REQUIRED: Ingresa una contraseña.
    MIN: Esa contraseña es demasiado corta.
</i18n>

<template lang="pug">
el-form-item(
  :label="$t('LABEL')",
  prop="password",
  :rules="rules"
)
  el-input(
    @input="(value) => $emit('input', value)",
    :placeholder="$t('PLACEHOLDER')",
    autocomplete="current-password",
    :id="`password-input-${_uid}`",
    :disabled="disabled",
    name="password",
    :value="value",
    show-password,
    minlength="8",
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
        message: String(this.$t('VALIDATION.REQUIRED'))
      }, {
        min: 8,
        message: String(this.$t('VALIDATION.MIN'))
      }]
    };
  }
});
</script>
