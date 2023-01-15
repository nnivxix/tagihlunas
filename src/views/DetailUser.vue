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
      <div v-if="user == undefined">
          <p>loading</p>
        </div>
      <div v-else class="flex items-center my-3">
        <TheAvatar
        :name="user.name" :dimension='parseInt("64")'
        :background="user['color_profile']"></TheAvatar>
        <p class="ml-4 text-xl flex items-center">{{ user.name }} <span><img class="px-4" src="../assets/pencil.svg" alt="edit button"></span></p>
      </div>
      <p  class="text-4xl font-semibold text-dark py-4"> 
      {{ amount.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) }}
      </p>
      <TheButton :src-icon="plus" title="Add Trx"
      @button-event="router.push({name: 'add.transaction', params: {userId: id}})" ></TheButton>
    </div>
    <div v-if="!transactions || !transactions.length ">
    <p>belum ada transaction</p>
    </div>
    <div v-else>
    <TheTrx v-for="transaction in transactions" :key="transaction.id" :trx-id="transaction.trx_id" :amount="transaction.amount" :date="transaction.created_at" ></TheTrx>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import AppBar from '@/components/AppBar.vue';
import TheAvatar from '@/components/TheAvatar.vue';
import TheButton from '@/components/TheButton.vue';
import plus from '@/assets/plus.svg';
import TheTrx from '@/components/TheTrx.vue';
import { useRoute } from "vue-router";
import router from '@/router';
import { supabase } from '@/services/supabase';

const user = ref();
const transactions = ref();
const amount = ref(0);
const route = useRoute();
const id = route.params.userId;

const getOneUser = async () => {
  const { data } = await supabase
    .from('users')
    .select("*")
    .eq('user_id', id);
  
  user.value = await data?.shift();
  return data;
};
const getUserTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select("*")
    .eq('user_id', id); 

  if (error) throw error;
  if( transactions.value == undefined) {
    transactions.value =  data;
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data.forEach((e: any) => {
    amount.value += e.amount;
  });
    
  return data;
  };  

onBeforeMount( async () => {
  await getOneUser();
  await getUserTransactions();
});
</script>

<style scoped>

</style>