import { defineStore } from "pinia";
import { ref } from 'vue';
import type { Ref } from "vue";
import _ from 'lodash';
import { Users, NewUser } from "@/interfaces/Users";
import { supabase } from "@/services/supabase";
import {user as admin} from '@/composables/AuthUser';

export const useUsersStore = defineStore('users', () => {
  const users: Ref<Users[]> = ref([]);
  const usersDuplicate: Ref<Users[]> = ref([]);
  const user: Ref<Users[]> = ref([]);
  const currentName: Ref<string> = ref('');
  const currentUsername: Ref<string> = ref('');

  async function getUsers() {
    const { data, error } = await supabase
    .from('users')
    .select()
    .eq('admin_id',admin?.value.id);
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
    currentName.value = await _.clone(data).shift()?.name;
    currentUsername.value = await _.clone(data).shift()?.username;
    return data;
  }
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
  async function deleteUser(userId: string) {
    const idUser = users.value.findIndex(user => user.user_id == userId);
    const { error } = await supabase
      .from('users')
      .delete()
      .eq('user_id', userId);
      
      if (error) throw error;
    users.value.splice(idUser,1);
    return;
  }
  async function updateUser(userId: string, name : string, username: string, color_profile: string) {
    const { error } = await supabase
      .from('users')
      .update({ name, username, color_profile })
      .eq('user_id', userId);
      if (error) throw error;
  }
  return {
    users,
    usersDuplicate,
    user,
    currentName,
    currentUsername,
    getUsers,
    getOneUser,
    addUser,
    deleteUser,
    updateUser,
  };
});