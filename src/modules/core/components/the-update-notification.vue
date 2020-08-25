<i18n>
en:
  UPDATE_AVAILABLE: An update is available. Press here refresh the app.
  UPDATING: Refreshing...
</i18n>

<template lang="pug">
section.p-fluid(v-if="updateAvailable")
  p-button.p-button-warning.p-button-lg(
    :icon="loading ? 'pi pi-spinner pi-spin' : 'pi pi-info-circle'",
    :label="$t('UPDATE_AVAILABLE')",
    @click="refreshApp()"
  )

  p-block-u-i(:blocked="loading", :full-screen="true")
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
