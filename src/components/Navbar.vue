<script setup>
    import logo from "../assets/gwen.jpg"
    import Button from "primevue/button"
</script>

<template>
  <nav class="bg-blue-500 p-4">
    <div class="max-w-7xl mx-auto flex items-center justify-between">
      <!-- Logo -->
      <div class="text-white text-2xl font-semibold">
        <a href="#">MyLogo</a>
      </div>

      <!-- Menu principal -->
      <div class="hidden md:flex space-x-6">
        <a href="#" class="text-white hover:text-gray-300">Home</a>
        <a href="#" class="text-white hover:text-gray-300">About</a>
        <a href="#" class="text-white hover:text-gray-300">Services</a>
        <a href="#" class="text-white hover:text-gray-300">Contact</a>
        <img v-bind:src="logo">
      </div>

      <!-- Menu mobile -->
      <div class="md:hidden">
        <button @click="toggleMenu" class="text-white">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
          </svg>
        </button>
      </div>
    </div>

    <!-- Menu mobile (affiché lorsqu'il est activé) -->
    <div v-if="isMenuOpen" class="md:hidden bg-blue-500 p-4 space-y-4">
      <a href="#" class="text-white hover:text-gray-300 block">Home</a>
      <a href="#" class="text-white hover:text-gray-300 block">About</a>
      <a href="#" class="text-white hover:text-gray-300 block">Services</a>
      <a href="#" class="text-white hover:text-gray-300 block">Contact</a>
    </div>
  </nav>
  <InputText>hey</InputText>
  <button >Test</button>
</template>