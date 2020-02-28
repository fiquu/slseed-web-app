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
section.ui.vertical.segment.view
  .ui.container
    .ui.red.segment
      h4.ui.red.header
        | {{ $t('TITLE') }}

      p(v-text="currentTime")

    .ui.three.cards
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

<script>
import LinkCard from './link-card';

export default {
  components: {
    LinkCard
  },

  data () {
    return {
      interval: null
    };
  },

  computed: {
    currentTime () {
      return this.$moment().format('LLLL');
    }
  },

  created () {
    this.interval = setInterval(this.$forceUpdate, 1000);
  },

  destroy () {
    clearInterval(this.interval);
  }
};
</script>
