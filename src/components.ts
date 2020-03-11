import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Vue from 'vue';

import LoaderMessage from './components/loader-message.vue';
import FormInput from './components/form/input.vue';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('LoaderMessage', LoaderMessage);
Vue.component('FormInput', FormInput);
