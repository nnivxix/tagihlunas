<template>
  <GuestLayout>
    <h1 class="text-2xl py-5 text-dark">
      Welcome back, please sign in to
      <span class="font-medium">tagihlunas</span>
    </h1>

    <form class="flex flex-col" @submit.prevent="handleLogin">
      <label for="email" class="text-xl text-dark">email</label>
      <input
        type="email"
        name="email"
        id="email"
        v-model="formSignIn.email"
        class="bg-light-lemon p-3 mb-5 rounded-lg"
        placeholder="you@mail.com"
      />
      <div class="flex justify-between">
        <label for="password" class="text-xl text-dark">password</label>
        <span class="text-purple-600 cursor-pointer">forgot password?</span>
      </div>
      <div class="flex relative">
        <input
          :type="hidePswd ? 'password' : 'text'"
          name="password"
          id="password"
          v-model="formSignIn.password"
          :class="{ 'mb-3': errorMsg, 'mb-12': !errorMsg }"
          class="bg-light-lemon p-3 rounded-lg w-full"
        />
        <span class="absolute right-4 mt-3 z-20" @click="hidePswd = !hidePswd">
          <font-awesome-icon
            :icon="hidePswd ? 'fa-solid fa-eye' : 'fa-solid fa-eye-slash'"
          />
        </span>
      </div>
      <p v-if="errorMsg" class="text-red-700 py-2">{{ errorMsg }}</p>
      <button
        :disabled="!isValid"
        :class="{ 'bg-gray-400': !isValid, 'text-white': !isValid }"
        class="bg-lemon p-3 font-bold text-dark rounded-lg"
      >
        Sign in
      </button>
    </form>
    <div class="text-center mt-5">
      <p>
        Want to use demo account?
        <button @click="useDemoAccount" class="text-blue-700">
          click here
        </button>
      </p>
    </div>
  </GuestLayout>
</template>

<script setup lang="ts">
import { reactive, ref, watch } from "vue";
import { useRouter } from "vue-router";
import { useAuthUser } from "@/composables/useAuthUser";

const { userLogin } = useAuthUser();
const router = useRouter();
const errorMsg = ref("");
const hidePswd = ref(true);
const formSignIn = reactive({
  email: "",
  password: "",
});
const isValid = ref(false);

const handleLogin = async () => {
  const { error } = await userLogin({
    email: formSignIn.email,
    password: formSignIn.password,
  });
  if (error) {
    errorMsg.value = error.message;
    return;
  }
  await router.push({
    name: "users.index",
  });
};

const useDemoAccount = () => {
  const DEMO_EMAIL = import.meta.env.VITE_DEMO_EMAIL;
  const DEMO_PASSWORD = import.meta.env.VITE_DEMO_PASSWORD;
  formSignIn.email = DEMO_EMAIL;
  formSignIn.password = DEMO_PASSWORD;
};

watch(formSignIn, () => {
  if (formSignIn.email == "" || formSignIn.password == "") {
    isValid.value = false;
  } else {
    isValid.value = true;
  }
});
</script>
