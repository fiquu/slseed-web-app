<template lang="pug">
transition(name="dimmer-fade")
  .ui.active.inverted.dimmer(
    v-show="loading || dim"
    :key="Date.now()"
    )

    .ui.big.loader
      img(src='/static/images/navbar-icon.png')
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  loading: boolean;
  dim: boolean;
}

export default Vue.extend<Data, unknown, unknown>({
  data() {
    return {
      loading: false,
      dim: true
    };
  },

  watch: {
    ['$session.loading']: {
      handler(loading: boolean): void {
        this.loading = loading;
      }
    }
  },

  created(): void {
    this.$router.beforeEach((to, from, next) => {
      this.dim = true;
      next();
    });

    this.$router.afterEach(() => {
      this.dim = false;
    });
  }
});
</script>
