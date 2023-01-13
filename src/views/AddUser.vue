<template>
  <div class="mx-6">
  <AppBar titleapp="Add User">
    <template #back >
      <button class="justify-self-start" @click="$router.back()">
        <img src="@/assets/arrow-back.svg" alt="back" srcset="">
      </button>
    </template>
  </AppBar>
    <form class="flex flex-col">
      <label for="username" class="text-xl text-dark">username</label>
      <input type="text" name="username" id="username" class="bg-light-lemon p-2 mb-5 rounded-lg">
      
      <label for="password" class="text-xl text-dark">password</label>
      <input type="password" name="password" id="password" class="bg-light-lemon p-2 mb-12 rounded-lg">
      
      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">Add User</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';


</script>

<style scoped>

</style>