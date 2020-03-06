<template lang="pug">
section
  h2.ui.dividing.header Buttons

  .ui.stackable.equal.width.grid
    .column
      button.ui.button Default
      button.ui.primary.button Primary
      button.ui.secondary.button Secondary
      button.ui.basic.button Basic
      button.ui.compact.button Compact

      .ui.divider

      button.ui.icon.button
        i.heart.icon

      button.ui.labeled.icon.button
        i.heart.icon
        | Labeled

      button.ui.right.labeled.icon.button
        i.heart.icon
        | Labeled

      .ui.divider

      .ui.buttons
        button.ui.button Combo

        .ui.floating.dropdown.icon.button
          i.dropdown.icon
          .menu
            .item Choice 1
            .item Choice 2
            .item Choice 3

      | &#32;

      .ui.floating.search.dropdown.button
        span.text Search Dropdown
        .menu
          .item Arabic
          .item Chinese
          .item Danish
          .item Dutch
          .item English
          .item French
          .item German
          .item Greek
          .item Hungarian
          .item Italian
          .item Japanese
          .item Korean
          .item Lithuanian
          .item Persian
          .item Polish
          .item Portuguese
          .item Russian
          .item Spanish
          .item Swedish
          .item Turkish
          .item Vietnamese

      .ui.divider

      .ui.animated.button(tabindex='0')
        .visible.content Horizontal
        .hidden.content Hidden

      .ui.vertical.animated.button(tabindex='0')
        .visible.content Vertical
        .hidden.content Hidden

      .ui.animated.fade.button(tabindex='0')
        .visible.content Fade In
        .hidden.content Hidden

      .ui.divider

      button.ui.disabled.button Disabled
      button.ui.loading.button Loading

      .ui.divider

      .ui.buttons
        button.ui.button 1
        button.ui.button 2
        button.ui.button 3

      | &#32;

      .ui.icon.buttons
        button.ui.button
          i.align-left.icon
        button.ui.button
          i.align-center.icon
        button.ui.button
          i.align-right.icon
        button.ui.button
          i.align-justify.icon

      | &#32;

      .ui.buttons
        button.ui.button 1
        .or
        button.ui.button 2

      .ui.divider

      .ui.two.top.attached.buttons
        .ui.button One
        .ui.button Two

      .ui.attached.segment
        img.ui.wireframe.image(src="/static/images/theme/wireframe/paragraph.png")

      .ui.two.bottom.attached.buttons
        .ui.button One
        .ui.button Two

    .column
      button.ui.mini.button Mini
      button.ui.tiny.button Tiny
      button.ui.small.button Small
      button.ui.large.button Large
      button.ui.big.button Big
      button.ui.huge.button Huge
      button.ui.massive.button Massive

      .ui.divider

      .spaced
        button.ui.red.button Red
        button.ui.orange.button Orange
        button.ui.yellow.button Yellow
        button.ui.olive.button Olive
        button.ui.green.button Green
        button.ui.teal.button Teal
        button.ui.blue.button Blue
        button.ui.violet.button Violet
        button.ui.purple.button Purple
        button.ui.pink.button Pink
        button.ui.brown.button Brown
        button.ui.grey.button Grey
        button.ui.black.button Black

      .ui.divider

      .spaced
        button.ui.primary.basic.button Primary
        button.ui.secondary.basic.button Secondary
        button.ui.positive.basic.button Positive
        button.ui.negative.basic.button Negative

      .ui.divider

      .spaced
        button.ui.red.basic.button Red
        button.ui.orange.basic.button Orange
        button.ui.yellow.basic.button Yellow
        button.ui.olive.basic.button Olive
        button.ui.green.basic.button Green
        button.ui.teal.basic.button Teal
        button.ui.blue.basic.button Blue
        button.ui.violet.basic.button Violet
        button.ui.purple.basic.button Purple
        button.ui.pink.basic.button Pink
        button.ui.brown.basic.button Brown
        button.ui.grey.basic.button Grey
        button.ui.black.basic.button Black

      .ui.divider

      .ui.inverted.spaced.segment
        button.ui.inverted.button Inverted
        button.ui.inverted.basic.button Basic
        button.ui.inverted.primary.button Primary
        button.ui.inverted.secondary.button Secondary
        button.ui.inverted.red.button Red
        button.ui.inverted.orange.button Orange
        button.ui.inverted.yellow.button Yellow
        button.ui.inverted.olive.button Olive
        button.ui.inverted.green.button Green
        button.ui.inverted.teal.button Teal
        button.ui.inverted.blue.button Blue
        button.ui.inverted.violet.button Violet
        button.ui.inverted.purple.button Purple
        button.ui.inverted.pink.button Pink
        button.ui.inverted.brown.button Brown
        button.ui.inverted.grey.button Grey
        button.ui.inverted.black.button Black
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  mounted() {
    this.$$('.ui.dropdown').dropdown();

    this.$$('.ui.buttons .dropdown.button').dropdown({
      action: 'combo'
    });
  }
});
</script>

<style lang="sass" scoped>
.spaced > .button
  margin-bottom: 0.3em
</style>
