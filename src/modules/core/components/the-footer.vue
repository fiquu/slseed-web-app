<template lang="pug">
footer.ui.fluid.one.item.mini.bottom.fixed.fitted.menu
  .disabled.item
    | {{ name }}-{{ env }}-v{{ version }}
</template>

<script lang="ts">
import Vue from 'vue';

const { VUE_APP_PROJECT_NAME, VUE_APP_VERSION, VUE_APP_ENV } = process.env;

export default Vue.extend({
  data() {
    return {
      name: VUE_APP_PROJECT_NAME,
      version: VUE_APP_VERSION,
      env: VUE_APP_ENV
    };
  }
});
</script>

<style lang="sass" scoped>
footer.ui.mini.menu
  min-height: auto
  position: static
  font-size: 11px

  .disabled.item
    text-transform: lowercase
    font-family: monospace
    line-height: 2
</style>
