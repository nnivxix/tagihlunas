import { NewUser } from "@/interfaces/NewUser";
import { supabase } from "@/services/supabase";
import {  ref } from "vue";

export const users = ref();
export const lengthUsers = ref()
export function useSupabase() {
  const addUser = async ({admin_id, user_id, name, username, color_profile}: NewUser) => {
    try {
      const { error } = await supabase.from('users')
      .insert({
        admin_id,
        user_id,
        name,
        username,
        color_profile    
      })
      if (error) throw error;
    } catch(error){
      if (error instanceof Error) {
        return error;
      }
    } finally{
      name = '',
      username = ''
    }
  }
  const listAllUsers = async () => {
    try {
      const { data, error } = await supabase
      .from('users')
      .select()
      if (error) throw error;
      users.value = data
      lengthUsers.value = data.length;
      
    } catch (error) {
      return error
    }
  }

  return {
    addUser,
    listAllUsers,
  }
}