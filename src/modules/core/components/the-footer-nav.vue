<i18n>
en:
  TITLE: Navigation
</i18n>

<template lang="pug">
.ui.bottom.fixed.menu
  router-link.icon.item(
    :class="{ disabled: $route.path === '/dashboard' }",
    to="/"
  )
    i.chevron.left.icon

  .fluid.disabled.item
    strong {{ $t('TITLE') }}

  .ui.floating.dropdown.icon.item(
    v-show="$session.signedIn",
    ref="dropdown",
    role="button"
  )
    i.bars.icon

    the-nav-menu.vertical.transition.hidden
</template>

<script lang="ts">
import Vue from 'vue';

import TheNavMenu from '../components/the-nav-menu/index.vue';

export default Vue.extend({
  name: 'TheFooterNav',

  components: {
    TheNavMenu
  },

  mounted() {
    this.$$(this.$refs.dropdown).dropdown({
      action: 'hide'
    });
  }
});
</script>

<style lang="sass" scoped>
.ui.fixed.bottom.menu
  position: static

  .fluid.item
    text-transform: uppercase
    justify-content: center
    font-size: 0.7em
    flex: 1

  .ui.dropdown.item
    .menu
      margin-right: 0.5rem !important
</style>
