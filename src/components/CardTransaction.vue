<template>
  <div class="grid grid-rows-2 grid-cols-2  bg-semi-gray-1 px-8 py-4 text-dark hover:text-gray-700 hover:bg-lemon">
    <p class="text-sm">{{ trxId }}</p>
    <p class="text-lg font-semibold text-gray-800 text-end row-span-2 self-center">{{ amount.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) }}</p>
    <p class="text-sm text-gray-400">{{`${new Date(date as string).getDate()}-${new Date(date as string).getMonth()+1}-${new Date(date as string).getFullYear()} ${new Date(date as string).getHours()}:${new Date(date as string).getMinutes()}:${new Date(date as string).getSeconds()}`}}</p>
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