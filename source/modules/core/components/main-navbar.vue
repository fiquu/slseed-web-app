<i18n>
en:
  SIGN_OUT: Sign out
</i18n>

<template lang="pug">
header.ui.fixed.top.compact.menu
  router-link.item(
    v-if="$route.path !== '/dashboard' && $auth.isSignedIn()"
    to='/dashboard'
    )

    i.chevron.left.icon

  .header.item
    img(src='/static/images/navbar-icon.png')
    | &ensp;{{ title }}

  .right.menu
    .item(
      v-text="$auth.get('name')"
      v-if="$auth.isSignedIn()"
      )

    a.item(
      v-if="$auth.isSignedIn()"
      @click="$auth.signOut"
      )

      i.sign.out.icon
      | {{ $t('SIGN_OUT') }}
</template>

<script>
export default {
  name: 'main-navbar',

  data() {
    return {
      title: process.env.VUE_APP_SHORT
    };
  }
};
</script>
