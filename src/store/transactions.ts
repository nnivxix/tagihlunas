import { ref } from 'vue';
import type { Ref } from 'vue';
import { defineStore } from 'pinia';
import { NewTransaction, Transactions } from '@/interfaces/Transactions';
import { supabase } from '@/services/supabase';

export const useTransactionsStore = defineStore('transaction', () => {
  const transactions: Ref<Transactions[]> = ref([]);
  const transaction: Ref<Transactions[]> = ref([]);
  const amount: Ref<number> = ref(0);

  async function getTransactions(user_id: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select("*")
      .eq('user_id', user_id); 
  
    if (error) throw error;
    transactions.value = []; // empty first then add from supabase
    transactions.value.push(...data);
    
    amount.value = 0;
    for (let i = 0; i < data.length; i++) {
      amount.value += data[i].amount;
    }
    return data;
  }
  async function addTransaction({user_id, flow, amount, wallet, trx_id, message }: NewTransaction) {
    const { error } = await supabase
      .from('transactions')
      .insert({user_id, flow, amount, wallet, trx_id, message });
      if (error) throw error;
  }
  async function getTransaction(trxId: string) {
    const { data, error } = await supabase
      .from('transactions')
      .select("*")
      .eq('trx_id', trxId); 
  
    if (error) throw error;
    transaction.value = []; // empty first then add from supabase
    transaction.value.push(...data);
    return data;
  }
  async function deleteTransaction(trxId: string) {
    const { error } = await supabase
      .from('transactions')
      .delete()
      .eq('trx_id', trxId);
    
    if (error) throw error;
    return;
  }

  return {
    transactions,
    transaction,
    amount,
    getTransactions,
    addTransaction,
    getTransaction,
    deleteTransaction,
  };
});
