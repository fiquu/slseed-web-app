<template lang="pug">
section.view
  section.ui.basic.vertical.segment.container
    h1 Theming Examples

    //- SITE
    ThemeSite

    //- MENU
    ThemeMenu

    //- BUTTONS
    ThemeButton

    //- MESSAGES
    ThemeMessage

    //- TOASTS
    ThemeToast

    //- TABLE
    ThemeTable

    //- INPUT
    ThemeInput

    //- CARD
    ThemeCard
</template>

<script lang="ts">
import Vue from 'vue';

import ThemeMessage from './message';
import ThemeButton from './button';
import ThemeInput from './input';
import ThemeTable from './table';
import ThemeToast from './toast';
import ThemeCard from './card';
import ThemeMenu from './menu';
import ThemeSite from './site';

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
