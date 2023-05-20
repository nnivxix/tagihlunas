<script setup lang="ts">
import TheAvatar from "./TheAvatar.vue";
// eslint-disable-next-line vue/no-setup-props-destructure
const { user, background } = defineProps<{
  user: {
    name: string;
    user_id: string;
  };
  background: string;
}>();
</script>

<template>
  <router-link
    :to="{ name: 'users.show', params: { userId: user.user_id } }"
    class="flex items-center my-3"
  >
    <TheAvatar :name="user.name" :background="background"></TheAvatar>
    <p id="name" class="ml-4 text-xl name">{{ user.name }}</p>
  </router-link>
</template>

<style></style>
