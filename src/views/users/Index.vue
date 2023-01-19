<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mx-5">
    <AppBar titleapp="List Users">
      <template #back >
        <span></span>
      </template>
      <template #exit >
        <button class="justify-self-end" @click="handleLogout" title="log out button">
          <font-awesome-icon icon="fa-solid fa-arrow-right-from-bracket text-lg"></font-awesome-icon>
        </button>
      </template>
    </AppBar>
    <TheButton icon="fa-plus" title="Add User" @button-event="addUser" ></TheButton>
    <div class="flex items-center">
      <input type="text" name="filter users" id="#searchByName" @input="filterUser()"
      :placeholder='users.length + " users"' v-model="name"
      class="border p-2 rounded-md w-full my-8 border-gray-800">
      <font-awesome-icon :class="{'hidden': !name.length}" @click="deleteQuery" class="absolute right-8 z-20" icon="fa-solid fa-xmark" />
    </div>
    <p v-if="users === undefined"> loading </p>
    <div v-else>
      <ContactUser v-for="user in users" :key="user.user_id" :name="user.name"
      :background="user.color_profile" :username="user.username">
      </ContactUser>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import AppBar from '@/components/AppBar.vue';
import ContactUser from '@/components/ContactUser.vue';
import TheButton from '@/components/TheButton.vue';
import router from '@/router';
import { supabase } from '@/services/supabase';
import useAuthUser from '@/composables/AuthUser';
import {lengthUsers} from '@/composables/useSupabaseUser';
import {Users} from '@/interfaces/Users';

const { userLogout } = useAuthUser();
const users: Ref<Users[]> = ref([]);
const Allusers: Ref<Users[]> = ref([]);
const name: Ref<string> = ref('');

const getAllUsers = async () => {
  try {
    const { data, error } = await supabase
    .from('users')
    .select();
    if (error) throw error;

    users.value = data;
    Allusers.value = data; // duplicate

    lengthUsers.value = data.length;
    return data;
  } catch (error) {
    return error;
  }
};

function deleteQuery() {
  name.value = '';
  users.value = Allusers.value;
}

function filterUser() {
  if (name.value == '') {
    users.value = Allusers.value;
  } else {
    users.value = Allusers.value.filter((n) => n.name.toLocaleLowerCase().includes(name.value.toLocaleLowerCase()));
  }  
} 

const handleLogout = async () => {
  await userLogout();
  await router.push({
    name: 'login',
  });
  window.location.reload();
};
function addUser(){
  router.push({
    name: 'add.user',
  });
}


onBeforeMount(async () => {
  // run function to fetch all data
  await getAllUsers();
});

</script>