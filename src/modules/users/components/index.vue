<template lang="pug">
section
  .ui.container.view
    .ui.basic.vertical.segment
      .ui.segment
        .ui.active.loader(v-if="fetching")

        .ui.list
          .item(v-for="user in users")
            i.user.icon

            .content
              .header(v-text="user.sub")

              .description
                .ui.tiny.olive.label
                  i.plus.circle.icon
                  span(v-text="$moment(user.createdAt).format('L')")

                .ui.tiny.label
                  i.edit.icon
                  span(v-text="$moment(user.modifiedAt).format('L')")
</template>

<script lang="ts">
import Vue from 'vue';

export default Vue.extend({
  data() {
    return {
      fetching: false,
      users: null
    };
  },

  created() {
    this.fetch();
  },

  methods: {
    async fetch() {
      this.fetching = true;

      try {
        const res = await this.$api.get('users');

        this.users = res.data;
      } catch (err) {
        console.error(err);
      }

      this.fetching = false;
    }
  }
});
</script>
