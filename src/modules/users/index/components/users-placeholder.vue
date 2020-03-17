<template lang="pug">
.ui.one.cards
  .ui.card(v-for="i of count")
    .content
      .header
        .ui.placeholder
          .full.line

      .meta
        .ui.placeholder
          .medium.line

    .extra.content
      .ui.placeholder
        .short.line
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  computed: {
    count(): number[] {
      return [...new Array(3)].fill(0);
    }
  }
});
</script>
