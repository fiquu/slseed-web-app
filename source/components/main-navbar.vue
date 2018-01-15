<template lang="pug">
header.ui.fixed.top.compact.menu
  a.item(
    v-if=`$route.path !== '/dashboard' && $auth.isSignedIn()`
    href='#/dashboard'
    )

    i.chevron.left.icon

  .header.item
    img(src='/static/images/navbar-icon.png')
    span &ensp;{{ title }}

  .right.menu
    .item(v-if=`$auth.isSignedIn()`)
      | {{ $auth.get('name') }}

    a.item(
      v-if=`$auth.isSignedIn()`
      @click='$auth.signOut()'
      )

      i.sign.out.icon
      span(v-t=`'SIGN_OUT'`)
</template>

<script>
export default {
  name: 'main-navbar',

  data() {
    return {
      title: process.app.short
    };
  }
};
</script>
