<template>
  <div class="grid grid-cols-3 ">
    <slot name="back" ></slot>
    <h1 class="text-2xl text-center font-semibold py-4 cursor-pointer text-dark"
    title="tagih lunas"
    @click="router.push({name: 'intro'})">{{ titleapp }}</h1>
    <slot name="exit" ></slot>
  </div>
</template>

<script setup lang="ts">
import router from '@/router';

defineProps({
  titleapp: String,
  // iconSrc: String
});
</script>