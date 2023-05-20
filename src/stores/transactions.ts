import { reactive, ref } from "vue";
import type { Ref } from "vue";
import { defineStore } from "pinia";
import { Transaction } from "@/schema";
import { reduce, remove } from "lodash";

export const useTransactionsStore = defineStore("transaction", () => {
  const transactions: Ref<Transaction[]> = ref([]);
  const initTransaction = {
    id: 0,
    created_at: new Date().toDateString(),
    user_id: "",
    flow: "",
    amount: 0,
    wallet: "",
    trx_id: "",
    message: "",
  };
  const transaction = reactive<Transaction>({ ...initTransaction });
  const amount = ref<number>(0);

  function calculateAmount(transactions: Transaction[]) {
    amount.value = reduce(
      transactions,
      function (sum, n): number {
        return sum + n.amount;
      },
      0,
    );
    return amount.value;
  }
  async function getTransactions(data: Transaction[]) {
    transactions.value = []; // empty first then add from supabase
    transactions.value.push(...data);
  }
  async function addTransaction({ user_id, flow, amount, wallet, trx_id, message }: Transaction) {
    transactions.value.push({
      id: 0,
      // id: transactions.value.findLastIndex((e : Transactions) => e.id) + 1,
      created_at: new Date().toString(),
      user_id,
      flow,
      amount,
      wallet,
      trx_id,
      message,
    });
  }
  async function deleteTransaction(trxId: string) {
    const id = transactions.value.findIndex((transaction) => transaction.trx_id == trxId);
    transactions.value.splice(id, 1);
    return transactions;
  }
  async function deleteTransactionsByUserId(userId: string) {
    remove(transactions.value, (n: Transaction) => {
      return n.user_id == userId;
    });
  }

  return {
    transactions,
    initTransaction,
    transaction,
    amount,
    calculateAmount,
    getTransactions,
    addTransaction,
    deleteTransaction,
    deleteTransactionsByUserId,
  };
});
