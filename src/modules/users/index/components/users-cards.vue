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
      span {{ $moment(user.createdAt).format('L') }}

      .right.floated
        span {{ $moment(user.modifiedAt).format('L') }}
        i.edit.icon
</template>

<script lang="ts">
import Vue from 'vue';

interface UserModel {
  name: string;
  sub: string;
  _id: string;
}

interface Props {
  users: UserModel[];
}

export default Vue.extend<unknown, unknown, unknown, Props>({
  props: {
    users: {
      type: Array,
      required: true
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
