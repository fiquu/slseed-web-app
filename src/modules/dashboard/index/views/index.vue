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
section.ui.basic.segment
  .ui.container
    .ui.red.segment
      h4.ui.red.header
        | {{ $t('TITLE') }}

      p(v-text="currentTime")

    .ui.hidden.divider

    .ui.three.stackable.cards
      link-card.yellow(
        :header="$t('USERS.HEADER')"
        icon="users"
        to="/users"
        )

        | {{ $t('USERS.DESCRIPTION') }}

      link-card.blue(
        :header="$t('THEME.HEADER')"
        icon="brush"
        to="/theme"
        )

        | {{ $t('THEME.DESCRIPTION') }}

      link-card.grey(
        :header="$t('NOT_FOUND.HEADER')"
        icon="meh"
        to="/this-page-doesnt-exists"
        )

        | {{ $t('NOT_FOUND.DESCRIPTION') }}
</template>

<script lang="ts">
import Vue from 'vue';

import LinkCard from '../components/link-card.vue';

interface Data {
  interval?: number;
}

interface Computed {
  currentTime: string;
}

export default Vue.extend<Data, {}, Computed>({
  components: {
    LinkCard
  },

  data() {
    return {};
  },

  computed: {
    currentTime() {
      return this.$moment().format('LLLL');
    }
  },

  mounted(): void {
    this.interval = window.setInterval(this.$forceUpdate, 1000);
  },

  beforeDestroy(): void {
    window.clearInterval(this.interval);
  }
});
</script>
