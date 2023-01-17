<template>
  <button class="bg-lemon flex px-2 py-2 pr-4 rounded-md text-dark text-sm font-bold" @click="$emit('button-event')">
    <img :src="srcIcon" :alt="title" class="mr-3"> {{ title }}
  </button>
</template>
<script setup lang="ts">
defineProps(['srcIcon', 'title']);
</script>