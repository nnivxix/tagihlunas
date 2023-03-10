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
            <button @click="showModal = true">Delete</button>
          </li>
        </ul>
        </button>
      </template>
    </AppBar>
    <div class="px-4 mb-7 mx-6" >
      <div v-if="!currentUser.length" class="flex items-center my-3">
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
      <div v-else class="flex flex-col items-center my-3" >
        <TheAvatar  @click="isEditName = false"
          :name="currentName" :dimension='parseInt("64")'
          :background="currentColor">
        </TheAvatar>
        <div class="my-4">
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
      </div>
      <p id="amount" class="text-4xl font-semibold text-dark py-4" @click="editName"> 
      {{ amount.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) }}
      </p>
      <TheButton icon="fa-plus" title="Add transaction" 
      @button-event="router.push({name: 'transactions.add', params: {userId: userId}})" ></TheButton>
    </div>
    <div v-if="!transactions.length ">
      <img src="@/assets/empty.svg" alt="empty transaction">
      <p class="text-center text-2xl">No transactions yet, let's <router-link class="underline" :to="{name: 'transactions.add'}">create one</router-link>.</p>
    </div>
    <div v-else v-for="transaction in transactions" :key="transaction.trx_id">
      <CardTransaction :user-id="(userId as string)" :trxId="transaction.trx_id" :amount="transaction.amount" :dateTrx="(transaction.created_at as string)" ></CardTransaction>
    </div>
    <!-- Modal -->
    <vue-final-modal v-model="showModal" classes="flex justify-center items-center w-full"
    @before-close="textConfirmation = ''">
      <ModalDelete grid-col=""
        type-data="user" cancle="Cancel" confirm="Sure, Delete" grid-rows="4"
        additional-msg="and all transactions"
        @clickCancle="showModal = false" @clickConfirm="deleteUser">
        <div class="flex items-center  flex-col col-span-2 mb-3">
          <p v-for="u in currentUser" :key="u.user_id"  class="text-center self-center py-2">
          Please type <b>{{ u.username }}</b> to confrim!
          </p>
          <input class="p-2 border border-gray-700" type="text" v-model="textConfirmation" name="confirm" @keyup.enter="deleteUser" >
          <span v-if="!isValid" class="text-red-600">text not match</span>
        </div>
      </ModalDelete>
    </vue-final-modal>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount,  watch, onBeforeUnmount } from 'vue';
import type { Ref } from 'vue';
import { ContentLoader } from "vue-content-loader";
import { useRoute, useRouter } from "vue-router";
import { VueFinalModal } from 'vue-final-modal';
import { storeToRefs } from 'pinia';
import _ from 'lodash';

import AppBar from '@/components/AppBar.vue';
import TheAvatar from '@/components/TheAvatar.vue';
import TheButton from '@/components/TheButton.vue';
import ModalDelete from '@/components/ModalDelete.vue';
import CardTransaction from '@/components/CardTransaction.vue';
import TransactionsService  from '@/services/supabase/TransactionsService';
import UsersService from '@/services/supabase/UsersServices';
import { useTransactionsStore } from '@/stores/transactions';
import { useUsersStore } from '@/stores/users';

const router = useRouter();
const route = useRoute();
const userId = route.params.userId;
const usersStore = useUsersStore(); 
const transactionsStore = useTransactionsStore();
const { currentUser, currentName, currentUsername, currentColor } = storeToRefs(usersStore);
const { transactions, transaction, initTransaction, amount } = storeToRefs(transactionsStore);

const isEditName: Ref<boolean> = ref(false);
const isShowOption = ref<boolean>(false);
const showModal: Ref<boolean> = ref(false);
const textConfirmation: Ref<string> = ref('');
const isValid = ref(true);


function showOption () {
  return isShowOption.value = !isShowOption.value;
}

async function getOneUser() {
  try {
    if(!currentUser.value.length) {
      await UsersService().getUserById(userId as string).then(async (result) => {
        currentUser.value = [];
        currentUsername.value = await _.clone(result).shift()?.username;
        currentName.value = await _.clone(result).shift()?.name;
        currentColor.value = await _.clone(result).shift()?.color_profile;
        currentUser.value.push(...result);
        localStorage.setItem('currentUser', JSON.stringify({
          name: _.clone(result).shift()?.name,
          username: _.clone(result).shift()?.username,
        }));
        return;
      });
    }
    return;
  } catch (error) {
    return error;
  }
}
async function deleteUser() {
  if(textConfirmation.value === currentUser.value[0].username && isValid) {
    await TransactionsService().deleteTransactionsByUserId(userId as string);
    await UsersService().deleteUserByUserId(userId as string);

    await transactionsStore.deleteTransaction(userId as string);
    await usersStore.deleteUser(userId as string);
    
    await router.push({
      name: 'users.index',
    });
    return;
  } 
}
async function editName() {
  if (isEditName.value) {
    if(currentName.value !== currentUser.value[0].name) {
      UsersService().updateName(currentName.value, userId as string);
    }
    isEditName.value = false;
  }
  return;  
}

async function getUserTransactions () {
  try {
    if (transactions.value.length == 0) {
      await TransactionsService().getTransactionsByUserId(userId as string).then(result => {
        transactions.value = [];
        transactions.value.push(...result);
        transactionsStore.calculateAmount(result);
      });
    }
  } catch (error) {
    return error;
  }
} 

function editUser(){
  router.push({
    name: 'users.edit',
    params: {
      userId,
    },
  });
}

watch(textConfirmation, () => {
  if(textConfirmation.value == '' ||
    textConfirmation.value == null ||
    textConfirmation.value === currentUser.value[0].username
  ) {
    isValid.value = true;
  } else{
    isValid.value = false;
  }
});

onBeforeMount( async () => {
  Object.assign(transaction.value, initTransaction);
  await getOneUser();
  await getUserTransactions();
  await transactionsStore.calculateAmount(transactions.value);
});
onBeforeUnmount(async () => {
  await getOneUser();

});
</script>

<style scoped>

</style>