<template lang="pug">
section
  h2.ui.dividing.header Table
  .ui.two.column.relaxed.stackable.grid
    .column
      simple-table
    .column
      celled-table
    .column
      basic-table
    .column
      very-basic-table
    .column
      celled-selectable-table
    .column
      striped-table
    .column
      padded-celled-table
    .column
      definition-celled-table
    .column
      inverted-table
    .column
      inverted-selectable-celled-table
</template>

<script lang="ts">
import Vue from 'vue';

import InvertedSelectableCelledTable from './inverted-selectable-celled.vue';
import CelledSelectableTable from './celled-selectable.vue';
import DefinitionCelledTable from './definition-celled.vue';
import PaddedCelledTable from './padded-celled.vue';
import VeryBasicTable from './very-basic.vue';
import InvertedTable from './inverted.vue';
import StripedTable from './striped.vue';
import CelledTable from './celled.vue';
import SimpleTable from './simple.vue';
import BasicTable from './basic.vue';

export default Vue.extend({
  components: {
    InvertedSelectableCelledTable,
    CelledSelectableTable,
    DefinitionCelledTable,
    PaddedCelledTable,
    VeryBasicTable,
    InvertedTable,
    StripedTable,
    CelledTable,
    SimpleTable,
    BasicTable
  }
});
</script>

<style lang="sass" scoped>
.ui.table
  table-layout: fixed
</style>
