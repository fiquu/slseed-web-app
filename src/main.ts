import Vue from 'vue';

// Plugins
import router from './router';
import store from './store';
import i18n from './i18n';

import './plugins';

// Register Service Worker
// import 'registerServiceWorker';

// Global components
import loaderMessage from './modules/global/components/loader-message.vue';

// Semantic UI
import '../semantic/dist/semantic.min.css';
import '../semantic/dist/semantic.min.js';

// App component
import App from './app.vue';

// Set Vue config
Vue.config.productionTip = false;

// Register global components
Vue.component('loader-message', loaderMessage);

// Create App instance
export default new Vue({
  el: '#app',
  render: h => h(App),
  router,
  store,
  i18n
}).$mount('#app');
