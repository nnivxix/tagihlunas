<template>
  <router-link :to="{name: 'transactions.show', params: {userId: userId, trxId: trxId}}"
  class="grid grid-rows-2 grid-cols-2 cursor-pointer bg-semi-gray-1 px-8 py-4 text-dark hover:text-gray-700 hover:bg-lemon">
    <p class="text-sm font-semibold">{{ trxId }} </p>
    <p id="amount" class="text-lg font-semibold text-gray-800 text-end row-span-2 self-center">{{ amount.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) }}</p>
    <p class="text-sm text-gray-400">{{`${ new Date(dateTrx as string).getDate()}-${(new Date(dateTrx as string).getMonth()+1)}-${new Date(dateTrx as string).getFullYear()} ${new Date(dateTrx as string).getHours()}:${new Date(dateTrx as string).getMinutes()}:${new Date(dateTrx as string).getSeconds()}`}}</p>
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
  dateTrx: {
    type: String,
  },
  userId: {
    type: String,
  },
});

</script>

<style scoped>

</style>