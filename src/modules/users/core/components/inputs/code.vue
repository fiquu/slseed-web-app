<i18n>
en:
  PLACEHOLDER: Enter your recovery code...
  LABEL: Recovery Code
  VALIDATION:
    REQUIRED: Please input a recovery code.
    INTEGER: It should be a 6 digit number.
es:
  PLACEHOLDER: Ingresa tu código de recuperación...
  LABEL: Código de recuperación
  VALIDATION:
    REQUIRED: Ingresa un código de recuperación.
    INTEGER: Debe ser un número de 6 dígitos.
</i18n>

<template lang="pug">
el-form-item(:label="$t('LABEL')", :rules="rules", prop="code")
  el-input(
    @input="(value) => $emit('input', value)",
    :placeholder="$t('PLACEHOLDER')",
    autocomplete="recovery-code",
    :id="`code-input-${_uid}`",
    :disabled="disabled",
    :value="value",
    type="text",
    name="code",
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
        pattern: /^[0-9]{6}$/,
        message: String(this.$t('VALIDATION.INTEGER'))
      }]
    };
  }
});
</script>
