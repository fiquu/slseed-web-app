<i18n>
en:
  PLACEHOLDER: Enter your email...
  LABEL: Email
</i18n>

<template lang="pug">
form-input(
  :placeholder="$t('PLACEHOLDER')"
  :disabled="disabled"
  :label="$t('LABEL')"
  :required="true"
  name="email"
  type="email"
  )
</template>

<script lang="ts">
import FormInput from '@/modules/core/components/form/input.vue';

import Vue from 'vue';

export default Vue.extend({
  components: {
    FormInput
  },

  props: {
    disabled: {
      type: Boolean
    }
  }
});
</script>
