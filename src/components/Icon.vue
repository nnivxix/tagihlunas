<script setup lang="ts">
import { Icon } from "@iconify/vue";
const { icon, width = "1.5em" } = defineProps<{
  icon: string;
  width: string;
}>();
</script>

<template>
  <Icon v-bind="$attrs" :icon :width />
</template>

