<i18n>
en:
  FETCH:
    ERROR: Could not retrieve data.
</i18n>

<template lang="pug">
section.ui.vertical.segment
  .ui.container
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
import { mapActions, mapState } from 'vuex';
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

  computed: mapState('users', ['users']),

  created() {
    this.$store.registerModule('users', store);
    this.fetch();
  },

  beforeDestroy() {
    this.$store.unregisterModule('users');
  },

  methods: {
    ...mapActions('users', ['fetchAll']),

    async fetch(): Promise<void> {
      this.fetching = true;

      try {
        await this.fetchAll();
      } catch (err) {
        this.$toast.error(this.$t('FETCH.ERROR'));
        console.error(err);
      }

      this.fetching = false;
    }
  }
});
</script>
