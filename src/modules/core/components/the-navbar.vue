<i18n>
en:
  SIGN_OUT: Sign out
es:
  SIGN_OUT: Salir
</i18n>

<template lang="pug">
p-toolbar.p-shadow-1
  template(#left)
    router-link.p-button.p-button-text.p-button-plain(
      :class="backButtonClass",
      v-if="$session.signedIn",
      to="/"
    )
      i.pi.pi-chevron-left

    router-link.p-button.p-button-text.p-button-plain(to="/")
      .p-button-icon.p-mr-2
        img(src="/static/images/navbar-icon.png")
      .p-button-label {{ title }}

  template(#right)
    .right.menu.tablet.or.lower.hidden(v-if="$session.signedIn")
      .disabled.item
        i.user.circle.icon
        | {{ $session.data.name }}

      a.item(
        @click="$session.signOut()",
        v-if="$session.signedIn",
        role="button",
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

interface Computed {
  backButtonClass(): { disabled: boolean }
}

export default Vue.extend<Data, unknown, unknown>({
  name: 'TheNavbar',

  data() {
    return {
      title: String(process.env.VUE_APP_SHORT)
    };
  },

  computed: {
    backButtonClass() {
      return {
        disabled: this.$route.path === '/dashboard'
      };
    }
  }
});
</script>

<style lang="sass" scoped>
.p-toolbar
  background: white
  border-radius: 0

  a
    text-decoration: none

  img
    height: 1.5em
    width: auto
</style>
