<script setup lang="ts">
import { ref, computed } from 'vue'
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import { useRouter } from 'vue-router'

const router = useRouter();
const email = ref('');
const password = ref('');
const confirmPassword = ref('');
const acceptTerms = ref(false);
const loading = ref(false);
const errorMessage = ref('');

// Validations
const isEmailValid = computed(() => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return email.value === '' || emailRegex.test(email.value);
});

const isPasswordStrong = computed(() => {
  return password.value === '' || password.value.length >= 8;
});

const doPasswordsMatch = computed(() => {
  return confirmPassword.value === '' || password.value === confirmPassword.value;
});

const isFormValid = computed(() => {
  return email.value && 
         password.value && 
         password.value.length >= 8 && 
         password.value === confirmPassword.value && 
         acceptTerms.value;
});

function register() {
  errorMessage.value = '';
  loading.value = true;
  
  createUserWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log('Successfully registered!', userCredential.user);
      router.push('./Logging');
    })
    .catch((error) => {
      console.error("Erreur:", error.code);
      switch(error.code) {
        case 'auth/email-already-in-use':
          errorMessage.value = "Cette adresse email est déjà utilisée.";
          break;
        case 'auth/invalid-email':
          errorMessage.value = "L'adresse email n'est pas valide.";
          break;
        case 'auth/weak-password':
          errorMessage.value = "Le mot de passe est trop faible.";
          break;
        default:
          errorMessage.value = error.message;
      }
    })
    .finally(() => {
      loading.value = false;
    });
}
</script>

<template>
  <div class="signup-container">
    <div class="signup-header">
      <h2 class="title">Créer votre compte</h2>
      <p class="subtitle">
        Ou
        <RouterLink to="/Logging" class="link">
          connectez-vous à votre compte existant
        </RouterLink>
      </p>
    </div>

    <div class="signup-form-container">
      <div class="signup-form-wrapper">
        <form @submit.prevent="register" class="signup-form">
          <div class="form-group">
            <label for="email" class="form-label">
              Adresse email
            </label>
            <div class="input-container">
              <input 
                id="email" 
                name="email" 
                type="email" 
                autocomplete="email" 
                required 
                v-model="email"
                :class="{'input-error': !isEmailValid}"
                class="form-input" 
                placeholder="votre@email.com"
              />
              <p v-if="!isEmailValid" class="error-message">
                Veuillez entrer une adresse email valide
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="password" class="form-label">
              Mot de passe
            </label>
            <div class="input-container">
              <input 
                id="password" 
                name="password" 
                type="password" 
                autocomplete="new-password" 
                required 
                v-model="password"
                :class="{'input-error': !isPasswordStrong}"
                class="form-input" 
              />
              <p v-if="!isPasswordStrong" class="error-message">
                Le mot de passe doit contenir au moins 8 caractères
              </p>
            </div>
          </div>

          <div class="form-group">
            <label for="confirm-password" class="form-label">
              Confirmez le mot de passe
            </label>
            <div class="input-container">
              <input 
                id="confirm-password" 
                name="confirm-password" 
                type="password" 
                required 
                v-model="confirmPassword"
                :class="{'input-error': !doPasswordsMatch}"
                class="form-input" 
              />
              <p v-if="!doPasswordsMatch" class="error-message">
                Les mots de passe ne correspondent pas
              </p>
            </div>
          </div>

          <div class="checkbox-container">
            <input 
              id="terms" 
              name="terms" 
              type="checkbox" 
              v-model="acceptTerms"
              class="checkbox-input" 
            />
            <label for="terms" class="checkbox-label">
              J'accepte les <a href="#" class="link">conditions d'utilisation</a> et la <a href="#" class="link">politique de confidentialité</a>
            </label>
          </div>

          <div v-if="errorMessage" class="error-container">
            <div class="error-content">
              <h3 class="error-title">
                Erreur lors de l'inscription
              </h3>
              <div class="error-details">
                <p>{{ errorMessage }}</p>
              </div>
            </div>
          </div>

          <div class="button-container">
            <button 
              type="submit" 
              :disabled="!isFormValid || loading"
              class="submit-button"
              :class="{'button-disabled': !isFormValid || loading}"
            >
              <span v-if="loading" class="loading-icon">
                <svg class="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              S'inscrire
            </button>
          </div>
        </form>

        
      </div>
    </div>
  </div>
</template>

<style scoped>
.signup-container {
  min-height: 100vh;
  background-color: #f9fafb;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 3rem 1.5rem;
}

.signup-header {
  margin: 0 auto;
  text-align: center;
  max-width: 24rem;
  width: 100%;
}

.logo {
  height: 5rem;
  width: auto;
  border-radius: 50%;
  margin: 0 auto;
}

.title {
  margin-top: 1.5rem;
  text-align: center;
  font-size: 1.875rem;
  font-weight: 800;
  color: #111827;
}

.subtitle {
  margin-top: 0.5rem;
  text-align: center;
  font-size: 0.875rem;
  color: #6b7280;
}

.link {
  color: #2563eb;
  font-weight: 500;
  text-decoration: none;
}

.link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.signup-form-container {
  margin-top: 2rem;
  margin-left: auto;
  margin-right: auto;
  max-width: 24rem;
  width: 100%;
}

.signup-form-wrapper {
  background-color: white;
  padding: 2rem 1rem;
  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06);
  border-radius: 0.5rem;
}

@media (min-width: 640px) {
  .signup-form-wrapper {
    padding: 2rem 2.5rem;
  }
}

.signup-form {
  margin-bottom: 1.5rem;
}

.form-group {
  margin-bottom: 1.5rem;
}

.form-label {
  display: block;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
  margin-bottom: 0.25rem;
}

.input-container {
  margin-top: 0.25rem;
}

.form-input {
  display: block;
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
  color: #1f2937;
}

.form-input:focus {
  outline: none;
  border-color: #3b82f6;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.form-input::placeholder {
  color: #9ca3af;
}

.input-error {
  border-color: #ef4444;
}

.input-error:focus {
  border-color: #ef4444;
  box-shadow: 0 0 0 3px rgba(239, 68, 68, 0.25);
}

.error-message {
  margin-top: 0.25rem;
  font-size: 0.75rem;
  color: #ef4444;
}

.checkbox-container {
  display: flex;
  align-items: center;
  margin-bottom: 1.5rem;
}

.checkbox-input {
  height: 1rem;
  width: 1rem;
  color: #2563eb;
  border-color: #d1d5db;
  border-radius: 0.25rem;
}

.checkbox-input:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.checkbox-label {
  margin-left: 0.5rem;
  display: block;
  font-size: 0.875rem;
  color: #1f2937;
}

.error-container {
  border-radius: 0.375rem;
  background-color: #fee2e2;
  padding: 1rem;
  margin-bottom: 1.5rem;
}

.error-content {
  display: flex;
  flex-direction: column;
}

.error-title {
  font-size: 0.875rem;
  font-weight: 500;
  color: #991b1b;
}

.error-details {
  margin-top: 0.5rem;
  font-size: 0.875rem;
  color: #b91c1c;
}

.button-container {
  margin-top: 1.5rem;
}

.submit-button {
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid transparent;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  font-size: 0.875rem;
  font-weight: 500;
  color: white;
  background-color: #2563eb;
  cursor: pointer;
  transition: background-color 0.2s;
}

.submit-button:hover {
  background-color: #1d4ed8;
}

.submit-button:focus {
  outline: none;
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.25);
}

.button-disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.loading-icon {
  margin-right: 0.5rem;
}

.spinner {
  animation: spin 1s linear infinite;
  height: 1.25rem;
  width: 1.25rem;
}

.spinner-circle {
  opacity: 0.25;
}

.spinner-path {
  opacity: 0.75;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.separator {
  position: relative;
  margin-top: 1.5rem;
  margin-bottom: 1.5rem;
}

.separator-line {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  border-top: 1px solid #e5e7eb;
}

.separator-text {
  position: relative;
  display: flex;
  justify-content: center;
}

.separator-text span {
  padding: 0 0.5rem;
  background-color: white;
  font-size: 0.875rem;
  color: #6b7280;
}

.social-login {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 0.75rem;
}

.social-button-container {
  width: 100%;
}

.social-button {
  width: 100%;
  display: inline-flex;
  justify-content: center;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  background-color: white;
  font-size: 0.875rem;
  font-weight: 500;
  color: #6b7280;
  transition: background-color 0.2s;
}

.social-button:hover {
  background-color: #f9fafb;
}

.social-icon {
  height: 1.25rem;
  width: 1.25rem;
}
</style>