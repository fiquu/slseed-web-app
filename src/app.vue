<i18n>
en:
  MESSAGES:
    SIGNED_OUT: Come back soon!
</i18n>

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

interface ComponentData {
  loading: boolean;
  dim: boolean;
}

export default Vue.extend({
  components: {
    TheSidebar,
    TheDimmer,
    TheViews
  },

  data(): ComponentData {
    return {
      loading: true,
      dim: true
    };
  },

  computed: {
    signedIn(): boolean {
      if (!this.$session.signedIn) {
        this.$toast.success(this.$t('MESSAGES.SIGNED_OUT'));
      }

      return this.$session.signedIn;
    }
  },

  mounted(): void {
    this.$session.$on('update', () => {
      this.loading = this.$session.loading;
      this.dim = this.$session.loading;
    });

    this.$session.$on('signed-out', (signIn: string) => {
      this.$toast.success(this.$t('MESSAGES.SIGNED_OUT'));

      if (this.$route.meta.requiresAuth) {
        this.$router.replace(signIn);
      }
    });

    this.$router.beforeEach((to, from, next) => {
      this.dim = true;
      next();
    });

    this.$router.afterEach(() => {
      this.dim = false;
    });

    this.loading = false;
  }
});
</script>

<style src="@/styles/_breakpoints.sass" lang="sass"></style>
<style src="@/styles/_transitions.sass" lang="sass"></style>
<style src="@/styles/_dimmer.sass" lang="sass"></style>
<style src="@/styles/_site.sass" lang="sass"></style>
<style lang="sass" scoped>
main#app
  overflow: hidden
  height: 100vh
  width: 100vw
</style>
