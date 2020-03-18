<template lang="pug">
transition(
  name="dimmer-fade"
  mode="out-in"
  )

  .ui.active.inverted.dimmer(v-if="!$session.loaded")
    .ui.big.loader
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>

<style lang="sass" scoped>
@import '@/styles/_colors'

.ui.inverted.dimmer
  > .ui.loader
    &:before
      border-color: transparentize($primaryColor, 0.5) !important

    &:after
      border-color: $primaryColor

    > svg
      display: inline-block
      margin-top: 0.2em
      margin-left: 0
      width: 3.25rem
      height: auto
</style>
