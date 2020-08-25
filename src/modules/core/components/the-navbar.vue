<i18n>
en:
  HOME: Home
  USERS: Users
  NOT_FOUND: Not Found
  SIGN_OUT: Sign out
es:
  HOME: Inicio
  USERS: Usuarios
  NOT_FOUND: No Encontrado
  SIGN_OUT: Salir
</i18n>

<template lang="pug">
p-menubar.p-shadow-2(:model="items")
  template(#start)
    img.p-mr-2(src="/static/images/navbar-icon.png")
</template>

<script lang="ts">
import Vue from 'vue';

interface Computed {
  username: string | undefined;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  items: any[];
}

export default Vue.extend<unknown, unknown, Computed>({
  name: 'TheNavbar',

  computed: {
    username() {
      return this.$session.data.name;
    },

    items() {
      return [{
        label: this.$t('HOME'),
        icon: 'pi pi-home',
        to: '/'
      }, {
        label: this.$t('USERS'),
        icon: 'pi pi-users',
        to: '/users',
        visible: () => this.$session.signedIn
      }, {
        label: this.$t('NOT_FOUND'),
        icon: 'pi pi-ban',
        to: '/no-a-real-route-path',
        visible: () => this.$session.signedIn
      }, {
        separator: true,
        visible: () => this.$session.signedIn
      }, {
        label: this.username,
        disabled: true,
        icon: 'pi pi-user',
        visible: () => this.$session.signedIn
      }, {
        label: this.$t('SIGN_OUT'),
        icon: 'pi pi-sign-out',
        command: () => this.$session.signOut(),
        visible: () => this.$session.signedIn
      }];
    }
  }
});
</script>

<style lang="sass" scoped>
.p-menubar
  position: relative
  background: white
  border-radius: 0
  border: 0

  a
    text-decoration: none

  img
    height: 1.75em
    width: auto
</style>
