<i18n>
en:
  SESSION:
    ERROR: Couldn't resolve session
</i18n>

<template lang="pug">
main#app
  the-update-notification

  the-views

  the-dimmer
</template>

<script lang="ts">
import '../semantic/dist/semantic.min.js';

import Vue from 'vue';

import TheUpdateNotification from './modules/core/components/the-update-notification.vue';
import TheDimmer from '@/modules/core/components/the-dimmer.vue';
import TheViews from '@/modules/core/components/the-views.vue';

export default Vue.extend({
  components: {
    TheUpdateNotification,
    TheDimmer,
    TheViews
  },

  created() {
    this.$session.$on('error', () => {
      this.$toast.error(this.$t('SESSION.ERROR'));
    });
  }
});
</script>

<style src="../semantic/dist/semantic.min.css"></style>
<style src="@/styles/_breakpoints.sass" lang="sass"></style>
<style src="@/styles/_transitions.sass" lang="sass"></style>
<style src="@/styles/_site.sass" lang="sass"></style>
<style lang="sass" scoped>
main#app
  user-select: none
  overflow: hidden
  height: 100vh
  width: 100vw

  .selectable
    user-select: auto
</style>
