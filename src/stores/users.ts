import { defineStore } from "pinia";
import { ref } from "vue";
import type { Ref } from "vue";
import { User } from "@/schema";

export const useUsersStore = defineStore("users", () => {
  const users: Ref<User[]> = ref([]);
  const usersDuplicate: Ref<User[]> = ref([]);
  const currentUser = ref<User>({
    id: 1,
    admin_id: "",
    user_id: "",
    name: "",
    username: "",
    color_profile: "",
    created_at: "",
    transactions: [],
  });
  const currentName: Ref<string> = ref("");
  const currentUsername: Ref<string> = ref("");
  const currentColor: Ref<string> = ref("");

  async function getUsers(data: User[]) {
    usersDuplicate.value.push(...data);
    users.value.push(...data);
  }
  async function addUser({
    admin_id,
    user_id,
    name,
    username,
    color_profile,
  }: User) {
    users.value.push({
      admin_id,
      user_id,
      name,
      username,
      color_profile,
      id: 0,
      created_at: "",
    });
  }
  async function deleteUser(userId: string) {
    const id = users.value.findIndex((user) => user.user_id == userId);
    users.value.splice(id, 1);
    return users;
  }
  async function updateUser(
    userId: string,
    name: string,
    username: string,
    color_profile: string
  ) {
    const id = users.value.findIndex((user) => user.user_id == userId);
    const user: User = {
      id: currentUser.value?.id,
      created_at: currentUser.value.created_at,
      admin_id: currentUser.value.admin_id,
      user_id: currentUser.value.user_id,
      name,
      username,
      color_profile,
    };
    currentName.value = name;
    currentUsername.value = username;
    currentColor.value = color_profile;
    // currentUser.value.splice(0, 1, user);
    users.value.splice(id, 1, user);
    return users;
  }

  function $reset() {
    users.value = [];
    usersDuplicate.value = [];
    currentUser.value = {
      id: 1,
      admin_id: "",
      user_id: "",
      name: "",
      username: "",
      color_profile: "",
      created_at: "",
      transactions: [],
    };
    currentName.value = "";
    currentUsername.value = "";
    currentColor.value = "";
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
    $reset,
  };
});
