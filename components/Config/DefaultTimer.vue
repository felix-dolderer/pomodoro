<script setup lang="ts">
const emits = defineEmits<{
  (e: "save"): void;
}>();

const defaultTimer = useDefaultTimer();
const configDefaultTimer = ref(defaultTimer.value);

function saveDefaultTimer() {
  defaultTimer.value = configDefaultTimer.value;
  localStorage.setItem("defaultTimer", defaultTimer.value);

  useToast().add({ title: "Successfully changed default timer" });
  emits("save");
}
</script>

<template>
  <form @submit.prevent="saveDefaultTimer" class="grid gap-2">
    <UFormGroup name="defaultTimer" label="Default Timer Value">
      <UInput v-model="configDefaultTimer" type="time" step="1" />
    </UFormGroup>
    <UButton block type="submit">Save Default Timer</UButton>
  </form>
</template>
