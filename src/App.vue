<template>
  <div class="md:hidden">
    <router-view></router-view>
  </div>
  <div  class="hidden md:flex items-center text-3xl p-7 font-bold min-h-[100vh]">
  <p>Sorry, currently the web-app doesn't support desktop mode, please resize your screen to mobile. 🙏📱</p>
  </div>
</template>

<script setup lang="ts">
import useAuthUser from '@/composables/AuthUser';
import { supabase } from './services/supabase';



supabase.auth.onAuthStateChange((event, session) => {
  // the "event" is a string indicating what trigger the state change (ie. SIGN_IN, SIGN_OUT, etc)
  // the session contains info about the current session most importanly the user dat
  const { user } = useAuthUser();
  // console.log(user);
  
  // if the user exists in the session we're logged in
  // and we can set our user reactive ref
  user.value = session?.user || null;
});


</script>
