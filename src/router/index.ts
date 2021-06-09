import Vue from 'vue';
import VueRouter, { RouteConfig } from 'vue-router';
import Home from '../views/home/Home.vue';
import SimplePresent from '../views/simplepresent/Index.vue';

Vue.use(VueRouter);

const routes: RouteConfig[] = [
  {
    path: '/ss',
    name: 'home',
    component: Home
  },
  {
    path: '/',
    name: 'Simple Present Validator',
    component: SimplePresent
  }
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
});

export default router;
