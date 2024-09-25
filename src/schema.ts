export interface Auth {
  name?: string;
  email: string;
  password: string;
}

export interface User {
  id?: number;
  admin_id: string;
  user_id: string;
  name: string;
  username: string;
  color_profile: string;
  created_at?: string;
  transactions?: Transaction[] | [];
}

export interface Transaction {
  id?: number;
  user_id: string;
  flow: string;
  amount: number;
  wallet: string;
  trx_id: string;
  message?: string;
  created_at?: string;
  users?: {
    name?: string;
    user_id?: string;
  };
}

