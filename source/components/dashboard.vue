<i18n>
{
  "en": {
    "TITLE": "Dashboard"
  }
}
</i18n>

<template lang="pug">
section.ui.vertical.segment.view
  .ui.container
    .ui.red.segment
      h4.ui.red.header(v-t=`'TITLE'`)

    .ui.segment
      p(v-text=`this.$moment().format('LLLL')`)

    .ui.segment
      div(v-if=`isFetching`)
        .ui.active.loader

      .ui.list
        .item(v-for=`user in users`)
          i.user.icon
          .content
            .header(v-text=`user.sub`)
            .description
              .ui.tiny.olive.label
                i.plus.circle.icon
                span(v-text=`$moment(user.createdAt).format('L')`)

              .ui.tiny.label
                i.edit.icon
                span(v-text=`$moment(user.modifiedAt).format('L')`)
</template>

<script>
export default {
  data() {
    return {
      isFetching: false,
      users: null
    };
  },

  mounted() {
    this.fetch();
  },

  methods: {
    async fetch() {
      this.isFetching = true;

      try {
        const res = await this.$http.get('users');
        this.users = res.data;
      } catch (err) {
        console.error(err);
      }

      this.isFetching = false;
    }
  }
};
</script>



