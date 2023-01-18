<template>
  <button class="bg-lemon text-lg px-2 py-2 pr-4 rounded-md text-dark font-bold" @click="$emit('button-event')">
    <font-awesome-icon :icon="'fa-solid '+ icon" class="mr-2"></font-awesome-icon> {{ title }}
  </button>
</template>
<script setup lang="ts">
defineProps(['icon', 'title']);
</script>