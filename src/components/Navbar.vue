<template>
    <nav ref="navbar" class="navbar" :class="{ 'navbar-scrolled': scrolled }">
      <div class="container navbar-container">
        <div class="logo">GWEN</div>
        <div class="nav-links">
          <a href="#" class="nav-link">Accueil</a>
          <a href="#" class="nav-link">Collection</a>
          <a href="#" class="nav-link">Lookbook</a>
          <a href="#" class="nav-link">Nouveautés</a>
          <a href="#" class="nav-link">Contact</a>
        </div>
        <div class="nav-icons">
          <a href="#" class="icon-link">
            <span class="material-icons">search</span>
          </a>
          <a href="#" class="icon-link">
            <span class="material-icons">shopping_bag</span>
          </a>
          <a href="#" class="icon-link">
            <span class="material-icons">person_outline</span>
          </a>
        </div>
        <button class="mobile-menu-btn" @click="toggleMobileMenu">
          <span class="material-icons">{{ mobileMenuOpen ? 'close' : 'menu' }}</span>
        </button>
      </div>
      <div class="mobile-menu" :class="{ 'mobile-menu-open': mobileMenuOpen }">
        <a href="#" class="mobile-nav-link">Accueil</a>
        <a href="#" class="mobile-nav-link">Collection</a>
        <a href="#" class="mobile-nav-link">Lookbook</a>
        <a href="#" class="mobile-nav-link">Nouveautés</a>
        <a href="#" class="mobile-nav-link">Contact</a>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { ref, onMounted, onBeforeUnmount } from 'vue';
  
  const navbar = ref(null);
  const scrolled = ref(false);
  const mobileMenuOpen = ref(false);
  
  const checkScroll = () => {
    if (window.scrollY > 50) {
      scrolled.value = true;
    } else {
      scrolled.value = false;
    }
  };
  
  const toggleMobileMenu = () => {
    mobileMenuOpen.value = !mobileMenuOpen.value;
  };
  
  onMounted(() => {
    window.addEventListener('scroll', checkScroll);
    checkScroll(); // Vérifier l'état initial
  });
  
  onBeforeUnmount(() => {
    window.removeEventListener('scroll', checkScroll);
  });
  </script>