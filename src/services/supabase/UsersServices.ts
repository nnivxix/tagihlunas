import { supabase } from "@/helpers/supabase";
import {user as admin} from '@/composables/AuthUser';
import { NewUser } from "@/interfaces/Users";

const UsersService = () => {
  async function addUser({admin_id, user_id, name, username, color_profile}: NewUser) {
    const { error } = await supabase
    .from('users')
    .insert({
      admin_id,
      user_id,
      name,
      username,
      color_profile,    
    });    
    if (error) throw error;
  }
  async function getUsers() {
    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('admin_id',admin?.value.id);
    if (error) throw error;
    return data;
  }
  async function getUserById(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select("*")
      .eq('user_id', userId);
    if (error) throw error;
    return data;
  }
  async function updateUser(userId: string, name : string, username: string, color_profile: string) {
    const { error } = await supabase
      .from('users')
      .update({ name, username, color_profile })
      .eq('user_id', userId);
      if (error) throw error;
  }
  async function deleteUser(userId: string) {
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('user_id', userId);
      if (error) throw error;
    return;
  }
  
  return {
    addUser,
    getUsers,
    getUserById,
    updateUser,
    deleteUser,
  };
};

export default UsersService;