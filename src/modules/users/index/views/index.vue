<i18n>
en:
  FETCH:
    ERROR: Could not retrieve data.
</i18n>

<template lang="pug">
el-main(v-loading.lock="loading")
  transition(name="el-fade-in", mode="out-in")
    users-cards(:users="users")
</template>

<script lang="ts">
import { createNamespacedHelpers } from 'vuex';
import Vue from 'vue';

import UsersCards from '../components/users-cards.vue';
import { UsersState } from '../store/state';
import store from '../store';

const { mapActions, mapState } = createNamespacedHelpers('users');

interface Data {
  loading: boolean;
}

interface Methods {
  fetchAll(): Promise<void>;
  fetch(): Promise<void>;
}

type Computed = UsersState;

export default Vue.extend<Data, Methods, Computed>({
  components: {
    UsersCards
  },

  data() {
    return {
      loading: true
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
      this.loading = true;

      try {
        await this.fetchAll();
      } catch (err) {
        this.$message.error(this.$t('FETCH.ERROR').toString());
      }

      this.loading = false;
    }
  }
});
</script>
