<template>
    <div class="cart-page">
      <h1 class="cart-title">Votre Panier</h1>
  
      <div v-if="cartItems.length > 0" class="cart-container">
        <ul class="cart-items">
          <li v-for="(item, index) in cartItems" :key="index" class="cart-item">
            <div class="item-image">
              <img :src="item.image" :alt="item.name">
            </div>
            <div class="item-details">
              <h3 class="item-name">{{ item.name }}</h3>
              <p class="item-price">{{ item.price }} €</p>
              <div class="item-quantity">
                <button @click="decrementQuantity(index)" class="quantity-btn">-</button>
                <input type="number" v-model.number="item.quantity" min="1" class="quantity-input">
                <button @click="incrementQuantity(index)" class="quantity-btn">+</button>
              </div>
            </div>
            <button @click="removeItem(index)" class="remove-item-btn">
              <span class="material-icons">delete</span>
            </button>
          </li>
        </ul>
  
        <div class="cart-summary">
          <h2 class="summary-title">Récapitulatif</h2>
          <p class="summary-subtotal">Sous-total: <span>{{ subtotal }} €</span></p>
          <p class="summary-shipping">Livraison: <span>{{ shippingCost }} €</span></p>
          <p class="summary-total">Total: <span>{{ total }} €</span></p>
          <button class="checkout-btn" :disabled="cartItems.length === 0">Passer à la caisse</button>
        </div>
      </div>
  
      <div v-else class="empty-cart">
        <p>Votre panier est vide.</p>
        <router-link to="/products" class="continue-shopping">Continuer vos achats</router-link>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useRouter, useRoute } from 'vue-router';
  
  const router = useRouter();
  const route = useRoute();
  
  // Exemple de données de panier (à remplacer par une gestion de panier réelle)
  const cartItems = ref([
    { id: 1, name: 'Blazer Classique Ajusté', price: 149.99, image: '/assets/product1.jpg', quantity: 1 },
    { id: 3, name: 'Pantalon Premium Coupe Droite', price: 99.99, image: '/assets/product3.jpg', quantity: 2 },
  ]);
  
  const shippingCost = ref(10.00); // Coût de livraison fixe
  
  const subtotal = computed(() => {
    return cartItems.value.reduce((sum, item) => sum + item.price * item.quantity, 0);
  });
  
  const total = computed(() => {
    return subtotal.value + shippingCost.value;
  });
  
  const incrementQuantity = (index) => {
    cartItems.value[index].quantity++;
  };
  
  const decrementQuantity = (index) => {
    if (cartItems.value[index].quantity > 1) {
      cartItems.value[index].quantity--;
    }
  };
  
  const removeItem = (index) => {
    cartItems.value.splice(index, 1);
  };
  </script>
  
  <style scoped src="../styles/Panier.css">


  </style>