<i18n>
en:
  MESSAGES:
    SIGNED_OUT: Come back soon!
</i18n>

<template lang="pug">
main#app
  transition
    the-navbar(v-if="!loading")

  transition(
    name="component-fade"
    mode="out-in"
    )

    router-view.router-view(v-if="!loading")

  transition(name="dimmer-fade")
    .ui.active.inverted.dimmer(v-if="dim")
      img.ui.mini.image(
        src="/static/images/navbar-icon.png"
        v-show="loading"
        )

      .ui.huge.loader(v-show="loading")
</template>

<script lang="ts">
import Vue from 'vue';

import TheNavbar from '@/modules/core/components/the-navbar.vue';

interface ComponentData {
  loading: boolean;
  dim: boolean;
}

export default Vue.extend({
  components: {
    TheNavbar
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

<style src="@/styles/_transitions.sass" lang="sass"></style>
<style src="@/styles/_dimmer.sass" lang="sass"></style>
<style src="@/styles/_site.sass" lang="sass"></style>
<style lang="sass" scoped>
main#app
  flex-direction: column
  display: flex
  height: 100vh
  width: 100vw

  > .router-view
    overflow-y: scroll
    flex: 1
</style>
