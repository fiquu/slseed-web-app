import VueLocalStorage from 'vue-localstorage';
import Vue from 'vue';

Vue.use(VueLocalStorage);

/* Configure local storage */
const localStorage = {
  issue: {
    type: Object,
    default: {}
  }
};

const instance = new Vue({
  localStorage
});

export default instance.$localStorage;
