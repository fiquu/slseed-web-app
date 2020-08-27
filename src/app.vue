<i18n>
en:
  SESSION:
    ERROR: Couldn't resolve session. Please check your internet connection.
</i18n>

<template lang="pug">
el-container#app.select-none.overflow-hidden.w-screen.h-screen
  el-header
    the-update-notification
    the-navbar

  .flex.flex-1.flex-col.overflow-y-hidden
    transition(name="el-fade-in-linear", mode="out-in")
      router-view.flex-1.overflow-y-scroll(:key="$route.fullPath")

  the-footer
</template>

<script lang="ts">
import Vue from 'vue';

import TheUpdateNotification from '@/modules/core/components/the-update-notification.vue';
import TheFooter from '@/modules/core/components/the-footer.vue';
import TheNavbar from '@/modules/core/components/the-navbar.vue';

export default Vue.extend({
  components: {
    TheUpdateNotification,
    TheFooter,
    TheNavbar
  },

  created() {
    this.$session.$on('error', () => {
      this.$message.error(this.$t('SESSION.ERROR').toString());
    });
  }
});
</script>

<style src="element-ui/lib/theme-chalk/display.css"></style>
<style src="tailwindcss/dist/utilities.min.css"></style>

<style src="@/styles/theme.css"></style>

<style lang="sass">
body
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif
  background: #f7f7f6
  padding: 0
  margin: 0
</style>

<style lang="sass" scoped>
#app
  .el-header
    padding: 0 !important
</style>
