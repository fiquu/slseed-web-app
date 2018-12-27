<i18n>
{
  "en": {
    "TITLE": "Dashboard",
    "GENDERS": {
      "TITLE": "Genders",
      "LINK": "View genders list"
    },
    "USERS": {
      "TITLE": "Users",
      "LINK": "View users list"
    }
  }
}
</i18n>

<template lang="pug">
section.ui.vertical.segment.view
  .ui.equal.width.grid.container
    .column
      .ui.red.segment
        h4.ui.red.header(v-t=`'TITLE'`)
        p(v-text=`currentTime`)

    .row
      .column
        .ui.top.attached.blue.segment
          .ui.center.aligned.blue.icon.header
            i.circular.transgender.alternate.icon
            span(v-t=`'GENDERS.TITLE'`)

        a.ui.bottom.attached.labeled.icon.blue.button(href=`#/genders`)
          i.list.icon
          span(v-t=`'GENDERS.LINK'`)

      .column
        .ui.top.attached.yellow.segment
          .ui.center.aligned.yellow.icon.header
            i.circular.users.icon
            span(v-t=`'USERS.TITLE'`)

        a.ui.bottom.attached.labeled.icon.yellow.button(href=`#/users`)
          i.list.icon
          span(v-t=`'USERS.LINK'`)
</template>

<script>
export default {
  created() {
    this.interval = setInterval(this.$forceUpdate, 1000);
  },

  data() {
    return {
      interval: null
    };
  },

  computed: {
    currentTime() {
      return this.$moment().format('LLLL');
    }
  },

  destroy() {
    clearInterval(this.interval);
  }
};
</script>
