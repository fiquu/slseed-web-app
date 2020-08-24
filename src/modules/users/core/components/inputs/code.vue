<i18n>
en:
  PLACEHOLDER: Enter your recovery code...
  LABEL: Recovery Code
  HELP: It should be a 6 digit code.
</i18n>

<template lang="pug">
validation-provider(v-slot="{ classes }", rules="required|digits:6", slim)
  .p-field(:class="classes")
    label(:for="`code-input-${_uid}`")
      | {{ $t('LABEL') }}

    p-input-text(
      :placeholder="$t('PLACEHOLDER')",
      autocomplete="recovery-code",
      :id="`code-input-${_uid}`",
      :disabled="disabled",
      v-model="inputValue",
      :class="classes",
      name="code",
      type="text",
      required
    )

    small {{ $t('HELP') }}
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
