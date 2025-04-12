<template>
  <div class="product-section">
    <div class="product-grid">
      <div
        v-for="product in limitedProducts"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image">
          <div class="product-overlay">
            <button class="quick-view-btn">Aperçu rapide</button>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="product-meta">
            <p class="product-price">{{ product.price }} €</p>
            <div class="product-colors">
              <span
                v-for="(color, index) in product.colors"
                :key="index"
                class="color-dot"
                :style="{ backgroundColor: color }"
              ></span>
            </div>
          </div>
          <button class="add-to-cart-btn">
            <span class="material-icons">add_shopping_cart</span>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import product1 from '../../assets/products/1.png';
import product2 from '../../assets/products/2.png';
import product3 from '../../assets/products/3.png';
// Données de trois produits uniquement
const limitedProducts = [
  {
    id: 1,
    name: 'Blazer Classique',
    price: 149.99,
    image: product1,
    colors: ['#30606e', '#1a1a2e', '#4c4c6d']
  },
  {
    id: 2,
    name: 'Chemise Élégance',
    price: 79.99,
    image: product2,
    colors: ['#ffffff', '#eaeaea', '#c9d1d3']
  },
  {
    id: 3,
    name: 'Pantalon Premium',
    price: 99.99,
    image: product3,
    colors: ['#1a1a2e', '#30606e']
  }
];
</script>

<style scoped src="../../styles/Menu.css"> </style>