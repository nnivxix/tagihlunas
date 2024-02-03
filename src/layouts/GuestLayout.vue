<script setup lang="ts"></script>

<template>
  <div class="mx-6">
    <div class="my-auto h-screen flex mx-auto flex-col justify-center max-w-xl">
      <router-link to="/">
        <font-awesome-icon icon="fa-solid fa-arrow-left"></font-awesome-icon>
        Back to home
      </router-link>
      <slot />
    </div>
  </div>
</template>
