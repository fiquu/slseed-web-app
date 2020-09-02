<i18n>
en:
  TITLE: Dashboard
  USERS:
    HEADER: Users
    DESCRIPTION: View all avaliable users list.
  NOT_FOUND:
    HEADER: Not found
    DESCRIPTION: View the not found page.
es:
  TITLE: Tablero
  USERS:
    HEADER: Usuarios
    DESCRIPTION: Ver la lista de todos los usuarios disponibles.
  NOT_FOUND:
    HEADER: Extraviado
    DESCRIPTION: Ver la página de no encontrado.
</i18n>

<template lang="pug">
el-main
  .el-alert.el-alert--info.is-dark
    .el-alert__content
      .el-alert__title
        i.el-icon-date.mr-2
        span(v-text="currentTime")

  el-row.flex-wrap.pt-4(:gutter="16", type="flex")
    el-col.flex.pb-4(:sm="12")
      link-card.flex-1(
        :header="$t('USERS.HEADER')",
        icon="el-icon-user",
        to="/users"
      )
        | {{ $t('USERS.DESCRIPTION') }}

    el-col.flex.pb-4(:sm="12")
      link-card.flex-1(
        :header="$t('NOT_FOUND.HEADER')",
        to="/this-page-does-not-exists",
        icon="el-icon-warning-outline"
      )
        | {{ $t('NOT_FOUND.DESCRIPTION') }}
</template>

<script lang="ts">
import locale from 'date-fns/locale/en-US';
import format from 'date-fns/format';
import Vue from 'vue';

import LinkCard from '../components/link-card.vue';

let interval: number;

interface Data {
  timestamp: number;
}

interface Computed {
  currentTime: string;
}

export default Vue.extend<Data, unknown, Computed>({
  components: {
    LinkCard
  },

  data() {
    return {
      timestamp: Date.now()
    };
  },

  computed: {
    currentTime() {
      return format(this.timestamp, 'PPPP - p', { locale });
    }
  },

  mounted(): void {
    interval = window.setInterval(() => {
      this.timestamp = Date.now();
    }, 1000);
  },

  beforeDestroy(): void {
    window.clearInterval(interval);
  }
});
</script>
