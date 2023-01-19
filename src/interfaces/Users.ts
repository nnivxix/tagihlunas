export interface NewUser {
  admin_id: string;
  user_id: string;
  name: string;
  username: string;
  color_profile: string;
}
export interface Users extends NewUser {
  id: number;
  created_at: string | null;
}