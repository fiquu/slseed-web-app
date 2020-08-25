<template lang="pug">
footer.p-text-center.p-p-1.p-shadow-1
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
  name: 'TheFooter',

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
footer
  color: rgba(0, 0, 0, 0.3)
  font-family: monospace
  background: white
  min-height: auto
  font-size: 10px
  z-index: 1
</style>
