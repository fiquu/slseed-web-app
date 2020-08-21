<template lang="pug">
validation-provider(v-slot="{ classes }", :rules="rules", slim)
  .p-field(:class="classes")
    label(:for="`form-input-${_uid}`", v-if="label")
      | {{ label }}

    component(
      :id="`form-input-${_uid}`",
      :placeholder="placeholder",
      v-model="inputValue",
      :required="required",
      :disabled="disabled",
      :class="classes",
      :is="inputType",
      :type="type",
      :name="name"
    )
</template>

<script lang="ts">
import Vue from 'vue';

interface Computed {
  inputValue: string | number;
}

interface Props {
  value: string | number;
  placeholder: string;
  inputType: string;
  disabled: boolean;
  required: boolean;
  label: string;
  rules: string;
  type: string;
  name: string;
}

export default Vue.extend<unknown, unknown, Computed, Props>({
  props: {
    disabled: {
      type: Boolean
    },
    label: {
      type: String,
      default: null
    },
    placeholder: {
      type: String,
      default: null
    },
    inputType: {
      type: String,
      default: 'p-input-text'
    },
    type: {
      type: String,
      default: 'text'
    },
    required: {
      type: Boolean
    },
    name: {
      type: String,
      default: null
    },
    value: {
      type: [String, Number],
      required: true
    },
    rules: {
      type: String,
      default: ''
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
