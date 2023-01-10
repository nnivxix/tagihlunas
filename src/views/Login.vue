<template>
  <div>
    <AppBar titleapp="tagihlunas" />
    <h1 class="text-2xl py-5 text-dark">Sign in to <span class="font-medium">tagihlunas</span></h1>
    <form class="flex flex-col">
      <label for="username" class="text-xl text-dark">username</label>
      <input type="text" name="username" id="username" class="bg-light-lemon p-2 mb-5 rounded-lg">
      <div class="flex justify-between">
      
      <label for="password" class="text-xl text-dark">password</label> <span class="text-purple-600 cursor-pointer">forgot password?</span>
      </div>
      <input type="password" name="password" id="password" class="bg-light-lemon p-2 mb-12 rounded-lg">
      
      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">Sign in</button>
    
    </form>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';


</script>

<style lang="scss" scoped>

</style>