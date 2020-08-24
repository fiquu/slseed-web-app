<i18n>
en:
  PLACEHOLDER: Create your new password...
  LABEL: New Password
  PROMPT_LABEL: Enter a password...
  WEAK_LABEL: Too weak...
  MEDIUM_LABEL: Fair...
  STRONG_LABEL: Perfect!
</i18n>

<template lang="pug">
validation-provider(v-slot="{ classes }", rules="required|min:8", slim)
  .p-field(:class="classes")
    label(:for="`new-password-input-${_uid}`")
      | {{ $t('LABEL') }}

    p-password(
      :id="`new-password-input-${_uid}`",
      :prompt-label="$t('PROMPT_LABEL')",
      :medium-label="$t('MEDIUM_LABEL')",
      :strong-label="$t('STRONG_LABEL')",
      :placeholder="$t('PLACEHOLDER')",
      :weak-label="$t('WEAK_LABEL')",
      autocomplete="new-password",
      :disabled="disabled",
      v-model="inputValue",
      name="new-password",
      :class="classes",
      required
    )
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
