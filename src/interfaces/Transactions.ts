export interface NewTransaction {
  user_id?: string;
  flow?: string;
  amount: number;
  wallet?: string ;
  trx_id?: string ;
  message?: string ;
}

export interface Transactions extends NewTransaction {
  id: number;
  created_at: string;
}