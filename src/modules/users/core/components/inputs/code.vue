<i18n>
en:
  PLACEHOLDER: Enter your recovery code...
  LABEL: Recovery Code
</i18n>

<template lang="pug">
form-input(
  @input="value => $emit('input', value)"
  :placeholder="$t('PLACEHOLDER')"
  rules="required|digits:6"
  :disabled="disabled"
  :label="$t('LABEL')"
  :required="true"
  :value="value"
  name="code"
  type="text"
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
