<template>
    <div class="contact-page">
      <h1 class="contact-title">Contactez-nous</h1>
      <p class="contact-subtitle">Nous sommes là pour répondre à vos questions et vous aider.</p>
  
      <div class="contact-container">
        <div class="contact-form">
          <h2 class="form-title">Envoyez-nous un message</h2>
          <form @submit.prevent="handleSubmit">
            <div class="form-group">
              <label for="name">Nom</label>
              <input type="text" id="name" v-model="formData.name" required>
            </div>
            <div class="form-group">
              <label for="email">Email</label>
              <input type="email" id="email" v-model="formData.email" required>
            </div>
            <div class="form-group">
              <label for="subject">Sujet</label>
              <input type="text" id="subject" v-model="formData.subject">
            </div>
            <div class="form-group">
              <label for="message">Message</label>
              <textarea id="message" v-model="formData.message" rows="5" required></textarea>
            </div>
            <button type="submit" class="submit-btn" :disabled="isSubmitting">
              <span v-if="isSubmitting">Envoi en cours...</span>
              <span v-else>Envoyer le message</span>
            </button>
            <div v-if="submissionSuccess" class="success-message">
              Votre message a été envoyé avec succès !
            </div>
            <div v-if="submissionError" class="error-message">
              Une erreur est survenue lors de l'envoi du message. Veuillez réessayer.
            </div>
          </form>
        </div>
  
        <div class="contact-info">
          <h2 class="info-title">Nos informations</h2>
          <p class="info-address">
            123 Rue de l'Élégance,<br>
            75001 Paris, France
          </p>
          <p class="info-phone">Téléphone: +33 1 23 45 67 89</p>
          <p class="info-email">Email: contact@elegancemoderne.com</p>
          <div class="social-links">
            <a href="#" target="_blank" class="social-icon">
              <span class="material-icons">facebook</span>
            </a>
            <a href="#" target="_blank" class="social-icon">
              <span class="material-icons">twitter</span>
            </a>
            <a href="#" target="_blank" class="social-icon">
              <span class="material-icons">instagram</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { addDoc } from 'firebase/firestore';
  import { messagesCollection } from '../firebase'; // Assure-toi que le chemin est correct
  
  const formData = ref({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  
  const isSubmitting = ref(false);
  const submissionSuccess = ref(false);
  const submissionError = ref(false);
  
  const handleSubmit = async () => {
    isSubmitting.value = true;
    submissionSuccess.value = false;
    submissionError.value = false;
  
    try {
      await addDoc(messagesCollection, {
        name: formData.value.name,
        email: formData.value.email,
        subject: formData.value.subject,
        message: formData.value.message,
        timestamp: new Date() // Ajouter un horodatage
      });
      submissionSuccess.value = true;
      formData.value = { name: '', email: '', subject: '', message: '' }; // Réinitialiser le formulaire
    } catch (error) {
      console.error("Erreur lors de l'envoi du message à Firebase:", error);
      submissionError.value = true;
    } finally {
      isSubmitting.value = false;
    }
  };
  </script>
  
  <style scoped>
 .contact-page {
  padding: 60px 20px;
  max-width: 1200px;
  margin: 20px auto;
}

.contact-title {
  font-family: 'Playfair Display', serif;
  font-size: 2.8rem;
  margin-bottom: 15px;
  color: var(--accent-color);
  text-align: center;
}

.contact-subtitle {
  color: var(--text-color);
  text-align: center;
  margin-bottom: 30px;
  font-size: 1.1rem;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
}

.contact-form {
  background-color: var(--card-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
}

.form-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: var(--text-color);
  font-weight: 500;
}

input[type="text"],
input[type="email"],
textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid var(--subtle-color);
  border-radius: 4px;
  font-size: 1rem;
  color: var(--text-color);
  background-color: var(--light-color);
  box-sizing: border-box;
}

textarea {
  resize: vertical;
}

.submit-btn {
  background-color: var(--primary-color);
  color: var(--light-text);
  padding: 12px 25px;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: var(--transition);
  width: 100%;
}

.submit-btn:hover:enabled {
  background-color: var(--accent-color);
}

.submit-btn:disabled {
  background-color: var(--subtle-color);
  color: var(--text-color);
  cursor: not-allowed;
}

.success-message {
  color: green;
  margin-top: 15px;
}

.error-message {
  color: red;
  margin-top: 15px;
}

.contact-info {
  background-color: var(--card-bg);
  padding: 30px;
  border-radius: 8px;
  box-shadow: var(--card-shadow);
}

.info-title {
  font-size: 1.8rem;
  margin-bottom: 20px;
  color: var(--primary-color);
}

.info-address,
.info-phone,
.info-email {
  color: var(--text-color);
  margin-bottom: 15px;
  font-size: 1rem;
}

.social-links {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.social-icon {
  color: var(--accent-color);
  font-size: 1.5rem;
  text-decoration: none;
  transition: var(--transition);
}

.social-icon:hover {
  color: var(--primary-color);
  transform: translateY(-2px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }

  .contact-info {
    margin-top: 30px;
  }
}
  </style>