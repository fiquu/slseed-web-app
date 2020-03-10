<i18n>
en:
  MESSAGES:
    SIGNED_OUT: Come back soon!
</i18n>

<template lang="pug">
main#app
  transition(name="dimmer-fade")
    .ui.active.inverted.dimmer(v-if="dim")
      img.ui.mini.image(
        src="/static/images/navbar-icon.png"
        v-show="loading"
        )

      .ui.huge.loader(v-show="loading")

  transition
    navbar(v-if="!loading")

  transition(
    name="component-fade"
    mode="out-in"
    )

    router-view.router-view(v-if="!loading")
</template>

<script lang="ts">
import Navbar from '@/modules/core/components/navbar.vue';
import Vue from 'vue';

export default Vue.extend({
  components: {
    Navbar
  },

  data() {
    return {
      loading: false,
      dim: false
    };
  },

  computed: {
    signedIn(): boolean {
      if (!this.$session.signedIn) {
        this.$toast.success(this.$t('MESSAGES.SIGNED_OUT'));
      }

      return this.$session.signedIn;
    }
  },

  created() {
    // This.$auth.$on('update', () => {
    //   This.loading = this.$auth.loading;
    //   This.dim = this.$auth.loading;
    // });

    // This.$auth.$on('signedOut', () => {
    //   This.$toast.success(this.$t('MESSAGES.SIGNED_OUT'));
    // });

    // This.$router.beforeEach((to, from, next) => {
    //   This.dim = true;
    //   Next();
    // });

    // This.$router.afterEach(() => {
    //   This.dim = false;
    // });

    // This.loading = false;
  }
});
</script>

<style lang="sass">
@import @/styles/_colors

html,
body
  background: $pageBackground
</style>

<style lang="sass" scoped>
main#app
  flex-direction: column
  display: flex
  height: 100vh
  width: 100vw

  > .router-view
    overflow-y: scroll
    flex: 1
</style>

<style lang="sass">
// Global component fade transition
.component-fade-enter-active,
.component-fade-leave-active
  transition: opacity 100ms ease

.component-fade-enter,
.component-fade-leave-to
  opacity: 0 !important

// Global list transitions
.list-enter-active,
.list-leave-active
  transition-property: width, opacity, transform
  transition-timing-function: ease
  transition-duration: 300ms

.list-enter,
.list-leave-to
  opacity: 0 !important
  width: 1px !important

// Global List transition styles
.list-item
  transition-property: width, opacity, transform
  transition-timing-function: ease
  transition-duration: 300ms

.list-item-enter,
.list-item-leave-to
  transform: translateY(3rem) !important
  opacity: 0 !important

.list-item-leave-active
  position: absolute !important
</style>

<style lang="sass" scoped>
@import @/styles/_colors

.ui.inverted.dimmer
  background-color: transparentize($pageBackground, 0.1)

  .ui.loader
    color: $primaryColor

    &:after
      border-color: transparentize($primaryColor, 0.75) transparent transparent

    &:before
      border-color: transparentize($primaryColor, 0.85)

.dimmer-fade-enter-active,
.dimmer-fade-leave-active
  transition: opacity 300ms ease !important

.dimmer-fade-enter,
.dimmer-fade-leave-to
  opacity: 0 !important
</style>
