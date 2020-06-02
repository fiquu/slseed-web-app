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

  .header.item
    img(src='/static/images/navbar-icon.png')
    | {{ title }}

  .right.menu.mobile.tablet.only
    a.item(
      @click.stop="$emit('toggle-the-sidebar')"
      v-if="$session.signedIn"
      role="button"
      )

      i.bars.icon

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

interface Data {
  title: string;
}

export default Vue.extend<Data, unknown, unknown>({
  name: 'TheNavbar',

  data() {
    return {
      title: String(process.env.VUE_APP_SHORT)
    };
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
</style>
