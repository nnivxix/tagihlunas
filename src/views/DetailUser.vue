<template>
  <div>
    <AppBar titleapp="Details" class="mx-6">
      <template #back >
        <button class="justify-self-start" @click="$router.back()">
          <img src="@/assets/arrow-back.svg" alt="back" srcset="">
        </button>
      </template>
    </AppBar>
    <div class="px-4 mb-7 mx-6">
      <div v-if="data == null">
          <p>loading</p>
        </div>
      <div v-else class="flex items-center my-3"  v-for="d in data" :key="d.user_id">
      <!-- <p v-for="d in data" :key="d.user_id"> {{ d.name }}</p> -->
        <TheAvatar 
        :name="`${d.name}`" :dimension='parseInt("64")'
        :background="d.color_profile"></TheAvatar>
        <p class="ml-4 text-xl flex items-center">{{ d.name }} <span><font-awesome-icon icon="fa-solid fa-pen"></font-awesome-icon></span></p>
      </div>
      <p  class="text-4xl font-semibold text-dark py-4"> 
      {{ amount.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) }}
      </p>
      <TheButton icon="fa-plus" title="Add Trx"
      @button-event="router.push({name: 'add.transaction', params: {userId: id}})" ></TheButton>
    </div>
    <div v-if="!transactions ">
    <p>belum ada transaction</p>
    </div>
    <div v-else v-for="transaction in transactions" :key="transaction.trx_id">
    <CardTransaction  :trx-id="transaction.trx_id" :amount="transaction.amount" :date="transaction.created_at" ></CardTransaction>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import AppBar from '@/components/AppBar.vue';
import TheAvatar from '@/components/TheAvatar.vue';
import TheButton from '@/components/TheButton.vue';

import { useRoute } from "vue-router";
import router from '@/router';
import { supabase } from '@/services/supabase';
import CardTransaction from '@/components/CardTransaction.vue';
import { Users } from '@/interfaces/Users';
import { Transactions } from '@/interfaces/Transactions';

const data: Ref<Users[]> = ref([]);
const transactions: Ref<Transactions[]> = ref([]);
const amount = ref(0);
const route = useRoute();
const id = route.params.userId;

const getOneUser = async () => {
  try {
    
    const { data: user, error } = await supabase
      .from('users')
      .select("*")
      .eq('user_id', id);
    if (error) throw error;
    data.value = [...user];
    return data;
  } catch (error) {
    return error;
  }
};

const getUserTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select("*")
    .eq('user_id', id); 

  if (error) throw error;
  transactions.value = [...data];

  for (let i = 0; i < data.length; i++) {
    amount.value += data[i].amount;
  }
  return data;
  };  

onBeforeMount( async () => {
  await getOneUser();
  await getUserTransactions();
});
</script>

<style scoped>

</style>