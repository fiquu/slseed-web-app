<i18n>
en:
  PLACEHOLDER: Create your new password...
  LABEL: New Password
</i18n>

<template lang="pug">
form-input(
  :placeholder="$t('PLACEHOLDER')",
  rules="required|min:8",
  :disabled="disabled",
  v-model="inputValue",
  :label="$t('LABEL')",
  :required="true",
  name="password",
  type="password"
)
</template>

<script lang="ts">
import Vue from 'vue';

interface Props {
  disabled: boolean;
  value: string;
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    disabled: {
      type: Boolean
    },
    value: {
      type: String,
      required: true
    }
  }
});
</script>
