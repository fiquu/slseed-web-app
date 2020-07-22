import Vue, { CreateElement, VNode } from 'vue';

import { router, store, i18n } from './plugins';

import './components';

import './register-service-worker';

import App from './app.vue';

Vue.config.productionTip = false;

export default new Vue({
  el: '#app',
  render: (h: CreateElement): VNode => h(App),
  router,
  store,
  i18n
}).$mount('#app');
