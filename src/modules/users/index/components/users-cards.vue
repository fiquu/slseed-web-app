<template lang="pug">
section
  el-card.mb-4(
    v-for="user in users"
    :key="user._id"
    )

    template(#header)
      h3.font-bold
        i.el-icon-user.mr-4
        | {{ user.name }}
      small.text-opacity-50 {{ user.sub }}

    template
      small
        i.el-icon-circle-plus.mr-2
        span {{ createdAt(user) }}

      small.float-right
        span {{ updatedAt(user) }}
        i.el-icon-edit.ml-2
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
