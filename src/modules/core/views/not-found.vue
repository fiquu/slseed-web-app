<i18n>
en:
  TITLE: Ohhh...
  SUBTITLE: The content you wanted is not here...
  BODY: Make sure you have the acorrect address and try again.
  BACK: Back to home
es:
  TITLE: Ohhh...
  SUBTITLE: El contenido que buscabas no está aquí...
  BODY: Asegúrate de tener la dirección correcta y vuelve a intentarlo.
  BACK: Volver al inicio
</i18n>

<template lang="pug">
el-main
  el-row(justify="center", type="flex")
    el-col(:sm="14", :md="10", :lg="8", :xl="4")
      el-card
        template(#header)
          .text-center
            i.el-icon-user.text-4xl.mb-3
            h3.font-bold {{ $t('TITLE') }}
            small {{ $t('SUBTITLE') }}

        .text-center {{ $t('BODY') }}

      p.text-center.mt-4
        router-link.el-link.el-link--primary(to="/")
          .el-link--inner {{ $t('BACK') }}
</template>
