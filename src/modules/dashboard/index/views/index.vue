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
      link-card(
        :description="$t('USERS.DESCRIPTION')"
        :header="$t('USERS.HEADER')"
        color="yellow"
        icon="users"
        to="/users"
        )

      link-card(
        :description="$t('THEME.DESCRIPTION')"
        :header="$t('THEME.HEADER')"
        color="blue"
        icon="brush"
        to="/theme"
        )

      link-card(
        :description="$t('NOT_FOUND.DESCRIPTION')"
        :header="$t('NOT_FOUND.HEADER')"
        color="grey"
        icon="meh"
        to="/this-page-doesnt-exists"
        )
</template>

<script lang="ts">
import Vue from 'vue';

import LinkCard from '../components/link-card.vue';

interface ComponentData {
  interval: number | null;
}

export default Vue.extend({
  components: {
    LinkCard
  },

  data(): ComponentData {
    return {
      interval: null
    };
  },

  computed: {
    currentTime(): string {
      return this.$moment().format('LLLL');
    }
  },

  mounted(): void {
    this.interval = window.setInterval(this.$forceUpdate, 1000);
  },

  beforeDestroy(): void {
    window.clearInterval(this.interval as number);
  }
});
</script>
