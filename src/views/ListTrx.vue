<template>
  <div >
    <AppBar titleapp="Detials">
      <template #back >
        <button class="justify-self-start" @click="$router.back()">
          <img src="@/assets/arrow-back.svg" alt="back" srcset="">
        </button>
      </template>
    </AppBar>
    <div class="px-4 mb-7">
      <div class="flex items-center my-3">
        <TheAvatar username="Heloo hh" :dimension='parseInt("64")'></TheAvatar>
        <p class="ml-4 text-xl flex items-center">Hello hhhh <span><img class="px-4" src="../assets/pencil.svg" alt="edit button"></span></p>
      </div>
      <p class="text-4xl font-semibold text-dark py-4">-Rp. 200.000</p>
      <TheButton :src-icon="plus" title="Add Trx" ></TheButton>
    </div>
    <div>
    <TheTrx></TheTrx>
    <TheTrx></TheTrx>
    <TheTrx></TheTrx>
    <TheTrx></TheTrx>
    <TheTrx></TheTrx>
    <TheTrx></TheTrx>
    <TheTrx></TheTrx>
    <TheTrx></TheTrx>
    <TheTrx></TheTrx>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
import TheAvatar from '@/components/TheAvatar.vue';
import TheButton from '@/components/TheButton.vue';
import plus from '@/assets/plus.svg'
import TheTrx from '@/components/TheTrx.vue';


</script>

<style scoped>

</style>