<i18n>
en:
  PLACEHOLDER: Enter your email...
  LABEL: Email
  VALIDATION:
    REQUIRED: Please input an email address.
    EMAIL: Please input a valid email address.
</i18n>

<template lang="pug">
el-form-item(
  :model="$parent.model",
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
    clearable,
    required
  )
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  rules: Record<string, string | string[] | number | boolean | undefined>[];
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
