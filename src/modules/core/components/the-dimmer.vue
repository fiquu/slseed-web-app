<template lang="pug">
transition(name="dimmer-fade")
  .ui.active.inverted.dimmer(
    v-show="loading || dim"
    :key="Date.now()"
    )

    .ui.big.loader
      img(src='/static/images/navbar-icon.png')
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  loading: boolean;
  dim: boolean;
}

export default Vue.extend<Data, unknown, unknown>({
  data() {
    return {
      loading: false,
      dim: true
    };
  },

  watch: {
    ['$session.loading']: {
      handler(loading: boolean): void {
        this.loading = loading;
      }
    }
  },

  created(): void {
    this.$router.beforeEach((to, from, next) => {
      this.dim = true;
      next();
    });

    this.$router.afterEach(() => {
      this.dim = false;
    });
  }
});
</script>

<style lang="sass" scoped>
@import @/styles/_colors

.ui.active.dimmer
  background-color: transparentize($pageBackground, 0.1)
  position: fixed

  &.dimmer-fade-enter,
  &.dimmer-fade-leave-to
    opacity: 0 !important

    > .ui.loader
      opacity: 0 !important

  &.dimmer-fade-enter-active,
  &.dimmer-fade-leave-active
    transition-timing-function: ease-in-out
    transition-property: opacity
    transition-duration: 300ms
    transition-delay: 300ms

    > .ui.loader
      transition-timing-function: ease-in-out
      transition-property: opacity
      transition-duration: 400ms
      transition-delay: 1.2s

  &.dimmer-fade-leave-active
    transition-delay: 0.1s

    > .ui.loader
      transition-delay: 0

  > .ui.loader
    color: $primaryColor

    &:before
      border-color: transparentize($primaryColor, 0.5) !important

    &:after
      border-color: $primaryColor

    > img
      display: inline-block
      margin-top: 0.65em
      margin-left: 0
      height: auto
      width: 2rem
</style>
