<i18n>
en:
  PLACEHOLDER: Enter your password...
  LABEL: Password
</i18n>

<template lang="pug">
form-input(
  @input="value => $emit('input', value)"
  :placeholder="$t('PLACEHOLDER')"
  rules="required|min:8"
  :disabled="disabled"
  :label="$t('LABEL')"
  :required="true"
  :value="value"
  name="password"
  type="password"
  )
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
