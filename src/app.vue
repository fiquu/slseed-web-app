<i18n>
en:
  SESSION:
    ERROR:
      TITLE: Couldn't resolve session.
      BODY: Please check your internet connection.
</i18n>

<template lang="pug">
main#app.p-d-flex.p-flex-column
  the-update-notification
  the-navbar

  section.p-d-flex.p-flex-column.router-view-container
    transition(name="component-fade", mode="out-in")
      router-view.router-view(:key="$route.fullPath")

  the-footer

  p-toast
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
      this.$toast.add({
        summary: this.$t('SESSION.ERROR.TITLE'),
        detail: this.$t('SESSION.ERROR.BODY'),
        severity: 'error',
        life: 5000
      });
    });
  }
});
</script>

<style src="normalize.css/normalize.css"></style>
<style src="primevue/resources/primevue.min.css"></style>
<style src="primeflex/primeflex.min.css"></style>
<style src="primeicons/primeicons.css"></style>

<style src="@/styles/transitions.sass" lang="sass"></style>
<style src="@/styles/overrides.sass" lang="sass"></style>
<style src="@/styles/theme.sass" lang="sass"></style>

<style lang="sass">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap")
@import @/styles/variables

body
  background: $backgroundColor
  font-family: $fontFamily
  padding: 0
  margin: 0
</style>

<style lang="sass" scoped>
main#app
  user-select: none
  overflow: hidden
  height: 100vh
  width: 100vw

  .router-view-container
    overflow-y: hidden
    flex: 1

    .router-view
      overflow-y: scroll
      flex: 1

  .selectable
    user-select: auto
</style>
