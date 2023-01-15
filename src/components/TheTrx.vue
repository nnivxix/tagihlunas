<template>
  <div class="grid grid-rows-2 grid-cols-2 bg-semi-gray-1 px-12 py-4 text-dark hover:bg-lemon">
    <p class="text-lg">{{ trxId }}</p>
    <p class="text-xl text-end row-span-2 self-center">{{ amount.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) }}</p>
    <p class="text-sm text-gray-400">{{ date }}</p>
  </div>
</template>

<script setup lang="ts">
defineProps({
  trxId: {
    type: String,
  },
  amount: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
  },
});
</script>

<style scoped>

</style>