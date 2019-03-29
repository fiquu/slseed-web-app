<template lang="pug">
section
  h2.ui.dividing.header Site
  .ui.three.column.stackable.grid
    .column
      h1 Heading 1
      h2 Heading 2
      h3 Heading 3
      h4 Heading 4
      h5 Heading 5
      p Nullam quis risus eget urna mollis ornare vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
    .column
      h2 Example body text
      p
        | Nullam quis risus eget&#32;
        a(href='#') urna mollis ornare
        | &#32;vel eu leo. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nullam id dolor id nibh ultricies vehicula.
      p
        small This line of text is meant to be treated as fine print.
      p
        | The following snippet of text is&#32;
        strong rendered as bold text
        | .
      p
        | The following snippet of text is&#32;
        em rendered as italicized text
        | .
      p
        | An abbreviation of the word attribute is&#32;
        abbr(title='attribute') attr
        | .
    .column
      .ui.three.column.stackable.padded.middle.aligned.centered.color.grid
        .red.column Red
        .orange.column Orange
        .yellow.column Yellow
        .olive.column Olive
        .green.column Green
        .teal.column Teal
        .blue.column Blue
        .violet.column Violet
        .purple.column Purple
        .pink.column Pink
        .brown.column Brown
        .grey.column Grey
        .black.column Black
</template>

<style lang="sass" scoped>
.color.grid
  margin: -1.5em
  width: 400px

  .column
    margin: 0.5em
    width: 50px
    height: 50px

.ui.table
  table-layout: fixed
</style>
