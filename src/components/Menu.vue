<template>
  <div class="product-collection">
    <h2>Nos produits</h2>
    <div v-for="category in categories" :key="category.name" class="category">
      <h3>{{ category.name }}</h3>
      <div class="product-grid">
        <div v-for="product in category.products" :key="product.id" class="product">
          <img :src="product.image" :alt="product.name" class="product-image" />
          <h4>{{ product.name }}</h4>
          <p>{{ product.description }}</p>
          <p>{{ product.price }}</p>
          <button @click="addToCart(product)">Ajouter au panier</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import maillotom from '../assets/maillotom.jpg'; 
import OM125 from '../assets/OM125.jpg'; 
import vintage from '../assets/vintage.jpg'; 

export default defineComponent({
  name: 'Menu',
  data() {
    return {
      categories: [
        {
          name: 'Maillots',
          products: [
            { id: 3, name: 'Maillot OM 125 ans', description: 'OM 125 ans', price: '€100,00', image: OM125 },
            { id: 4, name: 'Maillot exterieur 2025', description: 'Extérieur 2025', price: '€100,00', image: maillotom }, 
            { id: 5, name: 'Maillot Vintage', description: 'Vintage', price: '€100,00', image: vintage },
          ],
        },
      ],
    };
  },
  methods: {
    addToCart(product: any) {
      // Logique pour ajouter le produit au panier
      console.log('Produit ajouté au panier:', product);
    },
  },
});
</script>

<style scoped>

.product-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.product {
  border: 1px solid;
  padding: 15px;
  text-align: center;
  border-radius: 8px;
  background-color: #fff;
  transition: transform 0.2s, box-shadow 0.2s;
}

.product:hover {
  transform: translateY(-5px);
}

.product-image {
  object-fit: cover; 
  transition: transform 0.3s;
}

.product:hover .product-image {
  transform: scale(1.1); 
}

p {
  font-size: 0.9em;
  color: #555;
  margin: 5px 0;
}

button {
  background-color: #4CAF50;
  color: white;
  border: none;
  padding: 8px 16px;
  cursor: pointer;
  border-radius: 5px;
  font-size: 0.8em;
  margin-top: 10px;
  opacity: 0.8;
  transition: opacity 0.2s ease;
}

button:hover {
  opacity: 1; 
}
</style>