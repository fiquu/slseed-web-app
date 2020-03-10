import Vue, { CreateElement, VNode } from 'vue';

// Plugins
import { router, store, i18n } from './plugins';

// Global components
import './components';

// Semantic UI
import './semantic';

// Register Service Worker
import './register-service-worker';

// App component
import App from './app.vue';

// Set Vue config
Vue.config.productionTip = false;

// Create App instance
export default new Vue({
  render: (h: CreateElement): VNode => h(App),
  el: '#app',
  router,
  store,
  i18n
}).$mount('#app');
