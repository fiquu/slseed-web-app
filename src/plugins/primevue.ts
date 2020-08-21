import Vue from 'vue';

import ToastService from 'primevue/toastservice';
import InputText from 'primevue/inputtext';
import Toolbar from 'primevue/toolbar';
import Menubar from 'primevue/menubar';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';
import Toast from 'primevue/toast';
import Card from 'primevue/card';

Vue.prototype.$primevue = {
  ripple: true
};

Vue.use(ToastService);

Vue.component('PInputText', InputText);
Vue.component('PMenubar', Menubar);
Vue.component('PToolbar', Toolbar);
Vue.component('PDialog', Dialog);
Vue.component('PButton', Button);
Vue.component('PToast', Toast);
Vue.component('PCard', Card);
