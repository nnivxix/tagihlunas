<script setup lang="ts">
import { computed } from "vue";
import * as icons from "lucide-vue-next";

const { name, size, color, strokeWidth, defaultClass } = withDefaults(
  defineProps<{
    name: string;
    size?: number;
    color?: string;
    strokeWidth?: number;
    defaultClass?: string;
  }>(),
  {
    strokeWidth: 2.3,
  }
);

const icon = computed(() => icons[name as keyof typeof icons]);
</script>

<template>
  <Component
    :is="icon"
    :size="size"
    :color="color"
    :stroke-width="strokeWidth"
    :default-class="defaultClass"
  />
</template>
