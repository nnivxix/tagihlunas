import { defineStore } from "pinia";
import { ref } from 'vue';
import type { Ref } from "vue";

import { Users } from "@/interfaces/Users";
import { supabase } from "@/services/supabase";

export const useUsersStore = defineStore('users', () => {
  const users: Ref<Users[]> = ref([]);
  const usersDuplicate: Ref<Users[]> = ref([]);
  const user: Ref<Users[]> = ref([]);
  const currentName: Ref<string> = ref('');

  async function getUsers() {
    const { data, error } = await supabase
    .from('users')
    .select();
    if (error) throw error;
    usersDuplicate.value.push(...data);
    users.value.push(...data);
  }
  async function getOneUser(userId: string) {
    const { data, error } = await supabase
      .from('users')
      .select("*")
      .eq('user_id', userId);
    if (error) throw error;
    user.value = [];
    user.value.push(...data);
    currentName.value = await data.shift()?.name;
    return data;
  }
  async function deleteUser(userId: string) {
    const idUser = users.value.findIndex(user => user.user_id == userId);

    const { error: u } = await supabase
      .from('users')
      .delete()
      .eq('user_id', userId);
      
      if (u) throw u;
    users.value.splice(idUser,1);
    return;
    
  }

  return {
    users,
    usersDuplicate,
    user,
    currentName,
    getUsers,
    getOneUser,
    deleteUser,
  };
});