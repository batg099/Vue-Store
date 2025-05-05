<template>
    <div class="gallery-container">
      <div class="header">
        <h1>Nos Collections Exclusives</h1>
        <p class="subtitle">Découvrez nos pièces uniques sélectionnées pour vous</p>
      </div>
      
      <div v-if="loading" class="loading">
        <div class="loader"></div>
        <p>Chargement de nos collections...</p>
      </div>
      
      <div v-else>
        <div v-if="error" class="error">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
          <p>{{ error }}</p>
          <button @click="fetchProducts" class="retry-button">Réessayer</button>
        </div>
        
        <div v-else>
          <div class="filter-bar">
            <div class="search-container">
              <input type="text" v-model="searchTerm" placeholder="Rechercher un produit..." class="search-input">
            </div>
            <div class="filter-options">
              <button @click="toggleFilter('all')" :class="{ active: activeFilter === 'all' }" class="filter-button">Tous</button>
              <button @click="toggleFilter('promo')" :class="{ active: activeFilter === 'promo' }" class="filter-button">Promotions</button>
              <button @click="toggleFilter('sponsored')" :class="{ active: activeFilter === 'sponsored' }" class="filter-button">Sponsorisés</button>
            </div>
          </div>
          
          <transition-group name="fade" tag="div" class="products-grid">
            <router-link
              v-for="product in filteredProducts"
              :key="product.id"
              :to="'/product/' + product.id"
              class="product-card"
            >
              <!-- Badges -->
              <div v-if="product.is_promo" class="promo-badge">PROMO</div>
              <div v-if="product.is_sponsored" class="sponsored-badge">Sponsorisé</div>
              
              <!-- Image container avec overlay -->
              <div class="image-container">
                <img 
                  :src="getImageUrl(product.image_url)" 
                  :alt="product.name"
                  class="product-image"
                  @error="handleImageError"
                />
                <div class="overlay">
                  <button class="quick-view-btn">Aperçu rapide</button>
                </div>
              </div>
              
              <!-- Infos Produit -->
              <div class="product-info">
                <h3 class="product-name">{{ product.name }}</h3>
                <p class="product-description">{{ truncateDescription(product.description) }}</p>
                <div class="price-container">
                  <span class="current-price">{{ formatPrice(product.price) }} €</span>
                  <span v-if="product.original_price" class="old-price">{{ formatPrice(product.original_price) }} €</span>
                  <span v-if="product.original_price" class="discount">-{{ calculateDiscount(product.price, product.original_price) }}%</span>
                </div>
                <!-- <button class="add-to-cart-btn">Ajouter au panier</button> -->
              </div> 
            </router-link>
          </transition-group>
          
          <div v-if="filteredProducts.length === 0" class="no-results">
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              <line x1="11" y1="8" x2="11" y2="14"></line>
              <line x1="8" y1="11" x2="14" y2="11"></line>
            </svg>
            <p>Aucun produit ne correspond à votre recherche</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref, onMounted, computed } from 'vue';
  import { supabase } from '../supabase';
  import { useRouter } from 'vue-router';
  
  interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    original_price: number | null;
    image_url: string;
    slug: string;
    is_promo: boolean;
    is_sponsored: boolean;
  }
  
  export default defineComponent({
    name: 'ProductList',
    setup() {
      const router = useRouter();
      const products = ref<Product[]>([]);
      const loading = ref(true);
      const error = ref<string|null>(null);
      const searchTerm = ref('');
      const activeFilter = ref('all');
  
      const fetchProducts = async () => {
        try {
          loading.value = true;
          error.value = null;
          const { data, error: dbError } = await supabase
            .from('products')
            .select('*')
            .order('created_at', { ascending: false });
  
          if (dbError) throw dbError;
          products.value = data || [];
        } catch (err: any) {
          error.value = "Impossible de charger les produits. Veuillez réessayer.";
          console.error("Erreur:", err.message);
        } finally {
          loading.value = false;
        }
      };
  
      const filteredProducts = computed(() => {
        let filtered = products.value;
        
        // Filtrer par terme de recherche
        if (searchTerm.value) {
          const term = searchTerm.value.toLowerCase();
          filtered = filtered.filter(product => 
            product.name.toLowerCase().includes(term) || 
            product.description.toLowerCase().includes(term)
          );
        }
        
        // Filtrer par catégorie
        if (activeFilter.value === 'promo') {
          filtered = filtered.filter(product => product.is_promo);
        } else if (activeFilter.value === 'sponsored') {
          filtered = filtered.filter(product => product.is_sponsored);
        }
        
        return filtered;
      });
  
      const toggleFilter = (filter: string) => {
        activeFilter.value = filter;
      };
  
      const getImageUrl = (imagePath: string) => {
        return `${supabase.storage.from('test2').getPublicUrl(imagePath).data.publicUrl}?t=${Date.now()}`;
      };
  
      const formatPrice = (price: number) => {
        return price.toFixed(2).replace('.', ',');
      };
  
      const calculateDiscount = (currentPrice: number, originalPrice: number) => {
        const discount = Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
        return discount;
      };
  
      const truncateDescription = (description: string) => {
        return description && description.length > 60 
          ? description.substring(0, 60) + '...' 
          : description;
      };
  
      const handleImageError = (e: Event) => {
        const img = e.target as HTMLImageElement;
        img.src = '/assets/placeholder.jpg'; // Image de remplacement
        img.onerror = null; // Éviter les boucles infinies
      };
  
      const getFirstLetterFromImageUrl = (imageUrl: string) => {
        if (!imageUrl) return ''; // Gérer le cas où l'URL est vide
        const parts = imageUrl.split('/'); // Séparer l'URL par les slashs
        const filename = parts[parts.length - 1]; // Le nom du fichier est le dernier élément
        if (!filename) return ''; // Gérer le cas où il n'y a pas de nom de fichier
        return filename.charAt(0); // Prendre le premier caractère
      };
  
      onMounted(fetchProducts);
  
      return { 
        products,
        filteredProducts, 
        loading, 
        error,
        searchTerm,
        activeFilter,
        toggleFilter,
        getFirstLetterFromImageUrl,
        getImageUrl,
        formatPrice,
        calculateDiscount,
        truncateDescription,
        handleImageError,
        fetchProducts
      };
    }
  });
  </script>
  
  <style scoped>
  /* Variables de couleurs et de tailles */
  :root {
    --primary-color: #4a6fa5;
    --secondary-color: #e63946;
    --background-color: #f8f9fa;
    --text-color: #2c3e50;
    --light-gray: #e9ecef;
    --gray: #6c757d;
    --border-radius: 8px;
    --shadow: 0 5px 15px rgba(0,0,0,0.1);
    --transition: all 0.3s ease;
  }
  
  /* Styles globaux */
  .gallery-container {
    max-width: 1300px;
    margin: 0 auto;
    padding: 40px 20px;
    background-color: var(--background-color);
  }
  
  /* En-tête */
  .header {
    text-align: center;
    margin-bottom: 40px;
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  
  .header h1 {
    font-size: 2.5rem;
    color: var(--primary-color);
    margin-bottom: 10px;
    font-weight: 700;
  }
  
  .subtitle {
    color: var(--gray);
    font-size: 1.1rem;
  }
  
  /* Barre de filtres */
  .filter-bar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 30px;
    flex-wrap: wrap;
    gap: 20px;
  }
  
  .search-container {
    flex: 1;
    min-width: 250px;
  }
  
  .search-input {
    width: 100%;
    padding: 12px 20px;
    border: 1px solid #ddd;
    border-radius: 25px;
    font-size: 1rem;
    transition: var(--transition);
    background-color: white;
  }
  
  .search-input:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 2px rgba(74, 111, 165, 0.2);
  }
  
  .filter-options {
    display: flex;
    gap: 10px;
  }
  
  .filter-button {
    padding: 8px 16px;
    background-color: white;
    border: 1px solid #ddd;
    border-radius: 20px;
    cursor: pointer;
    transition: var(--transition);
    font-weight: 500;
  }
  
  .filter-button:hover {
    background-color: #f1f1f1;
  }
  
  .filter-button.active {
    background-color: var(--primary-color);
    color: white;
    border-color: var(--primary-color);
  }
  
  /* Grille de produits */
  .products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 30px;
  }
  
  /* Carte de produit */
  .product-card {
    background-color: white;
    border-radius: var(--border-radius);
    overflow: hidden;
    box-shadow: var(--shadow);
    transition: var(--transition);
    position: relative;
    display: block;
    text-decoration: none;
    color: inherit;
  }
  
  .product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(0,0,0,0.1);
  }
  
  /* Container d'image avec overlay */
  .image-container {
    position: relative;
    overflow: hidden;
    height: 280px;
  }
  
  .product-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.5s ease;
  }
  
  .product-card:hover .product-image {
    transform: scale(1.05);
  }
  
  .overlay {
    position: absolute;
    bottom: -60px;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.7);
    padding: 15px;
    transition: bottom 0.3s ease;
    display: flex;
    justify-content: center;
  }
  
  .product-card:hover .overlay {
    bottom: 0;
  }
  
  .quick-view-btn {
    background-color: white;
    color: var(--text-color);
    border: none;
    padding: 8px 15px;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
    transition: var(--transition);
  }
  
  .quick-view-btn:hover {
    background-color: var(--primary-color);
    color: white;
  }
  
  /* Informations sur le produit */
  .product-info {
    padding: 20px;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  
  .product-name {
    font-size: 1.2rem;
    color: var(--text-color);
    font-weight: 600;
    margin: 0;
  }
  
  .product-description {
    color: var(--gray);
    font-size: 0.9rem;
    margin: 0;
    line-height: 1.4;
  }
  
  .price-container {
    display: flex;
    align-items: center;
    gap: 10px;
    margin: 5px 0;
  }
  
  .current-price {
    font-weight: 700;
    font-size: 1.3rem;
    color: var(--text-color);
  }
  
  .old-price {
    text-decoration: line-through;
    color: var(--gray);
    font-size: 1rem;
  }
  
  .discount {
    background-color: var(--secondary-color);
    color: white;
    padding: 3px 8px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
  }
  
  .add-to-cart-btn {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 10px 15px;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 500;
    transition: var(--transition);
    margin-top: 10px;
    width: 100%;
  }
  
  .add-to-cart-btn:hover {
    background-color: #3a5a8c;
  }
  
  /* Badges */
  .promo-badge, .sponsored-badge {
    position: absolute;
    top: 15px;
    padding: 5px 12px;
    border-radius: 4px;
    font-size: 0.8rem;
    font-weight: bold;
    z-index: 2;
    box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  }
  
  .promo-badge {
    left: 15px;
    background: var(--secondary-color);
    color: white;
  }
  
  .sponsored-badge {
    right: 15px;
    background: var(--primary-color);
    color: white;
  }
  
  /* États de chargement et d'erreur */
  .loading, .error, .no-results {
    text-align: center;
    padding: 40px 20px;
    background-color: white;
    border-radius: var(--border-radius);
    box-shadow: var(--shadow);
    margin: 20px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 15px;
  }
  
  .loader {
    border: 5px solid #f3f3f3;
    border-top: 5px solid var(--primary-color);
    border-radius: 50%;
    width: 50px;
    height: 50px;
    animation: spin 1s linear infinite;
  }
  
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  .error {
    color: var(--secondary-color);
  }
  
  .retry-button {
    background-color: var(--primary-color);
    color: white;
    border: none;
    padding: 8px 15px;
    border-radius: var(--border-radius);
    cursor: pointer;
    font-weight: 500;
    transition: var(--transition);
    margin-top: 10px;
  }
  
  .retry-button:hover {
    background-color: #3a5a8c;
  }
  
  /* Animations */
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s, transform 0.3s;
  }
  
  .fade-enter-from, .fade-leave-to {
    opacity: 0;
    transform: translateY(10px);
  }
  
  /* Responsive */
  @media (max-width: 992px) {
    .products-grid {
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 20px;
    }
    
    .header h1 {
      font-size: 2rem;
    }
  }
  
  @media (max-width: 768px) {
    .filter-bar {
      flex-direction: column;
      align-items: stretch;
    }
    
    .search-container, .filter-options {
      width: 100%;
    }
    
    .filter-options {
      justify-content: center;
    }
    
    .header h1 {
      font-size: 1.8rem;
    }
  }
  
  @media (max-width: 576px) {
    .products-grid {
      grid-template-columns: 1fr;
    }
    
    .filter-options {
      flex-wrap: wrap;
    }
    
    .gallery-container {
      padding: 20px 15px;
    }
  }
  </style>