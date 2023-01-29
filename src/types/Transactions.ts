export type TransactionsType = {
  id: number;
  created_at: string | Date;
  user_id?: string;
  flow?: string;
  amount?: number;
  wallet?: string ;
  trx_id?: string ;
  message?: string ;
}