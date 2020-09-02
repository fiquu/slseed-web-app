<i18n>
en:
  UPDATE_AVAILABLE: An update is available. Press here refresh the app.
  UPDATING: Refreshing...
es:
  UPDATE_AVAILABLE: Hay una actualización disponible. Presione aquí para actualizar la aplicación.
  UPDATING: Refrescando...
</i18n>

<template lang="pug">
section(
  :element-loading-text="$t('UPDATING')",
  v-loading.fullscreen.block="loading",
  v-if="updateAvailable"
)
  el-button.rounded-none.w-full(
    icon="el-icon-warning",
    @click="refreshApp()",
    :disabled="loading",
    :loading="loading",
    type="warning"
  )
    | {{ $t('UPDATE_AVAILABLE') }}
</template>

<script lang="ts">
import Vue from 'vue';

interface Data {
  registration: ServiceWorkerRegistration | null;
  updateAvailable: boolean;
  loading: boolean;
}

interface Methods {
  onNewContentAvailable(event: Event);
  reload(): void;
}

export default Vue.extend<Data, unknown, Methods>({
  data() {
    return {
      updateAvailable: false,
      registration: null,
      loading: false
    };
  },

  created() {
    document.addEventListener('newContentAvailable', this.onNewContentAvailable, {
      once: true
    });

    // Prevent multiple refreshes
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      if (this.loading) {
        return;
      }

      this.loading = true;

      // Here the actual reload of the page occurs
      window.location.reload(true);
    });
  },

  methods: {
    onNewContentAvailable({ detail }: CustomEvent<ServiceWorkerRegistration>) {
      this.updateAvailable = true;
      this.registration = detail;
    },

    refreshApp() {
      this.loading = true;
      this.updateAvailable = false;

      // Make sure we only send a 'skip waiting' message if the SW is waiting.
      if (!this.registration || !this.registration.waiting) {
        return;
      }

      // Send message to SW to skip the waiting and activate the new SW.
      this.registration.waiting.postMessage({
        type: 'SKIP_WAITING'
      });
    }
  }
});
</script>

<style lang="sass" scoped>
.p-button
  border-radius: 0
</style>
