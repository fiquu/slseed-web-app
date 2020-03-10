<i18n>
en:
  SIGN_OUT: Sign out
</i18n>

<template lang="pug">
header.ui.fixed.top.compact.menu
  router-link.item(
    v-if="$route.path !== '/dashboard'"
    to='/'
    )

    i.home.icon

  .header.item
    img(src='/static/images/navbar-icon.png')
    | {{ title }}

  .right.menu
    .item(v-if="$session.signedIn")
      i.user.circle.icon

    a.item(
      @click="$session.signOut()"
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

  .header.item
    img
      margin-right: 1rem
</style>
