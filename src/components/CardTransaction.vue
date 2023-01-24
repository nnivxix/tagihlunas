<template>
  <div class="grid grid-rows-2 grid-cols-2  bg-semi-gray-1 px-8 py-4 text-dark hover:text-gray-700 hover:bg-lemon">
    
    <p class="text-sm cursor-pointer font-semibold" @click="copy(trxId)" ref="btn">{{ trxId }} 
      <span id="tooltip" ref="tooltip" v-if="isSupported" >
        <div id="arrow" data-popper-arrow></div>
        Copied
      </span>
      <span id="tooltip" ref="tooltip" v-else >
        <div id="arrow" data-popper-arrow></div>
        Copy to clipboard doesn't support on your browser
      </span>
    </p>
    <p class="text-lg font-semibold text-gray-800 text-end row-span-2 self-center">{{ amount.toLocaleString('id-ID', {style: 'currency', currency: 'IDR'}) }}</p>
    <p class="text-sm text-gray-400">{{`${new Date(date as string).getDate()}-${new Date(date as string).getMonth()+1}-${new Date(date as string).getFullYear()} ${new Date(date as string).getHours()}:${new Date(date as string).getMinutes()}:${new Date(date as string).getSeconds()}`}}</p>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useClipboard } from '@vueuse/core';
import { usePopperjs } from "vue-use-popperjs";

defineProps({
  trxId: {
    type: String,
    default: '',
  },
  amount: {
    type: Number,
    default: 0,
  },
  date: {
    type: String,
  },
});
const { copy, isSupported } = useClipboard();
const btn = ref();
const tooltip = ref();

usePopperjs(btn, tooltip, {
  trigger: 'click-to-toggle',
  placement: 'top',
});
</script>

<style scoped>
.vue-use-popperjs-none {
  display: none;
}
#tooltip {
  background-color: #333;
  color: white;
  padding: 5px 10px;
  border-radius: 4px;
  font-size: 13px;
}
</style>