<i18n>
en:
  SIGN_OUT: Sign out
es:
  SIGN_OUT: Salir
</i18n>

<template lang="pug">
.p-menubar.p-shadow-2
  router-link.p-button.p-button-text.p-button-plain.p-menuitem(
    :class="backButtonClass",
    v-if="$session.signedIn",
    to="/"
  )
    .p-menuitem-icon
      i.pi.pi-chevron-left

  router-link.p-button.p-button-text.p-button-plain.p-menuitem(to="/")
    .p-button-icon.p-mr-2
      img(src="/static/images/navbar-icon.png")
    .p-button-label {{ title }}

  .p-menuitem(v-if="$session.signedIn")
    .p-menuitem-text {{ $session.data.name }}
    .p-menuitem-icon
      i.user.circle.icon

  .p-button.p-button-plain.p-menuitem(
    @click="$session.signOut()",
    v-if="$session.signedIn"
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
.p-menubar
  position: relative
  background: white
  border-radius: 0

  a
    text-decoration: none

  img
    height: 1.5em
    width: auto
</style>
