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
      <p v-for="error of v.$errors" :key="error.$uid"> {{ error.$message }} </p>
      <label for="name" class="text-xl text-dark">name</label>
      <input type="name" name="name" id="name"
      class="bg-light-lemon p-2 mb-12 rounded-lg"
      v-model=" formAddUser.name">      
      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">Add User</button>
    </form>
    <p>name: {{ formAddUser.name }} - username: {{ formAddUser.username }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import {customAlphabet} from 'nanoid';
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import AppBar from '@/components/AppBar.vue';
import {useSupabase} from '@/composables/useSupabase'
import {user} from '@/composables/AuthUser'
import { FormAddUser } from '@/interfaces/FormAddUser';
import router from '@/router';

const {addUser} = useSupabase(); 
const colorsProfile = ref<string[]>(['#66999B', '#FE5D9F', '#647AA3', '#5A9367', '#E08E45', '#26408B', '#63372C', '#FF7D00', '#C3423F', '#912F56', '#17BEBB', '#A50104', '#6A6262', '#EC058E', '#3772FF', '#DF2935'])
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
const userId = `u-${nanoid(8)}${new Date().getDate()}${new Date().getMonth()+1}${new Date().getFullYear()}`
const formAddUser: FormAddUser = reactive({
  username: '',
  name: ''
})
const rules = {
  formAddUser: {
    username: {
      required,
      minLength: minLength(5),
    },
    name: {
      required,
      minLength: minLength(8),
    }
  }
}
const v = useVuelidate(rules, {formAddUser})
function pickOneColor(): string{
  const indexColor: number = Math.floor(Math.random() * colorsProfile.value.length);
  return colorsProfile.value[indexColor];
}
async function HandleAddUser () {
  try {
    await addUser({
      admin_id:user?.value.id,
      user_id: userId,
      name: formAddUser.name,
      username: formAddUser.username,
      color_profile: pickOneColor()
    });
    await router.push({
      name: 'users'
    })
  } catch (error) {
    return error
  }
  
}

</script>

<style scoped>

</style>