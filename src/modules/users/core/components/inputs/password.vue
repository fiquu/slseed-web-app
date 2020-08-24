<i18n>
en:
  PLACEHOLDER: Enter your password...
  LABEL: Password
</i18n>

<template lang="pug">
validation-provider(v-slot="{ classes }", rules="required|min:8", slim)
  .p-field(:class="classes")
    label(:for="`password-input-${_uid}`")
      | {{ $t('LABEL') }}

    p-password(
      :placeholder="$t('PLACEHOLDER')",
      autocomplete="current-password",
      :id="`password-input-${_uid}`",
      :disabled="disabled",
      v-model="inputValue",
      :feedback="false",
      :class="classes",
      name="password",
      required
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
