<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps(['username'])

function getInitials(username: string) :string{
  const arrayName =  username.split(' ')
  const parts = ref<string[]>([]);
  
  for (let i = 0; i < arrayName.length; i++){
    parts.value.push(arrayName[i].slice(0,1))
  } 
  if (parts.value.length >= 3) {
    parts.value.splice(2)
  }   
  return parts.value.join('')    
}

const init = ref(getInitials(props.username))
</script>

<template>
  <div class="flex items-center my-3">
    <div class="bg-gray-400 text-blue-600 p-6 w-14 h-14 flex flex-col justify-center  items-center rounded-full ">
      <p class="font-semibold">{{ init }}</p>
    </div>
    <p class="ml-4 text-xl">{{ username }}</p>
  </div>
</template>

<style>

</style>