<script setup lang="ts">
defineProps<{
  icon: string
  to: string
}>()
</script>

<template>
  <UButton
    :to="to"
    :icon="icon"
    target="_blank"
    color="neutral"
    variant="ghost"
  />
</template>
