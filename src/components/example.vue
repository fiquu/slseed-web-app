<template lang="pug">
.ui.icon.message
  span.ui.active.inverted.mini.inline.loader
  slot
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({});
</script>

<style lang="sass" scoped>
span.ui.active.inverted.mini.inline.loader
  margin-right: 0.5rem
  margin-top: -0.1rem // Visual align fix
</style>
