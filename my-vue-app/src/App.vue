<script setup lang="ts">
import Footer from './components/Footer.vue';
import ProductPage from './components/ProductPage.vue';
</script>

<template>
  <div class="app">
    <main>
        <ProductPage />
    </main>
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from './components/Footer.vue';
import ProductPage from './components/ProductPage.vue';

export default defineComponent({
  name: 'App',
  components: {
    Footer,
    ProductPage
  },
});
</script>

<style>
/* Global styles */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

.app {
  min-height: 100vh; /* Assure que la page prend toute la hauteur de l'écran */
}
</style>