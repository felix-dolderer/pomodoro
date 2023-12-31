<script setup lang="ts">
import { z } from "zod";
import { twMerge } from "tailwind-merge";

defineEmits<{
  (e: "removeTimer"): void;
}>();

const timerTitle = ref("");

const totalTimer = ref(useDefaultTimer().value);
const pomodoroTimer = ref(totalTimer.value);
const timerActive = ref(false);
const timerPaused = ref(false);
const timerFinished = ref(false);

const timerEnd = ref<Date>(new Date());
let timerTick: NodeJS.Timer;
let timerAudio: HTMLAudioElement;

function timeTicker() {
  const remainingTime =
    Math.round((timerEnd.value.getTime() - Date.now()) / 100) * 100;
  pomodoroTimer.value = new Date(remainingTime).toISOString().substring(11, 23);
  if (remainingTime <= 0) {
    timerFinished.value = true;
    timerPaused.value = false;
    clearInterval(timerTick);
    timerAudio = new Audio(
      "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    );
    timerAudio.play();
  }
}

const startPauseResumeText = computed(() => {
  if (!timerActive.value) return "Start";
  else if (timerPaused.value) return "Resume";
  else return "Pause";
});
function startPauseResume() {
  if (!timerActive.value) startSession();
  else if (timerPaused.value) resumeSession();
  else pauseSession();
}

function startSession() {
  totalTimer.value = pomodoroTimer.value;
  _startSession();
}

function _startSession() {
  const parsedTimer = z
    .array(z.coerce.number())
    .safeParse(pomodoroTimer.value.split(":"));

  if (!parsedTimer.success) return;
  const [hours, minutes, seconds] = parsedTimer.data;

  timerActive.value = true;
  timerEnd.value = new Date(
    ((hours * 60 + minutes) * 60 + seconds) * 1000 + Date.now()
  );

  timerTick = setInterval(timeTicker, 100);
}

function pauseSession() {
  clearInterval(timerTick);
  timerPaused.value = true;
}

function resumeSession() {
  timerPaused.value = false;
  _startSession();
}

function stopSession() {
  timerActive.value = false;
  timerPaused.value = false;
  timerFinished.value = false;
  clearInterval(timerTick);
  timerAudio?.pause();
  timerAudio?.remove();
  pomodoroTimer.value = totalTimer.value;
}

function getTimerClasses() {
  return twMerge(
    "text-lg",
    timerFinished.value
      ? "text-red-500 bg-red-200 dark:text-red-400 dark:bg-red-800 animate-pulse duration-100"
      : "",
    timerActive.value ? "font-bold disabled:cursor-default" : ""
  );
}

onUnmounted(() => clearInterval(timerTick));
</script>

<template>
  <div class="grid gap-2 md:grid-cols-5">
    <div v-if="!timerActive" class="w-40">
      <UInput v-model="timerTitle" placeholder="Title" />
    </div>
    <p v-else class="text-lg font-bold w-40">{{ timerTitle }}</p>
    <div class="w-40">
      <UInput
        v-model="pomodoroTimer"
        :disabled="timerActive"
        type="time"
        step="0.1"
        :class="getTimerClasses"
      />
    </div>
    <UButton
      @click="startPauseResume"
      :class="timerFinished ? 'invisible' : ''"
      :color="timerActive && !timerPaused ? 'yellow' : 'primary'"
      block
    >
      {{ startPauseResumeText }}
    </UButton>
    <UButton
      @click="stopSession"
      :class="timerActive ? '' : 'invisible'"
      color="red"
      block
    >
      Stop
    </UButton>
    <UButton
      @click="$emit('removeTimer')"
      icon="i-heroicons-x-circle"
      variant="outline"
      color="red"
      block
    >
      Remove
    </UButton>
  </div>
</template>
