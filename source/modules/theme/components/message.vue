<template lang="pug">
section
  h2.ui.dividing.header Messages

  .ui.two.column.grid
    .column
      .ui.message
        i.close.icon
        .header Welcome back!
        p This is a special notification which you can dismiss if you're bored with it.

      .ui.positive.message
        .header Welcome back!
        p This is a very positive message!

      .ui.negative.message
        .header Welcome back!
        p This is an awful, negative message!

      .ui.info.message
        .header Welcome back!
        p This is an indiferent, information message!

      .ui.warning.message
        .header Welcome back!
        p This is a cautonary, warning message!

    .column
      .ui.icon.message
        i.fas.fa-circle.icon
        .content
          .header Welcome back!
          p This is a special notification which you can dismiss if you're bored with it.

      .ui.positive.icon.message
        i.fas.fa-check-circle.icon
        .content
          .header Welcome back!
          p This is a very positive message!

      .ui.negative.icon.message
        i.fas.fa-times-circle.icon
        .content
          .header Welcome back!
          p This is an awful, negative message!

      .ui.info.icon.message
        i.fas.fa-info-circle.icon
        .content
          .header Welcome back!
          p This is an indiferent, information message!

      .ui.warning.icon.message
        i.fas.fa-exclamation-circle.icon
        .content
          .header Welcome back!
          p This is a cautonary, warning message!

  .ui.four.column.grid
    .column
      .ui.large.message
        p This is a special notification which you can dismiss if you're bored with it.

      .ui.large.positive.message
        p This is a very positive message!

      .ui.large.negative.message
        p This is an awful, negative message!

      .ui.large.info.message
        p This is an indiferent, information message!

      .ui.large.warning.message
        p This is a cautonary, warning message!

    .column
      .ui.small.message
        p This is a special notification which you can dismiss if you're bored with it.

      .ui.small.positive.message
        p This is a very positive message!

      .ui.small.negative.message
        p This is an awful, negative message!

      .ui.small.info.message
        p This is an indiferent, information message!

      .ui.small.warning.message
        p This is a cautonary, warning message!

    .column
      .ui.tiny.message
        p This is a special notification which you can dismiss if you're bored with it.

      .ui.tiny.positive.message
        p This is a very positive message!

      .ui.tiny.negative.message
        p This is an awful, negative message!

      .ui.tiny.info.message
        p This is an indiferent, information message!

      .ui.tiny.warning.message
        p This is a cautonary, warning message!

    .column
      .ui.mini.message
        p This is a special notification which you can dismiss if you're bored with it.

      .ui.mini.positive.message
        p This is a very positive message!

      .ui.mini.negative.message
        p This is an awful, negative message!

      .ui.mini.info.message
        p This is an indiferent, information message!

      .ui.mini.warning.message
        p This is a cautonary, warning message!

</template>

<script>
export default {
  mounted() {
    const $ = this.$$;

    $('.message .close').on('click', function() {
      $(this)
        .closest('.message')
        .transition('fade');
    });
  }
};
</script>
