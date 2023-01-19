<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <AppBar titleapp="Details" class="mx-6">
      <template #back >
        <button class="justify-self-start" @click="$router.back()">
          <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
        </button>
      </template>
    </AppBar>
    <div class="px-4 mb-7 mx-6" >
      <div v-if="user == null">
          <p>loading</p>
        </div>
      <div v-else class="flex items-center my-3"  v-for="d in user" :key="d.user_id" >
        <TheAvatar  @click="isEditName = false"
        :name="currentName" :dimension='parseInt("64")'
        :background="d.color_profile"></TheAvatar>
        <form @submit.prevent="editName">
          <input v-if="isEditName" id="inputCurrentName"
          type="text" v-model="currentName"
          class="bg-light-lemon text-xl p-2 rounded-lg ml-4">
        </form>
        <p  class="ml-4 text-xl flex items-center" :class="{'hidden absolute top-0': isEditName}"
        @dblclick="isEditName = true" ref="target">
          {{ currentName }}
          <span><font-awesome-icon :class="{'hidden absolute top-0': isEditName}" class="ml-3" icon="fa-solid fa-pen" @click="isEditName = true"></font-awesome-icon></span>
        </p>
      </div>
      <p id="amount" class="text-4xl font-semibold text-dark py-4" @click="editName"> 
      {{ amount.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) }}
      </p>
      <TheButton icon="fa-plus" title="Add Trx" 
      @button-event="router.push({name: 'add.transaction', params: {username: username}})" ></TheButton>
    </div>
    <div v-if="!transactions.length ">
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

const user: Ref<Users[]> = ref([]);
const transactions: Ref<Transactions[]> = ref([]);
const isEditName: Ref<boolean> = ref(false);
const amount = ref(0);
const route = useRoute();
const username = route.params.username;
const currentName: Ref<string> = ref('');
const target = ref(null);

const getOneUser = async () => {
  try {
    const { data, error } = await supabase
      .from('users')
      .select("*")
      .eq('username', username);
    if (error) throw error;
    user.value = data;
    currentName.value = user.value[0].name;
    return data;
  } catch (error) {
    return error;
  }
};

async function editName() {
  if (isEditName.value) {

    if(currentName.value !== user.value[0].name) {
      const { error } = await supabase
      .from('users')
      .update({ name: currentName.value})
      .eq('username', username);
      if (error) throw error;
    }
    isEditName.value = false;
  }
  return;  
}

const getUserTransactions = async () => {
  const { data, error } = await supabase
    .from('transactions')
    .select("*")
    .eq('user_id', user.value[0].user_id); 

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