<script setup lang="ts">
import TheAvatar from './TheAvatar.vue';
defineProps({
  name: {
    type: String,
    default: 'User Hello',
  },
  background: {
    type: String,
  },
  userId: {
    type: String,
  },

});
</script>

<template>
  <router-link :to="{name: 'users.show', params: {userId: userId}}" class="flex items-center my-3">
    <TheAvatar :name="name" :background="background"></TheAvatar>
    <p id="name" class="ml-4 text-xl name">{{ name }}</p>
  </router-link>
</template>

<style>

</style>