<template>
  <div :class='`w-${dimension} h-${dimension}`'
  class="bg-gray-400 text-blue-600 p-6 flex flex-col justify-center  items-center rounded-full ">
    <p class="font-semibold text-xl">{{ init }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const props = defineProps({
  username: {
    type: String,
    default: 'User Hello'
  },
  dimension: {
    type: Number,
    default: 20
  }
})

function getInitials(username: string) :string{
  const arrayName =  username.split(' ')
  const parts = ref<string[]>([]);
  
  for (let i = 0; i < arrayName.length; i++){
    parts.value.push(arrayName[i].slice(0,1))
  } 
  if (parts.value.length >= 3) {
    parts.value.splice(2)
  }   
  return parts.value.join('').toLocaleUpperCase()
}

const init = ref(getInitials(props.username as string))
</script>