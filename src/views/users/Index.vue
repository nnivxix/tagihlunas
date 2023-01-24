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
    <div v-if="loading">
      <content-loader
      viewBox="0 0 476 150"
      :speed="8"
      primaryColor="#e8e8e8"
      secondaryColor="#9e9e9e"
      >
        <rect x="114" y="38" rx="3" ry="3" width="200" height="32" /> 
        <circle cx="53" cy="57" r="48" />
      </content-loader>

    </div>
    <div v-else>
      <div v-if="!users.length"> 
        <img src="@/assets/nouser.png" alt="no user users" srcset="">
        <p class="text-center text-xl">There are no registered users yet. <router-link class="underline" :to="{name: 'add.user'}"> Let's create one.</router-link></p>
      </div>
      <div v-else>
        <ContactUser v-for="user in users" :key="user.user_id" :name="user.name" :id="user.user_id"
        :background="user.color_profile" :username="user.username">
        </ContactUser>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import type { Ref } from 'vue';
import { ContentLoader } from "vue-content-loader";
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
const duplicateUsers: Ref<Users[]> = ref([]);
const queryName: Ref<string> = ref('');
const loading: Ref<boolean> = ref(false);

const getAllUsers = async () => {
  loading.value = true;
  try {
    const { data, error } = await supabase
    .from('users')
    .select();
    if (error) throw error;

    users.value.push(...data);
    duplicateUsers.value.push(...data); // duplicate

    lengthUsers.value = data.length;
    loading.value = false;
    return data;
  } catch (error) {
    return error;
  }
};

function deleteQuery() {
  queryName.value = '';
  users.value = duplicateUsers.value;
}

function filterUser() {
  if(queryName.value == '') {
    users.value = duplicateUsers.value;
  } else {
    users.value = duplicateUsers.value.filter((n) => n.name.toLocaleLowerCase().includes(queryName.value.toLocaleLowerCase()));
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
