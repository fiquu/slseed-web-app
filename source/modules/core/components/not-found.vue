<i18n>
en:
  TITLE: Ohhh...
  SUBTITLE: The content you wanted is not here...
  BACK: Back to home
</i18n>

<template lang="pug">
section.view
  .ui.basic.center.aligned.vertical.text.container.segment
    .ui.grey.segment
      h1.ui.grey.icon.header
        i.meh.circular.icon
        | {{ $t('TITLE') }}
        .sub.header {{ $t('SUBTITLE') }}

    router-link.ui.fluid.large.grey.labeled.icon.button(to="/")
      i.home.icon
      span {{ $t('BACK') }}
</template>
