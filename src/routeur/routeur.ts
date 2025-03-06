import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signing from '../views/Signing.vue';
import Logging from '../views/Logging.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/signing',
    name: 'signing',
    component: Signing
  },
  {
    path: '/logging',
    name: 'logging',
    component: Logging
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
