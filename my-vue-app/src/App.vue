<script setup lang="ts">
import Footer from './components/Footer.vue';
</script>

<template>
  <div class="app">
    <!-- Your other content -->
    <Footer />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Footer from './components/Footer.vue';

export default defineComponent({
  name: 'App',
  components: {
    Footer,
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