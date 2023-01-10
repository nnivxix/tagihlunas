<template>
  <div>
    <AppBar titleapp="List Users"></AppBar>
    <button class="bg-lemon flex px-4 py-2 rounded-md">
      <img src="../assets/plus.svg" alt="add user button" sizes="" srcset=""> Add User
    </button>
    <input type="text" name="filter users" id="" placeholder="3 Users" class="border p-2 rounded-md w-full my-8 border-gray-800">
    <div>
    <ContactUser username="Indah Pratiwi Ami Utami"></ContactUser>
    <ContactUser username="Ahmad Jihan Zaki"></ContactUser>
    <ContactUser username="Zihan Waluya Indra Abraham"></ContactUser>
    <ContactUser username="Wilda Ahad"></ContactUser>
    <ContactUser username="Hendra Usman"></ContactUser>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
import ContactUser from '@/components/ContactUser.vue';

</script>