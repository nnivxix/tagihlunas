import { supabase } from "@/helpers/supabase";
import { useAuthUser } from "@/composables/useAuthUser";
import { User } from "@/schema";

const { user: admin } = useAuthUser();

const UsersService = () => {
  async function addUser({ admin_id, user_id, name, username, color_profile }: User) {
    const { error } = await supabase.from("users").insert({
      admin_id,
      user_id,
      name,
      username,
      color_profile,
    });
    if (error) throw error;
  }
  async function getUsers() {
    const { data, error } = await supabase.from("users").select().eq("admin_id", admin?.value.id);
    if (error) throw error;
    return data;
  }
  async function getUserById(userId: string) {
    const { data, error } = await supabase
      .from("users")
      .select(
        `id, admin_id, created_at, name, user_id, username, color_profile,
        transactions (
          id, user_id, flow, amount, wallet, trx_id, message, created_at
          )`,
      )
      .eq("user_id", userId)
      .single();
    if (error) throw error;
    return data;
  }
  async function updateUser(userId: string, name: string, username: string, color_profile: string) {
    const { error } = await supabase
      .from("users")
      .update({ name, username, color_profile })
      .eq("user_id", userId);
    if (error) throw error;
  }
  async function updateName(currentName: string, userId: string) {
    const { error } = await supabase
      .from("users")
      .update({ name: currentName })
      .eq("user_id", userId);
    if (error) throw error;
  }
  async function deleteUserByUserId(userId: string) {
    const { error } = await supabase.from("users").delete().eq("user_id", userId);
    if (error) throw error;
    return;
  }

  return {
    addUser,
    getUsers,
    getUserById,
    updateUser,
    updateName,
    deleteUserByUserId,
  };
};

export default UsersService;
