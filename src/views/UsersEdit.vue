<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mx-6">
  <AppBar titleapp="Edit User">
    <template #back >
      <button class="justify-self-start" @click="$router.back()">
        <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
      </button>
    </template>
  </AppBar>
    <form class="flex flex-col" @submit.prevent="HandleUpdateUser">
      <label for="name" class="text-xl text-dark">name</label>
      <input type="name" name="name" id="name" 
      class="bg-light-lemon p-2 mb-5 rounded-lg" placeholder="John"
      v-model.trim="formUpdateUser.name">      
      <div  v-if="v$.name.$error" >
        <p class="text-red-500" v-for="e in v$.name.$errors" :key="e.$uid">{{ e.$message }}</p>
      </div>

      <label for="username" class="text-xl text-dark">username</label>
      <input type="text" name="username" id="username"
      class="bg-light-lemon p-2 mb-5 rounded-lg" placeholder="john123"
      v-model.trim="formUpdateUser.username">
      <div v-if="v$.username.$error" >
        <p class="text-red-500" v-for="e in v$.username.$errors" :key="e.$uid">{{ e.$message }}</p>
      </div>
      <p v-if="erroMsg" class="text-red-500">Username has been taken.</p>
      <button title="update user" :disabled="!isChange"  :class="{'bg-gray-300': !isChange, 'text-gray-400': !isChange}" class="bg-lemon p-3 font-bold text-dark rounded-lg">Update User</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, Ref, onBeforeMount, watch } from 'vue';
import { useVuelidate } from '@vuelidate/core';
import { minLength, required } from '@vuelidate/validators';
import { useLocalStorage } from '@vueuse/core';
import { useRoute, useRouter } from 'vue-router';
import _ from 'lodash';
import { storeToRefs } from 'pinia';

import { useUsersStore } from '@/store/users';
import AppBar from '@/components/AppBar.vue';
import UsersService from '@/services/supabase/UsersServices';
import { AddUser } from '@/interfaces/Form';
const router = useRouter();
const userId = useRoute().params.userId;
const usersStore = useUsersStore();
const { currentName, currentUsername, currentColor, currentUser } = storeToRefs(usersStore);

const colorsProfile = ref<string[]>(['#66999B', '#FE5D9F', '#647AA3', '#5A9367', '#E08E45', '#26408B', '#63372C', '#FF7D00', '#C3423F', '#912F56', '#17BEBB', '#A50104', '#6A6262', '#EC058E', '#3772FF', '#DF2935']);
const formUpdateUser = ref(
  useLocalStorage('currentUser',<AddUser> {
  username: currentUsername.value ,
  name: currentName.value,
  }),
);

const erroMsg: Ref<string> = ref('');
const isChange: Ref<boolean> = ref(false);
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
const v$ = useVuelidate(rules, formUpdateUser);

function pickOneColor(): string{
  const indexColor: number = Math.floor(Math.random() * colorsProfile.value.length);
  return colorsProfile.value[indexColor];
}

const getOneUser = async () => {
  try {
      UsersService().getUserById(userId as string).then(result => {
        currentUser.value = [];
        currentUser.value.push(...result);
        currentName.value = _.clone(result).shift()?.name;
        currentUsername.value = _.clone(result).shift()?.username;
        currentColor.value = _.clone(result).shift()?.color_profile;

        localStorage.setItem('currentUser', JSON.stringify({
          name: currentName.value,
          username: currentUsername.value,
        }));

        return result;
      });
    return;
  } catch (error) {
    
    return error;
  }
};
watch(formUpdateUser, () =>{
  if (formUpdateUser.value.username !== currentUsername.value || formUpdateUser.value.name !== currentName.value) {
    isChange.value = true;    
  } else {
    isChange.value = false;
  }
});
async function HandleUpdateUser () {
  try {
    v$.value.$validate(); // check form
    if (!v$.value.$error) {
      // if no error 
      await UsersService().updateUser(userId as string, formUpdateUser.value.name, formUpdateUser.value.username, pickOneColor());
      await usersStore.updateUser(userId as string, formUpdateUser.value.name, formUpdateUser.value.username, pickOneColor());
      router.back();
      
    }  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    erroMsg.value = error.message;
    return error;
    
  }
}
onBeforeMount(() => {
  getOneUser();
});
</script>