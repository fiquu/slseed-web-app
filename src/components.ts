import { ValidationProvider, ValidationObserver } from 'vee-validate';
import Vue from 'vue';

import FormInput from './components/form/input.vue';

Vue.component('ValidationObserver', ValidationObserver);
Vue.component('ValidationProvider', ValidationProvider);
Vue.component('FormInput', FormInput);
