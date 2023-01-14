<script setup lang="ts">
import TheAvatar from './TheAvatar.vue';
defineProps({
  name: {
    type: String,
    default: 'User Hello',
  },
  background: {
    type: String,
  }

})
</script>

<template>
  <div class="flex items-center my-3">
    <TheAvatar :name="name" :background="background"></TheAvatar>
    <p class="ml-4 text-xl">{{ name }}</p>
  </div>
</template>

<style>

</style>