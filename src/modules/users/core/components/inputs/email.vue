<i18n>
en:
  PLACEHOLDER: Enter your email...
  LABEL: Email
</i18n>

<template lang="pug">
validation-provider(v-slot="{ classes }", rules="required|min:6|email", slim)
  .p-field(:class="classes")
    label(:for="`email-input-${_uid}`")
      | {{ $t('LABEL') }}

    p-input-text(
      :placeholder="$t('PLACEHOLDER')",
      :id="`email-input-${_uid}`",
      autocomplete="username",
      :disabled="disabled",
      v-model="inputValue",
      :label="$t('LABEL')",
      :class="classes",
      name="email",
      type="email",
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
