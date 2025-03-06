import { createApp } from 'vue'
import App from './App.vue' // Assure-toi d'importer ton composant principal
import './style.css'  // Fichier global de styles, souvent lié à Tailwind ou d'autres styles globaux
// Import des fichiers CSS de PrimeVue
import ToastService from 'primevue/toastservice';  // Import ToastService

import router from './routeur/routeur.ts'

import './firebase'; // ✅ Import Firebase ici

import { VueFire, VueFireFirestoreOptionsAPI } from "vuefire";
import { firebaseApp } from "./firebase.ts";

// Importer PrimeVue et le thème Aura
import PrimeVue from 'primevue/config'
import Aura from '@primeuix/themes/aura'  // Si tu utilises le thème Aura depuis PrimeUX

// Créer l'application Vue
const app = createApp(App); // Crée l'application Vue
app.use(router); // Utilise le router dans l'application
app.use(VueFire, {
  firebaseApp,
  modules:[VueFireFirestoreOptionsAPI()]
});


// Utiliser PrimeVue et appliquer le thème Aura
app.use(PrimeVue, {
  theme: Aura  // Assure-toi que le thème est correctement défini
})
app.use(ToastService);  // Enregistrement du ToastService

// Monter l'application
app.mount('#app')
