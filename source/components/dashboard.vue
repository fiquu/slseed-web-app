<i18n>
{
  "en": {
    "TITLE": "Dashboard"
  }
}
</i18n>

<template lang="pug">
section.ui.vertical.segment.view
  .ui.container
    .ui.red.segment
      h4.ui.red.header(v-t=`'TITLE'`)

    .ui.segment
      p(v-text=`this.$moment().format('LLLL')`)
</template>


