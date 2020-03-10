<template lang="pug">
div
  label(
    :for="`form-input-${_uid}`"
    v-if="label"
    )

    | {{ label }}

  input(
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
    :id="`form-input-${_uid}`"
    :required="required"
    :disabled="disabled"
    :value="value"
    :type="type"
    :name="name"
    )
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
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
    }
  }
});
</script>
