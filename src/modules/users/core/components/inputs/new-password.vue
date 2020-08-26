<i18n>
en:
  PLACEHOLDER: Create your new password...
  LABEL: New Password
  PROMPT_LABEL: Enter a password...
  WEAK_LABEL: Too weak...
  MEDIUM_LABEL: Fair...
  STRONG_LABEL: Perfect!
</i18n>

<template lang="pug">
el-form-item(
  :model="$parent.model",
  :label="$t('LABEL')",
  prop="newPassword",
  :rules="rules"
)
  el-input(
    @input="(value) => $emit('input', value)",
    :placeholder="$t('PLACEHOLDER')",
    autocomplete="new-password",
    :disabled="disabled",
    name="new-password",
    :value="value",
    show-password,
    required
  )
</template>

<script lang="ts">
import Vue from 'vue';

interface Computed {
  inputValue: string | number;
}

interface Props {
  disabled: boolean;
  value: string;
}

export default Vue.extend<unknown, unknown, Computed, Props>({
  props: {
    disabled: {
      type: Boolean
    },
    value: {
      type: String,
      required: true
    }
  },

  computed: {
    inputValue: {
      get() {
        return this.value;
      },

      set(value) {
        this.$emit('input', value);
      }
    }
  }
});
</script>
