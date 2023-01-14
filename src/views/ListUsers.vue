<template>
  <div class="mx-5">
    <AppBar titleapp="List Users">
      <template #back >
        <button class="justify-self-start">
          
        </button>
      </template>
      <template #exit >
        <button class="justify-self-end" @click="handleLogout" title="log out button">
          <img :src="logout" alt="exit">
        </button>
      </template>
    </AppBar>
    <TheButton :src-icon="plus" title="Add User" @button-event="addUser" ></TheButton>
    <input type="text" name="filter users" id="" :placeholder='`${lengthUsers} users`' class="border p-2 rounded-md w-full my-8 border-gray-800">
    <div>
      <ContactUser v-for="user in users" :key="user.user_id" :name="user.name" :background="user.color_profile"></ContactUser>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
import ContactUser from '@/components/ContactUser.vue';
import TheButton from '@/components/TheButton.vue';
import router from '@/router';
import useAuthUser from '@/composables/AuthUser'
import {users, lengthUsers ,useSupabase} from '@/composables/useSupabase';
import plus from '@/assets/plus.svg'
import logout from '@/assets/logout.svg'
import { onMounted } from 'vue';

const { userLogout } = useAuthUser();
const { listAllUsers } = useSupabase()

const handleLogout = async () => {
  await userLogout()
  await router.push({
    name: 'login'
  })
  window.location.reload()
}
function addUser(){
  router.push({
    name: 'add.user'
  })
  
}
onMounted(() => {
  listAllUsers()
})

</script>