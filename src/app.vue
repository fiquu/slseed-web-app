<i18n>
en:
  SESSION:
    ERROR: Couldn't resolve session
</i18n>

<template lang="pug">
main#app.p-d-flex
  the-views

  the-dimmer
</template>

<script lang="ts">
import Vue from 'vue';

import TheDimmer from '@/modules/core/components/the-dimmer.vue';
import TheViews from '@/modules/core/components/the-views.vue';

export default Vue.extend({
  components: {
    TheDimmer,
    TheViews
  },

  created() {
    this.$session.$on('error', () => {
      this.$toast.add({
        summary: this.$t('SESSION.ERROR'),
        severity: 'error'
      });
    });
  }
});
</script>

<style src="reset-css/reset.css"></style>
<style src="primevue/resources/primevue.min.css"></style>
<style src="primeflex/primeflex.min.css"></style>
<style src="primeicons/primeicons.css"></style>

<style src="primevue/resources/themes/saga-green/theme.css"></style>
<style src="./styles/transitions.sass" lang="sass"></style>

<style lang="sass">
@import url("https://fonts.googleapis.com/css2?family=Lato:wght@400;700&display=swap")
@import @/styles/variables

body
  font-family: $fontFamily
  background: #f7f7f6
</style>

<style lang="sass" scoped>
main#app
  user-select: none
  overflow: hidden
  height: 100vh
  width: 100vw

  .selectable
    user-select: auto
</style>
