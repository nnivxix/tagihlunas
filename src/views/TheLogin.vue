<template>
  <div class="mx-6">
    <AppBar titleapp="tagihlunas" />
    <h1 class="text-2xl py-5 text-dark">Welcome back, please sign in to <span class="font-medium">tagihlunas</span></h1>

    <form class="flex flex-col" @submit.prevent="handleLogin">
      <label for="username" class="text-xl text-dark">username</label>
      <input type="email" name="username" id="username" v-model="formSignIn.email" class="bg-light-lemon p-2 mb-5 rounded-lg">
      <div class="flex justify-between">
      
      <label for="password" class="text-xl text-dark">password</label> <span class="text-purple-600 cursor-pointer">forgot password?</span>
      </div>
      <input type="password" name="password" id="password" v-model="formSignIn.password" class="bg-light-lemon p-2 mb-12 rounded-lg">
      
      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">Sign in</button>
    </form>
  </div>

  <p>{{ formSignIn.email }} - {{ formSignIn.password  }}</p>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import { useRouter } from "vue-router";
import AppBar from '@/components/AppBar.vue';
import useAuthUser from '@/composables/AuthUser';
import { useSupabase } from '@/composables/useSupabaseUser';

const { listAllUsers } = useSupabase();
const { userLogin } = useAuthUser();
const router = useRouter();
const formSignIn = reactive({
  email: '',
  password: '',
});
const handleLogin = async () => {
  try {
    await userLogin(formSignIn);
    await router.push({
      name: 'users',
    });
    await listAllUsers();
  } catch (error) {
    return error;
  }
};
</script>

<style lang="scss" scoped>

</style>