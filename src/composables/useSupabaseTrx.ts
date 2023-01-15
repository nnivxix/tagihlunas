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

  const getAllTransactions = async () => {
    try {
      const { data, error } = await supabase
        .from('transactions')
        .select()
        .eq('user_id', 'u-t4cpnh181412023'); 
        if (error) throw error;
        return data;
    } catch (error) {
      return error;
    }
  };
  return {
    addTransaction,
    getAllTransactions,
  };
}