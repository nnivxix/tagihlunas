<template>
  <div class="mx-6">
    <AppBar titleapp="Transaction">
      <template #back >
        <button class="justify-self-start" @click="$router.back()">
          <img src="@/assets/arrow-back.svg" alt="back" srcset="">
        </button>
      </template>
    </AppBar>
    {{ $route.params.userId }}
    <form class="flex flex-col" @submit.prevent="handleAddTransaction">
      <label for="username" class="text-xl text-dark">username</label>
      <input type="text" name="username" id="username" v-model="user[0][0].username"
      class="bg-light-lemon p-2 mb-5 rounded-lg" readonly>
      
      <label for="name" class="text-xl text-dark">name</label>
      <input type="text" name="name" id="name" v-model="user[0][0].name"
      class="bg-light-lemon p-2 mb-5 rounded-lg" readonly>
      
      <label for="flow" class="text-xl text-dark">flow</label>
      <select v-model="formAddTrx.flow" name="flow" id="flow" class="bg-light-lemon p-4 mb-5 rounded-lg">
        <option value="cash out">cash out</option>
        <option value="cash in">cash in</option>
      </select>

      <label for="amount" class="text-xl text-dark">amount</label>
      <input v-model="formAddTrx.amount" type="number" name="amount" id="amount" class="bg-light-lemon p-2 mb-5 rounded-lg">

      <label for="wallet" class="text-xl text-dark">wallet</label>
      <select v-model="formAddTrx.wallet" name="wallet" id="wallet" class="bg-light-lemon p-4 mb-12 rounded-lg">
        <option value="Ovo">Ovo</option>
        <option value="Gopay">Gopay</option>
      </select>
      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">Add Transaction</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
import { useTransactions } from '@/composables/useSupabaseTrx';
import { reactive } from 'vue';
import { useRoute } from 'vue-router';
import { ref } from 'vue';
import { supabase } from '@/services/supabase';
import { customAlphabet } from 'nanoid';

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
const route = useRoute();
const userId = route.params.userId;
const user: any = ref([]);
async function getOneUser() {
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('user_id', userId); 

  user.value.push(data);
}

getOneUser();


const {addTransaction} = useTransactions();
const formAddTrx = reactive({
  flow: '',
  amount: '',
  wallet: '',
});

async function handleAddTransaction () {
  try {
    await addTransaction({
      user_id: userId as string,
      flow: formAddTrx.flow,
      amount: formAddTrx.flow == 'cash out' ? parseInt(formAddTrx.amount) * -1 : parseInt(formAddTrx.amount) * 1,
      wallet: formAddTrx.wallet,
      trx_id: `${formAddTrx.wallet.toLocaleUpperCase()}-${nanoid(8)}-${new Date().getHours()}${new Date().getMinutes()}` ,
    });
  } catch (error) {
    return error;
  }
}
</script>