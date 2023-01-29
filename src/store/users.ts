import { defineStore } from "pinia";
import { reactive, ref } from 'vue';
import type { Ref } from "vue";
import { Users, NewUser } from "@/interfaces/Users";
// import {user as admin} from '@/composables/AuthUser';

export const useUsersStore = defineStore('users', () => {
  const users: Ref<Users[]> = ref([]);
  const usersDuplicate: Ref<Users[]> = ref([]);
  const currentUser = reactive<Users>({
    id: 0,
    created_at:'',
    admin_id: '',
    user_id: '',
    name: '',
    username:'',
    color_profile: '',
  });
  const currentName: Ref<string> = ref('');
  const currentUsername: Ref<string> = ref('');

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
      id: currentUser.id,
      admin_id: currentUser.admin_id,
      created_at: currentUser.created_at,
      user_id: currentUser.user_id,
      name, username, color_profile,
    };
    users.value.splice(id,1, user);
    return users;
  }
  return {
    users,
    usersDuplicate,
    currentName,
    currentUser,
    currentUsername,
    getUsers,
    addUser,
    deleteUser,
    updateUser,
  };
});