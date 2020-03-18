<i18n>
en:
  TITLE: Theming Examples
</i18n>

<template lang="pug">
section.ui.basic.segment.view
  section.ui.container
    h1 {{ $t('TITLE') }}

    //- SITE
    theme-site

    //- MENU
    theme-menu

    //- BUTTONS
    theme-button

    //- MESSAGES
    theme-message

    //- TOASTS
    theme-toast

    //- TABLE
    theme-table

    //- INPUT
    theme-input

    //- CARD
    theme-card
</template>

<script lang="ts">
import Vue from 'vue';

import ThemeTable from '../components/table/index.vue';
import ThemeMessage from '../components/message.vue';
import ThemeButton from '../components/button.vue';
import ThemeInput from '../components/input.vue';
import ThemeToast from '../components/toast.vue';
import ThemeCard from '../components/card.vue';
import ThemeMenu from '../components/menu.vue';
import ThemeSite from '../components/site.vue';

export default Vue.extend({
  components: {
    ThemeMessage,
    ThemeButton,
    ThemeInput,
    ThemeTable,
    ThemeToast,
    ThemeCard,
    ThemeMenu,
    ThemeSite
  }
});
</script>

<style lang="sass" scoped>
section.view
  section.ui.basic.vertical.segment.container
    section
      margin-top: 2rem
</style>
