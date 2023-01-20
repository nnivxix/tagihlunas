<template>
  <AppBar titleapp="tagih lunas">
  
  </AppBar>
  <div class="flex flex-col items-center p-7">
    <img src="@/assets/404.png" alt="not found image">
    <p class="text-xl my-3">Oops, sorry the page what you've visited not found.</p>
    <router-link to="/users" class="underline p-2 border rounded-md border-lime-500">back to <code>/users</code> page.</router-link>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';


</script>

<style lang="scss" scoped>

</style>