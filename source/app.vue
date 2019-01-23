<i18n>
{
  "en": {
    "SIGN_OUT": "Sign Out"
  }
}
</i18n>

<template lang="pug">
main#app
  main-navbar

  router-view
</template>

<script>
import MainNavbar from '@/components/main-navbar';

export default {
  components: {
    MainNavbar
  }
};
</script>
