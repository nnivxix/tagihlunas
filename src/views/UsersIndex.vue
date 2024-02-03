<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <DefaultLayout>
    <AppBar titleapp="List Users">
      <template #back>
        <span></span>
      </template>
      <template #exit>
        <button
          class="justify-self-end"
          @click="handleLogout"
          title="log out button"
        >
          <font-awesome-icon
            class="h-5 p-3 cursor-pointer text-dark"
            icon="fa-solid fa-arrow-right-from-bracket text-lg"
          ></font-awesome-icon>
        </button>
      </template>
    </AppBar>
    <TheButton icon="Plus" title="Add User" @button-event="addUser"></TheButton>
    <div class="flex items-center">
      <input
        type="text"
        name="filter users"
        id="#searchByName"
        @input="filterUser()"
        :placeholder="users.length ? users.length + ' users' : 'no user'"
        v-model="queryName"
        class="border p-2 rounded-md w-full my-8 border-gray-800"
      />
      <font-awesome-icon
        :class="{ hidden: !queryName.length }"
        @click="deleteQuery"
        class="absolute right-24 z-20 cursor-pointer text-dark"
        icon="fa-solid fa-xmark"
      />
      <font-awesome-icon
        class="h-7 p-3 cursor-pointer text-dark"
        title="sort A to Z"
        icon="fa-solid fa-arrow-down-a-z"
        @click="sortByName"
      />
    </div>
    <ContactUser
      v-for="user in users"
      :key="user.user_id"
      :user="user"
      :background="user.color_profile"
    >
    </ContactUser>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from "vue";
import type { Ref } from "vue";
import { storeToRefs } from "pinia";

import AppBar from "@/components/AppBar.vue";
import ContactUser from "@/components/ContactUser.vue";
import TheButton from "@/components/TheButton.vue";
import router from "@/router";
import { useAuthUser } from "@/composables/useAuthUser";
import { User } from "@/schema";
import { useTransactionsStore } from "@/stores/transactions";
import { useUsersStore } from "@/stores/users";
import { supabase } from "@/helpers/supabase";

const { user: admin } = useAuthUser();
const usersStore = useUsersStore();
const transactionStore = useTransactionsStore();
const { userLogout } = useAuthUser();

const queryName: Ref<string> = ref("");
const loading: Ref<boolean> = ref(false);

const { users, usersDuplicate } = storeToRefs(usersStore);

const getAllUsers = async () => {
  loading.value = true;
  try {
    const { data } = await supabase
      .from("users")
      .select()
      .eq("admin_id", admin?.value.id);

    users.value = data as User[];
    usersDuplicate.value = data as User[];

    loading.value = false;
  } catch (error) {
    return error;
  }
};

function deleteQuery() {
  queryName.value = "";
  users.value = usersDuplicate.value;
}

function filterUser() {
  if (queryName.value == "") {
    users.value = usersDuplicate.value;
  } else {
    users.value = usersDuplicate.value.filter((n) =>
      n.name.toLocaleLowerCase().includes(queryName.value.toLocaleLowerCase())
    );
  }
}

function sortByName() {
  users.value.sort((a: User, b: User) => {
    return a.name > b.name ? 1 : -1;
  });
}
usersStore.$patch({
  currentName: "",
});

const handleLogout = async () => {
  await userLogout();
  await router.push({
    name: "login.page",
  });
  window.location.reload();
};
function addUser() {
  router.push({
    name: "users.add",
  });
}

onMounted(async () => {
  transactionStore.$reset();
  usersStore.$reset();
  // run function to fetch all data
  await getAllUsers();
});
onBeforeUnmount(() => {
  users.value = usersDuplicate.value;
});
</script>
