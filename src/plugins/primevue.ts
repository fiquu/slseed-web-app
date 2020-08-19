import Vue from 'vue';

import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

Vue.prototype.$primevue = {
  ripple: true
};

Vue.use(ToastService);

Vue.component('PInputText', InputText);
Vue.component('PDialog', Dialog);
Vue.component('PButton', Button);
