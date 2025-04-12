<script setup lang="ts">
import { ref } from 'vue'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import { useRouter } from 'vue-router'

const router = useRouter();
const email = ref('');
const password = ref('');
const loading = ref(false);
const errorMessage = ref('');

function login() {
  errorMessage.value = '';
  loading.value = true;
  
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log('Successfully logged in!', userCredential.user);
      router.push('/');
    })
    .catch((error) => {
      console.error("Erreur:", error.code);
      
      switch(error.code) {
        case 'auth/invalid-credential':
          errorMessage.value = "Email ou mot de passe incorrect.";
          break;
        case 'auth/user-not-found':
          errorMessage.value = "Aucun compte trouvé avec cet email.";
          break;
        case 'auth/wrong-password':
          errorMessage.value = "Mot de passe incorrect.";
          break;
        case 'auth/too-many-requests':
          errorMessage.value = "Trop de tentatives. Veuillez réessayer plus tard.";
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
  <div class="login-container">
    <div class="login-header">
      <h2 class="title">Connexion à votre compte</h2>
      <p class="subtitle">
        Ou
        <RouterLink to="/Signing" class="link">
          créez un nouveau compte
        </RouterLink>
      </p>
    </div>

    <div class="login-form-container">
      <div class="login-form-wrapper">
        <form @submit.prevent="login" class="login-form">
          <div v-if="errorMessage" class="error-container">
            <div class="error-content">
              <h3 class="error-title">
                Erreur de connexion
              </h3>
              <div class="error-details">
                <p>{{ errorMessage }}</p>
              </div>
            </div>
          </div>

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
                class="form-input" 
                placeholder="votre@email.com"
              />
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
                autocomplete="current-password" 
                required 
                v-model="password"
                class="form-input" 
              />
            </div>
            <div class="forgot-password">
              <a href="#" class="forgot-link">Mot de passe oublié ?</a>
            </div>
          </div>

          <div class="button-container">
            <button 
              type="submit" 
              :disabled="loading"
              class="submit-button"
              :class="{'button-disabled': loading}"
            >
              <span v-if="loading" class="loading-icon">
                <svg class="spinner" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="spinner-circle" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="spinner-path" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
              </span>
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped src="../styles/Logging.css"></style>