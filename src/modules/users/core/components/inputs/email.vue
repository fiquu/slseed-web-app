<i18n>
en:
  PLACEHOLDER: Enter your email...
  LABEL: Email
</i18n>

<template lang="pug">
form-input(
  @input="value => $emit('input', value)"
  :placeholder="$t('PLACEHOLDER')"
  rules="required|min:6"
  :disabled="disabled"
  :label="$t('LABEL')"
  :required="true"
  :value="value"
  name="email"
  type="email"
  )
</template>

<script lang="ts">
import Vue from 'vue';

interface Props {
  disabled: boolean;
  value: string;
}

export default Vue.extend<{}, {}, {}, Props>({
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
