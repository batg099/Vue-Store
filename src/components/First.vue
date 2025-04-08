<template>
    <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&display=swap" rel="stylesheet">
    <Navbar />
    <main>
      <section class="first">
        <h1>Here to inspire</h1>
      </section>
      <hr>
      <section class="second">
        <h1>Notre dernière collection</h1>
        <div class="gallery">
          <RouterLink to="/collection">
            <img src="../assets/gwen.jpg" alt="Collection item 1" />
            <img src="../assets/gwen.jpg" alt="Collection item 2" />
            <img src="../assets/gwen.jpg" alt="Collection item 3" />
          </RouterLink>
        </div>
      </section>
      <hr>
      <section class="third">
        <h1>Curves</h1>
        <p>Nihil quo accusantium eaque quis fuga, sed deserunt expedita minima doloribus? Saepe, ipsa nemo. Modi sapiente, officiis dolore necessitatibus, ab mollitia accusamus dolorem at ullam fuga reprehenderit est quos. Aut!</p>
      </section>
      <hr>
      <section class="fourth">
        <h1>Curves</h1>
        <p>Dolorem, eligendi! Ipsum ex eaque eos, dolorem aperiam quasi necessitatibus quod amet libero nesciunt doloribus sit id corrupti possimus sint, minima itaque inventore, in natus ipsa quisquam nulla quo. Neque.</p>
      </section>
    </main>
    <Ft />
  </template>
  
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Stencil:opsz,wght@10..72,100..900&family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
  
  body {
    margin: 0;
    padding: 0;
    font-family: 'Montserrat', sans-serif;
    color: white;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }
  
  main {
    flex: 1;
  }
  
  hr {
    width: 100%;
    border: none;
    height: 1px;
    background-color: rgba(255, 255, 255, 0.1);
    margin: 0;
  }
  
  .first > h1 {
    font-family: 'Playfair Display', serif;
    font-size: 100px;
    color: white;
    text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.4);
  }
  
  section {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 150px 20vw;
    text-align: center;
  }
  
  .first {
    background-color: oklch(0.372 0.044 257.287);
    background-image: url('../assets/gwen.jpg');
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    min-height: 80vh;
  }
  
  .second {
    background-color: oklch(0.551 0.027 264.364);
    padding-top: 100px;
    padding-bottom: 100px;
  }
  
  .second h1 {
    margin-bottom: 50px;
    font-family: 'Playfair Display', serif;
  }
  
  .gallery {
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-top: 2rem;
  }
  
  .gallery img {
    width: 30%;
    height: auto;
    border-radius: 5px;
    transition: transform 0.3s ease;
  }
  
  .gallery img:hover {
    transform: scale(1.05);
  }
  
  .third {
    background-color: oklch(0.556 0 0);
  }
  
  .fourth {
    background-color: oklch(0.216 0.006 56.043);
  }
  
  section h1 {
    font-size: 3rem;
    margin-bottom: 1.5rem;
  }
  
  section p {
    font-size: 1.1rem;
    line-height: 1.6;
    max-width: 800px;
  }
  
  /* Responsive styles */
  @media (max-width: 768px) {
    .first > h1 {
      font-size: 60px;
    }
    
    section {
      padding: 100px 10vw;
    }
    
    .gallery {
      flex-direction: column;
      align-items: center;
    }
    
    .gallery img {
      width: 80%;
      margin-bottom: 20px;
    }
    
    section h1 {
      font-size: 2.2rem;
    }
  }
  
  @media (max-width: 480px) {
    .first > h1 {
      font-size: 40px;
    }
    
    section {
      padding: 80px 5vw;
    }
    
    .gallery img {
      width: 100%;
    }
    
    section h1 {
      font-size: 1.8rem;
    }
    
    section p {
      font-size: 1rem;
    }
  }
  </style>
  
  <script setup>
  import "../styles/style.css";
  import Navbar from "./Navbar.vue";
  import Ft from "./Footer.vue";
  import { RouterLink } from 'vue-router';
  </script>