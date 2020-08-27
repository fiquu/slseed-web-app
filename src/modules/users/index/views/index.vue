<i18n>
en:
  FETCH:
    ERROR: Could not retrieve data.
</i18n>

<template lang="pug">
section.ui.basic.segment
  .ui.container
    transition(name="component-fade", mode="out-in")
      users-placeholder(v-if="fetching")

      users-cards(:users="users", v-else)
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex';
import Vue from 'vue';

import UsersPlaceholder from '../components/users-placeholder.vue';
import UsersCards from '../components/users-cards.vue';
import { UsersState } from '../store/state';
import store from '../store';

const { mapActions, mapState } = createNamespacedHelpers('users');

interface Data {
  fetching: boolean;
}

interface Methods {
  fetchAll(): Promise<void>;
  fetch(): Promise<void>;
}

type Computed = UsersState;

export default Vue.extend<Data, Methods, Computed>({
  components: {
    UsersPlaceholder,
    UsersCards
  },

  data() {
    return {
      fetching: true
    };
  },

  computed: mapState(['users']),

  created() {
    this.$store.registerModule('users', store);
    this.fetch();
  },

  beforeDestroy() {
    this.$store.unregisterModule('users');
  },

  methods: {
    ...mapActions(['fetchAll']),

    async fetch() {
      this.fetching = true;

      try {
        await this.fetchAll();
      } catch (err) {
        this.$message.error(this.$t('FETCH.ERROR').toString());
      }

      this.fetching = false;
    }
  }
});
</script>
