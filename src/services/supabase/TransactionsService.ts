import { supabase } from "@/helpers/supabase";
import { Transaction } from "@/schema";

const TransactionsService = () => {
  async function addTransaction({
    user_id,
    flow,
    amount,
    wallet,
    trx_id,
    message,
  }: Transaction) {
    const { error } = await supabase
      .from("transactions")
      .insert({ user_id, flow, amount, wallet, trx_id, message });
    if (error) throw error;
  }
  async function getTransactionById(trxId: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select(
        `id, user_id, flow, amount, wallet, trx_id, message, created_at,
    users (
      id, name
      )
  `
      )
      .eq("trx_id", trxId)
      .single();

    if (error) throw error;
    return data;
  }
  async function getTransactionsByUserId(user_id: string) {
    const { data, error } = await supabase
      .from("transactions")
      .select("*")
      .eq("user_id", user_id);

    if (error) throw error;
    return data;
  }
  async function deleteTransactionsByUserId(userId: string) {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("user_id", userId);

    if (error) throw error;
    return;
  }
  async function deleteTransactionById(trxId: string) {
    const { error } = await supabase
      .from("transactions")
      .delete()
      .eq("trx_id", trxId);

    if (error) throw error;
    return;
  }
  return {
    addTransaction,
    getTransactionsByUserId,
    getTransactionById,
    deleteTransactionsByUserId,
    deleteTransactionById,
  };
};

export default TransactionsService;
