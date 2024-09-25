<script setup lang="ts"></script>

<template>
  <div class="mx-6">
    <div class="my-auto h-screen flex mx-auto flex-col justify-center max-w-xl">
      <router-link to="/" class="flex gap-1">
        <Icon icon="lucide:arrow-left" />
        <span> Back to home </span>
      </router-link>
      <slot />
    </div>
  </div>
</template>

