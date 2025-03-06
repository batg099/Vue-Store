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

// Ne pas oublier de mettre le nom du depot Git ('Vue-Store dans mon cas')
const router = createRouter({
  history: createWebHistory('Vue-Store'),
  routes
});

export default router;
