<template>
  <div class="w-full bg-dark">
    <div
      class="bg-dark text-semi-gray-1 px-4 py-9 md:h-screen h-screen items-center mx-auto max-w-7xl flex flex-col md:flex-row justify-between"
    >
      <div class="flex flex-col md:flex-col md:max-w-xl">
        <h1 class="text-3xl md:text-6xl py-8 font-medium">
          Manage, bill and paid off.
        </h1>
        <p class="py-9 text-xl md:text-3xl">
          Record and complete all transaction easily in one application in your
          hand.
        </p>
        <div class="flex flex-col items-center w-full">
          <router-link
            to="/register"
            class="block py-4 w-full bg-lemon text-dark text-center mx-auto font-bold rounded-xl"
            >Try now</router-link
          >
          <router-link to="/login" class="py-8 md:px-60 block underline"
            >Sign in</router-link
          >
        </div>
      </div>
      <div class="bg-dark flex flex-col items-start pb-40 md:pb-0">
        <img
          src="@/assets/main-illustration.png"
          alt="main illustration"
          srcset=""
          class="w-full max-w-md"
        />
      </div>
    </div>
  </div>
</template>
