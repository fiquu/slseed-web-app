<template lang="pug">
table.ui.right.aligned.celled.table
  thead
    tr
      th.left.aligned Person
      th Calories
      th Fat
      th Protein
  tbody
    tr
      td.left.aligned Drema
      td.positive 15
      td.negative 26g
      td.warning 8g
    tr.positive
      td.left.aligned Nona
      td 11
      td 21g
      td 16g
    tr.negative
      td.left.aligned Isidra
      td 34
      td 43g
      td 11g
    tr.warning
      td.left.aligned Bart
      td 41
      td 40g
      td 30g
    tr.selected
      td.left.aligned Nguyet
      td 41
      td 44g
      td 28g
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({});
</script>
