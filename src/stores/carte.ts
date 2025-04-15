// src/stores/cart.ts
import { defineStore } from 'pinia';

// Typage pour un produit du panier
interface CartItem {
  id: number | string;
  name: string;
  price: number;
  quantity: number;
  [key: string]: any; // Permet d'accepter d'autres propriétés si besoin
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [] as CartItem[]
  }),

  getters: {
    subtotal: (state): number => {
      return state.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    },

    totalItems: (state): number => {
      return state.items.reduce((count, item) => count + item.quantity, 0);
    }
  },

  actions: {
    addItem(product: CartItem) {
      const existingItem = this.items.find(item => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += product.quantity ?? 1;
      } else {
        this.items.push({ ...product, quantity: product.quantity ?? 1 });
      }

      this.saveToLocalStorage();
    },

    removeItem(index: number) {
      if (index >= 0 && index < this.items.length) {
        this.items.splice(index, 1);
        this.saveToLocalStorage();
      }
    },

    incrementQuantity(index: number) {
      if (this.items[index]) {
        this.items[index].quantity++;
        this.saveToLocalStorage();
      }
    },

    decrementQuantity(index: number) {
      if (this.items[index] && this.items[index].quantity > 1) {
        this.items[index].quantity--;
        this.saveToLocalStorage();
      }
    },

    clearCart() {
      this.items = [];
      this.saveToLocalStorage();
    },

    saveToLocalStorage() {
      localStorage.setItem('cart', JSON.stringify(this.items));
    },

    loadFromLocalStorage() {
      const savedCart = localStorage.getItem('cart');
      if (savedCart) {
        try {
          this.items = JSON.parse(savedCart);
        } catch (e) {
          console.error('Erreur lors du chargement du panier :', e);
        }
      }
    }
  }
});
