<i18n>
en:
  LINKS:
    DASHBOARD: Dashboard
    USERS: Users
    THEME: Theme
    NOT_FOUND: Not Found
    SIGN_OUT: Sign Out
</i18n>

<template lang="pug">
nav.ui.menu(v-if="$session.signedIn")
  .ui.header.item.mobile.tablet.only
    img.ui.tiny.image(src='/static/images/navbar-icon.png')
    | {{ title }}

  sidenav-link(
    :text="$t('LINKS.DASHBOARD')"
    icon="dashboard"
    to="/dashboard"
    )

  sidenav-link(
    :text="$t('LINKS.USERS')"
    icon="users"
    to="/users"
    )

  sidenav-link(
    :text="$t('LINKS.THEME')"
    icon="brush"
    to="/theme"
    )

  sidenav-link(
    :text="$t('LINKS.NOT_FOUND')"
    icon="meh"
    to="/not-found"
    )

  .divider.item

  .item(v-if="$session.signedIn && $session.loaded")
    i.user.circle.icon
    | {{ $session.data.name }}

  a.link.item(
    @click="$session.signOut()"
    v-if="$session.signedIn"
    role="button"
    )

    i.sign.out.icon
    | {{ $t('LINKS.SIGN_OUT') }}
</template>

<script>
import Vue from 'vue';

import SidenavLink from './link.vue';

export default Vue.extend({
  components: {
    SidenavLink
  },

  data() {
    return {
      title: process.env.VUE_APP_SHORT
    };
  }
});
</script>

<style lang="sass" scoped>
nav.ui.menu
  flex-direction: column
  display: flex
  z-index: 0

  > .ui.header.item
    > img.ui.mini.image
      margin-right: 0.5rem

  .divider
    flex: 1
</style>
