<script setup lang="ts">
const { icon, title } = defineProps<{
  icon: string;
  title: string;
}>();
</script>
<template>
  <button
    class="bg-lemon text-lg px-2 py-2 pr-4 rounded-md font-semibold text-dark flex items-center"
    @click="$emit('button-event')"
  >
    <Icon :icon="icon" class="mr-2"></Icon> {{ title }}
  </button>
</template>

