import { supabase } from "@/services/supabase";
import { NewTransaction } from "@/interfaces/Transactions";

export function useTransactions () {
  async function addTransaction({user_id, flow, amount, wallet, trx_id, message }: NewTransaction) {
    try {
      const { error } = await supabase
        .from('transactions')
        .insert({user_id, flow, amount, wallet, trx_id, message });
        if (error) throw error;
    } catch (error) {
      return error;
    }
  }

  async function getAllTransactions(userId: string) {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select()
        .eq('user_id', userId); 
        if (error) throw error;
        return data;
    } catch (error) {
      return error;
    }
  }
  return {
    addTransaction,
    getAllTransactions,
  };
}