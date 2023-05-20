<template>
  <div
    :class="`w-${dimension} h-${dimension}`"
    :style="`background-color:${background}; border-radius:100%;`"
    class="text-gray-100 p-5 min-w-[75px] aspect-square flex flex-col justify-center items-center"
  >
    <p id="initial" class="font-semibold text-2xl">{{ init }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
const props = defineProps({
  name: {
    type: String,
    // default: 'User Hello',
  },
  dimension: {
    type: Number,
    default: 20,
  },
  background: {
    type: String,
  },
});

function getInitials(name: string): string {
  const arrayName = name.split(" ");
  const parts = ref<string[]>([]);

  for (let i = 0; i < arrayName.length; i++) {
    parts.value.push(arrayName[i].slice(0, 1));
  }
  if (parts.value.length >= 3) {
    parts.value.splice(2);
  }
  return parts.value.join("").toLocaleUpperCase();
}

const init = ref(getInitials(props.name as string));
</script>
