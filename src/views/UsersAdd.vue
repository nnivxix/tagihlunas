<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="mx-6">
    <AppBar titleapp="Add User">
      <template #back>
        <button class="justify-self-start" @click="$router.push({ name: 'users.index' })">
          <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
        </button>
      </template>
    </AppBar>
    <form class="flex flex-col" @submit.prevent="HandleAddUser" action="/users" method="POST">
      <label for="name" class="text-xl text-dark">name</label>
      <input
        type="name"
        name="name"
        id="name"
        class="bg-light-lemon p-2 rounded-lg"
        placeholder="John"
        v-model.trim="formAddUser.name"
      />
      <div v-if="v$.name.$error">
        <p class="text-red-500" v-for="e in v$.name.$errors" :key="e.$uid">
          {{ e.$message }}
        </p>
      </div>

      <label for="username" class="text-xl mt-5 text-dark">username</label>
      <input
        type="text"
        name="username"
        id="username"
        class="bg-light-lemon p-2 rounded-lg"
        placeholder="john123"
        v-model.trim="formAddUser.username"
      />
      <div v-if="v$.username.$error">
        <p class="text-red-500" v-for="e in v$.username.$errors" :key="e.$uid">
          {{ e.$message }}
        </p>
      </div>
      <p v-if="erroMsg" class="text-red-500">Username has been taken.</p>
      <button
        class="bg-lemon p-3 mt-5 font-bold text-dark rounded-lg"
        :disabled="!isValid"
        :class="{ 'bg-gray-300': !isValid, 'text-gray-500': !isValid }"
      >
        {{ textButton }}
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, Ref, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { storeToRefs } from "pinia";

import AppBar from "@/components/AppBar.vue";
import { user as admin } from "@/composables/useAuthUser";
import { AddUser } from "@/interfaces/Form";
import router from "@/router";
import { useUsersStore } from "@/stores/users";
import UsersService from "@/services/supabase/UsersServices";
import { usePickColor } from "@/composables/usePickColor";
import { useNanoId } from "@/composables/useNanoid";

const { userId } = useNanoId();
const { pickColor } = usePickColor();
const { addUser } = UsersService();
const usersStore = useUsersStore();
const { users } = storeToRefs(usersStore);

const isValid: Ref<boolean> = ref(false);
const textButton = ref<string>("Add User");
const formAddUser: AddUser = reactive({
  username: "",
  name: "",
});
const erroMsg: Ref<string> = ref("");
const rules = computed(() => ({
  username: { required, minLength: minLength(5) },
  name: {
    required,
    minLength: minLength(5),
  },
}));
const v$ = useVuelidate(rules, formAddUser);
async function HandleAddUser() {
  try {
    const result = {
      admin_id: admin?.value.id,
      user_id: userId,
      name: formAddUser.name,
      username: formAddUser.username,
      color_profile: pickColor(),
    };
    v$.value.$validate(); // check form
    if (!v$.value.$error) {
      isValid.value = false;
      textButton.value = "loading";
      // if no error
      await addUser({ ...result });
      users.value.push({
        ...result,
        id: 0,
        created_at: null,
      });
      return router.push({
        path: "/users",
        name: "users.index",
      });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    erroMsg.value = error.message;
    return error;
  }
}

watch(formAddUser, () => {
  if (formAddUser.name.length === 0 && formAddUser.username.length === 0) {
    isValid.value = false;
  } else {
    isValid.value = true;
  }
});
</script>
