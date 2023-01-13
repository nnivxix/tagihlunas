<script setup lang="ts">
import TheAvatar from './TheAvatar.vue';
defineProps({
  username: {
    type: String,
    default: 'User Hello',
  }
})
</script>

<template>
  <div class="flex items-center my-3">
    <TheAvatar :username="username"></TheAvatar>
    <p class="ml-4 text-xl">{{ username }}</p>
  </div>
</template>

<style>

</style>