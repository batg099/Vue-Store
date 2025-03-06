<script setup>
import {ref} from 'vue';

      const name = ref(true);
      const tab = ref(["coco","soso","lolo"]);
      const defaut = ref("")
      const test = () => {
        if(name.value == true){
          name.value = false;
        }
        else{
          name.value = true;
        }
      };

      const addTask = () =>{
        if(defaut.value != ''){
          tab.value.push(defaut.value)
        }
      }

</script>

<template>
  <p v-if="name"> Salut {{ name }} </p>
  <p v-else> Hola {{ name }} </p>

  <h1 class="text-2xl">  test </h1>

  <ul>
    <li v-for="element in tab" :key="test">{{ element }}</li>
  </ul>
  
  <button @click="test">Hi</button>

  <form @submit.prevent = "addTask">
    <label >Ajoutez un élément </label>
    <input type="text" id="mdp" name="mdp" v-model="defaut"> 
  </form>
</template>

<style scoped>  
.read-the-docs {
  color: #888;
}
</style>