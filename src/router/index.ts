import { createRouter, createWebHistory } from 'vue-router'
import ProductList from '../components/ProductList.vue'
import ProductPage from '../components/ProductPage.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: ProductList
    },
    {
        path: '/product/:slug',
        name: 'ProductPage',
        component: ProductPage,
        props: true
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router