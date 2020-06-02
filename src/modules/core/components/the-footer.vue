<template lang="pug">
footer.ui.fluid.one.item.mini.bottom.fixed.fitted.menu
  .disabled.item
    | {{ name }}-{{ env }}-v{{ version }}
</template>

<script lang="ts">
import Vue from 'vue';

const { VUE_APP_PROJECT_NAME, VUE_APP_VERSION, VUE_APP_ENV } = process.env;

interface Data {
  version: string;
  name: string;
  env: string;
}

export default Vue.extend<Data, unknown, unknown>({
  data() {
    return {
      name: String(VUE_APP_PROJECT_NAME),
      version: String(VUE_APP_VERSION),
      env: String(VUE_APP_ENV)
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
