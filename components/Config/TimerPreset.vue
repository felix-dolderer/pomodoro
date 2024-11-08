<script setup lang="ts">
const emits = defineEmits<{
  (e: "save"): void
}>()

const timerPreset = useTimerPreset()
const configTimerPreset = ref(timerPreset.value)

function saveTimerPreset() {
  timerPreset.value = configTimerPreset.value
  localStorage.setItem(LOCAL_STORAGE_TOKENS.TIMER_PRESET, timerPreset.value)

  useToast().add({ title: "Successfully changed default timer" })
  emits("save")
}
</script>

<template>
  <form
    @submit.prevent="saveTimerPreset"
    class="grid gap-2"
  >
    <UFormGroup
      name="timerPreset"
      label="Default Timer Value"
    >
      <UInput
        v-model="configTimerPreset"
        type="time"
        step="1"
      />
    </UFormGroup>
    <UButton
      block
      type="submit"
      >Save Default Timer</UButton
    >
  </form>
</template>
