import { defineStore } from "pinia";
import {  ref } from 'vue';
import type { Ref } from "vue";
import { Users, NewUser } from "@/interfaces/Users";

export const useUsersStore = defineStore('users', () => {
  const users: Ref<Users[]> = ref([]);
  const usersDuplicate: Ref<Users[]> = ref([]);
  const currentUser = ref<Users[]>([]);
  const currentName: Ref<string> = ref('');
  const currentUsername: Ref<string> = ref('');
  const currentColor: Ref<string> = ref('');

  async function getUsers(data: Users[]) {
    usersDuplicate.value.push(...data);
    users.value.push(...data);
  }
  async function addUser({admin_id, user_id, name, username, color_profile}: NewUser) {
    users.value.push({
      admin_id, user_id, name, username, color_profile,
      id: 0,
      created_at: null,
    });
  }
  async function deleteUser(userId: string) {
    const id = users.value.findIndex(user => user.user_id == userId);
    users.value.splice(id,1);
    return users;
  }
  async function updateUser(userId: string, name : string, username: string, color_profile: string) {
    const id = users.value.findIndex(user => user.user_id == userId);
    const user: Users = {
      id: currentUser.value[0].id,
      created_at: currentUser.value[0].created_at,
      admin_id: currentUser.value[0].admin_id,
      user_id: currentUser.value[0].user_id,
      name, username, color_profile,
    };
    currentName.value = name;
    currentUsername.value = username;
    currentColor.value = color_profile;
    currentUser.value.splice(0,1, user);
    users.value.splice(id,1, user);
    return users;
  }
  return {
    users,
    usersDuplicate,
    currentName,
    currentUser,
    currentUsername,
    currentColor,
    getUsers,
    addUser,
    deleteUser,
    updateUser,
  };
});