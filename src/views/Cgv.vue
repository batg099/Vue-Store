<template>
    <div class="cgv-page">
      <section class="hero">
        <div class="overlay"></div>
        <div class="content-container">
          <h1 class="headline">Conditions Générales de Vente</h1>
        </div>
      </section>
  
      <section class="content-section">
        <div class="container">
          <h2>Article 1 : Objet</h2>
          <p>Les présentes conditions générales de vente (CGV) régissent les relations contractuelles entre [Nom de votre entreprise], dont le siège social est situé à [Adresse de votre entreprise], et toute personne physique ou morale (ci-après le "Client") souhaitant effectuer un achat sur le site internet [Nom de votre site internet] (ci-après le "Site").</p>
  
          <h2>Article 2 : Produits</h2>
          <p>Les produits proposés à la vente sur le Site sont ceux qui y figurent au jour de sa consultation par le Client. Les photographies et descriptions des produits ne sont pas contractuelles et ne sauraient engager la responsabilité de [Nom de votre entreprise].</p>
  
          <h2>Article 3 : Prix</h2>
          <p>Les prix des produits sont indiqués en euros (€) toutes taxes comprises (TTC), hors frais de livraison. [Nom de votre entreprise] se réserve le droit de modifier ses prix à tout moment, mais les produits seront facturés sur la base des tarifs en vigueur au moment de la validation de la commande.</p>
  
          <h2>Article 4 : Commande</h2>
          <p>Le Client passe commande sur le Site en suivant la procédure indiquée. La validation de la commande par le Client vaut acceptation pleine et entière des présentes CGV.</p>
  
          <h2>Article 5 : Paiement</h2>
          <p>Le paiement s'effectue en ligne par les moyens proposés sur le Site. La validation du paiement par l'organisme bancaire ou financier concerné rend la commande ferme et définitive.</p>
  
          <h2>Article 6 : Livraison</h2>
          <p>Les modalités et frais de livraison sont indiqués sur le Site au moment de la commande. [Nom de votre entreprise] s'engage à faire ses meilleurs efforts pour livrer les produits dans les délais indiqués, mais ceux-ci sont donnés à titre indicatif.</p>
  
          <h2>Article 7 : Droit de rétractation</h2>
          <p>[Indiquez ici les conditions et délais de rétractation conformément à la législation en vigueur, généralement 14 jours à compter de la réception du produit. Précisez les modalités de retour et de remboursement.]</p>
  
          <h2>Article 8 : Garanties</h2>
          <p>[Précisez ici les garanties légales applicables aux produits vendus.]</p>
  
          <h2>Article 9 : Responsabilité</h2>
          <p>[Définissez ici les limites de la responsabilité de votre entreprise.]</p>
  
          <h2>Article 10 : Propriété intellectuelle</h2>
          <p>Tous les éléments du Site (textes, images, logos, etc.) sont et restent la propriété intellectuelle et exclusive de [Nom de votre entreprise]. Toute reproduction, exploitation ou diffusion, même partielle, est interdite sans autorisation préalable.</p>
  
          <h2>Article 11 : Données personnelles</h2>
          <p>Les informations personnelles collectées auprès du Client sont nécessaires au traitement de sa commande et à la gestion de la relation commerciale. Conformément à la réglementation en vigueur, le Client dispose d'un droit d'accès, de rectification et de suppression des données le concernant. Pour en savoir plus, consultez notre Politique de Confidentialité.</p>
  
          <h2>Article 12 : Droit applicable et litiges</h2>
          <p>Les présentes CGV sont soumises au droit français. En cas de litige, les tribunaux compétents seront ceux de [Ville de votre tribunal compétent].</p>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  onMounted(() => {
    document.title = 'Conditions Générales de Vente - Gwen';
  });
  </script>
  
  <style scoped>
  /* Styles de base pour la page (vous pouvez les personnaliser) */
  .cgv-page {
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
  
  /* Ajoutez d'autres styles si nécessaire */
  </style>