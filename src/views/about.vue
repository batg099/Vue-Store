<template>
    <div class="about-page">
      <section class="hero">
        <div class="overlay"></div>
        <div class="content-container">
          <h1 class="headline">À Propos de Gwen</h1>
          <p class="subtitle">Notre histoire, nos valeurs et notre engagement envers l'élégance moderne.</p>
        </div>
      </section>
  
      <section class="our-story-section">
        <div class="container">
          <h2 class="section-title">Notre Histoire</h2>
          <p class="section-description">
            Née au cœur de Compiègne, Gwen est le fruit d'une passion pour l'élégance intemporelle et le style professionnel contemporain. Inspirés par l'esprit créatif et le riche patrimoine de notre région, nous avons fondé cette entreprise avec la vision de proposer des collections qui allient sophistication, confort et une qualité irréprochable.
          </p>
          <p>
            Depuis nos débuts, notre engagement est resté le même : créer des vêtements et accessoires qui permettent à chacun d'exprimer son identité professionnelle avec assurance et style. Chaque pièce est conçue avec une attention méticuleuse aux détails, depuis le choix des matériaux jusqu'aux finitions.
          </p>
        </div>
      </section>
  
      <section class="our-values-section">
        <div class="container">
          <h2 class="section-title">Nos Valeurs</h2>
          <div class="values-grid">
            <div class="value-card">
              <h3>Qualité Exceptionnelle</h3>
              <p>Nous sélectionnons rigoureusement des matériaux premium pour garantir la durabilité et le confort de nos créations.</p>
            </div>
            <div class="value-card">
              <h3>Design Épuré</h3>
              <p>Notre esthétique se caractérise par des lignes élégantes et minimalistes, conçues pour transcender les tendances éphémères.</p>
            </div>
            <div class="value-card">
              <h3>Engagement Local</h3>
              <p>Enracinés à Compiègne, nous valorisons notre communauté et cherchons à contribuer positivement à notre environnement.</p>
            </div>
            <div class="value-card">
              <h3>Centré sur le Client</h3>
              <p>Votre satisfaction est notre priorité. Nous nous engageons à vous offrir une expérience d'achat personnalisée et un service attentionné.</p>
            </div>
          </div>
        </div>
      </section>
  
      <section class="our-commitment-section">
        <div class="container">
          <h2 class="section-title">Notre Engagement</h2>
          <p>
            Chez Gwen, nous sommes plus qu'une marque de vêtements. Nous sommes une communauté de personnes qui apprécient l'élégance, la qualité et l'authenticité. Notre engagement va au-delà de la création de produits ; nous souhaitons établir une relation durable avec nos clients, basée sur la confiance et le respect.
          </p>
          <p>
            Nous sommes constamment à la recherche de nouvelles façons d'améliorer nos produits et nos pratiques, en privilégiant la durabilité et l'éthique dans tout ce que nous faisons.
          </p>
        </div>
      </section>
    </div>
  </template>
  
  <script setup>
  import { onMounted } from 'vue';
  
  onMounted(() => {
    document.title = 'À Propos - Gwen'; // Mise à jour du titre de la page
  });
  </script>
  
  <style scoped>
  .about-page {
    overflow-x: hidden;
  }
  
  .hero {
    position: relative;
    height: 60vh;
    background-image: linear-gradient(rgba(26, 41, 48, 0.5), rgba(26, 41, 48, 0.7)), url('@/assets/about-hero.jpg'); /* Remplacez par une image pertinente */
    background-size: cover;
    background-position: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    color: var(--light-text);
  }
  
  .hero .overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(29, 62, 74, 0.4); /* Couleur de la cravate (ajustez) */
  }
  
  .hero .content-container {
    position: relative;
    z-index: 2;
    max-width: 800px;
    padding: 0 20px;
  }
  
  .hero .headline {
    font-family: 'Playfair Display', serif;
    font-size: 3.5rem;
    font-weight: 700;
    margin-bottom: 1rem;
  }
  
  .hero .subtitle {
    font-size: 1.2rem;
  }
  
  .our-story-section,
  .our-values-section,
  .our-commitment-section {
    padding: 80px 20px;
    background-color: var(--light-color);
  }
  
  .container {
    width: 90%;
    max-width: 1200px;
    margin: 0 auto;
  }
  
  .section-title {
    font-family: 'Playfair Display', serif;
    font-size: 2.5rem;
    margin-bottom: 30px;
    color: var(--accent-color);
    text-align: center;
    position: relative;
    padding-bottom: 15px;
  }
  
  .section-title::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 80px;
    height: 3px;
    background-color: var(--primary-color);
  }
  
  .section-description {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 20px;
    color: var(--text-color);
  }
  
  .our-values-section {
    background-color: var(--subtle-color);
  }
  
  .values-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 30px;
    margin-top: 40px;
  }
  
  .value-card {
    background-color: var(--card-bg);
    padding: 30px;
    border-radius: 8px;
    box-shadow: var(--card-shadow);
    text-align: center;
  }
  
  .value-card h3 {
    font-size: 1.5rem;
    margin-bottom: 15px;
    color: var(--primary-color);
  }
  
  .value-card p {
    font-size: 1rem;
    line-height: 1.6;
    color: var(--text-color);
  }
  
  .our-commitment-section p {
    font-size: 1.1rem;
    line-height: 1.7;
    margin-bottom: 20px;
    color: var(--text-color);
  }
  
  @media (max-width: 768px) {
    .hero {
      height: 70vh;
    }
  
    .hero .headline {
      font-size: 3rem;
    }
  
    .section-title {
      font-size: 2.2rem;
    }
  }
  </style>