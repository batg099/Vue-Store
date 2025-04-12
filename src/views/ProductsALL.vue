<template>
    <div class="products-page">
      <Navbar />
      
      <!-- Hero Banner -->
      <section class="products-banner">
        <div class="overlay"></div>
        <div class="banner-content">
          <h1>Notre Collection</h1>
          <p>Explorez notre gamme complète de vêtements professionnels de haute qualité</p>
        </div>
      </section>
      
      <!-- Breadcrumb -->
      <div class="breadcrumb container">
        <router-link to="/" class="breadcrumb-link">Accueil</router-link>
        <span class="separator">/</span>
        <span class="current">Collection</span>
      </div>
      
      <!-- Products Content -->
      <section class="products-content container">
        <!-- Sidebar -->
        <div class="product-sidebar">
          <div class="filter-section">
            <h3 class="filter-title">Catégories</h3>
            <div class="filter-options">
              <label class="filter-option">
                <input type="checkbox" v-model="filters.categories" value="blazers"> Blazers & Vestes
              </label>
              <label class="filter-option">
                <input type="checkbox" v-model="filters.categories" value="shirts"> Chemises
              </label>
              <label class="filter-option">
                <input type="checkbox" v-model="filters.categories" value="trousers"> Pantalons
              </label>
              <label class="filter-option">
                <input type="checkbox" v-model="filters.categories" value="accessories"> Accessoires
              </label>
              <label class="filter-option">
                <input type="checkbox" v-model="filters.categories" value="sets"> Ensembles
              </label>
            </div>
          </div>
          
          <div class="filter-section">
            <h3 class="filter-title">Couleurs</h3>
            <div class="color-options">
              <div 
                v-for="(color, idx) in colorOptions" 
                :key="idx"
                class="color-option"
                :class="{ active: filters.colors.includes(color.value) }"
                @click="toggleColorFilter(color.value)"
                :style="{ backgroundColor: color.hex }"
              ></div>
            </div>
          </div>
          
          <div class="filter-section">
            <h3 class="filter-title">Prix</h3>
            <div class="price-slider">
              <input 
                type="range" 
                v-model="filters.maxPrice" 
                min="0" 
                max="300" 
                step="10" 
                class="slider" 
              />
              <div class="price-range">0€ - {{ filters.maxPrice }}€</div>
            </div>
          </div>
          
          <button class="apply-filters-btn">
            Appliquer les filtres
            <span class="material-icons">filter_list</span>
          </button>
        </div>
        
        <!-- Products Display -->
        <div class="products-display">
          <div class="products-header">
            <div class="products-count">{{ filteredProducts.length }} produits</div>
            <div class="products-sort">
              <label for="sort-select">Trier par:</label>
              <select id="sort-select" v-model="sortOption" class="sort-select">
                <option value="featured">En vedette</option>
                <option value="price-low">Prix: Croissant</option>
                <option value="price-high">Prix: Décroissant</option>
                <option value="newest">Plus récents</option>
              </select>
            </div>
          </div>
          
          <div class="products-grid">
            <div 
              v-for="product in filteredProductsSorted" 
              :key="product.id" 
              class="product-card"
            >
              <div class="product-image-container">
                <img :src="product.image" :alt="product.name" class="product-image">
                <div class="product-badges" v-if="product.badges && product.badges.length">
                  <span 
                    v-for="(badge, index) in product.badges" 
                    :key="index"
                    class="product-badge"
                    :class="badge.type"
                  >
                    {{ badge.text }}
                  </span>
                </div>
                <div class="product-overlay">
                  <button class="action-btn">
                    <span class="material-icons">visibility</span>
                  </button>
                  <button class="action-btn">
                    <span class="material-icons">favorite_border</span>
                  </button>
                  <button class="action-btn">
                    <span class="material-icons">shopping_cart</span>
                  </button>
                </div>
              </div>
              <div class="product-info">
                <div class="product-category">{{ product.category }}</div>
                <h3 class="product-name">{{ product.name }}</h3>
                <div class="product-meta">
                  <p class="product-price">
                    <span v-if="product.oldPrice" class="old-price">{{ product.oldPrice }}€</span>
                    {{ product.price }}€
                  </p>
                  <div class="product-rating">
                    <span class="material-icons star">star</span>
                    <span>{{ product.rating }}</span>
                  </div>
                </div>
                <div class="product-colors">
                  <span 
                    v-for="(color, index) in product.colors" 
                    :key="index" 
                    class="color-dot" 
                    :style="{ backgroundColor: color }"
                  ></span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Pagination -->
          <div class="pagination">
            <button class="page-btn prev" :disabled="currentPage === 1">
              <span class="material-icons">navigate_before</span>
            </button>
            <button 
              v-for="page in totalPages" 
              :key="page" 
              class="page-btn number" 
              :class="{ active: currentPage === page }"
              @click="currentPage = page"
            >
              {{ page }}
            </button>
            <button class="page-btn next" :disabled="currentPage === totalPages">
              <span class="material-icons">navigate_next</span>
            </button>
          </div>
        </div>
      </section>
      
      <!-- Newsletter Section -->
      <section class="newsletter-section">
        <div class="container">
          <div class="newsletter-content">
            <h2>Restez informé</h2>
            <p>Inscrivez-vous à notre newsletter pour recevoir nos dernières nouveautés et offres exclusives</p>
            <form class="newsletter-form">
              <input type="email" placeholder="Votre adresse email" required class="newsletter-input">
              <button type="submit" class="newsletter-btn">S'inscrire</button>
            </form>
          </div>
        </div>
      </section>
      
      <Ft />
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import Navbar from "../components/Navbar.vue";
  import Ft from "../components/Footer.vue";
  
  // Filtres
  const filters = ref({
    categories: [],
    colors: [],
    maxPrice: 300
  });
  
  // Pagination
  const currentPage = ref(1);
  const productsPerPage = 9;
  
  // Options de tri
  const sortOption = ref('featured');
  
  // Options de couleurs
  const colorOptions = [
    { value: 'blue', hex: '#4a919e' },
    { value: 'darkblue', hex: '#1d3e4a' },
    { value: 'navy', hex: '#1a1a2e' },
    { value: 'white', hex: '#ffffff' },
    { value: 'grey', hex: '#e0e7e9' },
    { value: 'black', hex: '#333b42' },
  ];
  
  // Basculer le filtre de couleur
  const toggleColorFilter = (color) => {
    const index = filters.value.colors.indexOf(color);
    if (index === -1) {
      filters.value.colors.push(color);
    } else {
      filters.value.colors.splice(index, 1);
    }
  };
  
  // Données de produits (à remplacer par une vraie API)
  const allProducts = [
    {
      id: 1,
      name: 'Blazer Classique Ajusté',
      price: 149.99,
      image: '/assets/product1.jpg',
      category: 'Blazers & Vestes',
      categoryKey: 'blazers',
      rating: 4.8,
      colors: ['#30606e', '#1a1a2e', '#4c4c6d'],
      colorKeys: ['blue', 'navy', 'darkblue'],
      badges: [{ type: 'new', text: 'Nouveau' }]
    },
    {
      id: 2,
      name: 'Chemise Élégance Structurée',
      price: 79.99,
      image: '/assets/product2.jpg',
      category: 'Chemises',
      categoryKey: 'shirts',
      rating: 4.6,
      colors: ['#ffffff', '#eaeaea', '#c9d1d3'],
      colorKeys: ['white', 'grey']
    },
    {
      id: 3,
      name: 'Pantalon Premium Coupe Droite',
      price: 99.99,
      image: '/assets/product3.jpg',
      category: 'Pantalons',
      categoryKey: 'trousers',
      rating: 4.7,
      colors: ['#1a1a2e', '#30606e'],
      colorKeys: ['navy', 'blue'],
      badges: [{ type: 'new', text: 'Nouveau' }]
    },
    {
      id: 4,
      name: 'Cravate Prestige Soie',
      price: 49.99,
      oldPrice: 69.99,
      image: '/assets/product4.jpg',
      category: 'Accessoires',
      categoryKey: 'accessories',
      rating: 4.9,
      colors: ['#1d3e4a', '#4a919e', '#7a0000'],
      colorKeys: ['darkblue', 'blue'],
      badges: [{ type: 'sale', text: '-30%' }]
    },
    {
      id: 5,
      name: 'Ensemble Professionnel Complet',
      price: 249.99,
      image: '/assets/product5.jpg',
      category: 'Ensembles',
      categoryKey: 'sets',
      rating: 5.0,
      colors: ['#30606e', '#1a1a2e'],
      colorKeys: ['blue', 'navy'],
      badges: [{ type: 'new', text: 'Nouveau' }, { type: 'bestseller', text: 'Populaire' }]
    },
    {
      id: 6,
      name: 'Veste Structurée Premium',
      price: 179.99,
      oldPrice: 229.99,
      image: '/assets/product6.jpg',
      category: 'Blazers & Vestes',
      categoryKey: 'blazers',
      rating: 4.5,
      colors: ['#4a919e', '#1a1a2e', '#6e7a76'],
      colorKeys: ['blue', 'navy', 'grey'],
      badges: [{ type: 'sale', text: '-20%' }]
    },
    {
      id: 7,
      name: 'Chemise Contemporaine',
      price: 89.99,
      image: '/assets/product7.jpg',
      category: 'Chemises',
      categoryKey: 'shirts',
      rating: 4.3,
      colors: ['#ffffff', '#4a919e', '#1a1a2e'],
      colorKeys: ['white', 'blue', 'navy']
    },
    {
      id: 8,
      name: 'Chaussures Derby Premium',
      price: 159.99,
      image: '/assets/product8.jpg',
      category: 'Accessoires',
      categoryKey: 'accessories',
      rating: 4.7,
      colors: ['#333b42', '#6e4a38'],
      colorKeys: ['black']
    },
    {
      id: 9,
      name: 'Veston Slim Contemporain',
      price: 169.99,
      image: '/assets/product9.jpg',
      category: 'Blazers & Vestes',
      categoryKey: 'blazers',
      rating: 4.6,
      colors: ['#1a1a2e', '#4a919e'],
      colorKeys: ['navy', 'blue']
    },
    {
      id: 10,
      name: 'Pantalon Ajusté Professional',
      price: 109.99,
      image: '/assets/product10.jpg',
      category: 'Pantalons',
      categoryKey: 'trousers',
      rating: 4.5,
      colors: ['#333b42', '#1a1a2e', '#4c4c6d'],
      colorKeys: ['black', 'navy']
    },
    {
      id: 11,
      name: 'Ensemble Business Deluxe',
      price: 299.99,
      oldPrice: 349.99,
      image: '/assets/product11.jpg',
      category: 'Ensembles',
      categoryKey: 'sets',
      rating: 4.9,
      colors: ['#1d3e4a', '#333b42'],
      colorKeys: ['darkblue', 'black'],
      badges: [{ type: 'sale', text: '-15%' }, { type: 'bestseller', text: 'Populaire' }]
    },
    {
      id: 12,
      name: 'Pochette Élégance',
      price: 29.99,
      image: '/assets/product12.jpg',
      category: 'Accessoires',
      categoryKey: 'accessories',
      rating: 4.4,
      colors: ['#1d3e4a', '#ffffff', '#333b42'],
      colorKeys: ['darkblue', 'white', 'black']
    }
  ];
  
  // Produits filtrés
  const filteredProducts = computed(() => {
    return allProducts.filter(product => {
      // Filtre par catégorie
      if (filters.value.categories.length > 0 && !filters.value.categories.includes(product.categoryKey)) {
        return false;
      }
      
      // Filtre par couleur
      if (filters.value.colors.length > 0 && !product.colorKeys.some(color => filters.value.colors.includes(color))) {
        return false;
      }
      
      // Filtre par prix
      if (product.price > filters.value.maxPrice) {
        return false;
      }
      
      return true;
    });
  });
  
  // Produits triés
  const filteredProductsSorted = computed(() => {
    const products = [...filteredProducts.value];
    
    switch(sortOption.value) {
      case 'price-low':
        return products.sort((a, b) => a.price - b.price);
      case 'price-high':
        return products.sort((a, b) => b.price - a.price);
      case 'newest':
        return products.sort((a, b) => {
          if (a.badges && a.badges.some(badge => badge.type === 'new') && 
              (!b.badges || !b.badges.some(badge => badge.type === 'new'))) {
            return -1;
          }
          if ((!a.badges || !a.badges.some(badge => badge.type === 'new')) && 
              b.badges && b.badges.some(badge => badge.type === 'new')) {
            return 1;
          }
          return 0;
        });
      default: // featured
        return products.sort((a, b) => {
          // Mettre en avant les best-sellers puis les nouveautés
          const aIsBestseller = a.badges && a.badges.some(badge => badge.type === 'bestseller');
          const bIsBestseller = b.badges && b.badges.some(badge => badge.type === 'bestseller');
          
          if (aIsBestseller && !bIsBestseller) return -1;
          if (!aIsBestseller && bIsBestseller) return 1;
          
          return b.rating - a.rating; // Puis par évaluation
        });
    }
  });
  
  // Pages totales
  const totalPages = computed(() => {
    return Math.ceil(filteredProducts.value.length / productsPerPage);
  });
  
  // Produits paginés
  const paginatedProducts = computed(() => {
    const start = (currentPage.value - 1) * productsPerPage;
    const end = start + productsPerPage;
    return filteredProductsSorted.value.slice(start, end);
  });
  </script>
  
  <style scoped>
  /* Products Page Styling */
  .products-page {
    min-height: 100vh;
    background-color: var(--light-color);
  }
  
  /* Banner Section */
  .products-banner {
    height: 40vh;
    background-image: linear-gradient(rgba(26, 41, 48, 0.5), rgba(26, 41, 48, 0.7)), url('../assets/banner-products.jpg');
    background-size: cover;
    background-position: center;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--light-text);
  }
  
  .products-banner .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(29, 62, 74, 0.3);
  }
  
  .banner-content {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 0 20px;
  }
  
  .banner-content h1 {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .banner-content p {
    font-size: 1.1rem;
    max-width: 600px;
    margin: 0 auto;
    opacity: 0.9;
  }
  
  /* Breadcrumb */
  .breadcrumb {
    display: flex;
    padding: 20px 0;
    color: var(--text-color);
    font-size: 0.9rem;
  }
  
  .breadcrumb-link {
    color: var(--primary-color);
    text-decoration: none;
    transition: all 0.3s ease;
  }
  
  .breadcrumb-link:hover {
    color: var(--accent-color);
  }
  
  .separator {
    margin: 0 10px;
    color: #aaa;
  }
  
  .current {
    font-weight: 600;
  }
  
  /* Products Content Layout */
  .products-content {
    display: flex;
    gap: 30px;
    padding: 40px 0 80px;
  }
  
  /* Sidebar Styles */
  .product-sidebar {
    width: 280px;
    flex-shrink: 0;
  }
  
  .filter-section {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }
  
  .filter-title {
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 15px;
    color: var(--accent-color);
  }
  
  .filter-option {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
    cursor: pointer;
    font-size: 0.95rem;
  }
  
  .filter-option input {
    margin-right: 10px;
  }
  
  .color-options {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
  }
  
  .color-option {
    width: 25px;
    height: 25px;
    border-radius: 50%;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 2px solid transparent;
  }
  
  .color-option.active {
    transform: scale(1.1);
    border-color: var(--primary-color);
  }
  
  .price-slider {
    padding: 10
  }
  .price-slider .slider {
    width: 100%;
    margin-top: 10px;
  }

  .price-range {
    margin-top: 10px;
    font-size: 0.9rem;
    color: var(--text-color);
  }

  .apply-filters-btn {
    display: flex;
    align-items: center;
    gap: 8px;
    background-color: var(--primary-color);
    color: #fff;
    padding: 10px 16px;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .apply-filters-btn:hover {
    background-color: var(--accent-color);
  }

  /* Products Display */
  .products-display {
    flex: 1;
  }

  .products-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }

  .products-count {
    font-size: 1rem;
    color: var(--text-color);
  }

  .products-sort {
    display: flex;
    align-items: center;
    gap: 10px;
  }

  .sort-select {
    padding: 6px 10px;
    font-size: 0.95rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }

  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(260px, 1fr));
    gap: 30px;
  }

  .product-card {
    background-color: #fff;
    border-radius: 10px;
    overflow: hidden;
    box-shadow: 0 4px 12px rgba(0,0,0,0.06);
    transition: transform 0.3s ease;
  }

  .product-card:hover {
    transform: translateY(-5px);
  }

  .product-image-container {
    position: relative;
    overflow: hidden;
  }

  .product-image {
    width: 100%;
    display: block;
    height: auto;
  }

  .product-badges {
    position: absolute;
    top: 10px;
    left: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
  }

  .product-badge {
    background-color: var(--primary-color);
    color: #fff;
    font-size: 0.75rem;
    padding: 3px 8px;
    border-radius: 4px;
    font-weight: bold;
  }

  .product-badge.sale {
    background-color: #e74c3c;
  }

  .product-badge.new {
    background-color: #27ae60;
  }

  .product-badge.bestseller {
    background-color: #f39c12;
  }

  .product-overlay {
    position: absolute;
    bottom: 10px;
    right: 10px;
    display: flex;
    gap: 8px;
    opacity: 0;
    transition: opacity 0.3s ease;
  }

  .product-card:hover .product-overlay {
    opacity: 1;
  }

  .action-btn {
    background-color: rgba(255,255,255,0.9);
    border: none;
    padding: 6px;
    border-radius: 50%;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .product-info {
    padding: 15px;
  }

  .product-category {
    font-size: 0.85rem;
    color: var(--accent-color);
    margin-bottom: 5px;
  }

  .product-name {
    font-size: 1.1rem;
    margin-bottom: 10px;
    font-weight: 600;
  }

  .product-meta {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .product-price {
    font-size: 1rem;
    color: var(--primary-color);
  }

  .old-price {
    text-decoration: line-through;
    margin-right: 6px;
    color: #aaa;
  }

  .product-rating {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 0.9rem;
  }

  .product-rating .star {
    color: #f1c40f;
  }

  .product-colors {
    margin-top: 10px;
    display: flex;
    gap: 6px;
  }

  .color-dot {
    width: 14px;
    height: 14px;
    border-radius: 50%;
    border: 1px solid #ccc;
  }

  /* Pagination */
  .pagination {
    display: flex;
    justify-content: center;
    margin-top: 40px;
    gap: 10px;
  }

  .page-btn {
    padding: 8px 12px;
    border: none;
    background-color: #f1f1f1;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.2s ease;
  }

  .page-btn:hover:not(:disabled) {
    background-color: #ddd;
  }

  .page-btn.active {
    background-color: var(--primary-color);
    color: #fff;
    font-weight: bold;
  }

  .page-btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  /* Newsletter Section */
  .newsletter-section {
    background-color: var(--dark-color);
    color: #fff;
    padding: 60px 0;
    text-align: center;
  }

  .newsletter-content h2 {
    font-size: 2rem;
    margin-bottom: 10px;
  }

  .newsletter-content p {
    font-size: 1rem;
    margin-bottom: 20px;
  }

  .newsletter-form {
    display: flex;
    justify-content: center;
    gap: 10px;
    flex-wrap: wrap;
  }

  .newsletter-input {
    padding: 10px;
    width: 280px;
    border: none;
    border-radius: 4px;
  }

  .newsletter-btn {
    padding: 10px 20px;
    background-color: var(--primary-color);
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background 0.3s ease;
  }

  .newsletter-btn:hover {
    background-color: var(--accent-color);
  }
  /* ... styles existants ... */

/* Améliorations pour les filtres */
.filter-option input:checked + span {
  font-weight: bold; /* Indiquer visuellement les filtres actifs */
}

.apply-filters-btn {
  /* ... styles existants ... */
  position: sticky; /* Le bouton reste visible au défilement dans la sidebar */
  bottom: 20px;
}

/* Améliorations pour la présentation des produits */
.product-card .product-image-container {
  overflow: hidden; /* Assure que l'overlay reste dans le conteneur */
}

.product-card:hover .product-image {
  transform: scale(1.05); /* Zoom subtil au survol */
  transition: transform 0.3s ease-in-out;
}

.product-overlay {
  /* ... styles existants ... */
  background-color: rgba(74, 145, 158, 0.7); /* Légèrement plus opaque */
  backdrop-filter: blur(5px); /* Ajoute un effet de flou derrière l'overlay */
}

.action-btn:hover {
  background-color: var(--accent-color);
  color: white;
}

.product-badges .product-badge {
  /* ... styles existants ... */
  animation: pulseBadge 1.5s infinite alternate; /* Animation subtile */
}

@keyframes pulseBadge {
  0% { transform: scale(1); }
  100% { transform: scale(1.1); }
}

/* Améliorations pour la pagination */
.pagination .page-btn {
  /* ... styles existants ... */
  min-width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%; /* Forme plus douce */
}

/* Améliorations pour la newsletter */
.newsletter-section {
  /* ... styles existants ... */
  background-image: linear-gradient(rgba(35, 35, 35, 0.7), rgba(35, 35, 35, 0.9)), url('../assets/newsletter-bg.jpg'); /* Ajouter une image de fond */
  background-size: cover;
  background-position: center;
}
</style>
