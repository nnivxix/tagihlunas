<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <DefaultLayout>
    <AppBar titleapp="Edit User">
      <template #back>
        <button class="justify-self-start" @click="$router.back()">
          <Icon icon="lucide:arrow-left" />
        </button>
      </template>
    </AppBar>
    <form class="flex flex-col" @submit.prevent="HandleUpdateUser">
      <label for="name" class="text-xl text-dark">name</label>
      <input
        type="name"
        name="name"
        id="name"
        class="bg-light-lemon p-2 mb-5 rounded-lg"
        placeholder="John"
        v-model.trim="formUpdateUser.name"
      />
      <div v-if="v$.name.$error">
        <p class="text-red-500" v-for="e in v$.name.$errors" :key="e.$uid">
          {{ e.$message }}
        </p>
      </div>

      <label for="username" class="text-xl text-dark">username</label>
      <input
        type="text"
        name="username"
        id="username"
        class="bg-light-lemon p-2 mb-5 rounded-lg"
        placeholder="john123"
        v-model.trim="formUpdateUser.username"
      />
      <div v-if="v$.username.$error">
        <p class="text-red-500" v-for="e in v$.username.$errors" :key="e.$uid">
          {{ e.$message }}
        </p>
      </div>
      <p v-if="erroMsg" class="text-red-500">Username has been taken.</p>
      <button
        title="update user"
        :disabled="!isChange"
        :class="{ 'bg-gray-300': !isChange, 'text-gray-400': !isChange }"
        class="bg-lemon p-3 font-bold text-dark rounded-lg"
      >
        Update User
      </button>
    </form>
  </DefaultLayout>
</template>

<script setup lang="ts">
import { ref, reactive, computed, Ref, onBeforeMount, watch } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { minLength, required } from "@vuelidate/validators";
import { useRoute, useRouter } from "vue-router";
import { storeToRefs } from "pinia";

import { useUsersStore } from "@/stores/users";
import AppBar from "@/components/AppBar.vue";
import UsersService from "@/services/supabase/UsersServices";
import { User } from "@/schema";
import { usePickColor } from "@/composables/usePickColor";
import { supabase } from "@/helpers/supabase";

const { updateUser } = UsersService();
const { pickColor } = usePickColor();
const router = useRouter();
const userId = useRoute().params.userId;
const { updateUser: updateUserStore } = useUsersStore();
const { currentName, currentUsername, currentColor, currentUser } = storeToRefs(
  useUsersStore()
);

const formUpdateUser = reactive({
  username: currentUsername.value,
  name: currentName.value,
});
const erroMsg: Ref<string> = ref("");
const isChange: Ref<boolean> = ref(false);
const rules = computed(() => ({
  username: { required, minLength: minLength(5) },
  name: {
    required,
    minLength: minLength(5),
  },
}));
const v$ = useVuelidate(rules, formUpdateUser);

async function HandleUpdateUser() {
  try {
    v$.value.$validate();
    if (!v$.value.$error) {
      const color_profile = pickColor();
      await updateUser(
        userId as string,
        formUpdateUser.name,
        formUpdateUser.username,
        color_profile
      );
      await updateUserStore(
        userId as string,
        formUpdateUser.name,
        formUpdateUser.username,
        color_profile
      );
      router.back();
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    erroMsg.value = error.message;
    return error;
  }
}
async function getOneUser() {
  try {
    const { data } = await supabase
      .from("users")
      .select(
        `id, admin_id, created_at, name, user_id, username, color_profile`
      )
      .eq("user_id", userId)
      .single();

    currentUser.value = data as User;
    currentName.value = currentUser.value.name;
    currentUsername.value = currentUser.value.username;
    currentColor.value = currentUser.value.color_profile;
    formUpdateUser.name = currentUser.value.name;
    formUpdateUser.username = currentUser.value.username;

    localStorage.setItem(
      "currentUser",
      JSON.stringify({
        name: currentName.value,
        username: currentUsername.value,
      })
    );
  } catch (error) {
    return error;
  }
}
watch(formUpdateUser, () => {
  if (
    formUpdateUser.username !== currentUsername.value ||
    formUpdateUser.name !== currentName.value
  ) {
    isChange.value = true;
  } else {
    isChange.value = false;
  }
});
onBeforeMount(async () => {
  await getOneUser();
});
</script>

