<script setup lang="ts">
definePageMeta({
  middleware: ["hanko-logged-in"],
});
</script>

<template>
  <div class="h-screen grid place-content-center">
    <h1 class="text-center">Hi there! You are successfully logged in!</h1>
  </div>
</template>
