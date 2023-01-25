<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mx-6 ">
    <AppBar titleapp="Detail" >
    <template #back >
      <button class="justify-self-start" @click="$router.back()">
        <font-awesome-icon icon="fa-solid fa-x" class="h-5"/>
      </button>
    </template>
    <template #exit>
      <button class="justify-self-end">
        <font-awesome-icon icon="fa-solid fa-arrow-up-from-bracket" class="h-5"/>
      </button>
    </template>
    </AppBar>
    <div id="info" class="flex flex-col text-dark my-8">
      <img src="@/assets/check-circle-rounded.svg" alt="success" srcset="" class="h-44">
      <h1 class="text-center font-semibold text-2xl mt-8">Transaction Success</h1>
    </div>
    <div id="detail" class="px-5 text-dark grid grid-cols-2" v-for="t in transaction" :key="t.id">
      <p class="text-lg pt-2 ">Name</p>
      <p class="text-lg pt-2 text-right font-semibold">{{ t.user_id }}</p>
      <p class="text-lg pt-2 ">Due Date</p>
      <p class="text-lg pt-2 text-right font-semibold">{{ new Date(t.created_at).getDate() }}-{{ new Date(t.created_at).getMonth()+1 }}-{{ new Date(t.created_at).getFullYear() }}</p>
      <p class="text-lg pt-2 ">Time</p>
      <p class="text-lg pt-2 text-right font-semibold">{{ new Date(t.created_at).getHours() }}:{{ new Date(t.created_at).getMinutes() }}:{{ new Date(t.created_at).getSeconds() }}</p>
      <p class="text-lg pt-2">Transaction Id</p>

      <p class="text-sm pt-2 text-right font-semibold" @click="copy(t.trx_id as string)">
        <font-awesome-icon icon="fa-solid fa-copy"> </font-awesome-icon> 
        {{ t.trx_id }}
      </p>

      <p class="text-lg pt-2 ">Message</p>
      <p class="text-lg pt-2 text-right font-semibold">{{ t.message || 'null' }}</p>
      <div class="col-span-2 flex border p-2 mt-5">
        <p class="text-xl w-1/2">Total Transaction</p>
        <p class="text-xl w-1/2 text-right font-semibold"> {{t.amount?.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'})}} </p>
      </div>
      <div class=" col-span-2 absolute bottom-0 w-[86%] mb-14">
      <button @click="deletTransaction" class="w-full mt-3 border border-red-600 p-3 font-bold text-red-600 rounded-lg">Delete</button>
      <button @click="$router.back()" class="w-full mt-3 bg-lemon p-3 font-bold text-dark rounded-lg">Done</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, computed } from 'vue';
import { useClipboard } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';

import AppBar from '@/components/AppBar.vue';
import { useTransactionsStore } from '@/store/transactions';

const { copy } = useClipboard();
const route = useRoute();
const router = useRouter();
const trxId = route.params.id;
const transactionStore = useTransactionsStore();

const transaction = computed(() => {
  return transactionStore.transaction;
});

async function getDetailTransaction() {
  try {
    transactionStore.getTransaction(trxId as string);
  } catch (error) {
    return error;
  }
}
async function deletTransaction() {
  let txt = 'Are you sure want delete this transaction?';
  if(confirm(txt) == true) {
    await transactionStore.deleteTransaction(trxId as string);
    router.back();
  }
}


onBeforeMount(() => {
  getDetailTransaction();
});
</script>

<style>

.vue-use-popperjs-none {
  display: none;
}
#tooltip {
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 13px;
}
</style>