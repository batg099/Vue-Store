<template>
  <div 
    class="product-page" 
    tabindex="0" 
    @keydown.left="prevImage"
    @keydown.right="nextImage"
    @keydown.esc="closeLightbox"
    ref="pageContainer"
  >
    <div class="product-container">
      <!-- Colonne Galerie -->
      <div class="gallery-column">
        <div class="main-image-container" @mouseenter="showArrows = true" @mouseleave="showArrows = false">
          <img :src="currentImage" class="main-image" @click="openLightbox">
          <button 
            v-show="showArrows || isKeyboardNavigating" 
            class="nav-arrow left" 
            @click.stop="prevImage"
            @focus="isKeyboardNavigating = true"
            @blur="isKeyboardNavigating = false"
          >‹</button>
          <button 
            v-show="showArrows || isKeyboardNavigating" 
            class="nav-arrow right" 
            @click.stop="nextImage"
            @focus="isKeyboardNavigating = true"
            @blur="isKeyboardNavigating = false"
          >›</button>
        </div>
        <div class="thumbnails">
          <img 
            v-for="(img, index) in product.images" 
            :key="index"
            :src="img"
            @click="currentImageIndex = index"
            :class="{ active: currentImageIndex === index }"
          >
        </div>
      </div>

      <!-- Colonne Infos Produit -->
      <div class="info-column">
        <h1>{{ product.name }}</h1>
        
        <div class="price-box">
          <span class="price">€{{ product.price.toFixed(2) }}</span>
          <span class="availability" v-if="product.isPreorder">Précommande</span>
        </div>

        <div class="size-selector">
          <h3>TAILLES DISPONIBLES</h3>
          <div class="size-options">
            <button
              v-for="size in sizes"
              :key="size"
              @click="selectSize(size)"
              :class="{ selected: selectedSize === size, unavailable: !availableSizes.includes(size) }"
            >
              {{ size }}
            </button>
          </div>
        </div>

        <div class="quantity-selector">
          <h3>QUANTITÉ</h3>
          <div class="quantity-controls">
            <button @click="decreaseQuantity">-</button>
            <input type="number" v-model.number="quantity" min="1" max="10">
            <button @click="increaseQuantity">+</button>
          </div>
        </div>

        <button 
          class="add-to-cart" 
          @click="addToCart"
          :class="{ hovered: isHovered }"
          @mouseenter="isHovered = true"
          @mouseleave="isHovered = false"
        >
          AJOUTER AU PANIER
        </button>

        <div class="product-description">
          <h3>DESCRIPTION</h3>
          <p>{{ product.description }}</p>
        </div>
      </div>
    </div>

    <!-- Lightbox avec navigation -->
    <div v-if="showLightbox" class="lightbox" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <button class="close-btn" @click="closeLightbox">×</button>
        <img :src="currentImage" class="lightbox-image">
        <button class="lightbox-arrow left" @click.stop="prevImage">‹</button>
        <button class="lightbox-arrow right" @click.stop="nextImage">›</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import image1 from '@/assets/products/1.png';
import image2 from '@/assets/products/2.png';
import image3 from '@/assets/products/3.png';
import image4 from '@/assets/products/4.png';

export default defineComponent({
  name: 'ProductPage',
  data() {
    return {
      product: {
        name: "LEC CHAMP - PIECE OF HISTORY 2",
        price: 29.00,
        images: [image1, image2, image3, image4],
        isPreorder: true,
        description: "Le t-shirt LEC CHAMP - Place of History 2 est en précommande. Les livraisons débuteront à partir de fin avril."
      },
      sizes: ['XS', 'S', 'M', 'L', 'XL'],
      availableSizes: ['S', 'M', 'L'],
      selectedSize: '',
      currentImageIndex: 0,
      quantity: 1,
      showLightbox: false,
      showArrows: false,
      isHovered: false,
      isAddingToCart: false,
      isKeyboardNavigating: false
    };
  },
  computed: {
    currentImage(): string {
      return this.product.images[this.currentImageIndex];
    }
  },
  methods: {
    selectSize(size: string) {
      if (this.availableSizes.includes(size)) {
        this.selectedSize = size;
      }
    },
    increaseQuantity() {
      if (this.quantity < 10) this.quantity++;
    },
    decreaseQuantity() {
      if (this.quantity > 1) this.quantity--;
    },
    nextImage() {
      this.currentImageIndex = (this.currentImageIndex + 1) % this.product.images.length;
    },
    prevImage() {
      this.currentImageIndex = (this.currentImageIndex - 1 + this.product.images.length) % this.product.images.length;
    },
    async addToCart() {
      if (!this.selectedSize) {
        alert("Veuillez sélectionner une taille disponible");
        return;
      }

      this.isAddingToCart = true;
      await new Promise(resolve => setTimeout(resolve, 800));
      alert(`Ajouté au panier : ${this.product.name} - Taille ${this.selectedSize} (x${this.quantity})`);
      this.isAddingToCart = false;
    },
    openLightbox() {
      this.showLightbox = true;
      document.body.style.overflow = 'hidden';
    },
    closeLightbox() {
      this.showLightbox = false;
      document.body.style.overflow = '';
    },
    handleKeyDown(event: KeyboardEvent) {
      if (['ArrowLeft', 'ArrowRight', 'Escape'].includes(event.key)) {
        event.preventDefault();
      }

      switch(event.key) {
        case 'ArrowLeft':
          this.prevImage();
          break;
        case 'ArrowRight':
          this.nextImage();
          break;
        case 'Escape':
          if (this.showLightbox) this.closeLightbox();
          break;
      }
    }
  },
  mounted() {
    (this.$refs.pageContainer as HTMLElement)?.focus();
    window.addEventListener('keydown', this.handleKeyDown);
  },
  unmounted() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }
});
</script>

<style scoped>
.product-page {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
  outline: none;
}

.product-container {
  display: flex;
  gap: 40px;
}

.gallery-column {
  flex: 1;
  max-width: 50%;
}

.main-image-container {
  position: relative;
  margin-bottom: 20px;
  cursor: zoom-in;
}

.main-image {
  width: 100%;
  max-height: 600px;
  object-fit: contain;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  font-size: 24px;
  cursor: pointer;
  z-index: 10;
  transition: all 0.3s;
}

.nav-arrow.left { left: 15px; }
.nav-arrow.right { right: 15px; }

.nav-arrow:hover,
.nav-arrow:focus {
  background: rgba(0, 0, 0, 0.9);
  transform: translateY(-50%) scale(1.1);
  outline: none;
  box-shadow: 0 0 0 3px rgba(255,255,255,0.5);
}

.thumbnails {
  display: flex;
  gap: 10px;
  overflow-x: auto;
  padding-bottom: 10px;
}

.thumbnails img {
  width: 60px;
  height: 60px;
  object-fit: cover;
  cursor: pointer;
  border: 2px solid transparent;
  transition: all 0.2s;
}

.thumbnails img:hover,
.thumbnails img:focus {
  border-color: #ccc;
}

.thumbnails img.active {
  border-color: #000;
}

.info-column {
  flex: 1;
  max-width: 50%;
  padding: 0 20px;
}

.price-box {
  margin: 20px 0;
  display: flex;
  align-items: center;
}

.price {
  font-size: 24px;
  font-weight: bold;
}

.availability {
  margin-left: 15px;
  padding: 4px 8px;
  background: #f39c12;
  color: white;
  border-radius: 4px;
  font-size: 14px;
}

.size-selector {
  margin: 30px 0;
}

.size-options {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-top: 10px;
}

.size-options button {
  padding: 10px 15px;
  border: 1px solid #ddd;
  background: #fff;
  cursor: pointer;
  min-width: 50px;
  transition: all 0.2s;
}

.size-options button.selected {
  background: #000;
  color: #fff;
  border-color: #000;
}

.size-options button.unavailable {
  opacity: 0.5;
  cursor: not-allowed;
  text-decoration: line-through;
}

.size-options button:not(.unavailable):hover {
  border-color: #000;
}

.quantity-selector {
  margin: 30px 0;
}

.quantity-controls {
  display: flex;
  align-items: center;
  margin-top: 10px;
}

.quantity-controls button {
  width: 40px;
  height: 40px;
  font-size: 18px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  cursor: pointer;
}

.quantity-controls input {
  width: 60px;
  height: 38px;
  text-align: center;
  border: 1px solid #ddd;
  border-left: none;
  border-right: none;
  font-size: 16px;
}

.add-to-cart {
  width: 100%;
  padding: 15px;
  background: #000;
  color: #fff;
  border: none;
  cursor: pointer;
  font-weight: bold;
  margin: 30px 0;
  transition: all 0.3s;
  position: relative;
  overflow: hidden;
}

.add-to-cart.hovered {
  background: #333;
  transform: translateY(-2px);
  box-shadow: 0 4px 8px rgba(0,0,0,0.1);
}

.add-to-cart:active {
  transform: translateY(0);
}

.add-to-cart::after {
  content: "";
  position: absolute;
  top: 50%;
  left: 50%;
  width: 5px;
  height: 5px;
  background: rgba(255,255,255,0.5);
  opacity: 0;
  border-radius: 100%;
  transform: scale(1, 1) translate(-50%, -50%);
  transform-origin: 50% 50%;
}

.add-to-cart:focus:not(:active)::after {
  animation: ripple 0.6s ease-out;
}

@keyframes ripple {
  0% {
    transform: scale(0, 0);
    opacity: 0.5;
  }
  100% {
    transform: scale(20, 20);
    opacity: 0;
  }
}

.product-description {
  margin-top: 40px;
  padding-top: 20px;
  border-top: 1px solid #eee;
}

.lightbox {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,0.9);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 90%;
}

.lightbox-image {
  max-width: 100%;
  max-height: 80vh;
  object-fit: contain;
}

.close-btn {
  position: absolute;
  top: -50px;
  right: 0;
  background: none;
  border: none;
  color: white;
  font-size: 30px;
  cursor: pointer;
}

.lightbox-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255,255,255,0.3);
  color: white;
  border: none;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  font-size: 30px;
  cursor: pointer;
  z-index: 10;
}

.lightbox-arrow.left { left: 20px; }
.lightbox-arrow.right { right: 20px; }

.lightbox-arrow:hover,
.lightbox-arrow:focus {
  background: rgba(255,255,255,0.5);
  outline: none;
  box-shadow: 0 0 0 3px rgba(255,255,255,0.3);
}

@media (max-width: 768px) {
  .product-container {
    flex-direction: column;
  }
  
  .gallery-column,
  .info-column {
    max-width: 100%;
  }
  
  .nav-arrow {
    width: 30px;
    height: 30px;
    font-size: 18px;
  }
}
</style>