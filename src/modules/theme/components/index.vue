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

import ThemeTable from './table/index.vue';
import ThemeMessage from './message.vue';
import ThemeButton from './button.vue';
import ThemeInput from './input.vue';
import ThemeToast from './toast.vue';
import ThemeCard from './card.vue';
import ThemeMenu from './menu.vue';
import ThemeSite from './site.vue';

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
