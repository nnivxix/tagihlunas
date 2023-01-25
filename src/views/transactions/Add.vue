<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mx-6">
    <AppBar titleapp="Transaction">
      <template #back >
        <button class="justify-self-start" @click="$router.back()">
          <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
        </button>
      </template>
    </AppBar>
    <form class="flex flex-col" @submit.prevent="handleAddTransaction">
      <div v-for="u in user" :key="u.user_id" class="flex flex-col" >
        <label for="username" class="text-xl text-dark">username</label>
        <input type="text" name="username" id="username" v-model="u.username"
        class="bg-light-lemon p-2 mb-5 rounded-lg" readonly>
        
        <label for="name" class="text-xl text-dark">name</label>
        <input type="text" name="name" id="name" v-model="u.name"
        class="bg-light-lemon p-2 mb-5 rounded-lg" readonly>
      </div>
      
      <label for="flow" class="text-xl text-dark ">flow</label>
      <select v-model="formAddTrx.flow" name="flow" @input="v$.$validate" id="flow" class="bg-light-lemon p-2 rounded-lg">
        <option value="cash out">cash out</option>
        <option value="cash in">cash in</option>
      </select>
      <div v-if="v$.flow.$error" >
        <p class="text-red-500" v-for="e in v$.flow.$errors" :key="e.$uid">{{ e.$message }}</p>
      </div>
      <!-- <p v-if="v$.flow.$error" class="text-red-500">Please select one!</p> -->
      
      <label for="amount" class="text-xl text-dark mt-5">amount</label>
      <money-3-component v-model.number="formAddTrx.amount" v-bind="config" inputmode="numeric"  name="amount" id="amount" class="bg-light-lemon p-2 rounded-lg"></money-3-component>
      <!-- <p v-if="v$.amount.$error" class="text-red-500">The amount entered must be at least Rp. 2000.</p> -->
      <div v-if="v$.amount.$error" >
        <p class="text-red-500" v-for="e in v$.amount.$errors" :key="e.$uid">{{ e.$message }}</p>
      </div>
      <label for="wallet" class="text-xl text-dark mt-5">wallet</label>
      <select v-model="formAddTrx.wallet" name="wallet" id="wallet" class="bg-light-lemon p-2 rounded-lg">
        <option value="OVORP">OVO</option>
        <option value="GPYDR">Gopay Driver</option>
        <option value="GPYCS">Gopay Customer</option>
        <option value="GBIDR">Grab Driver</option>
        <option value="CSHRP">Cash</option>
      </select>
      <p v-if="v$.wallet.$error" class="text-red-500">Please select one!</p>
      <label for="name" class="text-xl text-dark mt-5">message (Optional)</label>
      <input type="text" name="name" id="name" v-model="formAddTrx.message"
      class="bg-light-lemon p-2 rounded-lg mb-2">
      <div v-if="v$.message.$error" >
        <p class="text-red-500 mb-5" v-for="e in v$.message.$errors" :key="e.$uid">The maximum number of characters required is 25 characters</p>
      </div>

      <button class="bg-lemon p-3 font-bold text-dark rounded-lg mt-10">
        Add Transaction
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, Ref, onBeforeMount , computed} from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { customAlphabet } from 'nanoid';
import { Money3Component } from "v-money3";
import { useVuelidate } from '@vuelidate/core';
import { minValue, required, maxLength } from '@vuelidate/validators';

import AppBar from '@/components/AppBar.vue';
import { ref } from 'vue';
import { supabase } from '@/services/supabase';
import { Users } from '@/interfaces/Users';
import { useTransactionsStore } from '@/store/transactions';

const route = useRoute();
const router = useRouter();
const username = route.params.username;
const transactionStore = useTransactionsStore();

const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
const user: Ref<Users[]> = ref([]);
const initFormAddTrx = {
  flow: '',
  amount: '',
  wallet: '',
  message: '',
};
const formAddTrx = reactive({...initFormAddTrx});
const rules = computed(() => {
  return {
    flow: {
      required,
    },
    amount: {
      minValue: minValue(2000), 
    },
    wallet:{
      required,
    },
    message: {
      maxLength: maxLength(25), 
    },
  };
});
const v$ = useVuelidate(rules, formAddTrx);
const config = reactive({
  spinner: true,
  step: 10,
  min: -10,
  precision: 0,
  prefix: "Rp. ",
  suffix: "",
  decimal: '.',
  thousands: ',',
  template: "bootstrap",
  masked: true,
  disableNegative: false,
  align: "center",
});

function resetForm() {
  Object.assign(formAddTrx,initFormAddTrx);
}
async function getOneUser() {
  const { data, error } = await supabase
  .from('users')
  .select()
  .eq('username', username); 
  if (error) throw error;
  user.value = data;
}

async function handleAddTransaction () {
  try {
    v$.value.$validate(); 
    if (!v$.value.$error) {
      await transactionStore.addTransaction({
        user_id: user.value[0].user_id as string,
        flow: formAddTrx.flow,
        amount: formAddTrx.flow == 'cash out' ? parseInt(formAddTrx.amount) * -1 : parseInt(formAddTrx.amount) * 1,
        wallet: formAddTrx.wallet,
        trx_id: `${formAddTrx.wallet.toLocaleUpperCase()}-${nanoid(8).toLocaleUpperCase()}-${new Date().getHours()}${new Date().getMinutes()}`,
        message:formAddTrx.message,
      });
  
      resetForm();
      router.back();
    }
  } catch (error) {
    return error;
  }
}
onBeforeMount(() => {
  getOneUser();
});
</script>