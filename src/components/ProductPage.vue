<template>
  <div class="product-page">
    <div class="product-container">
      <div class="gallery-column">
        <div class="main-image-container">
          <img :src="getImageUrl(product.image_url)" class="main-image">
        </div>
      </div>

      <div class="info-column">
        <h1>{{ product.name }}</h1>
        
        <div class="price-box">
          <span class="price">{{ formatPrice(product.price) }} €</span>
          <span v-if="product.original_price" class="old-price">{{ formatPrice(product.original_price) }} €</span>
          <span v-if="product.is_promo" class="promo-tag">PROMO</span>
        </div>

        <div class="product-description">
          <p>{{ product.description }}</p>
        </div>

        <router-link to="/" class="back-button">← Retour aux produits</router-link>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { supabase } from '../supabase';

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
  name: 'ProductPage',
  setup() {
    const route = useRoute();
    const product = ref<Product>({} as Product);
    const loading = ref(true);

    const fetchProduct = async () => {
      try {
        const { data, error } = await supabase
          .from('products')
          .select('*')
          .eq('slug', route.params.slug)
          .single();

        if (error) throw error;
        product.value = data;
      } catch (err) {
        console.error(err);
      } finally {
        loading.value = false;
      }
    };

    const getImageUrl = (imagePath: string) => {
      return supabase.storage.from('test2').getPublicUrl(imagePath).data.publicUrl;
    };

    const formatPrice = (price: number) => {
      return price.toFixed(2).replace('.', ',');
    };

    onMounted(fetchProduct);

    return { 
      product,
      getImageUrl,
      formatPrice
    };
  }
});
</script>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.product-container {
  display: flex;
  gap: 40px;
}

.gallery-column {
  flex: 1;
}

.main-image {
  width: 100%;
  max-height: 600px;
  object-fit: contain;
}

.info-column {
  flex: 1;
  padding: 0 20px;
}

.price-box {
  margin: 20px 0;
  display: flex;
  align-items: center;
  gap: 15px;
}

.price {
  font-size: 24px;
  font-weight: bold;
}

.old-price {
  text-decoration: line-through;
  color: #999;
}

.promo-tag {
  background: #e63946;
  color: white;
  padding: 3px 8px;
  border-radius: 4px;
  font-size: 14px;
}

.back-button {
  display: inline-block;
  margin-top: 30px;
  color: #2c3e50;
  text-decoration: none;
  font-weight: bold;
}

.back-button:hover {
  text-decoration: underline;
}

@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
  }
}
</style>