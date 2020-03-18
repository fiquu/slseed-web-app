<i18n>
es:
  NO_TUTORIAL: El tutorial estará disponible proximamente.
</i18n>

<template lang="pug">
section.views
  the-navbar(@toggle-the-sidebar="$emit('toggle-the-sidebar')")

  section.ui.fluid.contents.container
    the-sidenav.left.fixed.vertical.tablet.or.lower.hidden(v-if="showSidenav")

    transition(
      name="component-fade"
      mode="out-in"
      )

      router-view.view(:key="$route.fullPath")

  the-footer
</template>

<script lang="ts">
import Vue from 'vue';

import TheSidenav from './the-sidenav/index.vue';
import TheFooter from './the-footer.vue';
import TheNavbar from './the-navbar.vue';

export default Vue.extend({
  components: {
    TheSidenav,
    TheFooter,
    TheNavbar
  },

  computed: {
    showSidenav(): boolean {
      // Return this.$session.signedIn;
      return true;
    }
  }
});
</script>

<style lang="sass" scoped>
section.views
  flex-direction: column
  overflow: hidden
  display: flex
  height: 100%
  width: 100%

  > header
    flex: 0 0 auto

  > section.contents
    display: flex
    // height: 100%
    overflow: hidden
    flex: 1

    > nav.ui.left.fixed.menu
      position: static
      box-shadow: none

    > section.view
      overflow-y: scroll
      flex: 1

      &.ui.segment
        margin-top: 0

      ::v-deep > .ui.grid
        margin: 0
</style>
