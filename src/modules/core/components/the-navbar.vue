<i18n>
en:
  DASHBOARD: Dashboard
  NAVIGATION: Navigation
  USERS: Users
  NOT_FOUND: Not Found
  SIGN_OUT: Sign out
es:
  DASHBOARD: Tablero
  NAVIGATION: Navegación
  USERS: Usuarios
  NOT_FOUND: No Encontrado
  SIGN_OUT: Salir
</i18n>

<template lang="pug">
el-menu(default-active="home", mode="horizontal", router)
  el-menu-item(index="home")
    el-avatar(
      src="/static/images/navbar-icon.png",
      :alt="$t('DASHBOARD')",
      size="small"
    )
    | {{ title }}

  el-submenu(v-if="$session.signedIn", index="navigation")
    template(#title) {{ $t('NAVIGATION') }}

    el-menu-item(index="/dashboard")
      i.el-icon-odometer
      | {{ $t('DASHBOARD') }}

    el-menu-item(index="/users")
      i.el-icon-user
      | {{ $t('USERS') }}

    el-menu-item(index="/not-a-valid-route")
      i.el-icon-warning-outline
      | {{ $t('NOT_FOUND') }}

  el-menu-item(v-if="$session.signedIn", disabled)
    i.el-icon-user
    | {{ $session.data.name }}

  el-menu-item(v-if="$session.signedIn", @click="$session.signOut()")
    i.el-icon-switch-button
    | {{ $t('SIGN_OUT') }}
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  name: 'TheNavbar',

  data() {
    return {
      title: String(process.env.VUE_APP_SHORT)
    };
  }
});
</script>

<style lang="sass" scoped>
.el-menu
  .el-avatar
    margin-right: 0.5em
</style>
