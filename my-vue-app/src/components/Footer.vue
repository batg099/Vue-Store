<template>
  <footer class="footer">
    <div class="footer-container">
      <!-- Column 1: CATALOGUE -->
      <div class="footer-column">
        <h3 class="footer-heading">CATALOGUE</h3>
        <ul class="footer-list">
          <li><a href="#" class="footer-link">Accessoires</a></li>
          <li><a href="#" class="footer-link">Essentials</a></li>
          <li><a href="#" class="footer-link">Pro Kit</a></li>
          <li><a href="#" class="footer-link">Nos produits</a></li>
        </ul>
      </div>

      <!-- Column 2: INFORMATIONS -->
      <div class="footer-column">
        <h3 class="footer-heading">INFORMATIONS</h3>
        <ul class="footer-list">
          <li><a href="#" class="footer-link">FAQ</a></li>
          <li><a href="#" class="footer-link">Contact</a></li>
          <li><a href="#" class="footer-link">Légende Du Club</a></li>
          <li><a href="#" class="footer-link">Mentions Légales</a></li>
          <li><a href="#" class="footer-link">Conditions Générales de Vente</a></li>
          <li><a href="#" class="footer-link">Politique de Confidentialité</a></li>
        </ul>
      </div>

      <!-- Column 3: MODES DE PAIEMENT -->
      <div class="footer-column">
        <h3 class="footer-heading">MODES DE PAIEMENT</h3>
        <ul class="footer-list">
          <li>
            <img src="@/assets/paypal.png" alt="PayPal" class="payment-image" />
          </li>
          <li>
            <img src="./assets/visa.png" alt="VISA" class="payment-image" />
          </li>
        </ul>
      </div>
    </div>
  </footer>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Footer',
});
</script>

<style scoped>
/* Footer Styles */
.footer {
  background-color: #2d3748; /* Dark gray background */
  color: #ffffff; /* White text */
  padding: 2rem 0;
  width: 100%;
  margin: 0;
}

.footer-container {
  max-width: 1200px; /* Limit content width */
  margin: 0 auto; /* Center the content */
  padding: 0 1rem; /* Add padding to the sides */
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
}

.footer-column {
  display: flex;
  flex-direction: column;
}

.footer-heading {
  font-size: 1.25rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.footer-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-link {
  color: #a0aec0; /* Light gray text */
  text-decoration: none;
  margin-bottom: 0.5rem;
  display: block;
  transition: all 0.3s ease; /* Transition for hover effect */
}

.footer-link:hover {
  color: blue; /* Change to blue on hover */
  transform: scale(1.05); /* Zoom effect on hover */
}

/* Payment Images */
.payment-image {
  width: 50px; /* Adjust image size */
  height: auto;
  margin-bottom: 0.5rem;
  transition: transform 0.3s ease; /* Smooth transition for hover */
}

.payment-image:hover {
  transform: scale(1.1); /* Slight zoom on hover */
}

/* Responsive Styles */
@media (max-width: 768px) {
  .footer-container {
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr)); /* Adjust columns for smaller screens */
    gap: 1.5rem; /* Reduce gap between columns */
  }

  .footer-heading {
    font-size: 1.1rem; /* Reduce heading size */
  }

  .footer-link {
    font-size: 0.9rem; /* Reduce link size */
  }

  .payment-image {
    width: 40px; /* Smaller images for smaller screens */
  }
}

@media (max-width: 480px) {
  .footer-container {
    grid-template-columns: 1fr; /* Stack columns vertically on very small screens */
    gap: 1rem; /* Further reduce gap */
  }

  .footer-column {
    text-align: center; /* Center-align content */
  }

  .footer-heading {
    font-size: 1rem; /* Further reduce heading size */
  }

  .footer-link {
    font-size: 0.85rem; /* Further reduce link size */
  }

  .payment-image {
    width: 35px; /* Even smaller images for mobile */
  }
}
</style>