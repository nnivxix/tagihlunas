<template>
  <div
    :class="`w-${dimension} h-${dimension}`"
    :style="`background-color:${background}; border-radius:100%;`"
    class="text-gray-100 p-5 min-w-[75px] aspect-square flex flex-col justify-center items-center"
  >
    <p id="initial" class="font-semibold text-2xl">{{ initialName }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import useInitialName from "@/composables/useInitialName";

// eslint-disable-next-line vue/no-setup-props-destructure
const { name, dimension, background } = defineProps<{
  name: string;
  dimension?: number;
  background?: string;
}>();
const { getInitial } = useInitialName();

const initialName = ref(getInitial(name as string));
</script>
