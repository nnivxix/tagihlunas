<script setup lang="ts">
import {
  ref,
  onBeforeMount,
  watch,
  onMounted,
  defineAsyncComponent,
  computed,
} from "vue";
import type { Ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { VueFinalModal } from "vue-final-modal";
import { storeToRefs } from "pinia";

import AppBar from "@/components/AppBar.vue";
import TheButton from "@/components/TheButton.vue";
import ModalDelete from "@/components/ModalDelete.vue";
import CardTransaction from "@/components/CardTransaction.vue";
import TransactionsService from "@/services/supabase/TransactionsService";
import UsersService from "@/services/supabase/UsersServices";
import { useTransactionsStore } from "@/stores/transactions";
import { useUsersStore } from "@/stores/users";
import { supabase } from "@/helpers/supabase";
import { User } from "@/schema";
import { Transaction } from "@/schema";
import useInitialName from "@/composables/useInitialName";

const { deleteTransactionsByUserId } = TransactionsService();
const { deleteUserByUserId, updateName } = UsersService();
const router = useRouter();
const route = useRoute();
const { deleteUser: deleteUserStore } = useUsersStore();
const { calculateAmount, deleteTransaction } = useTransactionsStore();
const { currentUser, currentName, currentUsername, currentColor } = storeToRefs(
  useUsersStore()
);
const { transaction, initTransaction, amount, transactions } = storeToRefs(
  useTransactionsStore()
);
const userId = route.params.userId;
const { getInitial } = useInitialName();
const Avatar = defineAsyncComponent(() => import("@/components/TheAvatar.vue"));

const isEditName: Ref<boolean> = ref(false);
const isShowOption = ref<boolean>(false);
const showModal: Ref<boolean> = ref(false);
const textConfirmation: Ref<string> = ref("");
const isValid = ref(true);
const user = ref();

function showOption() {
  return (isShowOption.value = !isShowOption.value);
}

async function getOneUser() {
  try {
    const { data, error } = await supabase
      .from("users")
      .select(
        `id, admin_id, created_at, name, user_id, username, color_profile,
        transactions (
          id, user_id, flow, amount, wallet, trx_id, message, created_at
          )`
      )
      .eq("user_id", userId)
      .single();
    if (error) throw error;
    if (data) {
      user.value = data as User;
      currentUser.value = data as User;
      currentName.value = data.name;
      currentUsername.value = data.username;
      currentColor.value = data.color_profile;
      transactions.value = [...(data.transactions as Transaction[])];
      return;
    }
    return;
  } catch (error) {
    return error;
  }
}
const initName = computed(() => {
  return getInitial(currentName.value);
});

async function deleteUser() {
  if (textConfirmation.value === currentUser.value.username && isValid) {
    await deleteTransactionsByUserId(userId as string);
    await deleteUserByUserId(userId as string);

    await deleteTransaction(userId as string);
    await deleteUserStore(userId as string);

    await router.push({
      name: "users.index",
    });
    return;
  }
}
async function editName() {
  if (isEditName.value) {
    if (currentName.value !== currentUser.value.name) {
      updateName(currentName.value, userId as string);
    }
    isEditName.value = false;
  }
  return;
}

function editUser() {
  router.push({
    name: "users.edit",
    params: {
      userId,
    },
  });
}

watch(textConfirmation, () => {
  if (
    textConfirmation.value == "" ||
    textConfirmation.value == null ||
    textConfirmation.value === currentUser.value.username
  ) {
    isValid.value = true;
  } else {
    isValid.value = false;
  }
});

onBeforeMount(async () => {
  Object.assign(transaction.value, initTransaction);
});

onMounted(async () => {
  await getOneUser();
  calculateAmount(transactions.value);
});
</script>
<template>
  <DefaultLayout>
    <AppBar titleapp="Details" class="mx-6">
      <template #back>
        <button class="justify-self-start" @click="$router.back()">
          <font-awesome-icon
            class="h-5"
            icon="fa-solid fa-arrow-left"
          ></font-awesome-icon>
        </button>
      </template>
      <template #exit>
        <button class="justify-self-end relative" @click="showOption">
          <font-awesome-icon class="h-5" icon="fa-solid fa-ellipsis-vertical" />
          <ul
            class="border absolute right-0 top-12 text-xl bg-white"
            :class="{ block: isShowOption, hidden: !isShowOption }"
          >
            <li class="p-3">
              <button @click="editUser">Edit</button>
            </li>
            <li class="p-3 text-red-600">
              <button @click="showModal = true">Delete</button>
            </li>
          </ul>
        </button>
      </template>
    </AppBar>
    <div class="px-4 mb-7 mx-6">
      <div class="flex flex-col items-center my-3">
        <Avatar
          @click="isEditName = false"
          :init="initName"
          :name="currentName"
          :dimension="parseInt('64')"
          :background="currentColor"
        >
        </Avatar>
        <div class="my-4">
          <form @submit.prevent="editName">
            <input
              v-if="isEditName"
              id="inputCurrentName"
              type="text"
              v-model="currentName"
              class="bg-light-lemon text-xl p-2 rounded-lg ml-4"
            />
          </form>
          <p
            class="ml-4 text-xl flex items-center"
            :class="{ 'hidden absolute top-0': isEditName }"
            @dblclick="isEditName = true"
          >
            {{ currentName }}
            <span>
              <font-awesome-icon
                icon="fa-solid fa-pen"
                @click="isEditName = true"
                :class="{ 'hidden absolute top-0': isEditName }"
                class="ml-3 h-5 text-gray-700"
              >
              </font-awesome-icon>
            </span>
          </p>
        </div>
      </div>
      <p
        id="amount"
        class="text-4xl font-semibold text-dark py-4"
        @click="editName"
      >
        {{
          amount.toLocaleString("id-ID", { style: "currency", currency: "IDR" })
        }}
      </p>
      <TheButton
        icon="fa-plus"
        title="Add transaction"
        @button-event="
          router.push({ name: 'transactions.add', params: { userId: userId } })
        "
      ></TheButton>
    </div>
    <div v-if="!currentUser.transactions?.length">
      <img src="@/assets/empty.svg" alt="empty transaction" />
      <p class="text-center text-2xl">
        No transactions yet, let's
        <router-link class="underline" :to="{ name: 'transactions.add' }"
          >create one</router-link
        >.
      </p>
    </div>
    <div v-else>
      <CardTransaction
        v-for="transaction in currentUser.transactions"
        :key="transaction.trx_id"
        :transaction="transaction"
      ></CardTransaction>
    </div>
    <!-- Modal -->
    <vue-final-modal
      v-model="showModal"
      classes="flex justify-center items-center w-full"
      @before-close="textConfirmation = ''"
    >
      <ModalDelete
        grid-col=""
        type-data="user"
        cancel="Cancel"
        confirm="Sure, Delete"
        grid-rows="4"
        additional-msg="and all transactions"
        @clickCancle="showModal = false"
        @clickConfirm="deleteUser"
      >
        <div class="flex items-center flex-col col-span-2 mb-3">
          <p class="text-center self-center py-2">
            Please type <b>{{ currentUser.username }}</b> to confrim!
          </p>
          <input
            class="p-2 border border-gray-700"
            type="text"
            v-model="textConfirmation"
            name="confirm"
            @keyup.enter="deleteUser"
          />
          <span v-if="!isValid" class="text-red-600">text not match</span>
        </div>
      </ModalDelete>
    </vue-final-modal>
  </DefaultLayout>
</template>

<style scoped></style>
