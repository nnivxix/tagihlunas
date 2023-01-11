<template>
  <button class="bg-lemon flex px-4 py-4 rounded-md text-dark">
    <img :src="srcIcon" :alt="title" class="mr-3"> {{ title }}
  </button>
</template>
<script setup lang="ts">
defineProps(['srcIcon', 'title'])
</script>