import Vue from 'vue';

import { name, version } from '../package.json';

// Plugins
import './plugins';

import router from './router';
import store from './store';
import i18n from './i18n';


// Register Service Worker
// import 'registerServiceWorker';

// Global components
import loaderMessage from './modules/global/components/loader-message';

// Semantic UI
import '../semantic/dist/semantic.min.css';
import '../semantic/dist/semantic.min.js';

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
