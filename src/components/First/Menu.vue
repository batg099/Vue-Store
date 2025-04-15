<template>
  <div class="product-section">
    <div class="product-grid">
      <div
        v-for="product in limitedProducts"
        :key="product.id"
        class="product-card"
      >
        <div class="product-image-container">
          <img :src="product.image" :alt="product.name" class="product-image" />
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
          <button class="add-to-cart-btn" @click="addToCart(product)">
            <span class="material-icons">add_shopping_cart</span>
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../../supabase'
import { useCartStore } from '../../stores/carte'

const cart = useCartStore()

const productImages = ref([null, null, null])
const limitedProducts = ref([])

const bucketName = 'test2'
const imageNames = ['1.png', '2.png', '3.png']

onMounted(async () => {
  await loadAllProductImages()
})

const getImageUrl = async (imageName) => {
  try {
    const { data, error } = supabase.storage
      .from(bucketName)
      .getPublicUrl(imageName)

    if (error) {
      console.error(`Erreur pour ${imageName} :`, error)
      return null
    }

    return data?.publicUrl ?? null
  } catch (err) {
    console.error(`Exception URL ${imageName} :`, err)
    return null
  }
}

const loadAllProductImages = async () => {
  const urls = await Promise.all(
    imageNames.map((name, index) =>
      getImageUrl(name).then((url) => {
        productImages.value[index] = url
        return url
      })
    )
  )

  limitedProducts.value = [
    {
      id: 1,
      name: 'Blazer Classique',
      price: 149.99,
      image: urls[0],
      colors: ['#30606e', '#1a1a2e', '#4c4c6d']
    },
    {
      id: 2,
      name: 'Chemise Élégance',
      price: 79.99,
      image: urls[1],
      colors: ['#ffffff', '#eaeaea', '#c9d1d3']
    },
    {
      id: 3,
      name: 'Pantalon Premium',
      price: 99.99,
      image: urls[2],
      colors: ['#1a1a2e', '#30606e']
    }
  ]
}

const addToCart = (product) => {
  cart.addItem({ ...product, quantity: 1 })
}
</script>

<style scoped src="../../styles/Menu.css"></style>
