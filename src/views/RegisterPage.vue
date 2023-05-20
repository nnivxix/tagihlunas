<template>
  <div class="mx-6">
    <AppBar titleapp="tagihlunas" />
    <h1 class="text-2xl py-5 text-dark">Welcome to <span class="font-medium">tagihlunas</span></h1>

    <form class="flex flex-col" @submit.prevent="handleLogin">
      <label for="name" class="text-xl text-dark">name</label>
      <input
        type="name"
        name="name"
        id="name"
        v-model="formRegist.name"
        class="bg-light-lemon p-3 mb-5 rounded-lg"
        placeholder="your name"
      />
      <label for="email" class="text-xl text-dark">email</label>
      <input
        type="email"
        name="email"
        id="email"
        v-model="formRegist.email"
        class="bg-light-lemon p-3 mb-5 rounded-lg"
        placeholder="you@mail.com"
      />

      <div class="flex justify-between">
        <label for="password" class="text-xl text-dark">password</label>
        <span class="text-purple-600 cursor-pointer">forgot password?</span>
      </div>
      <div class="flex">
        <input
          :type="hidePswd ? 'password' : 'text'"
          name="password"
          id="password"
          v-model="formRegist.password"
          :class="{ 'mb-3': errorMsg, 'mb-12': !errorMsg }"
          class="bg-light-lemon p-3 rounded-lg w-full"
        />
        <span class="absolute right-11 mt-3 z-20" @click="hidePswd = !hidePswd">
          <font-awesome-icon :icon="hidePswd ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'" />
        </span>
      </div>
      <p v-if="errorMsg" class="text-red-700 py-2">{{ errorMsg }}</p>
      <button
        title="For temporally, the registration of a new account has not been opened."
        disabled
        class="bg-gray-400 p-3 font-bold text-white rounded-lg"
      >
        Register
      </button>
    </form>
    <div class="text-center mt-5">
      <p>
        Already have an account?
        <router-link class="underline" to="/login"> please login</router-link>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref } from "vue";
import { useRouter } from "vue-router";
import AppBar from "@/components/AppBar.vue";
import useAuthUser from "@/composables/useAuthUser";

const { userRegister } = useAuthUser();
const router = useRouter();
const errorMsg = ref("");
const hidePswd = ref(true);
const formRegist = reactive({
  email: "",
  password: "",
  name: "",
});

const handleLogin = async () => {
  try {
    await userRegister({
      email: formRegist.email,
      password: formRegist.password,
      name: formRegist.name,
    });
    await router.push({
      name: "users.index",
    });
  } catch (error) {
    return error;
  }
};
</script>

<style lang="scss" scoped></style>
