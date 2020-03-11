<i18n>
en:
  PLACEHOLDER: Enter your recovery code...
  LABEL: Recovery Code
</i18n>

<template lang="pug">
form-input(
  @input="value => $emit('input', value)"
  :placeholder="$t('PLACEHOLDER')"
  rules="required|min:1"
  :disabled="disabled"
  :label="$t('LABEL')"
  :required="true"
  :value="value"
  name="email"
  type="text"
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
