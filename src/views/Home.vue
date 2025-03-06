<script setup lang="ts">
import { auth } from "../firebase"
import { onMounted, ref } from 'vue';
import { onAuthStateChanged } from "firebase/auth";
import { getCurrentUser } from "vuefire";


interface UserData {
  displayName: string | null;
  email: string | null;
  state: object | null;
}

// Utilisez ce type lors de la création de la référence
const user = ref<UserData>({
  displayName: null,
  email: null,
  state:null
});

// const test = ref<string | null>("");

onMounted(() => {
  onAuthStateChanged(auth, (currentUser) => {
    if (currentUser) {
        user.value.email = currentUser.email;
        user.value.state = currentUser;
    } else {
      user.value.email = "Utilisateur non connecté";
    }
  });
});

const out = () => {
    console.log("Salut");
    auth.signOut();
}

</script>

<template>
    <p class="text-3xl font-bold underline"> Home :  {{ user.email }} </p>
    <RouterLink to="/Logging">
        <a v-if="user.state == null" @click="out" class="py-2 px-4 bg-blend-darken text-white rounded"> Logging </a>
        <a v-else @click="out" class="py-2 px-4 bg-blend-darken text-white rounded"> Sign out </a>
    </RouterLink>


</template>