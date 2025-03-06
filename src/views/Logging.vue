<script setup lang="ts">
import { ref } from 'vue'
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase"
import { useRouter } from 'vue-router'

// useRouter() doit être utilisé à l'intérieur de setup
const router = useRouter();
const email = ref('');
const password = ref('');

function register() {
  //console.log("Fonction register appelée");
  signInWithEmailAndPassword(auth, email.value, password.value)
    .then((userCredential) => {
      console.log('Successfully logged!', userCredential.user);
      router.push('/');
    })
    .catch((error) => {
      console.error("Erreur:", error.code);
      alert(error.message);
    });
}
</script>

<template>
  <div class="register-container">
    <header>
      <div class="border rounded-2xl p-6 max-w-md mx-auto">
        <form @submit.prevent="register">
          <RouterLink to="/">
            <img class="size-1/4 mx-auto mb-4" src="../assets/gwen.jpg" alt="gwen" />
          </RouterLink>
          
          <h1 class="text-xl font-bold mb-4">Register</h1>
          <p class="mb-3"><input type="text" placeholder="Email" v-model="email" class="w-full p-2 border rounded" /></p>
          <p class="mb-3"><input type="password" placeholder="Password" v-model="password" class="w-full p-2 border rounded" /></p>
          <p><button type="submit" class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button></p>

          <RouterLink to="/Signing">
            <a class="py-2 px-4 bg-blend-darken text-white rounded"> Create a new Account </a>
          </RouterLink>
          
        </form>
      </div>
    </header>
  </div>
</template>