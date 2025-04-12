<template>
    <div class="privacy-policy-page">
      <section class="hero">
        <div class="overlay"></div>
        <div class="content-container">
          <h1 class="headline">Politique de Confidentialité</h1>
        </div>
      </section>
  
      <section class="content-section">
        <div class="container">
          <h2>1. Introduction</h2>
          <p>[Nom de votre entreprise] (ci-après "nous", "notre" ou "nos") s'engage à protéger la confidentialité de vos informations personnelles. Cette Politique de Confidentialité décrit comment nous collectons, utilisons et partageons vos données personnelles lorsque vous utilisez notre site internet [Nom de votre site internet] (ci-après le "Site").</p>
  
          <h2>2. Quelles informations personnelles collectons-nous ?</h2>
          <p>[Détaillez ici les types d'informations personnelles que vous collectez, par exemple : nom, adresse e-mail, adresse de livraison, informations de paiement, historique des commandes, données de navigation (cookies, adresse IP), etc.]</p>
  
          <h2>3. Comment utilisons-nous vos informations personnelles ?</h2>
          <p>[Expliquez ici comment vous utilisez les informations collectées, par exemple : traitement des commandes, livraison, communication marketing (avec consentement), amélioration du Site, sécurité, respect des obligations légales, etc.]</p>
  
          <h2>4. Comment partageons-nous vos informations personnelles ?</h2>
          <p>[Indiquez ici avec qui vous partagez les données et pourquoi, par exemple : prestataires de paiement, transporteurs, partenaires marketing (avec consentement), autorités légales, etc.]</p>
  
          <h2>5. Vos droits en matière de protection des données</h2>
          <p>[Informez ici les utilisateurs de leurs droits conformément au RGPD ou à la législation applicable, par exemple : droit d'accès, de rectification, de suppression, d'opposition, de limitation du traitement, de portabilité des données, droit de retirer leur consentement.]</p>
  
          <h2>6. Cookies et technologies similaires</h2>
          <p>[Expliquez ici l'utilisation des cookies et autres technologies de suivi sur votre Site. Indiquez les types de cookies utilisés (nécessaires, analytiques, marketing) et comment les utilisateurs peuvent gérer leurs préférences en matière de cookies.]</p>
  
          <h2>7. Sécurité de vos informations personnelles</h2>
          <p>[Décrivez ici les mesures de sécurité que vous mettez en place pour protéger les données personnelles des utilisateurs.]</p>
  
          <h2>8. Conservation de vos informations personnelles</h2>
          <p>[Indiquez ici la durée pendant laquelle vous conservez les données personnelles des utilisateurs.]</p>
  
          <h2>9. Transferts de données en dehors de l'Union Européenne (le cas échéant)</h2>
          <p>[Si vous transférez des données en dehors de l'UE, expliquez les mécanismes de transfert que vous utilisez pour assurer un niveau de protection adéquat.]</p>
  
          <h2>10. Liens vers d'autres sites web</h2>
          <p>[Si votre Site contient des liens vers d'autres sites web, précisez que cette Politique de Confidentialité ne s'applique pas à ces sites et que vous n'êtes pas responsable de leurs pratiques en matière de confidentialité.]</p>
  
          <h2>11. Modifications de cette Politique de Confidentialité</h2>
          <p>[Indiquez ici comment vous informerez les utilisateurs des modifications apportées à cette Politique de Confidentialité.]</p>
  
          <h2>12. Nous contacter</h2>
          <p>Si vous avez des questions concernant cette Politique de Confidentialité ou vos informations personnelles, veuillez <RouterLink to="/contact">nous contacter </RouterLink> </p>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  onMounted(() => {
    document.title = 'Politique de Confidentialité - Gwen';
  });
  </script>
  
  <style scoped>
  /* Styles de base pour la page (vous pouvez les personnaliser) */
  .privacy-policy-page {
    padding: 60px 20px;
  }
  
  .hero {
    position: relative;
    height: 30vh;
    background-color: var(--subtle-color);
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--text-color);
  }
  
  .hero .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.1);
  }
  
  .hero .content-container {
    position: relative;
    z-index: 2;
  }
  
  .hero .headline {
    font-size: 2.5rem;
    font-weight: 700;
    margin-bottom: 0.5rem;
    color: white;
  }
  
  .content-section {
    padding: 40px 20px;
  }
  
  .container {
    width: 90%;
    max-width: 1000px;
    margin: 0 auto;
  }
  
  h2 {
    font-size: 1.8rem;
    color: var(--primary-color);
    margin-top: 2rem;
    margin-bottom: 1rem;
  }
  
  p {
    line-height: 1.6;
    color: var(--text-color);
    margin-bottom: 1.5rem;
  }
  
  address {
    font-style: normal;
    line-height: 1.6;
    color: var(--text-color);
    margin-bottom: 1.5rem;
  }
  
  /* Ajoutez d'autres styles si nécessaire */
  </style>