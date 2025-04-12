import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import Signing from '../views/Signing.vue';
import Logging from '../views/Logging.vue';
import First from '../views/First.vue';
import Product from '../components/ProductPage.vue'
import prd from '../views/ProductsALL.vue'
import panier from '../views/Panier.vue'
import contact from '../views/Contact.vue'
import A_propos from '../views/about.vue';
import Cgv from '../views/Cgv.vue';
import Confidentialite from '../views/Confidentialite.vue';

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
    path: '/prd',
    name: 'prd',
    component: prd
  },
  {
    path: '/panier',
    name: 'panier',
    component: panier
  },
  {
    path: '/contact',
    name: 'contact',
    component: contact
  },
  {
    path: '/about',
    name: 'Apropos',
    component: A_propos
  },
  {
    path: '/cgv',
    name: 'cgv',
    component: Cgv
  }
  ,
  {
    path: '/confidentialite',
    name: 'confidentialite',
    component: Confidentialite
  }

];

// Ne pas oublier de mettre le nom du depot Git ('Vue-Store dans mon cas')
const router = createRouter({
  history: createWebHistory('Vue-Store'),
  routes
});

export default router;
