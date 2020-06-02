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
    icon="dashboard"
    to="/dashboard"
    )

    | {{ $t('LINKS.DASHBOARD') }}

  sidenav-link(
    icon="users"
    to="/users"
    )

    | {{ $t('LINKS.USERS') }}

  sidenav-link(
    icon="brush"
    to="/theme"
    )

    | {{ $t('LINKS.THEME') }}

  sidenav-link(
    icon="meh"
    to="/not-found"
    )

    | {{ $t('LINKS.NOT_FOUND') }}

  .divider.item

  .item(v-if="$session.signedIn && $session.loaded")
    i.user.circle.icon
    | {{ $session.data.name }}

  a.link.item(
    @click="$session.signOut()"
    v-if="$session.signedIn"
    role="button"
    href=""
    )

    i.sign.out.icon
    | {{ $t('LINKS.SIGN_OUT') }}
</template>

<script lang="ts">
import Vue from 'vue';

import SidenavLink from './link.vue';

interface Data {
  title: string;
}

export default Vue.extend<Data, unknown, unknown>({
  components: {
    SidenavLink
  },

  data() {
    return {
      title: String(process.env.VUE_APP_SHORT)
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
