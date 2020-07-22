<i18n>
es:
  NO_TUTORIAL: El tutorial estará disponible proximamente.
</i18n>

<template lang="pug">
section.views
  the-update-notification
  the-navbar

  section.ui.fluid.contents.container
    the-nav-menu.left.fixed.vertical.tablet.or.lower.hidden(
      v-if="$session.signedIn"
    )

    transition(name="component-fade", mode="out-in")
      router-view.view(:key="$route.fullPath")

  the-footer-nav.mobile.tablet.only(v-show="$session.signedIn")

  the-footer
</template>

<script lang="ts">
import Vue from 'vue';

import TheUpdateNotification from './the-update-notification.vue';
import TheNavMenu from './the-nav-menu/index.vue';
import TheFooterNav from './the-footer-nav.vue';
import TheFooter from './the-footer.vue';
import TheNavbar from './the-navbar.vue';

export default Vue.extend({
  name: 'TheViews',

  components: {
    TheUpdateNotification,
    TheFooterNav,
    TheNavMenu,
    TheFooter,
    TheNavbar
  }
});
</script>

<style lang="sass" scoped>
section.views
  flex-direction: column
  overflow: hidden
  display: flex
  height: 100vh
  width: 100vw

  > header
    flex: 0 0 auto

  > section.contents
    overflow: hidden
    flex: 1 1 100%
    display: flex

    > nav.ui.left.fixed.menu
      position: static
      box-shadow: none
      flex: 0 0 auto

    > section.view
      overflow-y: scroll
      flex: 1 1 auto

      &.ui.segment
        margin-top: 0

      ::v-deep > .ui.grid
        margin: 0

  > footer
    flex: 0 0 auto
</style>
