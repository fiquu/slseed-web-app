import VueLocalStorage from 'vue-localstorage';
import Vue from 'vue';

import config from '@/configs/local-storage';

Vue.use(VueLocalStorage);

const instance = new Vue(config);

export default instance.$localStorage;
