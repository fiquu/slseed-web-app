<template lang="pug">
.ui.one.cards
  .ui.card(
    v-for="user in users"
    :key="user._id"
    )

    .content
      .header
        i.user.circle.icon
        | {{ user.name }}

      .meta {{ user.sub }}

    .extra.content
      i.plus.circle.icon
      span {{ createdAt(user) }}

      .right.floated
        span {{ updatedAt(user) }}
        i.edit.icon
</template>

<script lang="ts">
import parse from 'date-fns/parseISO';
import format from 'date-fns/format';
import Vue from 'vue';

interface UserModel {
  createdAt: string;
  updatedAt: string;
  name: string;
  sub: string;
  _id: string;
}

interface Methods {
  updatedAt(user: UserModel): string;
  createdAt(user: UserModel): string;
}

interface Props {
  users: UserModel[];
}

export default Vue.extend<unknown, Methods, unknown, Props>({
  props: {
    users: {
      type: Array,
      required: true
    }
  },

  methods: {
    createdAt(user) {
      return format(parse(user.createdAt), 'P');
    },

    updatedAt(user) {
      return format(parse(user.updatedAt), 'P');
    }
  }
});
</script>

<style lang="sass" scoped>
.ui.cards
  > .ui.card
    > .extra.content
      > .right.floated
        > i.icon
          margin-left: 0.25em
          margin-right: 0
</style>
