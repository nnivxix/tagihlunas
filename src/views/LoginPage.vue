<template>
  <div class="mx-6">
    <AppBar titleapp="tagihlunas" />
    <h1 class="text-2xl py-5 text-dark">Welcome back, please sign in to <span class="font-medium">tagihlunas</span></h1>

    <form class="flex flex-col" @submit.prevent="handleLogin">
      <label for="email" class="text-xl text-dark">email</label>
      <input type="email" name="email" id="email" v-model="formSignIn.email"
        class="bg-light-lemon p-3 mb-5 rounded-lg" placeholder="you@mail.com">
      <div class="flex justify-between">
      
      <label for="password" class="text-xl text-dark">password</label> <span class="text-purple-600 cursor-pointer">forgot password?</span>
      </div>
      <div class="flex" >
        <input :type="hidePswd ? 'password' : 'text'" name="password" id="password" v-model="formSignIn.password"
          :class="{'mb-3':errorMsg, 'mb-12': !errorMsg}"
          class="bg-light-lemon p-3 rounded-lg w-full ">
        <span class="absolute right-11 mt-3 z-20" @click="hidePswd = !hidePswd">
          <font-awesome-icon :icon="hidePswd ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"  />
        </span>
      </div>
      <p v-if="errorMsg" class="text-red-700 py-2">{{ errorMsg }}</p>
      <button class="bg-lemon p-3 font-bold text-dark rounded-lg">Sign in</button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue';
import { useRouter } from "vue-router";
import AppBar from '@/components/AppBar.vue';
import { supabase } from '@/services/supabase';

const router = useRouter();
const errorMsg = ref('');
const hidePswd = ref(true);
const formSignIn = reactive({
  email: '',
  password: '',
});

const handleLogin = async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: formSignIn.email,
    password: formSignIn.password,
  });
  if (error == null){
    await router.push({
      name: 'users.index',
    });
    
    return data;
  } else {
    errorMsg.value = 'Check again email or password!';
    return error;
  }
};
</script>

<style lang="scss" scoped>

</style>