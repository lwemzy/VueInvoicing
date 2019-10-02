import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home';
import Invoice from './views/Invoice';
import hello from './components/HelloWorld';
import User from './views/User';
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
      // beforeEnter: (to, from, next) => {
      //   const id = to.params.id;
      //   // or next('/not-found') === next({name: '*'})
      //   if (![1, 2, 3, 4].includes(Number(id))) next('/not-found');
      //   else next();
      // }
    },
    {
      path: '/user',
      name: 'user',
      component: User
    },
    {
      path: '/hello',
      component: hello
    }
  ]
});
