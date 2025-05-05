<template>
  <div class="product-section">
    <div class="product-grid">
      <div
        v-for="product in products.slice(0, 3)"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image-container">
          <img :src="product.image_url" :alt="product.name" class="product-image" />
          <div class="product-overlay">
            <RouterLink :to="'/product/' + product.id">
              <button class="quick-view-btn">Aperçu rapide</button>
            </RouterLink>
          </div>
        </div>
        <div class="product-info">
          <h3 class="product-name">{{ product.name }}</h3>
          <div class="product-meta">
            <p class="product-price">{{ product.price }} €</p>
            <div class="product-colors" v-if="product.colors">
              <span
                v-for="(color, index) in product.colors"
                :key="index"
                class="color-dot"
                :style="{ backgroundColor: color }"
              ></span>
            </div>
          </div>
          <button class="add-to-cart-btn" @click="addToCart(product)">
            <span class="material-icons">add_shopping_cart</span>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
    <div v-if="loading" class="loading">Chargement des produits...</div>
    <div v-if="error" class="error">{{ error }}</div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'
import { useCartStore } from '../../stores/carte'
import { RouterLink } from 'vue-router'

const cart = useCartStore()
const products = ref([])
const loading = ref(true)
const error = ref(null)

// Charger les produits depuis la table Supabase "products"
onMounted(async () => {
  await fetchProducts()
})

const fetchProducts = async () => {
  try {
    loading.value = true
    
    // Récupérer les produits depuis la table Supabase "products"
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('id, name, price, description, image_url, slug, is_promo')
      .order('created_at', { ascending: false })
    
    if (fetchError) {
      throw fetchError
    }
    
    // Transformer les données et charger les images correctement
    const productsWithImages = await Promise.all(data.map(async product => {
      // Si image_url existe et semble être un chemin de fichier (et non une URL complète)
      let imageUrl = product.image_url;
      if (product.image_url && !product.image_url.startsWith('http')) {
        // Récupérer l'URL publique depuis le bucket Supabase
        const { data: urlData } = await supabase.storage
          .from('test2')
          .getPublicUrl(product.image_url);
        
        imageUrl = urlData?.publicUrl || null;
      }
      
      return {
        id: product.id,
        name: product.name, // Utilisation du nom depuis la table products
        price: product.price,
        image_url: imageUrl,
        image: imageUrl, // Pour la compatibilité avec le code existant
        description: product.description,
        slug: product.slug,
        is_promo: product.is_promo,
        // On peut ajouter un tableau de couleurs par défaut ou le récupérer d'une autre table si nécessaire
        colors: ['#30606e', '#1a1a2e', '#4c4c6d']
      };
    }));
    
    // Assigner le résultat à products.value
    products.value = productsWithImages;
    
    loading.value = false
  } catch (err) {
    console.error('Erreur lors du chargement des produits:', err)
    error.value = 'Impossible de charger les produits. Veuillez réessayer plus tard.'
    loading.value = false
  }
}

const addToCart = (product) => {
  cart.addItem({ ...product, quantity: 1 })
}
</script>

<style scoped src="../../styles/Menu.css"></style>