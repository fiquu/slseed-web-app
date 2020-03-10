<i18n>
en:
  SIGN_OUT: Sign out
</i18n>

<template lang="pug">
header.ui.fixed.top.compact.menu
  router-link.item(
    v-if="$route.path !== '/dashboard' && $session.signedIn"
    to='/dashboard'
    )

    i.chevron.left.icon

  .header.item
    img(src='/static/images/navbar-icon.png')
    | &ensp;{{ title }}

  .right.menu
    .item(v-if="$session.signedIn")
      i.user.circle.icon

    a.item(
      @click="$auth.signOut(false)"
      v-if="$session.signedIn"
      role="button"
      )

      i.sign.out.icon
      | {{ $t('SIGN_OUT') }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'MainNavbar',

  data() {
    return {
      title: process.env.VUE_APP_SHORT
    };
  }
});
</script>

<style lang="sass" scoped>
header.ui.fixed.top.compact.menu
  position: static
</style>
