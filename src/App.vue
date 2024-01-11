<template>
  <div class="md:max-w-4xl mx-auto">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
import { useAuthUser } from "@/composables/useAuthUser";
import { supabase } from "@/helpers/supabase";

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
<style>
body {
  scrollbar-width: thin; /* "auto" or "thin" */
  scrollbar-color: #95d92d rgb(231, 231, 231); /* scroll thumb and track */
}
body::-webkit-scrollbar {
  width: 12px; /* width of the entire scrollbar */
}

body::-webkit-scrollbar-track {
  background: rgb(231, 231, 231); /* color of the tracking area */
}

body::-webkit-scrollbar-thumb {
  background-color: #95d92d; /* color of the scroll thumb */
  border-radius: 20px; /* roundness of the scroll thumb */
  border: 3px solid rgb(231, 231, 231); /* creates padding around scroll thumb */
}
</style>
