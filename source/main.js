import Vue from 'vue';

import { name, version } from '../package.json';

// Plugins
import '@/plugins/consts';

import router from '@/plugins/router';
import store from '@/plugins/store';
import i18n from '@/plugins/i18n';

import '@/plugins/local-storage';
import '@/plugins/validate';
import '@/plugins/jquery';
import '@/plugins/moment';
import '@/plugins/toastr';
import '@/plugins/http';
import '@/plugins/api';
import '@/plugins/is';
import '@/plugins/mq';
import '@/plugins/op';

// import '@/plugins/session';
import '@/plugins/auth';

// Register Service Worker
// import 'registerServiceWorker';

// Global components
import loaderMessage from './modules/global/components/loader-message';

// App component
import App from '@/app';

// Set Vue config
Vue.config.productionTip = false;

// Register global components
Vue.component('loader-message', loaderMessage);

// Create App instance
export default new Vue({
  render: h => h(App),
  el: '#app',
  version,
  router,
  store,
  i18n,
  name
}).$mount('#app');
