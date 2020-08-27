<i18n>
en:
  PLACEHOLDER: Enter your recovery code...
  LABEL: Recovery Code
  VALIDATION:
    REQUIRED: Please input a recovery code.
    NUMBER: It should be a 6 digit number.
</i18n>

<template lang="pug">
el-form-item(
  :label="$t('LABEL')",
  :rules="rules",
  prop="code"
)
  el-input(
    @input="(value) => $emit('input', value)",
    :placeholder="$t('PLACEHOLDER')",
    autocomplete="recovery-code",
    :disabled="disabled",
    :value="value",
    name="code",
    type="text",
    required
  )
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  rules: Record<string, string | number | boolean | undefined>[];
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
        type: 'integer',
        message: String(this.$t('VALIDATION.NUMBER'))
      }]
    };
  }
});
</script>
