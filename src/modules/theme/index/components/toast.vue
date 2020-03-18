<template lang="pug">
section
  h2.ui.dividing.header Toasts

  .ui.four.column.stackable.grid
    .column
      button.ui.left.labeled.icon.blue.fluid.button(
        @click="$toast.info('This is an informative toast.')"
        )

        i.info.circle.icon
        | Info

    .column
      button.ui.left.labeled.icon.positive.fluid.button(
        @click="$toast.success('Yay! Success!')"
        )

        i.check.circle.icon
        | Success

    .column
      button.ui.left.labeled.icon.yellow.fluid.button(
        @click="$toast.warning('Hey! Watch out!')"
        )

        i.exclamation.circle.icon
        | Warning

    .column
      button.ui.left.labeled.icon.negative.fluid.button(
        @click="$toast.error('There is something really wrong here...')"
        )

        i.exclamation.triangle.icon
        | Error
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>
