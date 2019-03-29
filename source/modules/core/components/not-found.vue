<i18n>
es:
  TITLE: Ohhh...
  SUBTITLE: El contenido que buscas no está aquí.
  BACK: Volver al inicio
</i18n>

<template lang="pug">
section.view
  .ui.basic.center.aligned.vertical.text.container.segment
    .ui.grey.segment
      h1.ui.grey.icon.header
        i.fas.fa-kiwi-bird.circular.icon
        | {{ $t('TITLE') }}
        .sub.header {{ $t('SUBTITLE') }}

    router-link.ui.fluid.large.grey.labeled.icon.button(to="/")
      i.fas.fa-home.icon
      span {{ $t('BACK') }}
</template>
