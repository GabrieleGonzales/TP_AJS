import Vue from 'vue'
import Router from 'vue-router'
import Search from '@/components/Search'
import Index from '@/components/Index'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import BootstrapVue from 'bootstrap-vue';
import BootstrapVueIcons from 'bootstrap-vue'
import IconsPlugin from 'bootstrap-vue'
import BIcon from 'bootstrap-vue'

Vue.use(Router)
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(BootstrapVueIcons);
Vue.use(BIcon);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/Search',
      name: 'Search',
      component: Search
    }
  ]
})
