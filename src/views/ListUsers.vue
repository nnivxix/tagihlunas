<template>
  <div class="mx-5">
    <AppBar titleapp="List Users"></AppBar>
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
import plus from '@/assets/plus.svg'
</script>