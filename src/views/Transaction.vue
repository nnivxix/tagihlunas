<template>
  <div class="mx-6">
    <AppBar titleapp="Transaction"></AppBar>
    <form class="flex flex-col">
      <label for="username" class="text-xl text-dark">username</label>
      <input type="text" name="username" id="username" class="bg-light-lemon p-2 mb-5 rounded-lg">
      
      <label for="name" class="text-xl text-dark">name</label>
      <input type="text" name="name" id="name" class="bg-light-lemon p-2 mb-5 rounded-lg">
      
      <label for="flow" class="text-xl text-dark">flow</label>
      <select name="flow" id="flow" class="bg-light-lemon p-4 mb-5 rounded-lg">
        <option value="cash out">cash out</option>
        <option value="cash in">cash in</option>
      </select>

      <label for="amount" class="text-xl text-dark">amount</label>
      <input type="number" name="amount" id="amount" class="bg-light-lemon p-2 mb-5 rounded-lg">

      <label for="wallet" class="text-xl text-dark">wallet</label>
      <select name="wallet" id="wallet" class="bg-light-lemon p-4 mb-12 rounded-lg">
        <option value="Ovo">Ovo</option>
        <option value="Gopay">Gopay</option>
      </select>
      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">Add Transaction</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';


</script>

<style scoped>

</style>