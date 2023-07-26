<script setup lang="ts">
import { nanoid } from "nanoid";

definePageMeta({
  middleware: ["hanko-logged-in"],
});
const allTimers = ref<{ id: string }[]>([{ id: nanoid() }]);

function addTimer() {
  allTimers.value.push({ id: nanoid() });
}

function removeTimer(id: string) {
  allTimers.value = allTimers.value.filter((timer) => timer.id !== id);
}
</script>

<template>
  <div
    class="h-screen -mt-20 overscroll-y-none place-content-center grid gap-4"
  >
    <PomodoroTimer
      v-for="timer in allTimers"
      :key="timer.id"
      @remove-timer="removeTimer(timer.id)"
    />
    <UButton @click="addTimer" color="black" class="mx-auto w-40">
      <span class="w-full text-center">
        {{ allTimers.length === 0 ? "Add First Timer" : "Add Timer" }}
      </span>
    </UButton>
  </div>
</template>
