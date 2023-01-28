<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mx-6">
  <AppBar titleapp="Add User">
    <template #back >
      <button class="justify-self-start" @click="$router.push({name: 'users.index'})">
        <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
      </button>
    </template>
  </AppBar>
    <form class="flex flex-col" @submit.prevent="HandleAddUser">
      <label for="name" class="text-xl text-dark">name</label>
      <input type="name" name="name" id="name" 
      class="bg-light-lemon p-2 mb-5 rounded-lg" placeholder="John"
      v-model.trim=" formAddUser.name">      
      <div  v-if="v$.name.$error" >
        <p class="text-red-500" v-for="e in v$.name.$errors" :key="e.$uid">{{ e.$message }}</p>
      </div>

      <label for="username" class="text-xl text-dark">username</label>
      <input type="text" name="username" id="username"
      class="bg-light-lemon p-2 mb-5 rounded-lg" placeholder="john123"
      v-model.trim="formAddUser.username">
      <div v-if="v$.username.$error" >
        <p class="text-red-500" v-for="e in v$.username.$errors" :key="e.$uid">{{ e.$message }}</p>
      </div>
      <p v-if="erroMsg" class="text-red-500">Username has been taken.</p>
      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">Add User</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, Ref } from 'vue';
import {customAlphabet} from 'nanoid';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import AppBar from '@/components/AppBar.vue';
import {user as admin} from '@/composables/AuthUser';
import { AddUser } from '@/interfaces/Form';
import router from '@/router';
import { useUsersStore } from '@/store/users';
import { storeToRefs } from 'pinia';

const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);
const colorsProfile = ref<string[]>(['#66999B', '#FE5D9F', '#647AA3', '#5A9367', '#E08E45', '#26408B', '#63372C', '#FF7D00', '#C3423F', '#912F56', '#17BEBB', '#A50104', '#6A6262', '#EC058E', '#3772FF', '#DF2935']);
const nanoid = customAlphabet('1234567890abcdefghijklmnopqrstuvwxyz', 10);
const userId = `u-${nanoid(8)}${new Date().getDate()}${new Date().getMonth()+1}${new Date().getFullYear()}`;
const formAddUser: AddUser = reactive({
  username: '',
  name: '',
});
const erroMsg: Ref<string> = ref('');
const rules = computed(() => {
  return {
    username: { required,
      minLength: minLength(5),
    },
    name: {
      required,
      minLength: minLength(5),
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
    const result = {
      admin_id:admin?.value.id,
      user_id: userId,
      name: formAddUser.name,
      username: formAddUser.username,
      color_profile: pickOneColor(),
      };
    v$.value.$validate(); // check form
    if (!v$.value.$error) {
      // if no error 
      await usersStore.addUser({...result});
      users.value.push({
        ...result,
        id: 0,
        created_at: null,
      });
      await router.push({
        name: 'users.index',
      });
    }  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    
    erroMsg.value = error.message;
    return error;
    
  }
}

</script>