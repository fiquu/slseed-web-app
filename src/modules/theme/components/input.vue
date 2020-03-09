<template lang="pug">
section
  h2.ui.dividing.header Input

  .ui.two.column.stackable.grid
    .column
      .ui.action.left.icon.input
        i.search.icon
        input(type='text', placeholder='Search...')
        .ui.teal.button Search

      .ui.divider

      .ui.input.error
        input(placeholder='Search...', type='text')
      .ui.divider

      .ui.right.labeled.input
        input(placeholder='Placeholder', type='text')
        .ui.dropdown.label
          .text Dropdown
          i.dropdown.icon
          .menu
            .item Choice 1
            .item Choice 2
            .item Choice 3
      .ui.divider

      .ui.transparent.icon.input
        input(placeholder='Search...', type='text')
        i.search.icon

      | &#32;

      .ui.transparent.left.icon.input
        input(placeholder='Search...', type='text')
        i.search.icon

      .ui.divider

      .ui.left.icon.input.loading
        input(placeholder='Loading...', type='text')
        i.search.icon
      .ui.icon.input.loading
        input(placeholder='Loading...', type='text')
        i.search.icon

    .column
      .ui.right.labeled.left.icon.input
        i.tags.icon
        input(placeholder='Enter tags', type='text')
        a.ui.tag.label Add Tag
      .ui.divider
      .ui.labeled.input
        a.ui.label Label
        input(type='text', placeholder='Placeholder...')

      .ui.divider

      .ui.right.labeled.input
        input(type='text', placeholder='Placeholder...')
        a.ui.label Label

      .ui.divider

      .ui.form
        .field
          .ui.fluid.labeled.icon.input
            .ui.label http://
            input(type='text', placeholder='domain.com')
            i.add.circle.link.icon

        .field
          .ui.fluid.right.action.input
            input(type='text', placeholder='domain.com')
            .ui.teal.button
              i.add.icon
              | Add

      .ui.divider

      .ui.corner.labeled.input
        input(type='text', placeholder='Required Field')
        .ui.corner.label
          i.asterisk.icon
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  mounted() {
    const $el: any = this.$$('.ui.dropdown');

    $el.dropdown({
      on: 'click'
    });
  }
});
</script>

<style lang="sass" scoped>
.ui.input + .ui.input
  margin-left: 1em
</style>
