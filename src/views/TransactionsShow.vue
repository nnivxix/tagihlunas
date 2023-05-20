<template>
  <div class="mx-6">
    <AppBar titleapp="Detail">
      <template #back>
        <button
          v-if="isLoggedIn()"
          class="justify-self-start"
          @click="$router.back()"
        >
          <font-awesome-icon icon="fa-solid fa-x" class="h-5" />
        </button>
        <button v-else class="justify-self-start"></button>
      </template>
      <template #exit>
        <button class="justify-self-end" @click="startShare">
          <font-awesome-icon
            icon="fa-solid fa-arrow-up-from-bracket"
            class="h-5"
          />
        </button>
      </template>
    </AppBar>
    <div class="flex flex-col justify-between h-[90vh] mb-4">
      <div v-if="!loading" id="info" class="flex flex-col text-dark my-8">
        <img
          src="@/assets/check-circle-rounded.svg"
          alt="success"
          srcset=""
          class="h-32"
        />
        <h1 class="text-center font-semibold text-2xl mt-8">
          Transaction Success
        </h1>
      </div>
      <div id="detail" class="px-2 text-dark grid grid-cols-2">
        <p class="pt-2">Name</p>
        <p class="pt-2 text-right font-semibold">
          {{ usersStore.currentName }}
        </p>
        <p class="pt-2">Due date</p>
        <p class="pt-2 text-right font-semibold">
          {{ timeFormated(transaction.created_at as string, "YYYY-MM-DD") }}
        </p>
        <p class="pt-2">Time</p>
        <p class="pt-2 text-right font-semibold">
          {{ timeFormated(transaction.created_at as string, "HH:mm:ss") }}
        </p>
        <p class="pt-2">Transaction id</p>

        <p
          class="text-sm pt-2 text-right font-semibold"
          @click="copy(transaction.trx_id as string)"
        >
          <font-awesome-icon icon="fa-solid fa-copy"> </font-awesome-icon>
          {{ transaction.trx_id }}
        </p>

        <p class="pt-2">Message</p>
        <p class="pt-2 text-right font-semibold">
          {{ transaction.message || "null" }}
        </p>
        <div class="col-span-2 flex border p-2 mt-8 items-center">
          <p class="text-lg w-1/2">Total transaction</p>
          <p class="text-lg w-1/2 text-right font-semibold">
            {{
              transaction.amount?.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
            }}
          </p>
        </div>

        <!-- modal -->
        <vue-final-modal
          v-model="showModal"
          classes="flex justify-center items-center w-full"
        >
          <ModalDelete
            type-data="transaction"
            cancle="Back"
            confirm="Delete"
            grid-rows="3"
            @clickCancle="showModal = false"
            @clickConfirm="deleteTransaction"
          >
          </ModalDelete>
        </vue-final-modal>
      </div>
      <div id="action" v-if="isLoggedIn()" class="col-span-2 mt-10 mb-4">
        <button
          @click="showModal = true"
          class="w-full mt-3 border border-red-600 p-3 font-bold text-red-600 rounded-lg"
        >
          Delete
        </button>
        <button
          @click="$router.back()"
          class="w-full mt-3 bg-lemon p-3 font-bold text-dark rounded-lg"
        >
          Done
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref, reactive, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
import { useClipboard, useBrowserLocation, useShare } from "@vueuse/core";
import { isClient } from "@vueuse/shared";
import { useRoute, useRouter } from "vue-router";
import { VueFinalModal } from "vue-final-modal";
import { clone } from "lodash";
import { storeToRefs } from "pinia";

import TransactionsService from "@/services/supabase/TransactionsService";
import { useTransactionsStore } from "@/stores/transactions";
import { useUsersStore } from "@/stores/users";
import useAuthUser from "@/composables/useAuthUser";
import AppBar from "@/components/AppBar.vue";
import ModalDelete from "@/components/ModalDelete.vue";
import UsersService from "@/services/supabase/UsersServices";
import { timeFormated } from "@/composables/useTime";

const { copy } = useClipboard();
const route = useRoute();
const router = useRouter();
const trxId = route.params.trxId;
const userId = route.params.userId;
const transactionStore = useTransactionsStore();
const usersStore = useUsersStore();
const { isLoggedIn } = useAuthUser();

const showModal: Ref<boolean> = ref(false);
const loading: Ref<boolean> = ref(true);
const { transaction, initTransaction } = storeToRefs(transactionStore);
const { currentUser, currentName, currentUsername, currentColor } =
  storeToRefs(usersStore);

const shareOption = reactive({
  title: `This is transaction of ${currentName.value}`,
  text: `This is transaction of ${
    currentName.value
  } you can check the detail transaction from ${
    useBrowserLocation().value.href
  }`,
  url: isClient ? useBrowserLocation().value.href : "",
});
const { share, isSupported } = useShare(shareOption);
const startShare = () => {
  try {
    if (isSupported) {
      share().catch((e) => e);
    } else {
      window.navigator.share(shareOption);
    }
  } catch (error) {
    return;
  }
};

async function getDetailTransaction() {
  try {
    TransactionsService()
      .getTransactionById(trxId as string)
      .then((result) => {
        Object.assign(transaction.value, result[0]);
      });

    loading.value = false;
  } catch (error) {
    return error;
  }
}
async function getOneUser() {
  try {
    UsersService()
      .getUserById(userId as string)
      .then((result) => {
        currentUser.value = [];
        currentUsername.value = clone(result).shift()?.username;
        currentName.value = clone(result).shift()?.name;
        currentColor.value = clone(result).shift()?.color_profile;
        currentUser.value.push(...result);
      });
    loading.value = false;
  } catch (error) {
    return error;
  }
}

async function deleteTransaction() {
  await transactionStore.deleteTransaction(trxId as string);
  await TransactionsService().deleteTransactionById(trxId as string);
  router.back();
}

onBeforeMount(() => {
  getDetailTransaction();
  getOneUser();
});
onBeforeUnmount(() => {
  Object.assign(transaction, initTransaction);
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
