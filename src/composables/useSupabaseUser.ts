import { NewUser } from "@/interfaces/Users";
import { supabase } from "@/services/supabase";
import {  ref } from "vue";
export const user = ref();
export const userId = ref(); 
export const users = ref();
export const lengthUsers = ref();
export function useSupabase() {
  const addUser = async ({admin_id, user_id, name, username, color_profile}: NewUser) => {
    try {
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
    } catch(error){
      if (error instanceof Error) {
        return error;
      }
    } finally{
      name = '',
      username = '';
    }
  };
  const getAllUsers = async () => {
    try {
      const { data, error } = await supabase
      .from('users')
      .select();
      if (error) throw error;
      users.value = data;
      
      lengthUsers.value = data.length;
      return data;
    } catch (error) {
      return error;
    }
  };
  const getOneUser = async (userId: string) => {
    try {
      const { data, error } = await supabase
      .from('users')
      .select("*")
      .eq('user_id', userId);
      // console.log(data?.shift().name);
      if (error) throw error;
      user.value = await data?.shift();
      return data;
    } catch (error) {
      return error;
    }
  };

  return {
    addUser,
    getAllUsers,
    getOneUser,
  };
}
