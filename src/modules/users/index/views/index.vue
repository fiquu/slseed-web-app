<template lang="pug">
section
  .ui.container.view
    .ui.basic.vertical.segment
      transition(
        name="component-fade"
        mode="out-in"
        )

        users-placeholder(v-if="fetching")

        users-cards(
          :users="users"
          v-else
          )
</template>

<script lang="ts">
import Vue from 'vue';

import UsersPlaceholder from '../components/users-placeholder.vue';
import UsersCards from '../components/users-cards.vue';
import store from '../store';

interface ComponentData {
  fetching: boolean;
}

export default Vue.extend({
  components: {
    UsersPlaceholder,
    UsersCards
  },

  data(): ComponentData {
    return {
      fetching: true
    };
  },

  created() {
    this.$store.registerModule('users', store);
    this.fetch();
  },

  beforeDestroy() {
    this.$store.unregisterModule('users');
  },

  computed: {
    users(): object[] {
      return this.$store.getters.users;
    }
  },

  methods: {
    async fetch(): Promise<void> {
      this.fetching = true;

      try {
        await this.$store.dispatch('fetchAll');
      } catch (err) {
        console.error(err);
      }

      this.fetching = false;
    }
  }
});
</script>
