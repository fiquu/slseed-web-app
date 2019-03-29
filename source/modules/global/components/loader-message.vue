<template lang="pug">
.ui.icon.message
  span.ui.active.inverted.mini.inline.loader
  span(v-text="message")
</template>

<script>
export default {
  props: {
    message: {
      required: true,
      type: String
    }
  }
};
</script>

<style lang="sass" scoped>
span.ui.active.inverted.mini.inline.loader
  margin-right: 0.5rem;
  margin-top: -0.1rem; // Visual align fix
</style>
