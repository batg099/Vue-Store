<script setup lang="ts">

import { ref } from 'vue';
import InputGroup from 'primevue/inputgroup';
import InputGroupAddon from 'primevue/inputgroupaddon';
import InputText from 'primevue/inputtext';


const text1 = ref("");
const text2 = ref("");
const number = ref(null);
const selectedCity = ref();
const cities = ref([
    { name: 'New York', code: 'NY' },
    { name: 'Rome', code: 'RM' },
    { name: 'London', code: 'LDN' },
    { name: 'Istanbul', code: 'IST' },
    { name: 'Paris', code: 'PRS' }
]);
</script>

<template>
    <div class="card grid grid-cols-1 md:grid-cols-2 gap-4">
        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-user"></i>
            </InputGroupAddon>
            <InputText v-model="text1" placeholder="Username" />
        </InputGroup>

        <InputGroup>
            <InputGroupAddon>
                <i class="pi pi-lock"></i>
            </InputGroupAddon>
            <InputText v-model="text2" type="password" placeholder="Password" />
        </InputGroup>
        
    </div>
    <button type="submit">Envoyer</button>
</template>

