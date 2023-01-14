import { supabase } from "@/services/supabase";
import { NewTrx } from "@/interfaces/NewTrx";

export function useTransactions () {
  const addTransaction = async ({user_id, flow, amount, wallet, trx_id }: NewTrx) => {
    try {
      const { error } = await supabase
        .from('transactions')
        .insert({user_id, flow, amount, wallet, trx_id });
        if (error) throw error;
    } catch (error) {
      return error;
    }
  };


  return {
    addTransaction,
  };
}