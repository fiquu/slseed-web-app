<template lang="pug">
div
  label(
    :for="_uid"
    v-if="label"
    )

    | {{ label }}

  input(
    @input="$emit('input', $event.target.value)"
    :placeholder="placeholder"
    :required="required"
    :disabled="disabled"
    :value="value"
    :type="type"
    :name="name"
    :id="_uid"
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
    name: {
      type: String,
      default: null
    }
  }
});
</script>
