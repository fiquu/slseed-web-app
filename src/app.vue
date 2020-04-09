<template lang="pug">
main#app
  the-sidebar(ref="sidebar")

  the-views.pusher(@toggle-the-sidebar="$refs.sidebar.toggle()")

  the-dimmer
</template>

<script lang="ts">
import Vue from 'vue';

import TheSidebar from '@/modules/core/components/the-sidebar.vue';
import TheDimmer from '@/modules/core/components/the-dimmer.vue';
import TheViews from '@/modules/core/components/the-views.vue';

export default Vue.extend({
  components: {
    TheSidebar,
    TheDimmer,
    TheViews
  }
});
</script>

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
