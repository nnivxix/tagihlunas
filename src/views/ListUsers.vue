<template>
  <div class="mx-5">
    <AppBar titleapp="List Users">
      <template #back >
        <button class="justify-self-start">
          
        </button>
      </template>
      <template #exit >
        <button class="justify-self-end">
          <img :src="logout" alt="exit">
        </button>
      </template>
    </AppBar>
    <TheButton :src-icon="plus" title="Add User"></TheButton>
    <input type="text" name="filter users" id="" placeholder="3 Users" class="border p-2 rounded-md w-full my-8 border-gray-800">
    <div>
      <ContactUser username="Indah Pratiwi Ami Utami"></ContactUser>
      <ContactUser username="Ahmad Jihan Zaki"></ContactUser>
      <ContactUser username="Zihan Waluya Indra Abraham"></ContactUser>
      <ContactUser username="Wilda Ahad"></ContactUser>
      <ContactUser username="Hendra"></ContactUser>
      <ContactUser></ContactUser>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
import ContactUser from '@/components/ContactUser.vue';
import TheButton from '@/components/TheButton.vue';

// import router from '@/router';
// import useAuthUser from '@/composables/AuthUser'

import plus from '@/assets/plus.svg'
import logout from '@/assets/logout.svg'
// const { logout } = useAuthUser();

// const handleLogout = async () => {
//   await logout()
//   await router.push({
//     name: 'login'
//   })
  
// }



</script>