<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router"; // pour naviguer
import Menubar from 'primevue/menubar';

// Styles de base de PrimeVue
import 'primevue/resources/themes/lara-light-indigo/theme.css'; // thème (choisissez celui qui vous convient)
import 'primevue/resources/primevue.min.css'; // core css
import 'primeicons/primeicons.css'; // icons

const router = useRouter(); // pour naviguer entre les pages

const out = () => {
    console.log("Salut");
    auth.signOut();
}
const items = ref([
    {
        label: 'Home',
        icon: 'pi pi-home',
        command: () => router.push('/') // Utilisez une fonction pour la navigation
    },
    {
        label: 'Features',
        icon: 'pi pi-star',
        command: () => router.push('/features') // Exemple de navigation vers une page de fonctionnalités
    },
    {
        label: 'Projects',
        icon: 'pi pi-search',
        items: [
            {
                label: 'Components',
                icon: 'pi pi-bolt',
                command: () => router.push('/projects/components')
            },
            {
                label: 'Blocks',
                icon: 'pi pi-server',
                command: () => router.push('/projects/blocks')
            }
        ]
    },
    {
        label: 'Login',
        icon: 'pi pi-envelope',
        command: () => router.push('/logging')
    }
]);

</script>

<template>
    <div class="fixed top-0 left-0 right-0  ">
        <Menubar :model="items" :style="{ backgroundColor: 'white' }" />
    </div>
</template>
