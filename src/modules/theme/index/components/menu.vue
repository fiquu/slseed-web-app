<template lang="pug">
section
  h2.ui.dividing.header Menu

  .ui.stackable.menu
    .header.item Brand

    a.active.item Link

    a.item Link

    .ui.dropdown.item
      | Dropdown
      i.dropdown.icon
      .menu
        .item Action
        .item Another Action
        .item Something else here
        .divider
        .item Separated Link
        .divider
        .item One more separated link

    .right.menu
      .item
        .ui.action.left.icon.input
          i.search.icon
          input(type='text', placeholder='Search')
          button.ui.button Submit

      a.item Link

  .ui.inverted.stackable.menu
    .header.item Brand

    .active.item Link

    a.item Link

    .ui.dropdown.item
      | Dropdown
      i.dropdown.icon

      .menu
        .item Action
        .item Another Action
        .item Something else here
        .divider
        .item Separated Link
        .divider
        .item One more separated link

    .right.menu
      .item
        .ui.transparent.inverted.icon.input
          i.search.icon
          input(type='text', placeholder='Search')

      a.item Link

  .ui.secondary.stackable.menu
    .active.item Link

    a.item Link

    .ui.dropdown.item
      | Dropdown
      i.dropdown.icon

      .menu
        .item Action
        .item Another Action
        .item Something else here
        .divider
        .item Separated Link
        .divider
        .item One more separated link

    .right.menu
      .item
        .ui.action.left.icon.input
          i.search.icon
          input(type='text', placeholder='Search')
          button.ui.button Submit

      .ui.dropdown.item
        | Dropdown Left
        i.dropdown.icon

        .menu
          a.item Link

          a.item Link

          .divider

          .header Header

          .item
            i.dropdown.icon
            | Sub Menu

            .menu
              a.item Link

              .item
                i.dropdown.icon
                | Sub Sub Menu

                .menu
                  a.item Link
                  a.item Link

              a.item Link
          a.item Link
      a.item Link

  .ui.three.column.doubling.stackable.grid
    .column
      .ui.secondary.pointing.stackable.menu
        .active.item Link
        a.item Link
        a.item Link

    .column
      .ui.tabular.stackable.menu
        .active.item Link
        a.item Link
        a.item Link

    .column
      .ui.pointing.stackable.menu
        .active.item Link
        a.item Link
        .right.item Right Text
</template>

<script lang="ts">
import Vue from 'vue';
export default Vue.extend({
  mounted() {
    const $$ = this.$$;
    const $el = $$('.ui.menu .ui.dropdown') as JQuery;

    $el.dropdown({
      on: 'hover'
    });

    $$('.ui.menu a.item').on('click', function() {
      $$(this)
        .addClass('active')
        .siblings()
        .removeClass('active');
    });
  }
});
</script>

<style lang="sass" scoped>
.ui.menu
  margin: 3em 0em

  &:last-child
    margin-bottom: 110px
</style>
