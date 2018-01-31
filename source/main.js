import VeeValidate from 'vee-validate';
import VueResource from 'vue-resource';
import VueI18n from 'vue-i18n';
import Vue from 'vue';

import Auth from '@/plugins/auth';

import App from '@/app';

import http from '@/configs/http';
import router from '@/router';

Vue.config.productionTip = false;

Vue.use(VueResource);
Vue.use(VeeValidate);
Vue.use(VueI18n);
Vue.use(Auth);

window.moment.locale('en');

window.toastr.options = {
  closeButton: false,
  debug: false,
  newestOnTop: false,
  progressBar: true,
  positionClass: 'toast-bottom-center',
  onclick: null,
  showDuration: 231,
  hideDuration: 231,
  timeOut: 4630,
  extendedTimeOut: 1157,
  showEasing: 'linear',
  hideEasing: 'linear',
  closeEasing: 'linear',
  showMethod: 'slideDown',
  hideMethod: 'slideUp',
  closeMethod: 'slideUp'
};

const i18n = new VueI18n({
  locale: 'en'
});

/**
 * Because fuck docs... right?
 *
 * @see https://github.com/pagekit/vue-resource/blob/develop/docs/config.md
 */
Vue.url.options.root = http.root;

new Vue({
  render: v => v(App),
  template: '<app/>',
  el: '#app',
  router,
  i18n,
  http
});
