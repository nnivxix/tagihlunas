<template>
  <div>
      <h1>hello</h1>
  </div>
</template>
<script lang="ts" setup>
import { UsersService } from '@/services/supabase/UsersServices';

const users = UsersService().getUsers();

users.then(e => {
  // eslint-disable-next-line no-console
  console.log(e);
  
});

</script>