<template>
  <div class="product-section">
    <div class="product-filters">
      <button 
        v-for="category in categories" 
        :key="category.id"
        @click="activeCategory = category.id"
        :class="{ active: activeCategory === category.id }"
        class="filter-btn"
      >
        {{ category.name }}
      </button>
    </div>
    
    <div class="product-grid">
      <div 
        v-for="product in filteredProducts" 
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
    
    <div class="view-all-container">
      <router-link to="/products" class="view-all-btn">
        Voir tous les produits
        <span class="material-icons">arrow_forward</span>
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue';

// Catégories de produits
const categories = [
  { id: 'all', name: 'Tous' },
  { id: 'new', name: 'Nouveautés' },
  { id: 'popular', name: 'Populaires' },
  { id: 'sale', name: 'Soldes' }
];

// État actif de la catégorie
const activeCategory = ref('all');

// Données de produits (à remplacer par une vraie API)
const products = [
  {
    id: 1,
    name: 'Blazer Classique',
    price: 149.99,
    image: '/assets/product1.jpg',
    category: ['new', 'popular'],
    colors: ['#30606e', '#1a1a2e', '#4c4c6d']
  },
  {
    id: 2,
    name: 'Chemise Élégance',
    price: 79.99,
    image: '/assets/product2.jpg',
    category: ['popular'],
    colors: ['#ffffff', '#eaeaea', '#c9d1d3']
  },
  {
    id: 3,
    name: 'Pantalon Premium',
    price: 99.99,
    image: '/assets/product3.jpg',
    category: ['new'],
    colors: ['#1a1a2e', '#30606e']
  },
  {
    id: 4,
    name: 'Cravate Prestige',
    price: 49.99,
    image: '/assets/product4.jpg',
    category: ['popular', 'sale'],
    colors: ['#1d3e4a', '#4a919e', '#7a0000']
  },
  {
    id: 5,
    name: 'Ensemble Professionnel',
    price: 249.99,
    image: '/assets/product5.jpg',
    category: ['new', 'popular'],
    colors: ['#30606e', '#1a1a2e']
  },
  {
    id: 6,
    name: 'Veste Structurée',
    price: 179.99,
    image: '/assets/product6.jpg',
    category: ['sale'],
    colors: ['#4a919e', '#1a1a2e', '#6e7a76']
  }
];

// Produits filtrés basés sur la catégorie active
const filteredProducts = computed(() => {
  if (activeCategory.value === 'all') {
    return products;
  }
  return products.filter(product => product.category.includes(activeCategory.value));
});
</script>

<style scoped>
.product-section {
  padding: 20px 0;
}

.product-filters {
  display: flex;
  justify-content: center;
  margin-bottom: 40px;
  flex-wrap: wrap;
  gap: 10px;
}

.filter-btn {
  background: transparent;
  border: none;
  padding: 10px 20px;
  font-size: 0.95rem;
  cursor: pointer;
  position: relative;
  color: var(--accent-color);
  font-weight: 500;
  transition: all 0.3s ease;
}

.filter-btn::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 0;
  height: 2px;
  background-color: var(--primary-color);
  transition: all 0.3s ease;
}

.filter-btn:hover::after {
  width: 50%;
}

.filter-btn.active {
  color: var(--primary-color);
  font-weight: 600;
}

.filter-btn.active::after {
  width: 80%;
}

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 30px;
}

.product-card {
  border-radius: 8px;
  overflow: hidden;
  background-color: white;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.product-image-container {
  position: relative;
  height: 300px;
  overflow: hidden;
}

.product-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: all 0.5s ease;
}

.product-card:hover .product-image {
  transform: scale(1.05);
}

.product-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(74, 145, 158, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: all 0.3s ease;
}

.product-card:hover .product-overlay {
  opacity: 1;
}

.quick-view-btn {
  background-color: white;
  color: var(--accent-color);
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.quick-view-btn:hover {
  background-color: var(--accent-color);
  color: white;
}

.product-info {
  padding: 20px;
}

.product-name {
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 15px;
}

.product-meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 15px;
}

.product-price {
  font-weight: 700;
  color: var(--primary-color);
  font-size: 1.1rem;
}

.product-colors {
  display: flex;
  gap: 5px;
}

.color-dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  display: inline-block;
  cursor: pointer;
  border: 1px solid rgba(0,0,0,0.1);
}

.add-to-cart-btn {
  width: 100%;
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 10px 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s ease;
}

.add-to-cart-btn:hover {
  background-color: var(--accent-color);
}

.view-all-container {
  text-align: center;
  margin-top: 50px;
}

.view-all-btn {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  padding: 12px 25px;
  background-color: transparent;
  color: var(--primary-color);
  border: 2px solid var(--primary-color);
  border-radius: 4px;
  text-decoration: none;
  font-weight: 600;
  transition: all 0.3s ease;
}

.view-all-btn:hover {
  background-color: var(--primary-color);
  color: white;
}

@media (max-width: 992px) {
  .product-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 576px) {
  .product-grid {
    grid-template-columns: 1fr;
  }
}
</style>