import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Invoice from './views/Invoice';
import User from './views/User';
import Play from './views/play';
import NotFound from './views/404';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '*',
      component: NotFound
    },
    {
      path: '/customer/:id/invoice',
      component: Invoice,
      props: true
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/play',
      name: 'play',
      component: Play
    }
  ]
});
