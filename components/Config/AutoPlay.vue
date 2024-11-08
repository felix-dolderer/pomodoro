<script setup lang="ts">
const emits = defineEmits<{
  (e: "save"): void
}>()

const autoPlay = useAutoPlay()

function safeAutoPlay() {
  localStorage.setItem(LOCAL_STORAGE_TOKENS.AUTO_PLAY, String(autoPlay.value))

  useToast().add({ title: "Successfully saved auto-play settings" })
  emits("save")
}
</script>

<template>
  <div class="grid gap-2">
    <UCheckbox
      v-model="autoPlay"
      @change="safeAutoPlay"
      label="Auto-Play"
    />
  </div>
</template>
