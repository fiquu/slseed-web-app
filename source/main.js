import VeeValidate from 'vee-validate';
import VueI18n from 'vue-i18n';
import Vue from 'vue';

import Moment from '@/plugins/moment';
import Toastr from '@/plugins/toastr';
import JQuery from '@/plugins/jquery';
import Auth from '@/plugins/auth';
import HTTP from '@/plugins/http';
import API from '@/plugins/api';

import configs from '@/configs';
import router from '@/router';
import store from '@/store';

import App from '@/app';

import './registerServiceWorker';

// Import Semantic UI files last
// NOTE: Ideally, these should be served via a private assets CDN
import '../semantic/dist/semantic.min.css';
import '../semantic/dist/semantic.min.js';

Vue.config.productionTip = false;

// IMPORTANT: Keep this order!
Vue.use(Moment, configs.moment);
Vue.use(HTTP, configs.http);
Vue.use(API, configs.api);
Vue.use(Auth);
Vue.use(VeeValidate);
Vue.use(VueI18n);
Vue.use(Toastr);
Vue.use(JQuery);

new Vue({
  i18n: new VueI18n(configs.i18n),
  render: h => h(App),
  el: '#app',
  router,
  store
}).$mount('#app');
