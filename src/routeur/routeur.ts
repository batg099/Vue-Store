import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signing from '../views/Signing.vue';
import Logging from '../views/Logging.vue';
import First from '../components/First.vue';
import Product from '../components/ProductPage.vue'
import test_menu from '../components/test_menu.vue'


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
  },
  {
    path: '/first',
    name: 'first',
    component: First
  },
  {
    path: '/product',
    name: 'product',
    component: Product
  },
  {
    path: '/test',
    name: 'test',
    component: test_menu
  }
];

// Ne pas oublier de mettre le nom du depot Git ('Vue-Store dans mon cas')
const router = createRouter({
  history: createWebHistory('Vue-Store'),
  routes
});

export default router;
