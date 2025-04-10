<template>
  <div class="site-wrapper">
    <Navbar />
    <main>
      <!-- Section Hero -->
      <section class="hero">
        <div class="overlay"></div>
        <div class="content-container">
          <h1 class="headline">Élégance Moderne</h1>
          <p class="subtitle">Une collection inspirée par le professionnalisme et le style contemporain</p>
          <button class="cta-button">Découvrir</button>
        </div>
      </section>
      
      <!-- Section Produits -->
      <section class="products-section">
        <div class="container">
          <h2 class="section-title">Notre Collection</h2>
          <ProductMenu />
        </div>
      </section>
      
      <!-- Section Caractéristiques -->
      <section class="features-section">
        <div class="container">
          <h2 class="section-title">Qualité Exceptionnelle</h2>
          <p class="section-description">Des créations méticuleuses qui allient confort, élégance et durabilité pour les professionnels exigeants.</p>
          <div class="features-grid">
            <div class="feature-card">
              <div class="feature-icon">✓</div>
              <h3>Design Épuré</h3>
              <p>Lignes élégantes et minimalistes</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">✓</div>
              <h3>Matériaux Premium</h3>
              <p>Tissus sélectionnés avec soin</p>
            </div>
            <div class="feature-card">
              <div class="feature-icon">✓</div>
              <h3>Confort Inégalé</h3>
              <p>Pour un usage quotidien professionnel</p>
            </div>
          </div>
        </div>
      </section>
      
      <!-- Section Testimonials -->
      <section class="testimonials-section">
        <div class="container">
          <h2 class="section-title">Témoignages clients</h2>
          <div class="testimonials-slider">
            <div class="testimonial">
              <p>"Une élégance discrète qui transforme le quotidien professionnel. Exactement ce que je recherchais."</p>
              <div class="testimonial-author">Sophie M.</div>
            </div>
          </div>
        </div>
      </section>
    </main>
    <Ft />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import Navbar from "./Navbar.vue";
import Ft from "./Footer.vue";
import ProductMenu from "./Menu.vue";

// Animation au défilement
onMounted(() => {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach(section => {
    section.classList.add('fade-in');
    observer.observe(section);
  });
});
</script>

<style src="../styles/First.css"></style>
