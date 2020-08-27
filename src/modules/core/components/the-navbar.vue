<i18n>
en:
  MENU: Menu
  DASHBOARD: Dashboard
  NAVIGATION: Navigation
  USERS: Users
  NOT_FOUND: Not Found
  SIGN_OUT: Sign out
es:
  MENU: Menú
  DASHBOARD: Tablero
  NAVIGATION: Navegación
  USERS: Usuarios
  NOT_FOUND: No Encontrado
  SIGN_OUT: Salir
</i18n>

<template lang="pug">
el-menu(mode="horizontal", router)
  el-menu-item(index="/dashboard")
    el-avatar(
      src="/static/images/navbar-icon.png",
      :alt="$t('DASHBOARD')",
      size="small"
    )
    | {{ title }}

  el-submenu.hidden-xs-only(v-if="$session.signedIn", index="navigation")
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

  el-menu-item.hidden-xs-only(v-if="$session.signedIn", disabled)
    i.el-icon-user
    | {{ $session.data.name }}

  el-menu-item.hidden-xs-only(
    @click="$session.signOut()",
    v-if="$session.signedIn"
  )
    i.el-icon-switch-button
    | {{ $t('SIGN_OUT') }}

  el-menu-item.hidden-sm-and-up.float-right(
    @click="showDrawer = true",
    v-if="$session.signedIn"
  )
    i.el-icon-menu

  el-drawer(:visible.sync="showDrawer", :title="$t('MENU')", size="75%")
    el-menu(router)
      el-menu-item(index="/dashboard")
        i.el-icon-odometer
        | {{ $t('DASHBOARD') }}

      el-menu-item(index="/users")
        i.el-icon-user
        | {{ $t('USERS') }}

      el-menu-item(index="/not-a-valid-route")
        i.el-icon-warning-outline
        | {{ $t('NOT_FOUND') }}

      el-divider

      el-menu-item(disabled)
        i.el-icon-user
        | {{ $session.data.name }}

      el-menu-item(@click="signOut()")
        i.el-icon-switch-button
        | {{ $t('SIGN_OUT') }}
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  showDrawer: boolean;
  title: string;
}

interface Methods {
  signOut(): void;
}

export default Vue.extend<Data, Methods, unknown>({
  name: 'TheNavbar',

  data() {
    return {
      title: String(process.env.VUE_APP_SHORT),
      showDrawer: false
    };
  },

  mounted() {
    this.$router.beforeEach((from, to, next) => {
      this.showDrawer = false;
      next();
    });
  },

  methods: {
    signOut() {
      this.$session.signOut();
      this.showDrawer = false;
    }
  }
});
</script>

<style lang="sass" scoped>
.el-menu
  .el-avatar
    margin-right: 0.5em

  .float-right
    float: right !important

  .el-drawer__header
    > :first-child::focus
      outline: 0
</style>
