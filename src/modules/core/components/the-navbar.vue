<i18n>
en:
  SIGN_OUT: Sign out
</i18n>

<template lang="pug">
header.ui.fixed.top.compact.menu
  router-link.item(
    :class="{ disabled: $route.path === '/dashboard' }"
    v-if="$session.signedIn"
    to='/'
    )

    i.chevron.left.icon

  router-link.header.item(to='/')
    img(src='/static/images/navbar-icon.png')
    | {{ title }}

  .right.menu.mobile.tablet.only(v-show="$session.signedIn")
    a.ui.dropdown.icon.item(
      role="button"
      ref="menu"
      )

      i.bars.icon

      the-sidenav.transition.hidden

  .right.menu.tablet.or.lower.hidden
    .item(v-if="$session.signedIn && $session.loaded")
      i.user.circle.icon
      | {{ $session.data.name }}

    a.item(
      @click="$session.signOut()"
      v-if="$session.signedIn"
      role="button"
      href=""
      )

      i.sign.out.icon
      | {{ $t('SIGN_OUT') }}
</template>

<script lang="ts">
import Vue from 'vue';

import TheSidenav from './the-sidenav/index.vue';

interface Data {
  title: string;
}

export default Vue.extend<Data, unknown, unknown>({
  name: 'TheNavbar',

  components: {
    TheSidenav
  },

  data() {
    return {
      title: String(process.env.VUE_APP_SHORT)
    };
  },

  mounted() {
    this.$$(this.$refs.menu).dropdown('hide');
  }
});
</script>

<style lang="sass" scoped>
header.ui.fixed.top.compact.menu
  position: static

  > button
    border: 0

  .header.item
    img
      margin-right: 1rem

  .ui.inline.popup
    padding: 0

    .menu
      box-shadow: none
      border: 0
</style>
