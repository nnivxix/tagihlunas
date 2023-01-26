<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div>
    <AppBar titleapp="Details" class="mx-6">
      <template #back >
        <button class="justify-self-start" @click="$router.back()">
          <font-awesome-icon class="h-5" icon="fa-solid fa-arrow-left"></font-awesome-icon>
        </button>
      </template>
      <template #exit >
        <button class="justify-self-end" @click="showOption">
          <font-awesome-icon class="h-5" icon="fa-solid fa-ellipsis-vertical" />
        <ul class="border absolute right-7 text-right top-12 text-xl bg-white" :class="{'block' : isShowOption, 'hidden': !isShowOption}">
          <li class="p-3 ">
            <button @click="editUser">Edit</button>
          </li>
          <li class="p-3 text-red-600">
            <button @click="deleteUser">Delete</button>
          </li>
        </ul>
        </button>
      </template>
    </AppBar>
    <div class="px-4 mb-7 mx-6" >
      <div v-if="!user.length" class="flex items-center my-3">
        <content-loader
          viewBox="0 0 476 150"
          :speed="8"
          primaryColor="#e8e8e8"
          secondaryColor="#9e9e9e"
          >
          <rect x="107" y="34" rx="3" ry="3" width="338" height="37" /> 
          <circle cx="46" cy="50" r="41" />
      </content-loader>
      </div>
      <div v-else class="flex items-center my-3"  v-for="d in user" :key="d.user_id" >
        <TheAvatar  @click="isEditName = false"
          :name="d.name" :dimension='parseInt("64")'
          :background="d.color_profile">
        </TheAvatar>
        <form @submit.prevent="editName">
          <input v-if="isEditName" id="inputCurrentName"
          type="text" v-model="currentName"
          class="bg-light-lemon text-xl p-2 rounded-lg ml-4">
        </form>
        <p  class="ml-4 text-xl flex items-center" :class="{'hidden absolute top-0': isEditName}"
        @dblclick="isEditName = true">
          {{ currentName }}
          <span>
            <font-awesome-icon icon="fa-solid fa-pen" @click="isEditName = true"
            :class="{'hidden absolute top-0': isEditName}" class="ml-3 h-5 text-gray-700 ">
            </font-awesome-icon>
          </span>
        </p>
      </div>
      <p id="amount" class="text-4xl font-semibold text-dark py-4" @click="editName"> 
      {{ amount.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) }}
      </p>
      <TheButton icon="fa-plus" title="Add transaction" 
      @button-event="router.push({name: 'add.transaction', params: {userId: userId}})" ></TheButton>
    </div>
    <div v-if="!transactions.length ">
      <img :src="empty" alt="empty transaction">
      <p class="text-center text-2xl">No transactions yet, let's <router-link class="underline" :to="{name: 'add.transaction'}">create one</router-link>.</p>
    </div>
    <div v-else v-for="transaction in transactions" :key="transaction.trx_id">
      <CardTransaction :user-id="(userId as string)" :trx-id="transaction.trx_id" :amount="transaction.amount" :date="transaction.created_at" ></CardTransaction>
    </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount,  computed } from 'vue';
import type { Ref } from 'vue';
import { ContentLoader } from "vue-content-loader";
import AppBar from '@/components/AppBar.vue';
import TheAvatar from '@/components/TheAvatar.vue';
import TheButton from '@/components/TheButton.vue';
import { useRoute, useRouter } from "vue-router";

import { useTransactionsStore } from '@/store/transactions';
import { supabase } from '@/services/supabase';
import CardTransaction from '@/components/CardTransaction.vue';

import empty from '@/assets/empty.svg';
import { useUsersStore } from '@/store/users';
import { storeToRefs } from 'pinia';

const usersStore = useUsersStore(); 
const transactionStore = useTransactionsStore();
const router = useRouter();
const route = useRoute();
const userId = route.params.userId;

const { user, currentName } = storeToRefs(usersStore);

const isEditName: Ref<boolean> = ref(false);
const isShowOption = ref<boolean>(false);
const colorsProfile = ref<string[]>(['#66999B', '#FE5D9F', '#647AA3', '#5A9367', '#E08E45', '#26408B', '#63372C', '#FF7D00', '#C3423F', '#912F56', '#17BEBB', '#A50104', '#6A6262', '#EC058E', '#3772FF', '#DF2935']);
  
const transactions = computed(() => {
  return transactionStore.transactions;
});
const amount = computed(() => {
  return transactionStore.amount;
});

const getOneUser = async () => {
  try {
    usersStore.getOneUser(userId as string);
    return;
  } catch (error) {
    return error;
  }
};

function pickOneColor(): string{
  const indexColor: number = Math.floor(Math.random() * colorsProfile.value.length);
  return colorsProfile.value[indexColor];
}

async function editName() {
  if (isEditName.value) {

    if(currentName.value !== user.value[0].name) {
      const { error } = await supabase
      .from('users')
      .update({ name: currentName.value, color_profile: pickOneColor()})
      .eq('user_id', userId);
      if (error) throw error;
    }
    isEditName.value = false;
  }
  return;  
}

function getUserTransactions () {
  
  try {    
    transactionStore.getTransactions(userId as string);
  } catch (error) {
    return error;
  }
} 
function showOption () {
  isShowOption.value = !isShowOption.value;
  
}
function editUser(){
  console.log('edit user');
  
}
function deleteUser() {
  console.log('delete user');
}

onBeforeMount( async () => {
  await getOneUser();
  await getUserTransactions();
});
</script>

<style scoped>

</style>