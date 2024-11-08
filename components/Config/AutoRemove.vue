<script setup lang="ts">
const emits = defineEmits<{
  (e: "save"): void
}>()

const autoRemove = useAutoRemove()

function safeAutoRemove() {
  localStorage.setItem(
    LOCAL_STORAGE_TOKENS.AUTO_REMOVE,
    String(autoRemove.value),
  )

  useToast().add({ title: "Successfully saved auto-play settings" })
  emits("save")
}
</script>

<template>
  <div class="grid gap-2">
    <UCheckbox
      v-model="autoRemove"
      @change="safeAutoRemove"
      label="Auto-Remove Finished Timers"
    />
  </div>
</template>
