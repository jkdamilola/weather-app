import Vue from 'vue';
import App from './components/App';
import router from './router';

Vue.component('header-bar', require('./components/Header.vue'));
Vue.component('search', require('./components/Search.vue'));
Vue.component('weather', require('./components/Weather.vue'));

const app = new Vue({
  router,
  ...App
})

export { app, router }
