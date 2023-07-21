<script setup lang="ts">
definePageMeta({
  middleware: ["hanko-logged-out"],
});
</script>

<template>
  <hanko-auth />
</template>
