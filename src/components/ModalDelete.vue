<template>
  <div
    :class="'grid-rows-' + gridRows"
    class="w-full h-2/3 rounded-md bg-white p-6 grid grid-cols-2 gap-2"
  >
    <h1 class="col-span-2 font-bold text-lg text-center self-center">
      ⚠️ Delete {{ capitalizeWordTypeData }} Confirmation ⚠️
    </h1>
    <p class="col-span-2 text-center self-center">
      Are you sure want <strong> delete this {{ typeData }} {{ additionalMsg }}</strong
      >?
    </p>
    <slot></slot>
    <button
      class="p-1 bg-lime-300 rounded-md font-semibold text-dark text-lg"
      @click="$emit('clickCancle')"
    >
      {{ cancel }}
    </button>
    <button
      class="text-lg border-2 rounded-md font-semibold border-red-600 text-red-500 p-1"
      @click="$emit('clickConfirm')"
    >
      {{ confirm }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from "vue";

const props = defineProps({
  typeData: {
    type: String,
    default: null,
  },
  additionalMsg: {
    type: String,
    default: "",
  },
  cancel: {
    type: String,
  },
  confirm: {
    type: String,
  },
  gridRows: {
    type: String,
  },
});

const capitalizeWordTypeData = computed((): string => {
  return props.typeData?.charAt(0).toLocaleUpperCase() + props.typeData?.slice(1);
});
</script>

<style scoped></style>
