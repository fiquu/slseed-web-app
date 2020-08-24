<i18n>
en:
  TITLE: Dashboard
  USERS:
    HEADER: Users
    DESCRIPTION: View all avaliable users list.
  THEME:
    HEADER: Theme
    DESCRIPTION: View a collection of your theme elements.
  NOT_FOUND:
    HEADER: Not found
    DESCRIPTION: View the not found page.
</i18n>

<template lang="pug">
section.p-p-3
  p-panel(:header="$t('TITLE')")
    span(v-text="currentTime")

  .p-grid.p-mt-2
    .p-col
      link-card(
        :header="$t('USERS.HEADER')"
        icon="pi-users"
        to="/users"
        )

        | {{ $t('USERS.DESCRIPTION') }}

    .p-col
      link-card(
        :header="$t('NOT_FOUND.HEADER')"
        icon="pi-ban"
        to="/this-page-does-not-exists"
        )

        | {{ $t('NOT_FOUND.DESCRIPTION') }}
</template>

<script lang="ts">
import locale from 'date-fns/locale/en-US';
import format from 'date-fns/format';
import Vue from 'vue';

import LinkCard from '../components/link-card.vue';

let interval: number;

interface Data {
  timestamp: number;
}

interface Computed {
  currentTime: string;
}

export default Vue.extend<Data, unknown, Computed>({
  components: {
    LinkCard
  },

  data() {
    return {
      timestamp: Date.now()
    };
  },

  computed: {
    currentTime() {
      return format(this.timestamp, 'PPPP - p', { locale });
    }
  },

  mounted(): void {
    interval = window.setInterval(() => {
      this.timestamp = Date.now();
    }, 1000);
  },

  beforeDestroy(): void {
    window.clearInterval(interval);
  }
});
</script>
