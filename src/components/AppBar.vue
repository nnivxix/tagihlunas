<template>
  <div class="flex justify-center">
    <slot></slot>
    <h1 class="text-3xl font-semibold py-4 text-dark">{{ titleapp }}</h1>
  </div>
</template>

<script setup lang="ts">
defineProps({
  titleapp: String,
  // iconSrc: String
})
</script>