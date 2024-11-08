<script setup lang="ts">
import { z } from "zod"
import { twMerge } from "tailwind-merge"

const emits = defineEmits<{
  (e: "removeTimer"): void
  (e: "timerStarted"): void
  (e: "timerFinished"): void
}>()

const props = defineProps<{
  startTimer?: boolean
}>()

enum TimerStatus {
  READY,
  ACTIVE,
  PAUSED,
  FINISHED,
}

watch(
  () => props.startTimer,
  (startTimer) => {
    if (startTimer && timerStatus.value === TimerStatus.READY) {
      startSession()
    }
  },
)

const timerTitle = ref("")

const totalTimer = ref(useTimerPreset().value)
const pomodoroTimer = ref(totalTimer.value)

const timerStatus = ref<TimerStatus>(TimerStatus.READY)

const timerEnd = ref<Date>(new Date())
let timerTick: NodeJS.Timeout
let timerFinishedTimeout: NodeJS.Timeout
let timerAudio: HTMLAudioElement | undefined

const DATE_TIME_START_INDEX = 11
const DATE_TIME_END_INDEX = 21

function timeTicker() {
  const remainingTime =
    Math.round((timerEnd.value.getTime() - Date.now()) / 100) * 100
  pomodoroTimer.value = new Date(remainingTime)
    .toISOString()
    .substring(DATE_TIME_START_INDEX, DATE_TIME_END_INDEX)
  if (remainingTime > 0) return

  timerStatus.value = TimerStatus.FINISHED
  clearInterval(timerTick)
  timerAudio = new Audio(
    "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3",
  )
  timerAudio.play()
  timerFinishedTimeout = setTimeout(stopSession, 10_000)
}

const startPauseResumeText = computed(() => {
  if (timerStatus.value === TimerStatus.READY) return "Start"
  else if (timerStatus.value === TimerStatus.ACTIVE) return "Pause"
  else if (timerStatus.value === TimerStatus.PAUSED) return "Resume"
  else return "INVALID"
})

function startPauseResume() {
  if (timerStatus.value === TimerStatus.READY) startSession()
  else if (timerStatus.value === TimerStatus.ACTIVE) pauseSession()
  else if (timerStatus.value === TimerStatus.PAUSED) resumeSession()
}

function startSession() {
  totalTimer.value = pomodoroTimer.value
  _startSession()
}

function _startSession() {
  const parsedTimer = z
    .array(z.coerce.number())
    .length(3)
    .safeParse(pomodoroTimer.value.split(":"))

  if (!parsedTimer.success) return
  const [hours, minutes, seconds] = parsedTimer.data
  if (
    typeof hours !== "number" ||
    typeof minutes !== "number" ||
    typeof seconds !== "number"
  ) {
    return
  }

  timerStatus.value = TimerStatus.ACTIVE
  timerEnd.value = new Date(
    ((hours * 60 + minutes) * 60 + seconds) * 1000 + Date.now(),
  )

  timerTick = setInterval(timeTicker, 100)
  emits("timerStarted")
}

function pauseSession() {
  clearInterval(timerTick)
  timerStatus.value = TimerStatus.PAUSED
}

function resumeSession() {
  timerStatus.value = TimerStatus.ACTIVE
  _startSession()
}

function stopSession() {
  if (timerStatus.value === TimerStatus.FINISHED) {
    emits("timerFinished")
  }
  timerStatus.value = TimerStatus.READY
  pomodoroTimer.value = totalTimer.value
  _cleanUp()
}

function _cleanUp() {
  clearTimeout(timerFinishedTimeout)
  clearInterval(timerTick)
  timerAudio?.pause()
  timerAudio?.remove()
}

function removeTimer() {
  stopSession()
  emits("removeTimer")
}

function getTimerClasses() {
  let timerStatusClasses = ""
  if (timerStatus.value === TimerStatus.FINISHED) {
    timerStatusClasses =
      "text-red-500 bg-red-200 dark:text-red-400 dark:bg-red-800 animate-pulse duration-100"
  } else if (timerStatus.value === TimerStatus.ACTIVE) {
    timerStatusClasses = "font-bold disabled:cursor-default"
  }

  return twMerge("text-lg", timerStatusClasses)
}

onUnmounted(_cleanUp)
</script>

<template>
  <div class="grid gap-2 md:grid-cols-5">
    <div
      v-if="timerStatus !== TimerStatus.ACTIVE"
      class="w-40"
    >
      <UInput
        v-model="timerTitle"
        placeholder="Title"
      />
    </div>
    <p
      v-else
      class="text-lg font-bold w-40"
    >
      {{ timerTitle }}
    </p>
    <div class="w-40">
      <UInput
        v-model="pomodoroTimer"
        :disabled="timerStatus === TimerStatus.ACTIVE"
        :type="timerStatus === TimerStatus.ACTIVE ? 'text' : 'time'"
        step="1"
        :class="getTimerClasses"
      />
    </div>
    <UButton
      @click="startPauseResume"
      :class="timerStatus === TimerStatus.FINISHED ? 'invisible' : ''"
      :color="timerStatus === TimerStatus.ACTIVE ? 'yellow' : 'primary'"
      block
    >
      {{ startPauseResumeText }}
    </UButton>
    <UButton
      @click="stopSession"
      :class="timerStatus !== TimerStatus.READY ? '' : 'invisible'"
      color="red"
      block
    >
      Stop
    </UButton>
    <UButton
      @click="removeTimer"
      icon="i-heroicons-x-circle"
      variant="outline"
      color="red"
      block
    >
      Remove
    </UButton>
  </div>
</template>
