<template>
  <router-link :to="{name: 'transactions.show', params: {userId: userId, trxId: trxId}}"
  class="grid grid-rows-2 grid-cols-2 cursor-pointer bg-semi-gray-1 px-8 py-4 text-dark hover:text-gray-700 hover:bg-lemon">
    <p class="text-sm font-semibold">{{ trxId }} </p>
    <p class="text-lg font-semibold text-gray-800 text-end row-span-2 self-center">{{ amount.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) }}</p>
    <p class="text-sm text-gray-400">{{`${new Date(date as string).getDate()}-${new Date(date as string).getMonth()+1}-${new Date(date as string).getFullYear()} ${new Date(date as string).getHours()}:${new Date(date as string).getMinutes()}:${new Date(date as string).getSeconds()}`}}</p>
  </router-link>
</template>

<script setup lang="ts">
defineProps({
  trxId: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
  },
  userId: {
    type: String,
  },
});

</script>

<style scoped>

</style>