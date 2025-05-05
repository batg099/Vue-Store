<template>
  <div class="cart-page">
    <h1 class="cart-title">Votre Panier</h1>

    <div v-if="cartItems.length > 0" class="cart-container">
      <ul class="cart-items">
        <li v-for="(item, index) in cartItems" :key="item.id" class="cart-item">
          <div class="item-image">
            <img :src="item.image" :alt="item.name" />
          </div>
          <div class="item-details">
            <h3 class="item-name">{{ item.name }}</h3>
            <p class="item-price">{{ item.price }} €</p>
            <div class="item-quantity">
              <button @click="decrementQuantity(index)" class="quantity-btn">-</button>
              <input type="number" v-model.number="item.quantity" min="1" class="quantity-input" @change="saveCart" />
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
        <p class="summary-subtotal">Sous-total: <span>{{ subtotal.toFixed(2) }} €</span></p>
        <p class="summary-shipping">Livraison: <span>{{ shippingCost.toFixed(2) }} €</span></p>
        <p class="summary-total">Total: <span>{{ total.toFixed(2) }} €</span></p>
        <button class="checkout-btn" :disabled="cartItems.length === 0">Passer à la caisse</button>
      </div>
    </div>

    <div v-else class="empty-cart">
      <p>Votre panier est vide.</p>
      <router-link to="/" class="continue-shopping">Continuer vos achats</router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed} from 'vue'
import { useCartStore } from "../stores/carte"

const cart = useCartStore()

const cartItems = computed(() => cart.items)
const subtotal = computed(() => cart.subtotal)
const shippingCost = 10.0
const total = computed(() => subtotal.value + shippingCost)

const incrementQuantity = (index: number) => {
  cart.incrementQuantity(index)
}

const decrementQuantity = (index: number) => {
  cart.decrementQuantity(index)
}

const removeItem = (index: number) => {
  cart.removeItem(index)
}

// Si l'utilisateur modifie manuellement le champ quantité, on sauvegarde
const saveCart = () => {
  cart.saveToLocalStorage()
}
</script>

<style scoped src="../styles/Panier.css"></style>
