<template>
  <div class="grid grid-cols-3 ">
    <slot name="back" ></slot>
    <h1 class="text-3xl font-semibold py-4 text-dark">{{ titleapp }}</h1>
    <slot name="exit" ></slot>
  </div>
</template>

<script setup lang="ts">
defineProps({
  titleapp: String,
  // iconSrc: String
})
</script>