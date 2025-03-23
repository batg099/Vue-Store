<script setup lang="ts">
//import HelloWorld from './components/HelloWorld.vue'
//import Navbar from './components/Navbar.vue'
import Menu from './components/Menu.vue'
import Footer from './components/Footer.vue'
//import Login from './components/Login.vue'
//import Register from './views/Register.vue'
import './style.css';  // Si ton fichier style.css est dans le même répertoire
import routeur from "./routeur/routeur"
import test from "./components/test.vue"
</script>

<template>
<test/>
<Menu />
<Footer />
<RouterView/>
  
  
  
  
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
