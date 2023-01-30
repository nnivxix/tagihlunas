import { reactive, ref } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { NewTransaction, Transactions } from '@/interfaces/Transactions';
import { TransactionsType } from '@/types/Transactions';
import _ from 'lodash';

export const useTransactionsStore = defineStore('transaction', () => {
  const transactions: Ref<Transactions[]> = ref([]);
  const initTransaction = {
    id : 0,
    created_at : new Date(),
    user_id: '',
    flow: '',
    amount: 0,
    wallet: '',
    trx_id: '',
    message: '',
  };
  const transaction = reactive<TransactionsType>({...initTransaction});
  const amount = ref<number>(0);

  function calculateAmount(transactions: Transactions[]) {
    amount.value =  _.reduce(transactions, function(sum, n): number{
      return sum + n.amount;
    },0);
    return amount.value;
  }
  async function getTransactions(data: Transactions[]) {
    transactions.value = []; // empty first then add from supabase
    transactions.value.push(...data);
  }
  async function addTransaction({user_id, flow, amount, wallet, trx_id, message }: NewTransaction) {
    transactions.value.push({
      id: 0,
      // id: transactions.value.findLastIndex((e : Transactions) => e.id) + 1,
      created_at: '',
      user_id, flow, amount, wallet, trx_id, message,
    });
  }
  async function deleteTransaction(trxId: string) {
    const id = transactions.value.findIndex(transaction => transaction.trx_id == trxId);
    transactions.value.splice(id,1);
    return transactions;
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
  };
});
