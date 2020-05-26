<template lang="pug">
the-sidenav.ui.overlay.left.vertical.sidebar(v-if="$session.signedIn")
</template>

<script lang="ts">
import Vue from 'vue';

import TheSidenav from './the-sidenav/index.vue';

interface Methods {
  /**
   * Toggles the sidebar open state.
   */
  toggle(): void;
}

export default Vue.extend<{}, Methods, {}>({
  components: {
    TheSidenav
  },

  mounted() {
    this.$$(this.$el).sidebar({
      context: '#app'
    });

    this.$router.beforeEach((to, from, next) => {
      this.$$(this.$el).sidebar('hide');
      next();
    });
  },

  methods: {
    toggle() {
      this.$$(this.$el).sidebar('toggle');
    }
  }
});
</script>

<style lang="sass" scoped>
.ui.overlay.left.sidebar
  z-index: 1000
</style>
