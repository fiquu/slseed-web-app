<i18n>
en:
  PLACEHOLDER: Create your new password...
  LABEL: New Password
  PROMPT_LABEL: Enter a password...
  WEAK_LABEL: Too weak...
  MEDIUM_LABEL: Fair...
  STRONG_LABEL: Perfect!
  VALIDATION:
    REQUIRED: Please input a password.
    MIN: That password is too short.
</i18n>

<template lang="pug">
el-form-item(:label="$t('LABEL')", :rules="rules", prop="newPassword")
  el-input(
    @input="(value) => $emit('input', value)",
    :placeholder="$t('PLACEHOLDER')",
    autocomplete="new-password",
    :disabled="disabled",
    name="new-password",
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
