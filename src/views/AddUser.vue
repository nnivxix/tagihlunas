<template>
  <div class="mx-6">
  <AppBar titleapp="Add User">
    <template #back >
      <button class="justify-self-start" @click="$router.push({name: 'users'})">
        <img src="@/assets/arrow-back.svg" alt="back" srcset="">
      </button>
    </template>
  </AppBar>
    <form class="flex flex-col" @submit.prevent="HandleAddUser">
      <label for="username" class="text-xl text-dark">username</label>
      <input type="text" name="username" id="username"
      class="bg-light-lemon p-2 mb-5 rounded-lg"
      v-model="formAddUser.username">
      
      <label for="name" class="text-xl text-dark">name</label>
      <input type="name" name="name" id="name"
      class="bg-light-lemon p-2 mb-12 rounded-lg"
      v-model="formAddUser.name">
      
      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">Add User</button>
    </form>
    <p>name: {{ formAddUser.name }} - username: {{ formAddUser.username }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {customAlphabet} from 'nanoid';
import AppBar from '@/components/AppBar.vue';
import { supabase } from '@/services/supabase';
import {user} from '@/composables/AuthUser'
import { FormAddUser } from '@/interfaces/FormAddUser';
import router from '@/router';

const colorsProfile = ref<string[]>(['#66999B', '#FE5D9F', '#647AA3', '#5A9367', '#E08E45', '#26408B', '#63372C', '#FF7D00', '#C3423F', '#912F56', '#17BEBB', '#A50104', '#6A6262', '#EC058E', '#3772FF', '#DF2935'])
const formAddUser: FormAddUser = reactive({
  username: '',
  name: ''
})

function pickOneColor(): string{
  const indexColor: number = Math.floor(Math.random() * colorsProfile.value.length);
  return colorsProfile.value[indexColor];
}
async function HandleAddUser () {
  const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
  try {
    const { error } = await supabase.from('users')
    .insert({
      admin_id: user?.value.id,
      user_id: `u-${nanoid(8)}${new Date().getDate()}${new Date().getMonth()+1}${new Date().getFullYear()}`,
      name: formAddUser.name,
      username: formAddUser.username,
      color_profile: pickOneColor()    
    })
    if (error) throw error;
    await router.push({name: 'users'});
  } catch(error){
    if (error instanceof Error) {
      return error;
    }
  } finally{
    formAddUser.name = '',
    formAddUser.username = ''
  }
  
}

</script>

<style scoped>

</style>