<script setup lang="ts">
definePageMeta({
  middleware: ["hanko-logged-out"],
});

const afterLogin = async () =>
  $fetch("/api/login", {
    method: "POST",
    body: await useHanko()?.user.getCurrent(),
  });
</script>

<template>
  <hanko-auth />
  <hanko-events @onAuthFlowCompleted="afterLogin()" />
</template>
