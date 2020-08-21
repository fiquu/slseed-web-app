<i18n>
en:
  PLACEHOLDER: Enter your password...
  LABEL: Password
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

interface Computed {
  inputValue: string;
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
