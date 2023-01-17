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
      <label for="name" class="text-xl text-dark">name</label>
      <input type="name" name="name" id="name"
      class="bg-light-lemon p-2 mb-5 rounded-lg" placeholder="Ihsan Maulana"
      v-model.trim=" formAddUser.name">      
      <p v-if="v$.name.$error" class="text-red-500">Name too short, min: 8 characters.</p>

      <label for="username" class="text-xl text-dark">username</label>
      <input type="text" name="username" id="username"
      class="bg-light-lemon p-2 mb-5 rounded-lg" placeholder="ihsan123"
      v-model.trim="formAddUser.username">
      <p v-if="v$.username.$error" class="text-red-500">Username too short, min: 5 characters.</p>

      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">Add User</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import {customAlphabet} from 'nanoid';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import AppBar from '@/components/AppBar.vue';
import {useSupabase} from '@/composables/useSupabaseUser';
import {user} from '@/composables/AuthUser';
import { AddUser } from '@/interfaces/Form';
import router from '@/router';

const {addUser} = useSupabase(); 
const colorsProfile = ref<string[]>(['#66999B', '#FE5D9F', '#647AA3', '#5A9367', '#E08E45', '#26408B', '#63372C', '#FF7D00', '#C3423F', '#912F56', '#17BEBB', '#A50104', '#6A6262', '#EC058E', '#3772FF', '#DF2935']);
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
const userId = `u-${nanoid(8)}${new Date().getDate()}${new Date().getMonth()+1}${new Date().getFullYear()}`;
const formAddUser: AddUser = reactive({
  username: '',
  name: '',
});
const rules = computed(() => {
  return {
    username: { required,
      minLength: minLength(5),
    },
    name: {
      required,
      minLength: minLength(8),
    },
  };
});
const v$ = useVuelidate(rules, formAddUser);

function pickOneColor(): string{
  const indexColor: number = Math.floor(Math.random() * colorsProfile.value.length);
  return colorsProfile.value[indexColor];
}
async function HandleAddUser () {
  try {
    v$.value.$validate(); // check form
    if (!v$.value.$error) {
      // if error is 'false'
      await addUser({
        admin_id:user?.value.id,
        user_id: userId,
        name: formAddUser.name,
        username: formAddUser.username,
        color_profile: pickOneColor(),
      });
      await router.push({
        name: 'users',
      });
    }  
  } catch (error) {
    return error;
  }
}

</script>

<style scoped>

</style>