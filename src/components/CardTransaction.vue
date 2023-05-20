<template>
  <router-link
    :to="{
      name: 'transactions.show',
      params: { userId: user_id, trxId: transaction.trx_id },
    }"
    class="grid grid-rows-2 grid-cols-2 cursor-pointer bg-semi-gray-1 px-8 py-4 text-dark hover:text-gray-700 hover:bg-lemon"
  >
    <p class="text-sm font-semibold">{{ transaction.trx_id }}</p>
    <p id="amount" class="text-lg font-semibold text-gray-800 text-end row-span-2 self-center">
      {{
        transaction.amount?.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        })
      }}
    </p>
    <p class="text-sm text-gray-400">
      {{ timeFormated(transaction.created_at as unknown as string, "DD-MM-YYYY HH:mm:ss") }}
    </p>
  </router-link>
</template>

<script setup lang="ts">
import { timeFormated } from "@/composables/useTime";

// eslint-disable-next-line vue/no-setup-props-destructure
const { user_id, transaction } = defineProps<{
  transaction: {
    trx_id?: string;
    amount?: number;
    created_at?: string;
  };
  user_id?: string;
}>();
</script>
