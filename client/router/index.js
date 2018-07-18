import Vue from 'vue';
import Router from 'vue-router';
import Home from '../components/Home.vue';
import Search from '../components/Search.vue';
import City from '../components/City.vue';

Vue.use(Router);

export default new Router({
  mode: 'hash',
  routes: [
    {
      path: '/',
      component: Home,
      name: 'Home'
    },
    { 
      path: '/weather/:woeid', 
      component: City, 
      name: 'City' 
    },
    { 
      path: '/search/:keyword', 
      component: Search, 
      name: 'Search' 
    }
  ]
});
