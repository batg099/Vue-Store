<template>
  <footer>
    <div class="container footer-content">
      <div class="footer-logo-section">
        <div class="footer-logo">GWEN</div>
        <p class="footer-tagline">Élégance Moderne, Inspirée par Compiègne.</p>
      </div>
      <div class="footer-links">
        <h3>Navigation</h3>
        <ul>
          <li><RouterLink to="/">Accueil</RouterLink></li>
          <li><RouterLink to="/collection">Collection</RouterLink></li>
          <li><RouterLink to="/contact">Contact</RouterLink></li>
          <li><RouterLink to="/about">À Propos</RouterLink></li>
        </ul>
      </div>
      <div class="footer-links">
        <h3>Informations</h3>
        <ul>
          <li><RouterLink to="/cgv"> Conditions Générales de Vente</RouterLink></li>
          <li><RouterLink to="/confidentialite">Politique de Confidentialité</RouterLink></li>
        </ul>
      </div>
      <div class="footer-contact">
        <h3>Contactez-nous</h3>
        <p>123 Rue de l'Élégance,<br>
           60200 Compiègne, France</p>
        <p>Téléphone: +33 3 44 00 00 00</p>
        <p>Email: contact@gwenmode.com</p>
      </div>
    </div>
    <div class="copyright">
      &copy; {{ new Date().getFullYear() }} Gwen. Tous droits réservés.
    </div>
  </footer>
</template>

<script setup>
import { RouterLink } from 'vue-router';
</script>

<style scoped>
footer {
  background-color: var(--accent-color);
  color: var(--light-text);
  padding: 60px 20px 30px;
  font-size: 0.9rem;
}

.container {
  width: 90%;
  max-width: 1200px;
  margin: 0 auto;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 30px;
  margin-bottom: 40px;
}

.footer-logo-section {
  margin-bottom: 20px;
}

.footer-logo {
  font-family: 'Playfair Display', serif;
  font-size: 2rem;
  margin-bottom: 10px;
}

.footer-tagline {
  font-style: italic;
  color: rgba(255, 255, 255, 0.7);
}

.footer-links h3,
.footer-contact h3 {
  font-size: 1.1rem;
  margin-bottom: 15px;
  border-bottom: 2px solid var(--primary-color);
  padding-bottom: 8px;
}

.footer-links ul {
  list-style: none;
  padding: 0;
}

.footer-links li {
  margin-bottom: 8px;
}

.footer-links a {
  color: rgba(255, 255, 255, 0.8);
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}

.footer-links a:hover {
  color: var(--primary-color);
}

.footer-contact p {
  line-height: 1.6;
  margin-bottom: 10px;
}

.copyright {
  text-align: center;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.6);
}

@media (max-width: 768px) {
  .footer-content {
    grid-template-columns: 1fr;
  }

  .footer-logo-section,
  .footer-links,
  .footer-contact {
    margin-bottom: 30px;
    text-align: center;
  }

  .footer-links h3,
  .footer-contact h3 {
    text-align: center;
    border-bottom: none;
  }
}
</style>