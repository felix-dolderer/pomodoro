<script setup lang="ts">
definePageMeta({
  middleware: ["hanko-logged-in"],
});

const loginTest = async () =>
  $fetch("/api/login", {
    method: "POST",
    body: await useHanko()?.user.getCurrent(),
  });
</script>

<template>
  <hanko-profile />
  <UButton @click="loginTest" color="black">Test</UButton>
</template>
