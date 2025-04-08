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
  import maillotom from '../assets/gwen.jpg'; 
  import OM125 from '../assets/gwen.jpg'; 
  import vintage from '../assets/gwen.jpg'; 
  
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
  .product-collection {
    max-width: 90%;
    margin: 0 auto;
  }
  
  h2 {
    font-size: 1.5rem;
    margin-bottom: 15px;
  }
  
  h3 {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
  
  h4 {
    font-size: 1rem;
    margin: 5px 0;
  }
  
  .product-grid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 10px;
  }
  
  .product {
    border: 1px solid;
    padding: 8px;
    text-align: center;
    border-radius: 4px;
    background-color: #fff;
    transition: transform 0.2s, box-shadow 0.2s;
  }
  
  .product:hover {
    transform: translateY(-3px);
  }
  
  .product-image {
    width: 80%;
    height: auto;
    object-fit: cover;
    transition: transform 0.3s;
  }
  
  p {
    font-size: 0.8em;
    color: #555;
    margin: 3px 0;
  }
  
  button {
    background-color: #4CAF50;
    color: white;
    border: none;
    padding: 6px 12px;
    cursor: pointer;
    border-radius: 4px;
    font-size: 0.7em;
    margin-top: 5px;
  }
  
  button:hover {
    opacity: 0.9;
  }
  </style>