<template>
  <div class="product-detail-container">
    <!-- Affichage loader pendant le chargement -->
    <div v-if="loading" class="loading-container">
      <div class="loader"></div>
      <p>Chargement du produit...</p>
    </div>

    <!-- Message d'erreur si le produit n'est pas trouvé -->
    <div v-else-if="error" class="error-container">
      <p class="error-message">{{ error }}</p>
      <RouterLink to="/" class="back-link">
        <button class="back-button">Retour à la boutique</button>
      </RouterLink>
    </div>

    <!-- Affichage du produit -->
    <div v-else-if="product" class="product-detail">
      <div class="product-gallery">
        <div class="product-main-image">
          <img :src="product.image_url" :alt="product.name" class="main-image" />
          <span v-if="product.is_promo" class="promo-badge">PROMO</span>
        </div>
        <!-- Miniatures additionnelles si disponibles -->
        <div v-if="additionalImages.length > 0" class="product-thumbnails">
          <div 
            v-for="(img, index) in additionalImages" 
            :key="index" 
            class="thumbnail"
            @click="setMainImage(img)"
          >
            <img :src="img" :alt="`${product.name} - vue ${index + 1}`" />
          </div>
        </div>
      </div>

      <div class="product-info">
        <h1 class="product-title">{{ product.name }}</h1>
        
        <div class="product-price-container">
          <span class="product-price">{{ product.price }} €</span>
          <span v-if="product.original_price" class="product-original-price">{{ product.original_price }} €</span>
        </div>

        <div v-if="product.description" class="product-description">
          <p>{{ product.description }}</p>
        </div>

        <div class="product-colors" v-if="product.colors && product.colors.length > 0">
          <h3>Couleurs disponibles</h3>
          <div class="color-options">
            <span
              v-for="(color, index) in product.colors"
              :key="index"
              class="color-option"
              :class="{ active: selectedColor === color }"
              :style="{ backgroundColor: color }"
              @click="selectedColor = color"
            ></span>
          </div>
          <p v-if="selectedColor" class="selected-color-text">
            Couleur sélectionnée: <span class="color-name">{{ getColorName(selectedColor) }}</span>
          </p>
        </div>

        <div class="product-quantity">
          <h3>Quantité</h3>
          <div class="quantity-selector">
            <button 
              @click="decrementQuantity" 
              class="quantity-btn"
              :disabled="quantity <= 1"
            >-</button>
            <span class="quantity-value">{{ quantity }}</span>
            <button 
              @click="incrementQuantity" 
              class="quantity-btn"
            >+</button>
          </div>
        </div>

        <div class="product-actions">
          <button @click="addToCart" class="add-to-cart-btn">
            <span class="material-icons">shopping_cart</span>
            Ajouter au panier
          </button>
          <button @click="toggleFavorite" class="favorite-btn">
            <span class="material-icons">{{ isFavorite ? 'favorite' : 'favorite_border' }}</span>
          </button>
        </div>

        <div class="product-meta">
          <p v-if="product.slug" class="product-reference">Référence: {{ product.slug }}</p>
        </div>
      </div>
    </div>

    <!-- Section produits similaires -->
    <div v-if="similarProducts.length > 0" class="similar-products">
      <h2>Produits similaires</h2>
      <div class="similar-products-grid">
        <div 
          v-for="similarProduct in similarProducts" 
          :key="similarProduct.id"
          class="similar-product-card"
        >
          <RouterLink :to="`/product/${similarProduct.id}`">
            <div class="similar-product-image">
              <img :src="similarProduct.image_url" :alt="similarProduct.name" />
            </div>
            <div class="similar-product-info">
              <h3>{{ similarProduct.name }}</h3>
              <p class="similar-product-price">{{ similarProduct.price }} €</p>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, watch } from 'vue'
import { useRoute, RouterLink } from 'vue-router'
import { supabase } from '../supabase'
import { useCartStore } from '../stores/carte'

const route = useRoute()
const cart = useCartStore()

// État du composant
const product = ref(null)
const loading = ref(true)
const error = ref(null)
const quantity = ref(1)
const selectedColor = ref(null)
const similarProducts = ref([])
const additionalImages = ref([])
const isFavorite = ref(false)

// Observer les changements d'ID dans l'URL pour recharger le produit si nécessaire
watch(() => route.params.id, (newId) => {
  if (newId) {
    fetchProductById(newId)
  }
})

onMounted(() => {
  // Récupérer l'ID du produit depuis l'URL
  const productId = route.params.id
  if (productId) {
    fetchProductById(productId)
  } else {
    error.value = "ID de produit non spécifié"
    loading.value = false
  }
})

// Récupérer les détails du produit en fonction de l'ID
const fetchProductById = async (productId) => {
  try {
    loading.value = true
    error.value = null
    
    // Récupérer le produit par son ID
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('*')
      .eq('id', productId)
      .single()
    
    if (fetchError) {
      throw fetchError
    }
    
    if (!data) {
      error.value = "Produit non trouvé"
      loading.value = false
      return
    }
    
    // Traitement de l'image principale
    let mainImageUrl = data.image_url
    if (mainImageUrl && !mainImageUrl.startsWith('http')) {
      const { data: urlData } = await supabase.storage
        .from('test2')
        .getPublicUrl(mainImageUrl)
      
      mainImageUrl = urlData?.publicUrl || null
    }
    
    // Créer l'objet produit
    product.value = {
      ...data,
      image_url: mainImageUrl,
      colors: ['#30606e', '#1a1a2e', '#4c4c6d'] // Couleurs par défaut ou à récupérer d'une autre table
    }
    
    // Initialiser la couleur par défaut
    if (product.value.colors && product.value.colors.length > 0) {
      selectedColor.value = product.value.colors[0]
    }
    
    // Charger les images additionnelles (exemple, remplacer par votre logique)
    // Cette partie est un exemple - à adapter selon votre structure de données
    loadAdditionalImages(productId)
    
    // Charger les produits similaires
    fetchSimilarProducts(productId)
    
    loading.value = false
  } catch (err) {
    console.error('Erreur lors du chargement du produit:', err)
    error.value = "Impossible de charger les détails du produit"
    loading.value = false
  }
}

// Charger des images additionnelles (exemple)
const loadAdditionalImages = async (productId) => {
  // Exemple de logique - remplacer par votre propre implémentation
  // Ici on pourrait avoir une autre table avec les images additionnelles
  // Ou utiliser une convention de nommage pour les images dans le bucket
  additionalImages.value = [] // Réinitialiser

  // Simuler des images additionnelles - à remplacer par votre logique réelle
  /*
  try {
    const { data, error: listError } = await supabase.storage
      .from('test2')
      .list(`product-${productId}`)
    
    if (!listError && data) {
      // Traitement des images trouvées
      const imageUrls = await Promise.all(data.map(async (file) => {
        const { data: urlData } = await supabase.storage
          .from('test2')
          .getPublicUrl(`product-${productId}/${file.name}`)
        return urlData?.publicUrl
      }))
      
      additionalImages.value = imageUrls.filter(url => url)
    }
  } catch (err) {
    console.error('Erreur lors du chargement des images additionnelles:', err)
  }
  */
}

// Charger des produits similaires
const fetchSimilarProducts = async (currentProductId) => {
  try {
    // Exemple: récupérer 4 autres produits
    const { data, error: fetchError } = await supabase
      .from('products')
      .select('id, name, price, image_url')
      .neq('id', currentProductId) // Exclure le produit actuel
      .limit(4)
    
    if (fetchError) {
      console.error('Erreur lors du chargement des produits similaires:', fetchError)
      return
    }
    
    // Traiter les images des produits similaires
    const productsWithImages = await Promise.all(data.map(async (prod) => {
      let imageUrl = prod.image_url
      if (imageUrl && !imageUrl.startsWith('http')) {
        const { data: urlData } = await supabase.storage
          .from('test2')
          .getPublicUrl(imageUrl)
        
        imageUrl = urlData?.publicUrl || null
      }
      
      return {
        ...prod,
        image_url: imageUrl
      }
    }))
    
    similarProducts.value = productsWithImages
  } catch (err) {
    console.error('Erreur:', err)
  }
}

// Changer l'image principale (pour les miniatures)
const setMainImage = (imageUrl) => {
  if (product.value) {
    product.value.image_url = imageUrl
  }
}

// Fonctions pour la gestion de la quantité
const incrementQuantity = () => {
  quantity.value++
}

const decrementQuantity = () => {
  if (quantity.value > 1) {
    quantity.value--
  }
}

// Ajouter au panier
const addToCart = () => {
  if (product.value) {
    const cartItem = {
      ...product.value,
      quantity: quantity.value,
      selectedColor: selectedColor.value
    }
    
    cart.addItem(cartItem)
    
    // Optionnel: Afficher une confirmation
    alert(`${product.value.name} ajouté au panier !`)
  }
}

// Basculer favori
const toggleFavorite = () => {
  isFavorite.value = !isFavorite.value
  // Logique pour sauvegarder dans les favoris (localStorage, base de données, etc.)
}

// Obtenir le nom de la couleur à partir du code hexadécimal
const getColorName = (hexColor) => {
  // Mapper les codes hexadécimaux à des noms de couleurs (exemple)
  const colorMap = {
    '#30606e': 'Bleu marine',
    '#1a1a2e': 'Bleu nuit',
    '#4c4c6d': 'Violet foncé',
    '#ffffff': 'Blanc',
    '#eaeaea': 'Gris clair',
    '#c9d1d3': 'Gris argenté'
  }
  
  return colorMap[hexColor] || hexColor
}
</script>

<style scoped>
.product-detail-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem 1rem;
}

.loading-container, .error-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 400px;
  text-align: center;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: spin 1s linear infinite;
  margin-bottom: 1rem;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}

.error-message {
  color: #e74c3c;
  font-size: 1.2rem;
  margin-bottom: 1.5rem;
}

.back-button {
  background-color: #3498db;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

.back-button:hover {
  background-color: #2980b9;
}

.product-detail {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
}

.product-gallery {
  flex: 1;
  min-width: 300px;
}

.product-main-image {
  position: relative;
  margin-bottom: 1rem;
  border-radius: 8px;
  overflow: hidden;
}

.main-image {
  width: 100%;
  height: auto;
  object-fit: contain;
  border-radius: 8px;
}

.promo-badge {
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #e74c3c;
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 4px;
  font-weight: bold;
}

.product-thumbnails {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.thumbnail {
  width: 80px;
  height: 80px;
  border-radius: 4px;
  overflow: hidden;
  cursor: pointer;
  border: 2px solid transparent;
  transition: border-color 0.3s;
}

.thumbnail:hover {
  border-color: #3498db;
}

.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.product-info {
  flex: 1;
  min-width: 300px;
}

.product-title {
  font-size: 2rem;
  margin-bottom: 1rem;
  color: #2c3e50;
}

.product-price-container {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1.5rem;
}

.product-price {
  font-size: 1.8rem;
  font-weight: bold;
  color: #2c3e50;
}

.product-original-price {
  font-size: 1.2rem;
  text-decoration: line-through;
  color: #7f8c8d;
}

.product-description {
  margin-bottom: 2rem;
  line-height: 1.6;
  color: #34495e;
}

.product-colors {
  margin-bottom: 2rem;
}

.product-colors h3, .product-quantity h3 {
  font-size: 1.2rem;
  margin-bottom: 0.75rem;
  color: #2c3e50;
}

.color-options {
  display: flex;
  gap: 0.75rem;
  margin-bottom: 0.75rem;
}

.color-option {
  width: 30px;
  height: 30px;
  border-radius: 50%;
  cursor: pointer;
  border: 2px solid transparent;
  transition: transform 0.2s, border-color 0.2s;
}

.color-option:hover {
  transform: scale(1.1);
}

.color-option.active {
  border-color: #2c3e50;
}

.selected-color-text {
  font-size: 0.9rem;
  color: #7f8c8d;
}

.color-name {
  font-weight: bold;
  color: #2c3e50;
}

.product-quantity {
  margin-bottom: 2rem;
}

.quantity-selector {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.quantity-btn {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  font-size: 1.2rem;
  transition: background-color 0.2s;
}

.quantity-btn:hover:not(:disabled) {
  background-color: #e9ecef;
}

.quantity-btn:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.quantity-value {
  font-size: 1.2rem;
  min-width: 20px;
  text-align: center;
}

.product-actions {
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
}

.add-to-cart-btn {
  flex: 1;
  background-color: #4a919e;
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  transition: background-color 0.3s;
}

.add-to-cart-btn:hover {
  background-color: #4a919e;
}

.favorite-btn {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #f8f9fa;
  border: 1px solid #dee2e6;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: background-color 0.2s;
}

.favorite-btn:hover {
  background-color: #e9ecef;
}

.material-icons {
  font-size: 1.2rem;
}

.product-meta {
  font-size: 0.9rem;
  color: #7f8c8d;
}

/* Section produits similaires */
.similar-products {
  margin-top: 4rem;
}

.similar-products h2 {
  font-size: 1.5rem;
  margin-bottom: 1.5rem;
  color: #2c3e50;
}

.similar-products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1.5rem;
}

.similar-product-card {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
}

.similar-product-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
}

.similar-product-card a {
  text-decoration: none;
  color: inherit;
}

.similar-product-image {
  height: 150px;
  overflow: hidden;
}

.similar-product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.similar-product-card:hover .similar-product-image img {
  transform: scale(1.05);
}

.similar-product-info {
  padding: 1rem;
}

.similar-product-info h3 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
  color: #2c3e50;
}

.similar-product-price {
  font-weight: bold;
  color: #2c3e50;
}

/* Responsive design */
@media (max-width: 768px) {
  .product-detail {
    flex-direction: column;
  }
  
  .similar-products-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  }
}
</style>