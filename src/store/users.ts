import { Users } from "@/interfaces/Users";
import { defineStore } from "pinia";
import { ref } from 'vue';

import type { Ref } from "vue";
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

  return {
    users,
    usersDuplicate,
    user,
    currentName,
    getUsers,
    getOneUser,
  };
});