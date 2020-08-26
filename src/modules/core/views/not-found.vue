<i18n>
en:
  TITLE: Ohhh...
  SUBTITLE: The content you wanted is not here...
  BACK: Back to home
es:
  TITLE: Ohhh...
  SUBTITLE: El contenido que buscabas no está aquí...
  BACK: Volver al inicio
</i18n>

<template lang="pug">
section.p-grid.p-justify-center.p-nogutter.p-p-3
  .p-col.p-md-8.p-lg-6.p-xl-2
    .p-card.p-text-center.p-mb-3
      .p-card-title
        i.pi.pi-ban.p-mt-4(style={ fontSize: '2rem' })
        .p-mt-3 {{ $t('TITLE') }}

      .p-card-body {{ $t('SUBTITLE') }}

    .p-text-center.p-m-4
      router-link.p-button.p-button-link(to="/")
        | {{ $t('BACK') }}
</template>
