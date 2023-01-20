<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mx-5">
    <AppBar titleapp="List Users">
      <template #back >
        <span></span>
      </template>
      <template #exit >
        <button class="justify-self-end" @click="handleLogout" title="log out button">
          <font-awesome-icon class="h-5 p-3 cursor-pointer text-dark" icon="fa-solid fa-arrow-right-from-bracket text-lg"></font-awesome-icon>
        </button>
      </template>
    </AppBar>
    <TheButton icon="fa-plus" title="Add User" @button-event="addUser" ></TheButton>
    <div class="flex items-center">
      <input type="text" name="filter users" id="#searchByName" @input="filterUser()"
      :placeholder='users.length + " users"' v-model="queryName"
      class="border p-2 rounded-md w-full my-8 border-gray-800">
      <font-awesome-icon :class="{'hidden': !queryName.length}" @click="deleteQuery" class="absolute right-24 z-20 cursor-pointer text-dark" icon="fa-solid fa-xmark" />
      <font-awesome-icon class="h-7 p-3 cursor-pointer text-dark" title="sort A to Z" icon="fa-solid fa-arrow-down-a-z" @click="sortName" />
    </div>
    <div v-if="!users.length"> 
      <img src="@/assets/nouser.png" alt="no user users" srcset="">
      <p class="text-center text-xl">There are no registered users yet. <router-link class="underline" :to="{name: 'add.user'}"> Let's create one.</router-link></p>
    </div>
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
const queryName: Ref<string> = ref('');

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
  queryName.value = '';
  users.value = Allusers.value;
}

function filterUser() {
  if(queryName.value == '') {
    users.value = Allusers.value;
  } else {
    users.value = Allusers.value.filter((n) => n.name.toLocaleLowerCase().includes(queryName.value.toLocaleLowerCase()));
  }  
} 

function sortName() {
  users.value.sort((a: Users,b: Users) => {
    return a.name > b.name ? 1 : -1;
  }); 
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
  // eslint-disable-next-line no-console
  console.log('before mount');
  
});

</script>