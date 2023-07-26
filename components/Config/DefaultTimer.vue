<script setup lang="ts">
const emits = defineEmits<{
  (e: "save"): void;
}>();

const defaultTimer = useDefaultTimer();
const configDefaultTimer = ref("00:30:00.000");

function saveDefaultTimer() {
  defaultTimer.value = configDefaultTimer.value;
  localStorage.setItem("defaultTimer", defaultTimer.value);

  useToast().add({ title: "Successfully changed default timer" });
  emits("save");
}

onBeforeMount(() => {
  const initialDefaultTimer = initDefaultTimer();

  defaultTimer.value = initialDefaultTimer;
  configDefaultTimer.value = initialDefaultTimer;
});
</script>

<template>
  <div class="grid gap-2">
    <UFormGroup name="defaultTimer" label="Default Timer Value">
      <UInput v-model="configDefaultTimer" type="time" step="0.1" />
    </UFormGroup>
    <UButton block @click="saveDefaultTimer">Save Default Timer</UButton>
  </div>
</template>
