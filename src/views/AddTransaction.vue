<template>
  <div class="mx-6">
    <AppBar titleapp="Transaction">
      <template #back >
        <button class="justify-self-start" @click="$router.back()">
          <img src="@/assets/arrow-back.svg" alt="back" srcset="">
        </button>
      </template>
    </AppBar>
    <form class="flex flex-col" @submit.prevent="handleAddTransaction"
      v-for="u in user" :key="u.user_id">

      <label for="username" class="text-xl text-dark">username</label>
      <input type="text" name="username" id="username" v-model="u.username"
      class="bg-light-lemon p-2 mb-5 rounded-lg" readonly>
      
      <label for="name" class="text-xl text-dark">name</label>
      <input type="text" name="name" id="name" v-model="u.name"
      class="bg-light-lemon p-2 mb-5 rounded-lg" readonly>
      
      <label for="flow" class="text-xl text-dark">flow</label>
      <select v-model="formAddTrx.flow" name="flow" id="flow" class="bg-light-lemon p-2 mb-5 rounded-lg">
        <option value="cash out">cash out</option>
        <option value="cash in">cash in</option>
      </select>

      <label for="amount" class="text-xl text-dark">amount</label>
      <input v-model.number="formAddTrx.amount" inputmode="numeric"  name="amount" id="amount" class="bg-light-lemon p-2 mb-5 rounded-lg">

      <label for="wallet" class="text-xl text-dark">wallet</label>
      <select v-model="formAddTrx.wallet" name="wallet" id="wallet" class="bg-light-lemon p-4 mb-12 rounded-lg">
        <option value="OVO">OVO</option>
        <option value="GPYDR">Gopay Driver</option>
        <option value="GPYCS">Gopay Customer</option>
        <option value="GBIDR">Grab Driver</option>
        <option value="CASH">Cash</option>
      </select>

      <label for="name" class="text-xl text-dark">Message (Optional)</label>
      <input type="text" name="name" id="name" v-model="formAddTrx.message"
      class="bg-light-lemon p-2 mb-5 rounded-lg">

      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">
        Add Transaction
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, Ref, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { customAlphabet } from 'nanoid';

import AppBar from '@/components/AppBar.vue';
import { useTransactions } from '@/composables/useSupabaseTrx';
import { ref } from 'vue';
import { supabase } from '@/services/supabase';
import { Users } from '@/interfaces/Users';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
const route = useRoute();
const router = useRouter();
const userId = route.params.userId;
const {addTransaction} = useTransactions();

const user: Ref<Users[]> = ref([]);
const formAddTrx = reactive({
  flow: '',
  amount: '',
  wallet: '',
  message: '',
});

async function getOneUser() {
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('user_id', userId); 
  if (error) throw error;
  user.value = [...data];
}

async function handleAddTransaction () {
  try {
    await addTransaction({
      user_id: userId as string,
      flow: formAddTrx.flow,
      amount: formAddTrx.flow == 'cash out' ? parseInt(formAddTrx.amount) * -1 : parseInt(formAddTrx.amount) * 1,
      wallet: formAddTrx.wallet,
      trx_id: `${formAddTrx.wallet.toLocaleUpperCase()}-${nanoid(8).toLocaleUpperCase()}-${new Date().getHours()}${new Date().getMinutes()}`,
      message:formAddTrx.message,
    });

    formAddTrx.flow = '';
    formAddTrx.amount = '';
    formAddTrx.wallet = '';
    router.back();
  } catch (error) {
    return error;
  }
}
onBeforeMount(() => {
  getOneUser();
});
</script>