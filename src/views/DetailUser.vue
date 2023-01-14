<template>
  <div>
    <AppBar titleapp="Details" class="mx-6">
      <template #back >
        <button class="justify-self-start" @click="$router.back()">
          <img src="@/assets/arrow-back.svg" alt="back" srcset="">
        </button>
      </template>
    </AppBar>
    <div class="px-4 mb-7 mx-6">
      <div class="flex items-center my-3">
        <TheAvatar
        :name="firstUser.name" :dimension='parseInt("64")'
        :background="firstUser['color_profile']"></TheAvatar>
        <p class="ml-4 text-xl flex items-center">{{ firstUser.name }} <span><img class="px-4" src="../assets/pencil.svg" alt="edit button"></span></p>
      </div>
      <p class="text-4xl font-semibold text-dark py-4">-Rp. 200.000</p>
      <TheButton :src-icon="plus" title="Add Trx"
      @button-event="router.push({name: 'add.transaction'})" ></TheButton>
    </div>
    <div>
    <TheTrx></TheTrx>
    </div>
  </div>
</template>

<script setup lang="ts">
import AppBar from '@/components/AppBar.vue';
import TheAvatar from '@/components/TheAvatar.vue';
import TheButton from '@/components/TheButton.vue';
import plus from '@/assets/plus.svg';
import TheTrx from '@/components/TheTrx.vue';
import { useRoute } from "vue-router";
import { user, userId, useSupabase } from '@/composables/useSupabaseUser';
import router from '@/router';

const {getOneUser} = useSupabase();
const route = useRoute();
const id = route.params.userId;
getOneUser(id as string);

const firstUser = user;
// console.log(firstUser);

userId.value = id;





</script>

<style scoped>

</style>